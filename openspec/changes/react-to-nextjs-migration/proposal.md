<!-- Use this as the structure for your output file. Fill in the sections. -->
## Why

当前项目使用 React + Vite 技术栈，构建的是八字命理人生K线图应用。随着功能扩展，需要更好的 SEO、服务器端渲染 (SSR)、以及更强大的路由管理。迁移到 Next.js 可以解决这些问题，并为后续功能（如用户系统、API 服务）打下基础。

## What Changes

- 将项目从 React + Vite 迁移到 Next.js (App Router)
- 更新构建和开发脚本
- 迁移现有组件到 Next.js 页面结构
- 配置环境变量和类型定义
- 确保部署到 Vercel 正常工作

## Capabilities

### New Capabilities
- `nextjs-migration`: 将现有 React + Vite 项目完整迁移到 Next.js，包括目录结构调整、组件迁移、API 集成

### Modified Capabilities
<!-- Existing capabilities whose REQUIREMENTS are changing (not just implementation).
     Only list here if spec-level behavior changes. Each needs a delta spec file.
     Use existing spec names from openspec/specs/. Leave empty if no requirement changes. -->
无

## Impact

- 前端框架：从 React + Vite 变为 Next.js (App Router)
- 构建工具：从 Vite 变为 Next.js 内置构建
- 部署平台：继续使用 Vercel（已有 vercel.json 配置）
- 路由：从单页面变为基于文件系统的路由
- 环境变量：使用 Next.js 标准方式加载 .env
