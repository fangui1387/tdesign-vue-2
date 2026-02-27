# td-chat Bug 修复 Spec

## Why
`packages/td-chat` 组件库存在多个与 `packages/pro-components` 不一致的 bug，需要修复以确保功能完整性和正确性。

## What Changes
- 修复 chat-input props 默认值不一致问题
- 修复 chat-sender props 默认值不一致问题
- 修复 chat-reasoning animation 属性多余问题
- 修复 chat-message status 类型不一致问题
- 修复 type.ts 类型定义问题
- 修复组件 emits 声明缺失问题

## Impact
- Affected specs: td-chat 组件库功能正确性
- Affected code:
  - `packages/td-chat/chat-input/chat-input-props.ts`
  - `packages/td-chat/chat-sender/chat-sender-props.ts`
  - `packages/td-chat/chat-reasoning/chat-reasoning-props.ts`
  - `packages/td-chat/chat-message/chat-message-props.ts`
  - `packages/td-chat/type.ts`

## MODIFIED Requirements

### Requirement: chat-input-props.ts 修复
| 属性 | 修改前 | 修改后 |
|------|--------|--------|
| autosize.default | `() => ({ minRows: 1, maxRows: 5 })` | `{ minRows: 1, maxRows: 5 }` |
| value.default | `''` | `undefined` |
| modelValue | 无 default | 添加 default: `undefined` |

### Requirement: chat-sender-props.ts 修复
| 属性 | 修改前 | 修改后 |
|------|--------|--------|
| modelValue | 无 default | 添加 default: `undefined` |

### Requirement: chat-reasoning-props.ts 修复
| 属性 | 修改前 | 修改后 |
|------|--------|--------|
| animation | 有默认值 'moving' | 移除此属性（pro-components 没有） |

### Requirement: type.ts 修复
- 修复 TdChatItemProps 的 status 类型

### Requirement: chat-message-props.ts 修复
- status 类型需与 type.ts 一致
