## Context

当前应用使用 Tailwind CSS 的默认浅色配色（灰色背景 + 白色卡片）。需要添加深色主题支持，提升用户体验。

## Goals / Non-Goals

**Goals:**
- 实现浅色/深色主题切换
- 记住用户主题偏好（localStorage）
- 支持系统自动识别
- 所有组件正确适配深色主题

**Non-Goals:**
- 不修改现有功能逻辑
- 不添加主题预设数量（仅浅色/深色两种）

## Decisions

### 1. 技术方案：Tailwind darkMode: 'class'
- **方案**: 使用 Tailwind 的 `darkMode: 'class'` 策略
- **理由**: Next.js 项目成熟方案，可手动控制主题切换

```javascript
// tailwind.config.mjs
export default {
  darkMode: 'class',
  // ...
}
```

### 2. 配色方案：星空深蓝
```css
/* 浅色主题 */
--bg-primary: #f8f9fa;
--bg-card: #ffffff;
--text-primary: #171717;

/* 深色主题 */
--bg-primary: #0f172a;  /* 星空蓝 */
--bg-card: #1e293b;    /* 墨灰 */
--text-primary: #f1f5f9; /* 银白 */
--accent: #d4a574;       /* 古铜金 */
```

### 3. 主题状态管理
- **方案**: 使用 React Context + ThemeProvider 组件
- **理由**: 需要在 Header 和各组件间共享主题状态；在 Next.js App Router 中需要创建带 'use client' 的 Provider 组件

```typescript
// app/components/ThemeProvider.tsx
'use client';
import { createContext, useState, useEffect } from 'react';
// ... context logic
```

### 4. 主题切换组件
- **方案**: 在 Header 右侧添加切换按钮
- **图标**: Sun（浅色时显示）/ Moon（深色时显示）
- **位置**: Header 右侧，AI 模型标签旁边

### 5. 组件样式适配
- **方案**: 使用 Tailwind 的 `dark:` 变体
- **示例**: `bg-white dark:bg-slate-800`

## Risks / Trade-offs

| 风险 | Mitigation |
|------|------------|
| K线图 tooltip 背景色适配 | 使用 Recharts 的 contentStyle 自定义深色主题 |
| 首次加载闪烁 (FOUC) | 在 layout.tsx 中同步读取 localStorage 避免闪烁 |
| 第三方组件样式 | 检查并覆盖必需组件的深色样式 |
