# Checklist

## Props 定义修复

### chat-input-props.ts
- [x] modelValue 属性已添加
- [x] defaultValue 类型已修改为 String | Number
- [x] value 类型已修改为 String | Number
- [x] suffixIcon 类型已修改为 Function

### chat-sender-props.ts
- [x] modelValue 属性已添加

### chat-message-props.ts
- [x] animation 已添加 circle 选项
- [x] variant 属性已添加
- [x] message 属性已添加
- [x] chatContentProps 属性已添加
- [x] status 属性已添加
- [x] role 已添加 validator

### chat-reasoning-props.ts
- [x] collapsed 默认值已修改为 false
- [x] modelValue 属性已添加
- [x] defaultCollapsed 属性已添加
- [x] expandIcon 类型已修改为 Function
- [x] onExpandChange 已添加默认空函数

### chat-thinking-props.ts
- [x] thinking 属性已移除
- [x] status 已修改为 pending/complete/stop/error
- [x] layout 属性已添加
- [x] maxHeight 属性已添加
- [x] animation 属性已添加
- [x] collapsed 属性已添加

### chat-list/props.ts
- [x] data.default 默认值已移除
- [x] defaultScrollTo 已添加 validator
- [x] animation 已添加 validator
- [x] layout 已添加 validator
- [x] reverse 默认值已修改为 false

### chat-content-props.ts
- [x] markdownProps.default.engine 已修改为 cherry-markdown
- [x] role 已添加 validator

### chat-loading/index.ts
- [x] chatLoadingProps 导出已移除

## 类型定义更新

### type.ts
- [x] TdChatInputProps 已更新
- [x] TdChatSenderProps 已更新
- [x] TdChatReasoningProps 已更新
- [x] TdChatThinkingProps 已新增
- [x] TdChatItemProps 已更新
- [x] 类型已正确导出

## _usage 目录修复

### chat-thinking/_usage
- [x] props.json 中 animation 已添加 gradient 选项

## _example 示例文件补充

### attachments
- [ ] attachments-scrollX.vue 已创建
- [ ] attachments-scrollY.vue 已创建

### chat-content
- [ ] chat-content-text-message.vue 已创建

### chat-engine
- [ ] agui-basic.vue 已创建
- [ ] agui-comprehensive.vue 已创建
- [ ] agui-toolcall.vue 已创建
- [ ] comprehensive.vue 已创建
- [ ] custom-content.vue 已创建
- [ ] initial-messages.vue 已创建
- [ ] instance-methods.vue 已创建

### chat-input
- [ ] chat-input-slot.vue 已创建

### chat-item
- [ ] chat-avatar-name.vue 已创建
- [ ] change-model-message.vue 已创建
- [ ] chat-item-slot.vue 已创建
- [ ] error-message.vue 已创建

### chat-list
- [ ] chat-drag.vue 已创建
- [ ] chat-drawer.vue 已创建
- [ ] chat-footer-slot.vue 已创建
- [ ] chat-with-message.vue 已创建

### chat-loading
- [ ] chat-loading-text.vue 已创建

### chat-markdown
- [ ] event.vue 已创建
- [ ] footnote.vue 已创建
- [ ] plugin.vue 已创建
- [ ] theme.vue 已创建

### chat-message
- [ ] action.vue 已创建
- [ ] configure.vue 已创建
- [ ] content.vue 已创建
- [ ] custom.vue 已创建
- [ ] status.vue 已创建

### chat-reasoning
- [ ] reasoning-custom-slot.vue 已创建
- [ ] reasoning-custom.vue 已创建
- [ ] reasoning-drag.vue 已创建
- [ ] reasoning-drawer.vue 已创建
- [ ] reasoning-style.vue 已创建

### chat-sender
- [ ] chat-sender-attachments.vue 已创建
- [ ] chat-sender-mix.vue 已创建
- [ ] chat-sender-slot.vue 已创建

### chat-thinking
- [ ] think-style.vue 已创建

### chatbot
- [ ] agent.vue 已创建
- [ ] agui.vue 已创建
- [ ] chatbot-base.vue 已创建
- [ ] code.vue 已创建
- [ ] custom.vue 已创建
- [ ] docs.vue 已创建
- [ ] hookComponent.vue 已创建
- [ ] image.vue 已创建
- [ ] initial-messages.vue 已创建
- [ ] instance-methods.vue 已创建
- [ ] quick-start.vue 已创建
- [ ] role-message-config.vue 已创建
- [ ] sender-config.vue 已创建
- [ ] service-config.vue 已创建

### chat-actionbar
- [ ] comment-validation-test.vue 已创建
