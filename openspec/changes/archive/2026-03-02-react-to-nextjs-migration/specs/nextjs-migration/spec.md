## ADDED Requirements

### Requirement: Next.js 迁移完成
项目 SHALL 从 React + Vite 成功迁移到 Next.js App Router，迁移后的应用 SHALL 保持原有功能不变。

#### Scenario: 开发环境正常运行
- **WHEN** 执行 `npm run dev`
- **THEN** Next.js 开发服务器启动，应用可在 http://localhost:3000 访问

#### Scenario: 生产构建成功
- **WHEN** 执行 `npm run build`
- **THEN** Next.js 构建成功，生成 .next 目录

#### Scenario: 首页渲染正确
- **WHEN** 访问根路径 `/`
- **THEN** 显示与原 React 应用相同的八字输入表单

#### Scenario: AI 分析功能正常
- **WHEN** 提交八字信息进行分析
- **THEN** 调用 geminiService 并正确显示分析结果

#### Scenario: K线图展示正常
- **WHEN** 获得分析结果后
- **THEN** LifeKLineChart 组件正确渲染人生流年K线图

#### Scenario: Vercel 部署成功
- **WHEN** 推送到 GitHub main 分支
- **THEN** Vercel 自动部署，网站可访问

### Requirement: 环境变量兼容
项目 SHALL 使用 Next.js 标准方式加载环境变量，需要将 `VITE_` 前缀改为 `NEXT_PUBLIC_` 前缀。

#### Scenario: 环境变量加载（客户端）
- **WHEN** 应用启动
- **THEN** 环境变量通过 `NEXT_PUBLIC_` 前缀正确读取

#### Scenario: 环境变量命名迁移
- **WHEN** 检查 .env 文件
- **THEN** 使用 `NEXT_PUBLIC_` 前缀而非 `VITE_`

### Requirement: Tailwind CSS 兼容
项目 SHALL 继续使用 Tailwind CSS，通过 PostCSS 本地配置处理，而非 CDN。

#### Scenario: Tailwind 配置
- **WHEN** 运行 `npm run dev`
- **THEN** PostCSS 正确加载 Tailwind 样式

#### Scenario: 样式渲染
- **WHEN** 访问页面
- **THEN** Tailwind 样式正确应用，页面样式与原项目一致

### Requirement: SSR 兼容性
使用 recharts 的图表组件 SHALL 支持 Next.js 客户端渲染。

#### Scenario: 图表组件渲染
- **WHEN** LifeKLineChart 组件渲染
- **THEN** 组件正确显示，无 SSR 报错

#### Scenario: 动态导入图表
- **WHEN** 页面加载
- **THEN** 图表组件使用动态导入或 'use client' 避免服务端渲染

### Requirement: 组件兼容性
现有 React 组件 SHALL 在 Next.js 环境中正常工作。

#### Scenario: 组件渲染
- **WHEN** 各组件渲染时
- **THEN** BaziForm, AnalysisResult, LifeKLineChart, ImportDataMode 组件正常显示
