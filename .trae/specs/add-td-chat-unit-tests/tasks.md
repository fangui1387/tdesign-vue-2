# Tasks

- [x] Task 1: 创建测试环境配置
  - [x] SubTask 1.1: 创建 packages/td-chat/test 目录结构
  - [x] SubTask 1.2: 创建 vitest.config.ts 配置文件
  - [x] SubTask 1.3: 创建 test/package.json 配置测试依赖
  - [x] SubTask 1.4: 创建测试设置文件 setup.ts

- [x] Task 2: 编写 attachments 组件单元测试
  - [x] SubTask 2.1: 测试 props 渲染 (items, removable, overflow, imageViewer)
  - [x] SubTask 2.2: 测试文件类型识别函数
  - [x] SubTask 2.3: 测试文件大小格式化函数
  - [x] SubTask 2.4: 测试事件 (remove, file-click)
  - [x] SubTask 2.5: 测试图片预览功能
  - [x] SubTask 2.6: 测试滚动按钮显示逻辑

- [x] Task 3: 编写 chat-actionbar 组件单元测试
  - [x] SubTask 3.1: 测试 props 渲染
  - [x] SubTask 3.2: 测试插槽功能

- [x] Task 4: 编写 chat-content 组件单元测试
  - [x] SubTask 4.1: 测试内容渲染
  - [x] SubTask 4.2: 测试 props 配置

- [x] Task 5: 编写 chat-engine 相关测试 ✅ 13 tests passed
  - [x] SubTask 5.1: 测试 useAgentState hook
  - [x] SubTask 5.2: 测试 useAgentToolcall hook
  - [x] SubTask 5.3: 测试 useChat hook
  - [x] SubTask 5.4: 测试 toolcall registry
  - [x] SubTask 5.5: 测试 toolcall hoc

- [x] Task 6: 编写 chat-input 组件单元测试
  - [x] SubTask 6.1: 测试输入渲染
  - [x] SubTask 6.2: 测试 props 配置
  - [x] SubTask 6.3: 测试事件触发

- [x] Task 7: 编写 chat-item 组件单元测试
  - [x] SubTask 7.1: 测试消息渲染
  - [x] SubTask 7.2: 测试头像和名称显示
  - [x] SubTask 7.3: 测试插槽功能

- [x] Task 8: 编写 chat-list 组件单元测试
  - [x] SubTask 8.1: 测试列表渲染
  - [x] SubTask 8.2: 测试滚动功能
  - [x] SubTask 8.3: 测试自动滚动逻辑
  - [x] SubTask 8.4: 测试清空历史功能
  - [x] SubTask 8.5: 测试 scrollToBottom 方法

- [x] Task 9: 编写 chat-loading 组件单元测试
  - [x] SubTask 9.1: 测试加载状态渲染
  - [x] SubTask 9.2: 测试 props 配置

- [x] Task 10: 编写 chat-markdown 组件单元测试
  - [x] SubTask 10.1: 测试 markdown 解析
  - [x] SubTask 10.2: 测试代码高亮
  - [x] SubTask 10.3: 测试 props 和事件

- [x] Task 11: 编写 chat-message 组件单元测试
  - [x] SubTask 11.1: 测试消息内容渲染
  - [x] SubTask 11.2: 测试状态显示
  - [x] SubTask 11.3: 测试操作按钮
  - [x] SubTask 11.4: 测试插槽功能

- [x] Task 12: 编写 chat-reasoning 组件单元测试
  - [x] SubTask 12.1: 测试推理内容渲染
  - [x] SubTask 12.2: 测试展开/收起功能
  - [x] SubTask 12.3: 测试 props 配置

- [x] Task 13: 编写 chat-sender 组件单元测试
  - [x] SubTask 13.1: 测试发送功能
  - [x] SubTask 13.2: 测试附件集成
  - [x] SubTask 13.3: 测试 props 和事件

- [x] Task 14: 编写 chat-thinking 组件单元测试
  - [x] SubTask 14.1: 测试思考状态渲染
  - [x] SubTask 14.2: 测试 props 配置

- [x] Task 15: 编写 chatbot 组件单元测试
  - [x] SubTask 15.1: 测试整体功能集成
  - [x] SubTask 15.2: 测试 props 配置

- [x] Task 16: 编写 utils 工具函数单元测试 ✅ 11 tests passed
  - [x] SubTask 16.1: 测试 hooks 工具函数
  - [x] SubTask 16.2: 测试通用工具函数

- [ ] Task 17: 解决 Vue 2/3 混合环境问题
  - [ ] SubTask 17.1: 配置独立的 Vue 2 测试环境
  - [ ] SubTask 17.2: 运行所有测试并验证覆盖率

# Task Dependencies
- Task 2-16 依赖 Task 1 (测试环境配置)
- Task 17 依赖 Task 2-16 (所有组件测试完成)

# Notes
由于 monorepo 中同时存在 Vue 2.7 (td-chat) 和 Vue 3 (tdesign-vue-next)，测试运行时会出现 Vue 版本冲突。测试文件已全部创建，但需要解决 Vue 版本冲突后才能正常运行所有测试。

当前通过的测试：
- chat-engine: 13 tests
- utils: 11 tests
