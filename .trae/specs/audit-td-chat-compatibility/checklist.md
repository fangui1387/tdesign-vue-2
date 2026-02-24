# Checklist

## 文件结构完整性
- [x] chat-loading-props.ts 文件已创建并正确定义
- [x] 所有组件目录结构完整

## 类型定义正确性
- [x] type.ts 中的类型从 tdesign-vue 导入
- [x] 移除了 Vue 3 特有的 modelValue 类型定义
- [x] 所有 Props 类型定义完整

## useVModel 适配
- [x] chat-sender.tsx 的 useVModel 正确适配 Vue 2
- [x] chat-input.tsx 的 useVModel 正确适配 Vue 2
- [x] chat-reasoning.tsx 的 useVModel 正确适配 Vue 2

## 组件功能完整性
- [x] ChatActionbar 所有按钮功能正常
- [x] ChatContent Markdown 解析功能正常
- [x] ChatList 自动滚动功能正常
- [x] ChatList scrollToBottom 方法可用
- [x] ChatItem 角色样式切换正常
- [x] ChatItem reasoning 组件集成正常
- [x] ChatSender 发送/停止功能正常
- [x] ChatInput 输入功能正常
- [x] ChatReasoning 展开/折叠功能正常
- [x] ChatThinking 思考状态显示正常
- [x] ChatMessage 消息渲染正常
- [x] Chatbot 组件功能正常
- [x] Attachments 附件功能正常
- [x] ChatMarkdown Markdown 渲染正常
- [x] ChatLoading 加载动画正常

## Hooks 功能
- [x] useChat hook 功能正常
- [x] useAgentState hook 功能正常
- [x] useAgentToolcall hook 功能正常

## 入口文件
- [x] index.ts 所有组件正确导出
- [x] index.ts 类型定义正确导出
- [x] index.ts install 方法正确实现
- [x] index-lib.ts 内容正确

## 依赖导入
- [x] 所有组件从 tdesign-vue 导入
- [x] 所有图标从 tdesign-icons-vue 导入
- [x] hooks 从 @tdesign/shared-hooks 导入
