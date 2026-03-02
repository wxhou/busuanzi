<!-- Use this as the structure for your output file. Fill in the sections. -->
## 1. 准备工作

- [ ] 1.1 备份当前项目（git commit 当前更改）
- [ ] 1.2 安装 Next.js 依赖：npm install next react react-dom

## 2. 创建 Next.js 目录结构

- [ ] 2.1 创建 app/ 目录
- [ ] 2.2 创建 app/layout.tsx 根布局
- [ ] 2.3 创建 app/page.tsx 首页
- [ ] 2.4 创建 app/globals.css 全局样式

## 3. 迁移入口文件

- [ ] 3.1 创建 app/page.tsx，从 App.tsx 迁移内容
- [ ] 3.2 更新组件 import 路径
- [ ] 3.3 删除原 index.tsx 和 App.tsx（或保留备份）

## 4. 配置 Next.js

- [ ] 4.1 创建 next.config.js
- [ ] 4.2 更新 package.json scripts (dev, build, start, lint)
- [ ] 4.3 处理环境变量（NEXT_PUBLIC_ 前缀）

## 5. 迁移组件和服务

- [ ] 5.1 确保 components/ 目录正确引用
- [ ] 5.2 确保 services/geminiService.ts 正确工作
- [ ] 5.3 确保 types.ts 和 constants.ts 正确引用

## 6. 测试和部署

- [ ] 6.1 运行 npm run dev 测试开发环境
- [ ] 6.2 运行 npm run build 测试构建
- [ ] 6.3 修复任何兼容性问题
- [ ] 6.4 提交更改并推送到 GitHub
- [ ] 6.5 验证 Vercel 部署成功

## 7. 清理

- [ ] 7.1 删除不再需要的 Vite 配置文件 (vite.config.ts)
- [ ] 7.2 删除 index.html（Next.js 不需要）
- [ ] 7.3 清理旧入口文件
