<!-- Use this as the structure for your output file. Fill in the sections. -->
## 1. 准备工作

- [x] 1.1 备份当前项目（git commit 当前更改）
- [x] 1.2 安装 Next.js 依赖：npm install next react react-dom

## 2. 创建 Next.js 目录结构

- [x] 2.1 创建 app/ 目录
- [x] 2.2 创建 app/layout.tsx 根布局（含 metadata）
- [x] 2.3 创建 app/page.tsx 首页
- [x] 2.4 创建 app/globals.css 全局样式

## 3. 迁移 Tailwind CSS 配置

- [x] 3.1 创建 postcss.config.js
- [x] 3.2 创建/更新 tailwind.config.js
- [x] 3.3 在 app/globals.css 中导入 Tailwind
- [x] 3.4 移除 index.html 中的 Tailwind CDN

## 4. 迁移入口文件

- [x] 4.1 创建 app/page.tsx，从 App.tsx 迁移内容
- [x] 4.2 更新组件 import 路径
- [x] 4.3 删除原 index.tsx 和 App.tsx（或保留备份）
- [x] 4.4 删除 index.html（Next.js 不需要）

## 5. 配置 Next.js

- [x] 5.1 创建 next.config.js
- [x] 5.2 更新 package.json scripts (dev, build, start, lint)
- [x] 5.3 更新环境变量（VITE_ → NEXT_PUBLIC_）
- [x] 5.4 更新 .env 和 .env.example 文件

## 6. 迁移组件和服务

- [x] 6.1 确保 components/ 目录正确引用
- [x] 6.2 为使用 recharts 的组件添加 'use client' 指令
- [x] 6.3 确保 services/geminiService.ts 正确工作
- [x] 6.4 确保 types.ts 和 constants.ts 正确引用

## 7. 迁移元数据和配置

- [x] 7.1 将 index.html 中的 title 迁移到 app/layout.tsx metadata
- [x] 7.2 迁移 meta 标签（description、viewport 等）
- [x] 7.3 调整 vercel.json（移除 base 配置）
- [x] 7.4 处理静态资源目录 assets/

## 8. 测试和部署

- [ ] 8.1 运行 npm run dev 测试开发环境
- [x] 8.2 运行 npm run build 测试构建
- [x] 8.3 验证页面样式正确（Tailwind）
- [x] 8.4 验证图表组件正常渲染（SSR 兼容）
- [ ] 8.5 提交更改（不推送到 GitHub）
- [ ] 8.6 手动推送到 GitHub 进行 Vercel 部署
- [ ] 8.7 验证 Vercel 部署成功

## 9. 清理

- [x] 9.1 删除不再需要的 Vite 配置文件 (vite.config.ts)
- [x] 9.2 删除旧的 tsconfig.json（如需更新）
- [x] 9.3 清理旧入口文件
- [ ] 9.4 验证 git 状态干净
