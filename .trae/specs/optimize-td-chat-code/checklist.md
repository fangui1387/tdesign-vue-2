# Checklist

## 关键 Bug 修复

- [x] chat-sender.tsx 中 toRefs 添加了 modelValue 解构
- [x] chat-sender.tsx 中 useVModel 调用包含 modelValue 参数

## Props 默认值统一

### chat-input-props.ts
- [x] value.default 已修改为 undefined
- [x] defaultValue 默认值已移除

### chat-thinking-props.ts
- [x] content.type 已修改为 [Object, Function]
- [x] maxHeight.type 已修改为 Number
- [x] animation.default 已修改为 'moving'

### chat-reasoning-props.ts
- [x] collapsePanelProps.default 已添加
- [x] header.type 已修改为 Function
- [x] headerRightContent.type 已修改为 Function

### chat-content-props.ts
- [x] role.validator 已移除空字符串 ''

## 验证

- [x] 所有修改文件无 TypeScript 错误
- [x] 组件功能与 pro-components 一致
