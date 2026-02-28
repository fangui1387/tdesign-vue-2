# td-chat 与 pro-components 一致性审计 - 实施计划

## [ ] Task 1: 补齐 chat-sender 示例文件
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 创建 `chat-sender/_example/chat-sender.vue` 文件
  - 参考 pro-components/chat 中的对应文件，适配为 Vue 2.7 兼容版本
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `programmatic` TR-1.1: 文件存在且内容非空
  - `programmatic` TR-1.2: 文件语法正确，无 TypeScript/ESLint 错误
- **Notes**: 需要将 `<script setup lang="ts">` 转换为 Vue 2.7 兼容的写法

## [ ] Task 2: 补齐 chat-reasoning mock-data 目录
- **Priority**: P1
- **Depends On**: None
- **Description**: 
  - 创建 `chat-reasoning/_example/mock-data/` 目录
  - 创建 `sseRequest-reasoning.ts` 和 `sseRequest.ts` 文件
  - 参考 pro-components/chat 中的对应文件
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `programmatic` TR-2.1: 目录和文件存在
  - `programmatic` TR-2.2: 文件导出的类/函数可正常使用
- **Notes**: 这些是测试用的 mock 数据，与 Vue 版本无关

## [ ] Task 3: 补齐 chat-list 示例文件
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 创建 `chat-list/_example/chat-drawer.vue`
  - 创建 `chat-list/_example/chat-footer-slot.vue`
  - 创建 `chat-list/_example/chat-with-message.vue`
  - 参考 pro-components/chat 中的对应文件，适配为 Vue 2.7 兼容版本
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `programmatic` TR-3.1: 所有文件存在且内容非空
  - `programmatic` TR-3.2: 文件语法正确，无 TypeScript/ESLint 错误
- **Notes**: 需要注意 Vue 2 与 Vue 3 在模板语法上的差异

## [ ] Task 4: 补齐 chat-markdown 示例文件
- **Priority**: P1
- **Depends On**: None
- **Description**: 
  - 创建 `chat-markdown/_example/footnote.vue`
  - 参考 pro-components/chat 中的对应文件，适配为 Vue 2.7 兼容版本
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `programmatic` TR-4.1: 文件存在且内容非空
  - `programmatic` TR-4.2: 文件语法正确，无 TypeScript/ESLint 错误
- **Notes**: 

## [ ] Task 5: 补齐 chatbot 示例文件（核心文件）
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 创建 `chatbot/_example/agent.vue`
  - 创建 `chatbot/_example/agui.vue`
  - 创建 `chatbot/_example/chatbot-base.vue`
  - 创建 `chatbot/_example/code.vue`
  - 创建 `chatbot/_example/custom.vue`
  - 创建 `chatbot/_example/docs.vue`
  - 参考 pro-components/chat 中的对应文件，适配为 Vue 2.7 兼容版本
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `programmatic` TR-5.1: 所有文件存在且内容非空
  - `programmatic` TR-5.2: 文件语法正确，无 TypeScript/ESLint 错误
- **Notes**: 这些是核心示例文件，优先级较高

## [ ] Task 6: 补齐 chatbot 示例文件（其他文件）
- **Priority**: P1
- **Depends On**: Task 5
- **Description**: 
  - 创建 `chatbot/_example/hookComponent.vue`
  - 创建 `chatbot/_example/image.vue`
  - 创建 `chatbot/_example/initial-messages.vue`
  - 创建 `chatbot/_example/instance-methods.vue`
  - 创建 `chatbot/_example/quick-start.vue`
  - 创建 `chatbot/_example/role-message-config.vue`
  - 创建 `chatbot/_example/sender-config.vue`
  - 创建 `chatbot/_example/service-config.vue`
  - 参考 pro-components/chat 中的对应文件，适配为 Vue 2.7 兼容版本
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `programmatic` TR-6.1: 所有文件存在且内容非空
  - `programmatic` TR-6.2: 文件语法正确，无 TypeScript/ESLint 错误
- **Notes**: 

## [ ] Task 7: 补齐 chatbot components 目录
- **Priority**: P1
- **Depends On**: Task 5
- **Description**: 
  - 创建 `chatbot/_example/components/` 目录
  - 创建 `chatbot/_example/components/Login.vue`
  - 创建 `chatbot/_example/components/Toolcall.vue`
  - 参考 pro-components/chat 中的对应文件，适配为 Vue 2.7 兼容版本
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `programmatic` TR-7.1: 目录和所有文件存在
  - `programmatic` TR-7.2: 文件语法正确，无 TypeScript/ESLint 错误
- **Notes**: 

## [ ] Task 8: 补齐 chat-engine 示例文件
- **Priority**: P1
- **Depends On**: None
- **Description**: 
  - 创建 `chat-engine/_example/agui-basic.vue`
  - 创建 `chat-engine/_example/agui-comprehensive.vue`
  - 创建 `chat-engine/_example/agui-toolcall.vue`
  - 创建 `chat-engine/_example/comprehensive.vue`
  - 创建 `chat-engine/_example/custom-content.vue`
  - 创建 `chat-engine/_example/initial-messages.vue`
  - 创建 `chat-engine/_example/instance-methods.vue`
  - 参考 pro-components/chat 中的对应文件，适配为 Vue 2.7 兼容版本
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `programmatic` TR-8.1: 所有文件存在且内容非空
  - `programmatic` TR-8.2: 文件语法正确，无 TypeScript/ESLint 错误
- **Notes**: 

## [ ] Task 9: 补齐 chat-engine components 目录
- **Priority**: P1
- **Depends On**: Task 8
- **Description**: 
  - 创建 `chat-engine/_example/components/` 目录
  - 创建 `chat-engine/_example/components/ImageGenProgress.vue`
  - 创建 `chat-engine/_example/components/ImageGenStart.vue`
  - 创建 `chat-engine/_example/components/PlanningSteps.vue`
  - 创建 `chat-engine/_example/components/ProgressPanel.vue`
  - 创建 `chat-engine/_example/components/UserPreferencesForm.vue`
  - 创建 `chat-engine/_example/components/WeatherCard.vue`
  - 参考 pro-components/chat 中的对应文件，适配为 Vue 2.7 兼容版本
- **Acceptance Criteria Addressed**: AC-1
- **Test Requirements**:
  - `programmatic` TR-9.1: 目录和所有文件存在
  - `programmatic` TR-9.2: 文件语法正确，无 TypeScript/ESLint 错误
- **Notes**: 

## [ ] Task 10: 补齐测试文件
- **Priority**: P1
- **Depends On**: None
- **Description**: 
  - 创建 `chat-actionbar/__tests__/index.test.jsx`
  - 创建 `chat-actionbar/__tests__/__snapshots__/index.test.jsx.snap`
  - 创建 `chat-item/__tests__/index.test.jsx`
  - 创建 `chat-loading/__tests__/index.test.jsx`
  - 创建 `chat-reasoning/__tests__/index.test.jsx`
  - 创建 `chat-reasoning/__tests__/__snapshots__/index.test.jsx.snap`
  - 参考 pro-components/chat 中的对应文件
- **Acceptance Criteria Addressed**: AC-2
- **Test Requirements**:
  - `programmatic` TR-10.1: 所有测试文件存在
  - `programmatic` TR-10.2: 测试可以正常运行
- **Notes**: 测试文件可能需要根据 Vue 2 测试框架进行调整

## [ ] Task 11: 同步 chat-list/props.ts 注释
- **Priority**: P2
- **Depends On**: None
- **Description**: 
  - 同步 `chat-list/props.ts` 中缺失的注释
  - 添加 `defaultScrollTo` 的注释
  - 添加 `animation` 的注释
  - 添加 `layout` 的注释
  - 添加 `reverse` 的注释
  - 添加 `showScrollButton` 的注释
  - 添加 `textLoading` 的注释
- **Acceptance Criteria Addressed**: AC-3
- **Test Requirements**:
  - `programmatic` TR-11.1: props.ts 文件中的注释与 pro-components 一致
- **Notes**: 

## [ ] Task 12: 同步 chat-sender.tsx Fragment 使用
- **Priority**: P2
- **Depends On**: None
- **Description**: 
  - 检查 `chat-sender.tsx` 中 Fragment 的使用
  - Vue 2.7 需要使用 `<div>` 替代 `<Fragment>` 或使用其他方式实现
  - 确保功能与 pro-components 一致
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `human-judgement` TR-12.1: 组件渲染结果与 pro-components 一致
- **Notes**: Vue 2.7 不支持 Fragment，需要使用替代方案

## [ ] Task 13: 同步 chat-list.tsx 返回方式
- **Priority**: P2
- **Depends On**: None
- **Description**: 
  - 检查 `chat-list.tsx` 中 render 函数的返回方式
  - pro-components 使用 `return () => (...)` 形式
  - td-chat 使用 `const renderContent = () => (...); return renderContent;` 形式
  - 确保两者功能一致
- **Acceptance Criteria Addressed**: AC-4
- **Test Requirements**:
  - `human-judgement` TR-13.1: 组件渲染结果与 pro-components 一致
- **Notes**: 两种写法在 Vue 2.7 中都是有效的
