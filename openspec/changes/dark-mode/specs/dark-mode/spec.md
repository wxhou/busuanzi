## ADDED Requirements

### Requirement: 暗色主题切换
用户可以在浅色和深色主题之间切换，系统应记住用户偏好。

#### Scenario: 用户点击主题切换按钮
- **WHEN** 用户点击 Header 中的主题切换按钮
- **THEN** 页面主题在浅色和深色之间切换，按钮图标相应变化

#### Scenario: 用户刷新页面
- **WHEN** 用户刷新页面或重新访问
- **THEN** 系统应保持用户上次选择的主题

#### Scenario: 用户首次访问
- **WHEN** 用户首次访问且无保存的主题偏好
- **THEN** 系统应遵循操作系统的颜色偏好（OS 深色→应用深色，OS 浅色→应用浅色）

### Requirement: 主题持久化
用户选择的主题应保存在 localStorage 中。

#### Scenario: 用户选择深色主题
- **WHEN** 用户切换到深色主题
- **THEN** 主题偏好应保存到 localStorage

#### Scenario: 用户选择浅色主题
- **WHEN** 用户切换到浅色主题
- **THEN** 主题偏好应更新到 localStorage

### Requirement: 深色主题视觉
深色主题应采用适合命理应用的配色方案。

#### Scenario: 深色主题样式
- **WHEN** 用户选择深色主题
- **THEN** 背景色为深色（深蓝/墨灰），文字为浅色，金色作为强调色

### Requirement: 组件主题适配
所有 UI 组件应正确响应主题切换。

#### Scenario: 表单组件适配
- **WHEN** 主题切换时
- **THEN** BaziForm 组件的卡片、输入框、按钮等应正确切换配色

#### Scenario: 图表组件适配
- **WHEN** 主题切换时
- **THEN** K线图组件的背景、网格线、tooltip 等应适配深色主题
