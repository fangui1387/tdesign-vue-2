# Fix Vue2 Demo Runtime Errors V2 Spec

## Why
Vue2 Demo 在运行时出现大量 Vue 警告和错误，包括：
1. `onMounted/onUnmounted is called when there is no active component instance` - 生命周期钩子调用问题
2. `The setup binding property "xxx" is already declared` - setup 属性重复声明
3. `inject() can only be used inside setup() or functional components` - inject API 使用错误
4. `provide() can only be used inside setup()` - provide API 使用错误
5. `Cannot read properties of null (reading '$options')` - 组件实例问题
6. `Cannot read properties of null (reading 'setupContext')` - setup 上下文问题

这些错误导致聊天界面无法正常显示和工作，页面呈现空白状态。

## Root Cause Analysis

### 问题 1: Vue 2.7 Composition API 兼容性问题
- `@jump-mp/td-chat` 库使用了 Vue 2.7 的 Composition API (`provide`, `inject`, `onMounted`, `onUnmounted`)
- 但在某些情况下，Vue 2.7 无法正确识别当前活动的组件实例
- 这可能是由于 `omi-vueify` 转换的 Web Components 与 Vue 2.7 的兼容性问题

### 问题 2: 依赖版本不匹配
- `@jump-mp/td-chat` 版本 0.1.19 可能存在与当前 Vue 2.7.16 的兼容性问题
- `tdesign-web-components` 作为底层依赖，可能使用了不兼容的 API

### 问题 3: Vite 配置问题
- 当前的 Vite 配置可能没有正确处理 Vue 2.7 的 JSX 和 Composition API
- 缺少必要的插件或配置来支持 `@jump-mp/td-chat` 的运行

## What Changes

### 修复 1: 更新 Vite 配置
- 添加 `@vitejs/plugin-vue2-jsx` 插件支持 JSX
- 配置 optimizeDeps 排除问题依赖
- 添加 alias 配置解决模块解析问题

### 修复 2: 修复依赖版本
- 检查并更新 `tdesign-vue` 到兼容 Vue 2.7 的版本
- 确保 `@jump-mp/td-chat` 版本兼容
- 可能需要降级或升级某些依赖

### 修复 3: 调整组件使用方式
- 修改 demo.vue 中组件的使用方式
- 避免使用可能导致兼容性问题的特性
- 添加错误边界处理

## Impact
- Affected code: `packages/vue2-demo/vite.config.ts`
- Affected code: `packages/vue2-demo/package.json`
- Affected code: `packages/vue2-demo/src/demo.vue`

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

### Requirement: Component Rendering
The system SHALL render the chat interface correctly.

#### Scenario: Chat interface displays
- **WHEN** opening the demo page
- **THEN** the chat list and sender components are visible and functional

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
