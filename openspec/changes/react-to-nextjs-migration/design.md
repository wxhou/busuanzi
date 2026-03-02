<!-- Use this as the structure for your output file. Fill in the sections. -->
## Context

当前项目是一个八字命理人生K线图应用，使用 React + Vite 构建。项目结构包括：
- 入口：`index.tsx`
- 主页面：`App.tsx`
- 组件：`components/` (BaziForm, AnalysisResult, LifeKLineChart, ImportDataMode)
- 服务：`services/geminiService.ts` (AI API 调用)
- 类型：`types.ts`
- 常量：`constants.ts`

项目可以部署到 Vercel（已有 vercel.json）。

## Goals / Non-Goals

**Goals:**
- 完整迁移项目到 Next.js (App Router)
- 保持现有功能不变
- 确保部署正常工作
- 提升 SEO 和首屏加载性能

**Non-Goals:**
- 不添加新功能（只做迁移）
- 不修改业务逻辑
- 不添加后端服务

## Decisions

### 1. 使用 Next.js App Router
**选择**: 使用 Next.js 14+ App Router 而非 Pages Router
**理由**: App Router 是未来趋势，支持 React Server Components，更好的性能

### 2. 迁移策略：原地迁移
**选择**: 不创建新项目，直接改造现有项目
**理由**:
- 保留 git 历史
- 减少重复工作
- 现有配置可以直接复用

### 3. 样式方案
**选择**: 继续使用现有 CSS 方案
**理由**: 当前项目没有使用复杂样式框架，保持简单

### 4. API 调用方式
**选择**: 使用 Next.js API Routes 或客户端调用
**理由**: AI API 调用可以保留在客户端（避免密钥泄露风险），未来需要可迁移到 API Routes

## Migration Plan

1. **安装 Next.js 依赖**
   - 添加 next, react, react-dom 到 package.json
   - 安装 @next/bundle-analyzer (可选)

2. **创建 Next.js 目录结构**
   ```
   app/
     layout.tsx    - 根布局
     page.tsx      - 首页 (原 App.tsx)
     globals.css   - 全局样式
   ```

3. **迁移入口文件**
   - 创建 app/page.tsx 包含主应用
   - 删除 index.tsx 和 App.tsx

4. **迁移组件**
   - 移动 components/ 到 app/components/ 或保留原位置
   - 确保 import 路径正确

5. **配置 Next.js**
   - 创建 next.config.js
   - 更新 package.json scripts
   - 处理环境变量（使用 NEXT_PUBLIC_ 前缀）

6. **测试和部署**
   - 本地运行 `npm run dev`
   - 修复兼容性问题
   - 推送到 GitHub，Vercel 自动部署

## Risks / Trade-offs

- **风险**: 第三方库兼容性问题 →  mitigation: 逐一测试，确保工作正常
- **风险**: 路由变化影响 SEO → mitigation: 保持根路径 `/` 不变
- **权衡**: 首屏 SSR vs 客户端渲染 → 当前选择客户端优先，保持交互性
