# 修复 TChatThinking 和 TChatReasoning 组件运行时错误

## Why
vue2-demo 运行时出现错误：
- `TypeError: Cannot read properties of null (reading '$createElement')` 在 TChatList 和 TChatSender 组件中
- `Failed to mount component: template or render function not defined` 在 TChatSender 组件中

这些错误是因为 TChatThinking 和 TChatReasoning 组件的 setup 函数返回的是渲染函数而不是对象，这在 Vue 2.7 中是不正确的。

## What Changes
- 修改 TChatThinking 组件：将 setup 函数改为返回对象，并添加 render 函数
- 修改 TChatReasoning 组件：将 setup 函数改为返回对象，并添加 render 函数
- 重新构建 td-chat 包
- 验证 vue2-demo 运行正常

## Impact
- 受影响的组件：TChatThinking, TChatReasoning
- 受影响的文件：
  - `packages/td-chat/chat-thinking/chat-thinking.tsx`
  - `packages/td-chat/chat-reasoning/chat-reasoning.tsx`

## ADDED Requirements
### Requirement: Vue 2.7 兼容性
组件必须使用 Vue 2.7 兼容的 Composition API 写法

#### Scenario: 组件渲染
- **WHEN** 组件被挂载
- **THEN** setup 函数返回对象，render 函数负责渲染

## MODIFIED Requirements
### Requirement: TChatThinking 组件
**修改前**：setup 函数返回箭头函数
**修改后**：setup 函数返回包含 `renderContent` 的对象，添加 `render` 函数

### Requirement: TChatReasoning 组件  
**修改前**：setup 函数返回 `renderContent` 函数
**修改后**：setup 函数返回包含 `renderContent` 的对象，添加 `render` 函数

## REMOVED Requirements
无
