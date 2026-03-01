# 修复 td-chat Vue 2 scopedSlots 兼容性规范

## Why
Vue 2 和 Vue 3 在 JSX 中使用 scoped slots 的方式不同。当前 td-chat 组件库在 Vue 2 环境下运行时报错：
- `TypeError: Cannot read properties of null (reading '$createElement')`
- `TypeError: Cannot read properties of undefined (reading 'value')`

这是因为 Vue 2.7 的 JSX 不支持直接在组件上使用 `scopedSlots` 属性传递 slots，需要使用 Vue 2 兼容的方式。

## What Changes
- 修改 `chat-list/chat-list.tsx` 中使用 scopedSlots 的方式
- 修改 `chat-reasoning/chat-reasoning.tsx` 中使用 scopedSlots 的方式
- 修改 `chat-thinking/chat-thinking.tsx` 中使用 scopedSlots 的方式

## Impact
- Affected specs: 无
- Affected code:
  - `packages/td-chat/chat-list/chat-list.tsx`
  - `packages/td-chat/chat-reasoning/chat-reasoning.tsx`
  - `packages/td-chat/chat-thinking/chat-thinking.tsx`

## ADDED Requirements

### Requirement: Vue 2 scoped slots 兼容性
组件 SHALL 在 Vue 2.7 环境下正确渲染 scoped slots。

#### Scenario: chat-list 组件
- **WHEN** 使用 chat-list 组件
- **THEN** 应正确渲染 actionbar、name、avatar、datetime、header、content 等 slots

#### Scenario: chat-reasoning 组件
- **WHEN** 使用 chat-reasoning 组件
- **THEN** 应正确渲染 CollapsePanel 的各种 slots

#### Scenario: chat-thinking 组件
- **WHEN** 使用 chat-thinking 组件
- **THEN** 应正确渲染 header 和 default slots

## Implementation Details

Vue 2 JSX 中传递 scoped slots 的正确方式：

**错误方式 (Vue 3 风格):**
```tsx
<Component scopedSlots={{ slotName: () => ... }} />
```

**正确方式 (Vue 2 兼容):**
```tsx
<Component {...{ scopedSlots: { slotName: () => ... } }} />
```

或者使用 Vue 2 的 `v-slots` 指令：
```tsx
<Component v-slots={{ slotName: () => ... }} />
```
