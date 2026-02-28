# td-chat 组件库代码优化 Spec

## Why
`packages/td-chat` 是基于 Vue 2.7.16 版本实现的组件库，需要与 `packages/pro-components`（Vue 3 版本）功能完全一致。经过详细代码对比分析，发现多个组件存在代码实现差异、默认值不一致、类型定义差异等问题，需要进行优化修复。

## What Changes
- **td-chat**: 修复 chat-sender.tsx 中 useVModel 缺少 modelValue 参数的 bug
- **td-chat**: 统一 chat-input-props.ts 的默认值与 pro-components 一致
- **td-chat**: 统一 chat-thinking-props.ts 的类型定义和默认值
- **td-chat**: 补充 chat-reasoning-props.ts 缺失的 collapsePanelProps 默认值
- **td-chat**: 统一 chat-content-props.ts 的 role validator

## Impact
- Affected specs: td-chat 组件库功能正确性
- Affected code: 
  - `packages/td-chat/chat-sender/chat-sender.tsx`
  - `packages/td-chat/chat-input/chat-input-props.ts`
  - `packages/td-chat/chat-thinking/chat-thinking-props.ts`
  - `packages/td-chat/chat-reasoning/chat-reasoning-props.ts`
  - `packages/td-chat/chat-content/chat-content-props.ts`

## ADDED Requirements

### Requirement: useVModel 正确支持 v-model
td-chat 组件 SHALL 正确支持 Vue 2.7 的 v-model 语法。

#### Scenario: 用户使用 v-model 绑定 chat-sender
- **WHEN** 用户在 chat-sender 上使用 v-model
- **THEN** 组件应正确响应 modelValue 的变化

### Requirement: Props 默认值一致性
td-chat 组件 SHALL 与 pro-components 保持 props 默认值一致。

#### Scenario: 用户未指定 value 属性
- **WHEN** 用户使用 chat-input 但未指定 value
- **THEN** 组件应使用与 pro-components 一致的默认值

### Requirement: 类型定义一致性
td-chat 组件 SHALL 与 pro-components 保持类型定义一致。

## MODIFIED Requirements

### chat-sender.tsx 修改
| 位置 | 修改前 | 修改后 |
|------|--------|--------|
| useVModel 调用 | `useVModel(value, props.defaultValue, props.onChange)` | `useVModel(value, modelValue, props.defaultValue, props.onChange)` |

**说明**: 这是一个关键 bug，导致 v-model 无法正常工作。Vue 2.7 的 useVModel 需要传入 modelValue ref。

### chat-input-props.ts 修改
| 属性 | 修改前 | 修改后 |
|------|--------|--------|
| value.default | `''` | `undefined` |
| defaultValue.default | `''` | 移除默认值 |

**说明**: 与 pro-components 保持一致，避免默认值差异导致的行为不一致。

### chat-thinking-props.ts 修改
| 属性 | 修改前 | 修改后 |
|------|--------|--------|
| content.type | `[String, Function]` | `[Object, Function]` |
| maxHeight.type | `[String, Number]` | `Number` |
| animation.default | `'dots'` | `'moving'` |

**说明**: 与 pro-components 保持类型和默认值一致。

### chat-reasoning-props.ts 修改
| 属性 | 修改前 | 修改后 |
|------|--------|--------|
| collapsePanelProps.default | 无 | `() => ({ destroyOnCollapse: false })` |
| header.type | `[String, Function]` | `Function` |
| headerRightContent.type | `[String, Function]` | `Function` |

**说明**: 与 pro-components 保持一致。

### chat-content-props.ts 修改
| 属性 | 修改前 | 修改后 |
|------|--------|--------|
| role.validator | 包含 `''` | 移除 `''` |

**说明**: 与 pro-components 保持一致。

## REMOVED Requirements
无

## 详细差异分析

### 1. chat-sender.tsx 关键 bug
```typescript
// td-chat (错误)
const { value } = toRefs(props);
const [textValue, setInnerValue] = useVModel(value, props.defaultValue, props.onChange);

// pro-components (正确)
const { value, modelValue } = toRefs(props);
const [textValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
```

### 2. chat-input-props.ts 默认值差异
```typescript
// td-chat
value: { default: '' }
defaultValue: { default: '' }

// pro-components
value: { default: undefined }
defaultValue: {} // 无默认值
```

### 3. chat-thinking-props.ts 差异
```typescript
// td-chat
content: { type: [String, Function] }
maxHeight: { type: [String, Number] }
animation: { default: 'dots' }

// pro-components
content: { type: [Object, Function] }
maxHeight: { type: Number }
animation: { default: 'moving' }
```

### 4. chat-reasoning-props.ts 差异
```typescript
// td-chat
collapsePanelProps: {} // 无默认值
header: { type: [String, Function] }
headerRightContent: { type: [String, Function] }

// pro-components
collapsePanelProps: { default: () => ({ destroyOnCollapse: false }) }
header: { type: Function }
headerRightContent: { type: Function }
```
