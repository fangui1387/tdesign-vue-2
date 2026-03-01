# Checklist

## 高优先级修复

### expose API 兼容性
- [x] chat-list.tsx 已移除 expose 参数，改为直接返回方法对象
- [x] chatbot.tsx 已移除 expose 参数，改为直接返回方法对象
- [x] 组件方法在 Vue 2.7 中可被父组件调用

### v-model 相关兼容性
- [x] chat-sender.tsx 已移除 `modelValue` prop 和 `update:modelValue` emit
- [x] chat-input.tsx 已移除 `modelValue` prop 和 `update:modelValue` emit
- [x] chat-reasoning.tsx 已将 `update:collapsed` 改为 Vue 2.7 兼容方式
- [x] chat-sender-props.ts 已移除 `modelValue` prop 定义
- [x] chat-input-props.ts 已移除 `modelValue` prop 定义
- [x] chat-reasoning-props.ts 已移除 `modelValue` prop 定义
- [x] type.ts 中的 `modelValue` 类型已处理

### useVModel 调用
- [x] chat-sender.tsx 中的 useVModel 已改为三参数版本
- [x] v-model 双向绑定在 Vue 2.7 中正常工作

### v-slots JSX 语法
- [x] chat-thinking.tsx 已将 `v-slots` 改为 Vue 2.7 兼容语法
- [x] chat-reasoning.tsx 已将 `v-slots` 改为 Vue 2.7 兼容语法
- [x] chat-list.tsx 已将 `v-slots` 改为 Vue 2.7 兼容语法

## 中优先级修复

### 类型定义兼容性
- [x] `ComputedRef` 类型在 Vue 2.7 中正确导入和使用 - 已确认兼容
- [x] `DefineComponent` 类型在 Vue 2.7 中正确使用 - 已确认兼容
- [x] `InjectionKey` 类型在 Vue 2.7 中正确处理 - 已确认兼容
- [x] `Ref` 类型在 Vue 2.7 中正确使用 - 已确认兼容

### h 函数调用
- [x] hoc.ts 中的 h 函数调用在 Vue 2.7 中正确工作 - 已确认兼容
- [x] registry.ts 中的 h 函数调用在 Vue 2.7 中正确工作 - 已确认兼容

## 低优先级修复

### 示例文件
- [x] reasoning-custom-slot.vue 已修复 `v-model:collapsed` 语法 - 改为 `.sync`
- [x] chat-drag.vue 已修复 `v-model:visible` 语法 - 改为 `.sync`
- [x] 其他 _example/ 目录下的文件已检查

## 验证和测试

- [x] Vue 2.7 环境中单元测试运行完成
- [ ] 部分测试失败需要更新测试代码以匹配 Vue 2.7 兼容实现
- [x] 主要组件代码修复已完成

## 需要后续处理的测试更新

以下测试文件需要更新以匹配 Vue 2.7 兼容实现：
- chat-sender/__tests__/chat-sender.test.tsx - 需要更新 `update:modelValue` 相关测试
- chat-input/__tests__/chat-input.test.tsx - 需要更新 `update:modelValue` 相关测试
- chat-reasoning/__tests__/chat-reasoning.test.tsx - 需要更新事件相关测试
