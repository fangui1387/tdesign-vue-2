# td-chat 组件库功能审计与兼容性验证 Spec

## Why
需要对 Vue 2.7.16 版本的 td-chat 组件库进行全面功能审计，验证其是否100%完整实现了 pro-components/chat (Vue 3) 中的所有功能，发现并修复功能差异，确保两个版本功能完全一致。

## What Changes
- 对比两个组件库的目录结构和文件完整性
- 对比所有组件的 Props 定义和类型声明
- 对比组件的事件处理和 emits 定义
- 对比组件的状态管理和 hooks 实现
- 对比组件的渲染逻辑和 JSX 模板
- 验证 Vue 2.7.16 特定的 API 适配是否正确
- 修复发现的功能差异

## Impact
- Affected specs: td-chat 组件库所有组件
- Affected code: packages/td-chat/ 下所有文件

## 发现的问题

### 1. 缺失文件
| 文件 | pro-components/chat | td-chat | 状态 |
|-----|---------------------|--------|------|
| chat-loading-props.ts | ✅ 存在 | ❌ 缺失 | 需补充 |
| _example/ 目录 | ✅ 存在 | ❌ 缺失 | 示例文件可选 |
| __tests__/ 目录 | ✅ 存在 | ❌ 缺失 | 测试文件可选 |
| _usage/ 目录 | ✅ 存在 | ❌ 缺失 | 使用文档可选 |
| *.md 文档 | ✅ 存在 | ❌ 缺失 | 文档可选 |

### 2. 类型定义差异
| 类型 | pro-components/chat | td-chat | 差异 |
|-----|---------------------|--------|------|
| TdChatInputProps.modelValue | ✅ 存在 | ❌ 缺失 | Vue 2 不需要 modelValue |
| TdChatSenderProps.modelValue | ✅ 存在 | ❌ 缺失 | Vue 2 不需要 modelValue |
| 导入来源 | tdesign-vue-next | tdesign-vue | 正确适配 |

### 3. API 适配差异
| 功能 | pro-components/chat | td-chat | 状态 |
|-----|---------------------|--------|------|
| useVModel 参数 | value, modelValue, defaultValue, onChange | value, defaultValue, onChange | 需适配 Vue 2 |
| emits 定义 | 'update:modelValue' | 无此 emit | Vue 2 不需要 |
| install 方法 | app.use() | Vue.use() | 正确适配 |
| 导入 App 类型 | import { App } from 'vue' | 无此导入 | Vue 2 不需要 |

### 4. 组件实现差异
| 组件 | 问题 | 严重程度 |
|-----|------|---------|
| chat-sender.tsx | useVModel 调用缺少 modelValue 参数处理 | 高 |
| chat-input.tsx | useVModel 调用缺少 modelValue 参数处理 | 高 |
| chat-reasoning.tsx | useVModel 调用缺少 defaultCollapsed 参数 | 中 |
| chat-loading | 缺少 chat-loading-props.ts 文件 | 中 |

## ADDED Requirements

### Requirement: 补充缺失的 Props 定义文件
系统 SHALL 为 chat-loading 组件补充 chat-loading-props.ts 文件，#### Scenario: Props 定义完整
- **WHEN** 开发者使用 ChatLoading 组件
- **THEN** 组件应具有完整的 Props 定义和类型声明

### Requirement: 修复 useVModel 适配
系统 SHALL 正确适配 Vue 2 的 v-model 处理方式。
#### Scenario: v-model 双向绑定
- **WHEN** 开发者使用 v-model 绑定 ChatSender 或 ChatInput
- **THEN** 组件应正确响应 v-model 变化并触发 update 事件

### Requirement: 补充 modelValue 兼容处理
系统 SHALL 在 Vue 2 环境中正确处理 modelValue 属性的兼容性。
#### Scenario: modelValue 属性兼容
- **WHEN** 组件接收到 modelValue 属性
- **THEN** 组件应正确将其作为 value 使用

## MODIFIED Requirements

### Requirement: 统一组件导入路径
所有组件 SHALL 从 tdesign-vue 而非 tdesign-vue-next 导入依赖。

### Requirement: 统一图标库导入
所有组件 SHALL 从 tdesign-icons-vue 而非 tdesign-icons-vue-next 导入图标。

### Requirement: 统一 hooks 导入路径
所有组件 SHALL 从 @tdesign/shared-hooks 导入 hooks，确保与 Vue 2 兼容。
