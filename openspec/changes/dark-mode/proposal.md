## Why

当前应用只有浅色主题，对于命理类应用，深色主题更符合"夜观星象"的传统意境，能增强神秘感和沉浸体验。许多用户偏好夜间使用深色模式，减少眼睛疲劳。

## What Changes

- 添加暗色主题支持（深蓝/墨灰配色方案）
- 在 Header 添加主题切换按钮（太阳/月亮图标）
- 使用 localStorage 保存用户主题偏好
- 支持系统自动识别（prefers-color-scheme）
- 所有组件适配深色主题（表单、图表、卡片等）

## Capabilities

### New Capabilities
- `dark-mode`: 暗色主题切换功能

### Modified Capabilities
- (无)

## Impact

- 修改 `app/globals.css` - 添加暗色 CSS 变量
- 修改 `tailwind.config.mjs` - 启用 darkMode: 'class'
- 新增 `app/components/ThemeToggle.tsx` - 主题切换组件
- 可能需要修改部分组件的深色样式
- 无需新增依赖（Tailwind 已支持）
