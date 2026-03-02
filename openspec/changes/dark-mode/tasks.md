## 1. 主题系统配置

- [x] 1.1 修改 tailwind.config.mjs，启用 darkMode: 'class'
- [x] 1.2 修改 app/globals.css，添加深色主题 CSS 变量

## 2. ThemeProvider 实现

- [x] 2.1 创建 app/components/ThemeProvider.tsx（带 'use client' 指令）
- [x] 2.2 实现主题状态管理和 localStorage 持久化

## 3. 主题切换组件

- [x] 3.1 创建 app/components/ThemeToggle.tsx
- [x] 3.2 在 Header 中添加 ThemeToggle 组件

## 4. 组件深色适配

- [x] 4.1 适配 page.tsx Header 和 Footer
- [x] 4.2 适配 BaziForm 组件
- [x] 4.3 适配 LifeKLineChart 图表组件
- [x] 4.4 适配 AnalysisResult 组件

## 5. 测试验证

- [x] 5.1 测试主题切换功能
- [x] 5.2 测试页面刷新后主题保持
- [x] 5.3 测试所有组件深色样式正确
