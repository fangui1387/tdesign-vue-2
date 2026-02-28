# td-chat chat-list.tsx props 未定义错误修复 Spec

## Why
`packages/td-chat/chat-list/chat-list.tsx` 文件中使用了 `props` 变量，但未导入，导致运行时报错 `ReferenceError: props is not defined`。

## What Changes
- 在 `chat-list.tsx` 文件中添加缺失的 `import props from './props';` 导入语句

## Impact
- Affected specs: td-chat 组件库功能正确性
- Affected code:
  - `packages/td-chat/chat-list/chat-list.tsx`

## MODIFIED Requirements

### Requirement: chat-list.tsx 导入修复
在文件顶部的导入区域添加：
```typescript
import props from './props';
```

## ADDED Requirements

### Requirement: chat-list.tsx 必须正确导入 props
系统必须确保 `chat-list.tsx` 正确导入 `props` 对象，以便 Vue 组件能够正确接收和处理属性。

#### Scenario: 组件正常运行
- **WHEN** 用户在 vue2-demo 中使用 td-chat 组件
- **THEN** 组件能够正常渲染，不会抛出 `props is not defined` 错误
