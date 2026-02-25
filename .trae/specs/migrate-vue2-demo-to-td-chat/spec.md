# Vue2 Demo 迁移至 td-chat 组件库 Spec

## Why
当前 `packages/vue2-demo` 是基于 Vue 3 + `@tdesign-vue-next/chat` 的示例工程。为了验证 `packages/td-chat` (Vue 2.7 版本) 的可用性，需要将 demo 迁移为使用 Vue 2 + `td-chat` 的版本，并通过本地 file 方式引入组件库。

## What Changes
- **BREAKING**: 将 Vue 3 降级为 Vue 2.7
- **BREAKING**: 将 `tdesign-vue-next` 替换为 `tdesign-vue` (Vue 2 版本)
- **BREAKING**: 将 `@tdesign-vue-next/chat` 替换为本地 `td-chat` (file:../td-chat)
- 修改 `vite.config.ts` 以支持 Vue 2
- 重写组件代码：将 `<script setup>` 改为 Vue 2 兼容的 Options API 或传统 setup 函数
- 更新 `main.ts` 中的 Vue 实例创建方式
- 调整组件 API 调用以匹配 `td-chat` 的接口

## Impact
- Affected code: `packages/vue2-demo/*`
- Affected specs: 需要验证 td-chat 在真实项目中的可用性

## ADDED Requirements
### Requirement: Vue 2 环境配置
The system SHALL configure Vue 2.7 + Vite 环境支持。

#### Scenario: 成功运行 dev server
- **WHEN** 执行 `pnpm dev`
- **THEN** 项目成功启动，无编译错误

### Requirement: 本地引入 td-chat
The system SHALL 通过 file: 协议本地引入 td-chat 组件库。

#### Scenario: 成功引入组件
- **WHEN** 在 package.json 中使用 `"@tdesign/td-chat": "file:../td-chat"`
- **THEN** 可以正常导入并使用组件

### Requirement: 组件代码兼容性
The system SHALL 重写所有 Vue 3 语法为 Vue 2 兼容语法。

#### Scenario: 组件正常运行
- **WHEN** 页面加载 demo.vue
- **THEN** 所有组件正常渲染，功能完整

## MODIFIED Requirements
### Requirement: Demo 功能保持
The demo SHALL 保持原有的聊天功能：
- 消息列表展示
- 消息发送
- SSE 流式响应
- ToolCall 渲染
- 操作栏（复制、点赞、重新生成）

## REMOVED Requirements
### Requirement: Vue 3 特性
**Reason**: 降级到 Vue 2.7
**Migration**: 移除 `<script setup>`、Vue 3 Composition API 等特性
