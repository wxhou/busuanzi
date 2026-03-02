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

### 3. 样式方案：保留 Tailwind CSS
**选择**: 继续使用 Tailwind CSS，配置 PostCSS
**理由**:
- 项目已使用 Tailwind（package.json 有依赖，index.html 用 CDN 加载）
- 需要创建 postcss.config.js 和 tailwind.config.js
- index.html 中的 CDN 方式改为本地 PostCSS 处理

### 4. 环境变量前缀
**选择**: 使用 `NEXT_PUBLIC_` 前缀
**理由**:
- Next.js 客户端环境变量需要 `NEXT_PUBLIC_` 前缀
- 需要将 `.env` 中的 `VITE_` 改为 `NEXT_PUBLIC_`
- 服务端专用变量不需要前缀

### 5. API 调用方式
**选择**: 使用客户端调用（保留现状）
**理由**: AI API 调用保留在客户端，避免密钥泄露风险

### 6. SSR 兼容性处理
**选择**: 为图表组件添加 `'use client'` 指令
**理由**: recharts 库不支持服务端渲染，需要标记为客户端组件

### 7. 组件目录结构
**选择**: 保留 components/ 在原位置
**理由**: 不移动，通过配置别名或相对路径引用

## Migration Plan

1. **安装 Next.js 依赖**
   - 添加 next, react, react-dom 到 package.json
   - 安装 @next/bundle-analyzer (可选)

2. **创建 Next.js 目录结构**
   ```
   app/
     layout.tsx    - 根布局（含 metadata）
     page.tsx      - 首页 (原 App.tsx)
     globals.css   - 全局样式（导入 Tailwind）
   ```

3. **迁移 Tailwind CSS 配置**
   - 创建 postcss.config.js
   - 创建/更新 tailwind.config.js
   - 将 index.html 中的 Tailwind CDN 样式迁移到 PostCSS

4. **迁移入口文件**
   - 创建 app/page.tsx 包含主应用
   - 删除 index.tsx 和 App.tsx（或保留备份）
   - 删除 index.html（Next.js 不需要）

5. **迁移组件**
   - 保留 components/ 在原位置
   - 确保 import 路径正确
   - 为使用 recharts 的组件添加 `'use client'` 指令

6. **配置 Next.js**
   - 创建 next.config.js
   - 更新 package.json scripts
   - 更新环境变量（VITE_ → NEXT_PUBLIC_）

7. **迁移元数据**
   - 将 index.html 中的 title、meta 标签迁移到 app/layout.tsx

8. **调整 Vercel 配置**
   - 移除 vercel.json 中的 base 配置
   - 确保构建命令正确

9. **测试和部署**
   - 本地运行 `npm run dev`
   - 修复兼容性问题
   - 推送到 GitHub，Vercel 自动部署

## Risks / Trade-offs

- **风险**: 第三方库兼容性问题 →  mitigation: 逐一测试，确保工作正常
- **风险**: 路由变化影响 SEO → mitigation: 保持根路径 `/` 不变
- **风险**: recharts SSR 兼容性问题 → mitigation: 为图表组件添加 `'use client'` 指令
- **风险**: Tailwind CSS 配置问题 → mitigation: 创建 postcss.config.js 和 tailwind.config.js
- **风险**: 环境变量命名冲突 → mitigation: 将 VITE_ 改为 NEXT_PUBLIC_ 前缀

## 回滚计划

如迁移失败：
1. 使用 git 回滚到迁移前的提交
2. 恢复 package.json 依赖
3. 删除 app/ 目录
4. 恢复 index.html、vite.config.ts
