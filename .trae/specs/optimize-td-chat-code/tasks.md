# Tasks

## 阶段一：关键 Bug 修复

### Task 1: 修复 chat-sender.tsx useVModel 调用
- [x] SubTask 1.1: 在 toRefs 中添加 modelValue 解构
- [x] SubTask 1.2: 修改 useVModel 调用，添加 modelValue 参数
- **Priority**: P0
- **Depends On**: None
- **Description**: 修复 chat-sender 组件 v-model 无法正常工作的 bug

## 阶段二：Props 默认值统一

### Task 2: 修复 chat-input-props.ts 默认值
- [x] SubTask 2.1: 修改 value.default 为 undefined
- [x] SubTask 2.2: 移除 defaultValue 的默认值
- **Priority**: P1
- **Depends On**: None

### Task 3: 修复 chat-thinking-props.ts 类型和默认值
- [x] SubTask 3.1: 修改 content.type 为 [Object, Function]
- [x] SubTask 3.2: 修改 maxHeight.type 为 Number
- [x] SubTask 3.3: 修改 animation.default 为 'moving'
- **Priority**: P1
- **Depends On**: None

### Task 4: 修复 chat-reasoning-props.ts 类型和默认值
- [x] SubTask 4.1: 添加 collapsePanelProps 默认值
- [x] SubTask 4.2: 修改 header.type 为 Function
- [x] SubTask 4.3: 修改 headerRightContent.type 为 Function
- **Priority**: P1
- **Depends On**: None

### Task 5: 修复 chat-content-props.ts role validator
- [x] SubTask 5.1: 移除 role validator 中的空字符串 ''
- **Priority**: P2
- **Depends On**: None

## 阶段三：验证

### Task 6: 验证修改
- [x] SubTask 6.1: 检查所有修改后的文件无 TypeScript 错误
- [x] SubTask 6.2: 确认组件功能正常
- **Priority**: P0
- **Depends On**: Task 1-5

# Task Dependencies
- [Task 1] 关键 bug 修复，优先级最高
- [Task 2-5] Props 统一，可并行执行
- [Task 6] 验证任务，依赖 Task 1-5 完成
