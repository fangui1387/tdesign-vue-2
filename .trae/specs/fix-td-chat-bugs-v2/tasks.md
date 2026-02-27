# Tasks

## 阶段一：修复 chat-input-props.ts 默认值

### Task 1: 修复 chat-input-props.ts
- [ ] SubTask 1.1: 修复 autosize 默认值为对象而非函数
- [ ] SubTask 1.2: 修复 value 默认值为 undefined 而非空字符串
- [ ] SubTask 1.3: 修复 modelValue 添加默认值 undefined

## 阶段二：修复 chat-sender-props.ts 默认值

### Task 2: 修复 chat-sender-props.ts
- [ ] SubTask 2.1: 修复 modelValue 添加默认值 undefined

## 阶段三：修复 chat-reasoning-props.ts 多余属性

### Task 3: 修复 chat-reasoning-props.ts
- [ ] SubTask 3.1: 移除 animation 属性（pro-components 没有此属性）

## 阶段四：修复 type.ts 类型定义

### Task 4: 修复 type.ts
- [ ] SubTask 4.1: 修复 TdChatItemProps 的 status 类型

## 阶段五：修复 chat-message-props.ts 类型

### Task 5: 修复 chat-message-props.ts
- [ ] SubTask 5.1: 确保 status 类型与 type.ts 一致

# Task Dependencies
- Task 1-5 可以并行执行，无依赖关系
