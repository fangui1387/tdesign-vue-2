# Vue 3 特有特性审计 Spec

## Why
需要对 td-chat 组件库进行全面审计，检查是否使用了 Vue 3 版本才有的特性，以确保代码能够兼容 Vue 2.7.16 版本。

## What Changes
- 审计所有组件文件中使用的 Vue API
- 识别 Vue 3 特有的语法和 API
- 提供修复建议和兼容性方案

## Impact
- Affected specs: td-chat 组件库所有组件
- Affected code: packages/td-chat/ 下所有 .tsx, .ts, .vue 文件

## 发现的 Vue 3 特有特性

### 1. `expose` API (严重程度: 高)
**问题**: `expose` 是 Vue 3 新增的 setup 参数，Vue 2.7 不支持此语法。

**位置**:
| 文件 | 行号 | 代码 |
|-----|------|------|
| chat-list/chat-list.tsx | 41 | `setup(props, { emit, expose })` |
| chatbot/chatbot.tsx | 45 | `setup(props, { emit, expose })` |

**影响**: 组件无法在 Vue 2.7 中正确暴露方法给父组件。

**兼容方案**: Vue 2.7 中应直接返回需要暴露的方法对象，而不是使用 expose。

### 2. `v-model:xxx` 参数语法 (严重程度: 高)
**问题**: `v-model:参数名` 是 Vue 3 特有的命名 v-model 语法，Vue 2.7 不支持。

**位置**:
| 文件 | 行号 | 代码 |
|-----|------|------|
| chat-reasoning/_example/reasoning-custom-slot.vue | 2 | `v-model:collapsed="collapsed"` |
| chat-list/_example/chat-drag.vue | 6 | `v-model:visible="visibleModelessDrag"` |

**影响**: 示例代码在 Vue 2.7 中无法运行。

**兼容方案**: Vue 2.7 应使用 `:collapsed.sync="collapsed"` 或单独的 prop + event。

### 3. `v-slots` JSX 指令 (严重程度: 高)
**问题**: `v-slots` 是 Vue 3 特有的 JSX 语法，Vue 2.7 的 JSX 不支持此语法。

**位置**:
| 文件 | 行号 | 代码 |
|-----|------|------|
| chat-thinking/chat-thinking.tsx | 113 | `v-slots={{...}}` |
| chat-reasoning/chat-reasoning.tsx | 43 | `v-slots={{...}}` |
| chat-list/chat-list.tsx | 92 | `v-slots={{...}}` |

**影响**: 组件在 Vue 2.7 中无法正确渲染插槽。

**兼容方案**: Vue 2.7 应使用 `scopedSlots` 属性或直接传递 slot 函数。

### 4. `update:modelValue` emit 事件 (严重程度: 高)
**问题**: `update:modelValue` 是 Vue 3 特有的 v-model 实现方式，Vue 2.7 使用 `input` 事件。

**位置**:
| 文件 | 行号 | 代码 |
|-----|------|------|
| chat-sender/chat-sender.tsx | 19 | `emits: ['send', 'stop', 'update:modelValue', ...]` |
| chat-input/chat-input.tsx | 10 | `emits: ['send', 'stop', 'update:modelValue', ...]` |
| chat-reasoning/chat-reasoning.tsx | 9 | `emits: ['update:collapsed']` |

**影响**: v-model 双向绑定在 Vue 2.7 中无法正常工作。

**兼容方案**: Vue 2.7 应使用 `input` 事件或自定义的 `change` 事件。

### 5. `modelValue` prop (严重程度: 高)
**问题**: `modelValue` 是 Vue 3 特有的 v-model prop 名称，Vue 2.7 使用 `value`。

**位置**:
| 文件 | 行号 | 代码 |
|-----|------|------|
| chat-sender/chat-sender-props.ts | 50-51 | `modelValue: { type: [String, Number] as PropType<...> }` |
| chat-input/chat-input-props.ts | 35 | `modelValue: { ... }` |
| chat-reasoning/chat-reasoning-props.ts | 48 | `modelValue: { ... }` |
| type.ts | 288, 371, 446 | `modelValue?: string \| number;` |

**影响**: v-model 绑定在 Vue 2.7 中无法正常工作。

**兼容方案**: Vue 2.7 应使用 `value` prop 和 `model` 选项。

### 6. `useVModel` 四参数调用 (严重程度: 高)
**问题**: `chat-sender.tsx` 中使用了四个参数的 `useVModel`，包含 `modelValue` 参数，这是 Vue 3 的用法。

**位置**:
| 文件 | 行号 | 代码 |
|-----|------|------|
| chat-sender/chat-sender.tsx | 26 | `useVModel(value, modelValue, props.defaultValue, props.onChange)` |

**影响**: v-model 双向绑定在 Vue 2.7 中可能无法正常工作。

**兼容方案**: Vue 2.7 应使用三参数版本: `useVModel(value, defaultValue, onChange)`。

### 7. `ComputedRef<T>` 类型 (严重程度: 中)
**问题**: `ComputedRef` 是 Vue 3 特有的类型导出，Vue 2.7 可能需要从不同位置导入。

**位置**:
| 文件 | 行号 | 代码 |
|-----|------|------|
| chat-message/chat-message.tsx | 1 | `import { ..., ComputedRef } from 'vue'` |
| chat-reasoning/chat-reasoning.tsx | 1 | `import { ..., ComputedRef } from 'vue'` |
| chat-content/chat-content.tsx | 1 | `import { ..., ComputedRef } from 'vue'` |

**影响**: 类型定义可能需要调整。

**兼容方案**: Vue 2.7 中 `ComputedRef` 类型可能需要从 `vue` 直接导入或使用 `Computed` 类型。

### 8. `DefineComponent` 类型 (严重程度: 中)
**问题**: `DefineComponent` 是 Vue 3 特有的组件类型定义。

**位置**:
| 文件 | 行号 | 代码 |
|-----|------|------|
| chat-engine/components/toolcall/hoc.ts | 1 | `import { ..., type DefineComponent } from 'vue'` |
| chat-engine/components/toolcall/types.ts | 1 | `import type { DefineComponent } from 'vue'` |

**影响**: 类型定义可能需要调整。

**兼容方案**: Vue 2.7 中应使用 `VueConstructor` 或 `Component` 类型。

### 9. `InjectionKey<T>` 类型 (严重程度: 中)
**问题**: `InjectionKey` 是 Vue 3 特有的 provide/inject 类型安全工具。

**位置**:
| 文件 | 行号 | 代码 |
|-----|------|------|
| chat-engine/hooks/useAgentState.ts | 95 | `export const AgentStateKey: InjectionKey<UseStateActionReturn> = Symbol('AgentState')` |

**影响**: 类型安全性降低，但功能不受影响。

**兼容方案**: Vue 2.7 中可以使用 `Symbol()` 作为 key，但失去类型推断。

### 10. `Ref<T>` 类型 (严重程度: 中)
**问题**: `Ref` 是 Vue 3 特有的响应式类型。

**位置**:
| 文件 | 行号 | 代码 |
|-----|------|------|
| chat-engine/hooks/useAgentState.ts | 1 | `import { ..., type Ref, ... } from 'vue'` |
| chat-engine/hooks/useChat.ts | 10-11 | `const messages: Ref<ChatMessagesData[]> = ref([])` |
| chat-engine/components/toolcall/render.vue | 8, 32 | `type Ref` |

**影响**: 类型定义可能需要调整。

**兼容方案**: Vue 2.7 中 `Ref` 类型同样存在，但可能需要确认版本兼容性。

### 11. `h` 函数签名差异 (严重程度: 中)
**问题**: Vue 3 的 `h` 函数签名与 Vue 2 不同。

**位置**:
| 文件 | 行号 | 代码 |
|-----|------|------|
| chat-engine/components/toolcall/hoc.ts | 16, 38 | `h(Component as any, {...props})` |
| chat-engine/components/toolcall/registry.ts | 48 | `h(config.component as Component, props)` |

**影响**: 渲染函数可能需要调整。

**兼容方案**: Vue 2 的 `h` 函数需要传递 `createElement` 作为参数，或使用 `this.$createElement`。

### 12. `import type` 语法 (严重程度: 低)
**问题**: `import type` 是 TypeScript 3.8+ 的特性，与 Vue 版本无关，但需要确认 TypeScript 版本。

**位置**: 多处文件使用此语法

**影响**: 编译时可能需要特定 TypeScript 版本。

**兼容方案**: 确保项目使用 TypeScript 3.8+ 版本。

## ADDED Requirements

### Requirement: Vue 2.7 兼容性
系统 SHALL 确保所有组件在 Vue 2.7.16 版本中正常工作。

#### Scenario: expose 替代方案
- **WHEN** 组件需要在 Vue 2.7 中暴露方法
- **THEN** 应直接返回方法对象而不是使用 expose 参数

#### Scenario: v-model 兼容
- **WHEN** 组件使用 v-model 双向绑定
- **THEN** 应使用 `value` prop 和 `input` 事件而非 `modelValue` 和 `update:modelValue`

#### Scenario: JSX 插槽兼容
- **WHEN** 组件在 JSX 中使用插槽
- **THEN** 应使用 Vue 2.7 兼容的 `scopedSlots` 语法

## MODIFIED Requirements

### Requirement: 类型定义兼容
所有类型定义 SHALL 兼容 Vue 2.7 的类型系统。

### Requirement: 示例代码兼容
所有 `_example/` 目录下的示例文件 SHALL 使用 Vue 2.7 兼容的语法。

## REMOVED Requirements

### Requirement: Vue 3 特有语法
**Reason**: 需要支持 Vue 2.7.16 版本
**Migration**: 将所有 Vue 3 特有语法替换为 Vue 2.7 兼容的写法
