- [x] 测试环境配置完成，可以运行测试命令
- [x] attachments 组件单元测试文件已创建
- [x] chat-actionbar 组件单元测试文件已创建
- [x] chat-content 组件单元测试文件已创建
- [x] chat-engine hooks 和组件单元测试覆盖率达到 100% ✅ 13 tests passed
- [x] chat-input 组件单元测试文件已创建
- [x] chat-item 组件单元测试文件已创建
- [x] chat-list 组件单元测试文件已创建
- [x] chat-loading 组件单元测试文件已创建
- [x] chat-markdown 组件单元测试文件已创建
- [x] chat-message 组件单元测试文件已创建
- [x] chat-reasoning 组件单元测试文件已创建
- [x] chat-sender 组件单元测试文件已创建
- [x] chat-thinking 组件单元测试文件已创建
- [x] chatbot 组件单元测试文件已创建
- [x] utils 工具函数单元测试覆盖率达到 100% ✅ 11 tests passed
- [ ] 整体测试覆盖率达到 100% (需要解决 Vue 2/3 混合环境问题)

## 已知问题

由于 monorepo 中同时存在 Vue 2.7 (td-chat) 和 Vue 3 (tdesign-vue-next)，测试运行时会出现 Vue 版本冲突。需要以下解决方案之一：

1. 在独立环境中运行 td-chat 测试
2. 将 td-chat 迁移到 Vue 3
3. 使用独立的测试项目隔离 Vue 版本
