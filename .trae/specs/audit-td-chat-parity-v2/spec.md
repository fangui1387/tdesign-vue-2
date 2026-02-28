# td-chat 与 pro-components 一致性审计 - 产品需求文档

## Overview
- **Summary**: 对 `td-chat` (Vue 2.7.16) 组件库与 `pro-components/chat` (Vue 3) 进行全面审计，找出所有需要完善的地方，确保两者实现完全一致。
- **Purpose**: 确保 td-chat 作为 Vue 2.7 版本的组件库，其功能、组件、示例、测试等方面与 pro-components/chat 保持完全一致，为用户提供一致的 API 和使用体验。
- **Target Users**: td-chat 组件库的开发者和维护者

## Goals
- 确保所有组件的 API 和功能与 pro-components/chat 完全一致
- 补齐缺失的示例文件
- 补齐缺失的测试文件
- 确保代码风格和注释的一致性
- 确保 props 定义的一致性

## Non-Goals (Out of Scope)
- 不涉及 Vue 2 与 Vue 3 底层 API 差异的修改（如 `tdesign-vue` vs `tdesign-vue-next`）
- 不涉及构建脚本和打包配置的修改
- 不涉及样式文件的修改

## Background & Context
- `td-chat` 是基于 Vue 2.7.16 版本实现的组件库
- `pro-components/chat` 是基于 Vue 3 版本实现的组件库
- 两者需要保持功能和 API 的一致性
- 主要差异来源于 Vue 2 与 Vue 3 的 API 差异（如 `tdesign-vue` vs `tdesign-vue-next`，`tdesign-icons-vue` vs `tdesign-icons-vue-next`）

## Functional Requirements
- **FR-1**: 补齐 `chat-sender/_example/chat-sender.vue` 示例文件
- **FR-2**: 补齐 `chat-reasoning/_example/mock-data/` 目录及其测试数据文件
- **FR-3**: 补齐 `chat-list/_example/chat-drawer.vue` 示例文件
- **FR-4**: 补齐 `chat-list/_example/chat-footer-slot.vue` 示例文件
- **FR-5**: 补齐 `chat-list/_example/chat-with-message.vue` 示例文件
- **FR-6**: 补齐 `chat-markdown/_example/footnote.vue` 示例文件
- **FR-7**: 补齐 `chatbot/_example/` 目录下所有缺失的示例文件（agent.vue, agui.vue, chatbot-base.vue, code.vue, custom.vue, docs.vue, hookComponent.vue, image.vue, initial-messages.vue, instance-methods.vue, quick-start.vue, role-message-config.vue, sender-config.vue, service-config.vue）
- **FR-8**: 补齐 `chatbot/_example/components/` 目录及其文件（Login.vue, Toolcall.vue）
- **FR-9**: 补齐 `chat-engine/_example/` 目录下所有缺失的示例文件（agui-basic.vue, agui-comprehensive.vue, agui-toolcall.vue, comprehensive.vue, custom-content.vue, initial-messages.vue, instance-methods.vue）
- **FR-10**: 补齐 `chat-engine/_example/components/` 目录及其文件（ImageGenProgress.vue, ImageGenStart.vue, PlanningSteps.vue, ProgressPanel.vue, UserPreferencesForm.vue, WeatherCard.vue）
- **FR-11**: 补齐所有缺失的测试文件（`__tests__/` 目录）
- **FR-12**: 同步 `chat-list/props.ts` 中的注释差异
- **FR-13**: 同步 `chat-sender.tsx` 中 Fragment 的使用差异

## Non-Functional Requirements
- **NFR-1**: 所有新增代码必须兼容 Vue 2.7.16
- **NFR-2**: 所有新增示例必须能够正常运行
- **NFR-3**: 代码风格应与现有 td-chat 代码保持一致

## Constraints
- **Technical**: 必须使用 Vue 2.7.16 兼容的 API
- **Dependencies**: 依赖 `tdesign-vue` 和 `tdesign-icons-vue`（而非 Vue 3 版本）

## Assumptions
- pro-components/chat 中的示例代码可以直接转换为 Vue 2 兼容版本
- 测试框架和测试工具在两个版本中保持一致

## Acceptance Criteria

### AC-1: 示例文件完整性
- **Given**: td-chat 和 pro-components/chat 两个组件库
- **When**: 比较两个库的 `_example` 目录结构
- **Then**: td-chat 的示例文件与 pro-components/chat 完全一致
- **Verification**: `programmatic`

### AC-2: 测试文件完整性
- **Given**: td-chat 和 pro-components/chat 两个组件库
- **When**: 比较两个库的 `__tests__` 目录结构
- **Then**: td-chat 的测试文件与 pro-components/chat 完全一致
- **Verification**: `programmatic`

### AC-3: Props 定义一致性
- **Given**: td-chat 和 pro-components/chat 两个组件库
- **When**: 比较两个库的 props 定义文件
- **Then**: props 定义（包括注释）完全一致
- **Verification**: `programmatic`

### AC-4: 代码功能一致性
- **Given**: td-chat 和 pro-components/chat 两个组件库
- **When**: 比较两个库的核心组件代码
- **Then**: 功能逻辑完全一致，仅存在 Vue 2/Vue 3 API 差异
- **Verification**: `human-judgment`

## Open Questions
- [ ] 是否需要为 Vue 2 版本添加 Fragment polyfill？
- [ ] 测试框架是否需要特殊配置以支持 Vue 2.7？
