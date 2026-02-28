# Fix Vue2 Demo Runtime Errors Spec

## Why
Vue2 Demo 在运行时出现大量 Vue 警告和错误，包括：
1. `inject() can only be used inside setup()` - inject/provide API 使用错误
2. `The setup binding property "xxx" is already declared` - setup 属性重复声明
3. `createElement() has been called outside of render function` - JSX 渲染问题
4. `Cannot read properties of null (reading '$options')` - 组件实例问题

这些错误导致聊天界面无法正常显示和工作。

## Root Cause Analysis

### 问题 1: JSX 转换问题
- `@jump-mp/td-chat` 使用 JSX 语法编写组件
- Vue 2.7 的 Vite 配置需要特殊的 JSX 插件支持
- 当前 vite.config.ts 只配置了 `@vitejs/plugin-vue2`，没有配置 JSX 支持

### 问题 2: Vue 2.7 Composition API 兼容性
- `tdesign-vue` 1.10.x 版本可能不完全兼容 Vue 2.7 的 Composition API
- `provide`/`inject` 在 Vue 2.7 中的实现与 Vue 3 有差异
- `tdesign-web-components` 的 Web Components 包装器可能存在兼容性问题

### 问题 3: 依赖版本冲突
- `@jump-mp/td-chat` 依赖 `tdesign-web-components`，这是一个 Web Components 库
- Web Components 和 Vue 2 的集成可能存在问题

## What Changes

### 修复 1: 更新 Vite 配置
- 添加 `@vitejs/plugin-vue2-jsx` 插件支持 JSX
- 配置 optimizeDeps 排除问题依赖

### 修复 2: 更新依赖版本
- 检查并更新 `tdesign-vue` 到兼容 Vue 2.7 的版本
- 确保 `@jump-mp/td-chat` 版本兼容

### 修复 3: 调整组件使用方式
- 如果必要，调整 demo.vue 中组件的使用方式
- 避免使用可能导致兼容性问题的特性

## Impact
- Affected code: `packages/vue2-demo/vite.config.ts`
- Affected code: `packages/vue2-demo/package.json`
- Affected code: `packages/vue2-demo/src/demo.vue` (可能需要调整)

## ADDED Requirements

### Requirement: JSX Support
The system SHALL configure Vite to properly handle JSX syntax in Vue 2.7.

#### Scenario: JSX components render correctly
- **WHEN** running `pnpm dev`
- **THEN** JSX-based components from `@jump-mp/td-chat` render without errors

### Requirement: Vue 2.7 Compatibility
The system SHALL ensure all dependencies are compatible with Vue 2.7.

#### Scenario: No Composition API errors
- **WHEN** using `provide`/`inject` in components
- **THEN** no "can only be used inside setup()" errors occur

## MODIFIED Requirements

### Requirement: Demo Functionality
The demo SHALL maintain all chat functionality after fixes:
- Message list display
- Message sending
- SSE streaming response
- ToolCall rendering
- Action bar (copy, like, regenerate)

## REMOVED Requirements
None
