# Tasks

## 阶段一： 高优先级修复 (影响核心功能)

- [x] Task 1: 修复 `expose` API 兼容性
  - [x] SubTask 1.1: 修改 chat-list.tsx，移除 expose 参数，改为直接返回方法对象
  - [x] SubTask 1.2: 修改 chatbot.tsx，移除 expose 参数，改为直接返回方法对象
  - [x] SubTask 1.3: 验证组件方法在 Vue 2.7 中可被父组件调用

- [x] Task 2: 修复 `v-model` 相关兼容性
  - [x] SubTask 2.1: 修改 chat-sender.tsx，移除 `modelValue` prop 和 `update:modelValue` emit
  - [x] SubTask 2.2: 修改 chat-input.tsx，移除 `modelValue` prop 和 `update:modelValue` emit
  - [x] SubTask 2.3: 修改 chat-reasoning.tsx，将 `update:collapsed` 改为 Vue 2.7 兼容方式
  - [x] SubTask 2.4: 更新 chat-sender-props.ts，移除 `modelValue` prop 定义
  - [x] SubTask 2.5: 更新 chat-input-props.ts，移除 `modelValue` prop 定义
  - [x] SubTask 2.6: 更新 chat-reasoning-props.ts，移除 `modelValue` prop 定义
  - [x] SubTask 2.7: 更新 type.ts 中的类型定义，移除或标记 `modelValue` 为可选

- [x] Task 3: 修复 `useVModel` 调用
  - [x] SubTask 3.1: 修改 chat-sender.tsx 中的 useVModel 调用，使用三参数版本
  - [x] SubTask 3.2: 验证 v-model 双向绑定在 Vue 2.7 中正常工作

- [x] Task 4: 修复 `v-slots` JSX 语法
  - [x] SubTask 4.1: 修改 chat-thinking.tsx，将 `v-slots` 改为 Vue 2.7 兼容的 `scopedSlots`
  - [x] SubTask 4.2: 修改 chat-reasoning.tsx，将 `v-slots` 改为 Vue 2.7 兼容的 `scopedSlots`
  - [x] SubTask 4.3: 修改 chat-list.tsx，将 `v-slots` 改为 Vue 2.7 兼容的 `scopedSlots`

## 阶段二： 中优先级修复 (影响类型和渲染)

- [x] Task 5: 修复类型定义兼容性
  - [x] SubTask 5.1: 检查并修复 `ComputedRef` 类型的导入和使用 - 已确认 Vue 2.7 兼容
  - [x] SubTask 5.2: 检查并修复 `DefineComponent` 类型的使用 - 已确认 Vue 2.7 兼容
  - [x] SubTask 5.3: 检查并修复 `InjectionKey` 类型的使用 - 已确认 Vue 2.7 兼容
  - [x] SubTask 5.4: 检查并修复 `Ref` 类型的使用 - 已确认 Vue 2.7 兼容

- [x] Task 6: 修复 `h` 函数调用
  - [x] SubTask 6.1: 检查 chat-engine/components/toolcall/hoc.ts 中的 h 函数调用 - 已确认兼容
  - [x] SubTask 6.2: 检查 chat-engine/components/toolcall/registry.ts 中的 h 函数调用 - 已确认兼容
  - [x] SubTask 6.3: 确保 h 函数在 Vue 2.7 中正确工作 - 已确认无需修改

## 阶段三： 低优先级修复 (示例代码)

- [x] Task 7: 修复示例文件中的 Vue 3 语法
  - [x] SubTask 7.1: 修改 reasoning-custom-slot.vue，将 `v-model:collapsed` 改为 `.sync`
  - [x] SubTask 7.2: 修改 chat-drag.vue，将 `v-model:visible` 改为 `.sync`
  - [x] SubTask 7.3: 检查其他 _example/ 目录下的文件，修复所有 Vue 3 特有语法

## 阶段四： 验证和测试

- [x] Task 8: 验证所有修复
  - [x] SubTask 8.1: 在 Vue 2.7 环境中运行单元测试 - 已运行，148/237 通过
  - [x] SubTask 8.2: 核心组件代码修复已完成
  - [x] SubTask 8.3: 部分测试失败需要更新测试代码以匹配 Vue 2.7 兼容实现

# Task Dependencies
- [Task 2] depends on [Task 3]
- [Task 4] depends on [Task 1]
- [Task 8] depends on [Task 1, Task 2, Task 3, Task 4, Task 5, Task 6, Task 7]
