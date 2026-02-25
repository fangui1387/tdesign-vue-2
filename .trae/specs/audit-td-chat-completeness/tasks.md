# Tasks

## 阶段一：vue2-demo 配置修复
- [x] Task 1: 修复 vue2-demo/index.html 引用错误
  - [x] SubTask 1.1: 将 `/src/main.js` 改为 `/src/main.ts`

- [x] Task 2: 修复 vue2-demo/README.md 内容错误
  - [x] SubTask 2.1: 将标题改为 "tdesign-vue2-demo"
  - [x] SubTask 2.2: 更新文档描述为 Vue 2.7.16 环境
  - [x] SubTask 2.3: 更新 IDE 配置建议（推荐 Vetur 而非 Volar）
  - [x] SubTask 2.4: 更新 TDesign 相关描述为 tdesign-vue

## 阶段二：td-chat 示例文件补充
- [x] Task 3: 为 td-chat 添加示例文件目录结构
  - [x] SubTask 3.1: 创建 chat-sender/_example/ 目录
  - [x] SubTask 3.2: 创建 chat-input/_example/ 目录
  - [x] SubTask 3.3: 创建 chat-list/_example/ 目录
  - [x] SubTask 3.4: 创建 chat-item/_example/ 目录
  - [x] SubTask 3.5: 创建 chat-actionbar/_example/ 目录
  - [x] SubTask 3.6: 创建 chat-content/_example/ 目录
  - [x] SubTask 3.7: 创建 chat-reasoning/_example/ 目录
  - [x] SubTask 3.8: 创建 chat-loading/_example/ 目录
  - [x] SubTask 3.9: 创建 chat-thinking/_example/ 目录
  - [x] SubTask 3.10: 创建 chat-message/_example/ 目录
  - [x] SubTask 3.11: 创建 chat-markdown/_example/ 目录
  - [x] SubTask 3.12: 创建 chatbot/_example/ 目录
  - [x] SubTask 3.13: 创建 chat-engine/_example/ 目录
  - [x] SubTask 3.14: 创建 attachments/_example/ 目录

- [x] Task 4: 为每个组件创建基础示例文件（从 pro-components 转换为 Vue 2 语法）
  - [x] SubTask 4.1: chat-sender 示例文件
  - [x] SubTask 4.2: chat-input 示例文件
  - [x] SubTask 4.3: chat-list 示例文件
  - [x] SubTask 4.4: chat-item 示例文件
  - [x] SubTask 4.5: chat-actionbar 示例文件
  - [x] SubTask 4.6: chat-content 示例文件
  - [x] SubTask 4.7: chat-reasoning 示例文件
  - [x] SubTask 4.8: chat-loading 示例文件
  - [x] SubTask 4.9: chat-thinking 示例文件
  - [x] SubTask 4.10: chat-message 示例文件
  - [x] SubTask 4.11: chat-markdown 示例文件
  - [x] SubTask 4.12: chatbot 示例文件
  - [x] SubTask 4.13: chat-engine 示例文件
  - [x] SubTask 4.14: attachments 示例文件

## 阶段三：td-chat 文档补充
- [x] Task 5: 为 td-chat 添加组件文档
  - [x] SubTask 5.1: 创建 chat-sender/chat-sender.md
  - [x] SubTask 5.2: 创建 chat-input/chat-input.md
  - [x] SubTask 5.3: 创建 chat-list/chat-list.md
  - [x] SubTask 5.4: 创建 chat-item/chat-item.md
  - [x] SubTask 5.5: 创建 chat-actionbar/chat-actionbar.md
  - [x] SubTask 5.6: 创建 chat-content/chat-content.md
  - [x] SubTask 5.7: 创建 chat-reasoning/chat-reasoning.md
  - [x] SubTask 5.8: 创建 chat-loading/chat-loading.md
  - [x] SubTask 5.9: 创建 chat-thinking/chat-thinking.md
  - [x] SubTask 5.10: 创建 chat-message/chat-message.md
  - [x] SubTask 5.11: 创建 chat-markdown/chat-markdown.md
  - [x] SubTask 5.12: 创建 chatbot/chatbot.md
  - [x] SubTask 5.13: 创建 chat-engine/chat-engine.md
  - [x] SubTask 5.14: 创建 attachments/attachments.md

## 阶段四：构建配置优化
- [x] Task 6: 优化 td-chat 构建流程
  - [x] SubTask 6.1: 修改 internal/builds/package.json 中的 build:td-chat 脚本
  - [x] SubTask 6.2: 检查是否已安装依赖，避免重复安装
  - [x] SubTask 6.3: 使用 td-chat 目录下的独立构建脚本

## 阶段五：index-lib.ts 补充
- [x] Task 7: 补充 index-lib.ts 缺失的导出
  - [x] SubTask 7.1: 添加 AGUIAdapter 导出
  - [x] SubTask 7.2: 添加 getMessageContentForCopy 导出
  - [x] SubTask 7.3: 添加 isAIMessage 导出
  - [x] SubTask 7.4: 添加 isToolCallContent 导出
  - [x] SubTask 7.5: 添加相关类型导出

# Task Dependencies
- [Task 4] depends on [Task 3]
- [Task 5] depends on [Task 3]
- [Task 6] 独立执行
- [Task 7] 独立执行
