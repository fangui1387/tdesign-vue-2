# Tasks

- [x] Task 1: 修复 type.ts 类型导出问题
  - [x] SubTask 1.1: 修复 TNode 导出
  - [x] SubTask 1.2: 修复 CollapsePanelProps 名称（改为 TdCollapsePanelProps）

- [x] Task 2: 修复 PKG_VERSION 全局变量声明
  - [x] SubTask 2.1: 创建 global.d.ts 声明文件
  - [x] SubTask 2.2: 更新 tsconfig.json 包含声明文件

- [x] Task 3: 修复 JSX 类型兼容性问题
  - [x] SubTask 3.1: 添加 jsxFactory 和 jsxFragmentFactory 配置
  - [x] SubTask 3.2: 添加 types: ["vue"] 配置

- [x] Task 4: 修复 chatbot-props.ts 类型问题
  - [x] SubTask 4.1: 修复 TNode 导入方式
  - [x] SubTask 4.2: 修复 TdChatMessageConfig 类型定义

- [x] Task 5: 验证修复
  - [x] SubTask 5.1: 执行 TypeScript 编译验证
  - [x] SubTask 5.2: 编译成功（exit code 0）

# Task Dependencies
- Task 1-4 可以并行执行
- Task 5 依赖 Task 1-4 完成

# Notes
- TypeScript 编译成功（exit code 0）
- 仍存在 tdesign-icons-vue 与 Vue 2.7 JSX 类型兼容性警告，这是类型定义层面的问题，不影响运行时功能
- 这些警告源于 tdesign-icons-vue 的图标组件类型定义与 Vue 2.7 的 JSX 类型系统不完全兼容
