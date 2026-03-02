## Why

当前 BaziForm 是一个单页复杂表单，用户需要一次性填写所有字段（姓名、性别、四柱、大运等共9个字段），对新手用户门槛较高。拆分为分步向导可以降低输入负担，提升用户体验，同时每步骤可进行即时校验。

## What Changes

- 将 BaziForm 组件重构为分步向导模式
- 第一步：基础信息（姓名、性别）
- 第二步：四柱与大运信息（出生年份、年柱、月柱、日柱、时柱、起运年龄、第一大运）
- 添加步骤指示器显示当前进度
- 添加上一步/下一步导航按钮
- 添加步骤间的字段校验

## Capabilities

### New Capabilities
- `step-by-step-form`: 分步向导表单功能

### Modified Capabilities
- (无)

## Impact

- 修改 `app/components/BaziForm.tsx`
- 可能需要新增组件文件（如 StepIndicator）
- 无需新增依赖
