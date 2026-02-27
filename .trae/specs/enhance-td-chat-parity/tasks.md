# Tasks

## 阶段一：Props 定义修复

### Task 1: 修复 chat-input-props.ts
- [x] SubTask 1.1: 添加 modelValue 属性
- [x] SubTask 1.2: 修改 defaultValue 类型为 String | Number
- [x] SubTask 1.3: 修改 value 类型为 String | Number
- [x] SubTask 1.4: 修改 suffixIcon 类型为 Function

### Task 2: 修复 chat-sender-props.ts
- [x] SubTask 2.1: 添加 modelValue 属性

### Task 3: 修复 chat-message-props.ts
- [x] SubTask 3.1: 为 animation 添加 circle 选项
- [x] SubTask 3.2: 添加 variant 属性
- [x] SubTask 3.3: 添加 message 属性
- [x] SubTask 3.4: 添加 chatContentProps 属性
- [x] SubTask 3.5: 添加 status 属性
- [x] SubTask 3.6: 为 role 添加 validator

### Task 4: 修复 chat-reasoning-props.ts
- [x] SubTask 4.1: 修改 collapsed 默认值为 false
- [x] SubTask 4.2: 添加 modelValue 属性
- [x] SubTask 4.3: 添加 defaultCollapsed 属性
- [x] SubTask 4.4: 修改 expandIcon 类型为 Function
- [x] SubTask 4.5: 为 onExpandChange 添加默认空函数

### Task 5: 修复 chat-thinking-props.ts
- [x] SubTask 5.1: 移除 thinking 属性
- [x] SubTask 5.2: 修改 status 为 pending/complete/stop/error
- [x] SubTask 5.3: 添加 layout 属性
- [x] SubTask 5.4: 添加 maxHeight 属性
- [x] SubTask 5.5: 添加 animation 属性
- [x] SubTask 5.6: 添加 collapsed 属性

### Task 6: 修复 chat-list/props.ts
- [x] SubTask 6.1: 移除 data.default 默认值
- [x] SubTask 6.2: 为 defaultScrollTo 添加 validator
- [x] SubTask 6.3: 为 animation 添加 validator
- [x] SubTask 6.4: 为 layout 添加 validator
- [x] SubTask 6.5: 修改 reverse 默认值为 false

### Task 7: 修复 chat-content-props.ts
- [x] SubTask 7.1: 修改 markdownProps.default.engine 为 cherry-markdown
- [x] SubTask 7.2: 为 role 添加 validator

### Task 8: 修复 chat-loading/index.ts
- [x] SubTask 8.1: 移除 chatLoadingProps 导出

## 阶段二：类型定义更新

### Task 9: 更新 type.ts
- [x] SubTask 9.1: 更新 TdChatInputProps 添加 modelValue
- [x] SubTask 9.2: 更新 TdChatSenderProps 添加 modelValue
- [x] SubTask 9.3: 更新 TdChatReasoningProps 添加 modelValue/defaultCollapsed
- [x] SubTask 9.4: 新增 TdChatThinkingProps 类型
- [x] SubTask 9.5: 更新 TdChatItemProps 添加 message/chatContentProps
- [x] SubTask 9.6: 导出新增类型

## 阶段三：_usage 目录修复

### Task 10: 修复 chat-thinking/_usage/props.json
- [x] SubTask 10.1: 为 animation 添加 gradient 选项

## 阶段四：_example 示例文件补充（待处理）

### Task 11: 补充 attachments 示例
- [ ] SubTask 11.1: 创建 attachments-scrollX.vue
- [ ] SubTask 11.2: 创建 attachments-scrollY.vue

### Task 12: 补充 chat-content 示例
- [ ] SubTask 12.1: 创建 chat-content-text-message.vue

### Task 13: 补充 chat-engine 示例
- [ ] SubTask 13.1: 创建 agui-basic.vue
- [ ] SubTask 13.2: 创建 agui-comprehensive.vue
- [ ] SubTask 13.3: 创建 agui-toolcall.vue
- [ ] SubTask 13.4: 创建 comprehensive.vue
- [ ] SubTask 13.5: 创建 custom-content.vue
- [ ] SubTask 13.6: 创建 initial-messages.vue
- [ ] SubTask 13.7: 创建 instance-methods.vue

### Task 14: 补充 chat-input 示例
- [ ] SubTask 14.1: 创建 chat-input-slot.vue

### Task 15: 补充 chat-item 示例
- [ ] SubTask 15.1: 创建 chat-avatar-name.vue
- [ ] SubTask 15.2: 创建 change-model-message.vue
- [ ] SubTask 15.3: 创建 chat-item-slot.vue
- [ ] SubTask 15.4: 创建 error-message.vue

### Task 16: 补充 chat-list 示例
- [ ] SubTask 16.1: 创建 chat-drag.vue
- [ ] SubTask 16.2: 创建 chat-drawer.vue
- [ ] SubTask 16.3: 创建 chat-footer-slot.vue
- [ ] SubTask 16.4: 创建 chat-with-message.vue

### Task 17: 补充 chat-loading 示例
- [ ] SubTask 17.1: 创建 chat-loading-text.vue

### Task 18: 补充 chat-markdown 示例
- [ ] SubTask 18.1: 创建 event.vue
- [ ] SubTask 18.2: 创建 footnote.vue
- [ ] SubTask 18.3: 创建 plugin.vue
- [ ] SubTask 18.4: 创建 theme.vue

### Task 19: 补充 chat-message 示例
- [ ] SubTask 19.1: 创建 action.vue
- [ ] SubTask 19.2: 创建 configure.vue
- [ ] SubTask 19.3: 创建 content.vue
- [ ] SubTask 19.4: 创建 custom.vue
- [ ] SubTask 19.5: 创建 status.vue

### Task 20: 补充 chat-reasoning 示例
- [ ] SubTask 20.1: 创建 reasoning-custom-slot.vue
- [ ] SubTask 20.2: 创建 reasoning-custom.vue
- [ ] SubTask 20.3: 创建 reasoning-drag.vue
- [ ] SubTask 20.4: 创建 reasoning-drawer.vue
- [ ] SubTask 20.5: 创建 reasoning-style.vue

### Task 21: 补充 chat-sender 示例
- [ ] SubTask 21.1: 创建 chat-sender-attachments.vue
- [ ] SubTask 21.2: 创建 chat-sender-mix.vue
- [ ] SubTask 21.3: 创建 chat-sender-slot.vue

### Task 22: 补充 chat-thinking 示例
- [ ] SubTask 22.1: 创建 think-style.vue

### Task 23: 补充 chatbot 示例
- [ ] SubTask 23.1: 创建 agent.vue
- [ ] SubTask 23.2: 创建 agui.vue
- [ ] SubTask 23.3: 创建 chatbot-base.vue
- [ ] SubTask 23.4: 创建 code.vue
- [ ] SubTask 23.5: 创建 custom.vue
- [ ] SubTask 23.6: 创建 docs.vue
- [ ] SubTask 23.7: 创建 hookComponent.vue
- [ ] SubTask 23.8: 创建 image.vue
- [ ] SubTask 23.9: 创建 initial-messages.vue
- [ ] SubTask 23.10: 创建 instance-methods.vue
- [ ] SubTask 23.11: 创建 quick-start.vue
- [ ] SubTask 23.12: 创建 role-message-config.vue
- [ ] SubTask 23.13: 创建 sender-config.vue
- [ ] SubTask 23.14: 创建 service-config.vue

### Task 24: 补充 chat-actionbar 示例
- [ ] SubTask 24.1: 创建 comment-validation-test.vue

# Task Dependencies
- [Task 1-8] 已完成（Props 定义修改）
- [Task 9] 已完成（类型定义更新）
- [Task 10] 已完成（_usage 目录修复）
- [Task 11-24] 待处理（示例文件补充）
