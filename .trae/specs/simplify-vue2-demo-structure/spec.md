# 简化 Vue2 Demo 项目结构 Spec

## Why
当前 `packages/vue2-demo` 包含大量不符合常规集成使用的 mocks 文件（如 `src/mocks/vue-patch.ts`、`src/mocks/vue-compat.ts`、`src/mocks/@tdesign/common-js/*` 等），这些文件是为了解决 `td-chat` 组件库的依赖兼容性问题而添加的临时解决方案。参考 `packages/tdesign-vue3-demo` 的简洁结构，应该将这些兼容性处理移至 `td-chat` 组件库内部，使 vue2-demo 成为一个干净的示例项目。

## What Changes
- **移除** `vue2-demo/src/mocks` 目录及其所有内容
- **移除** `main.ts` 中的 `import './mocks/vue-patch'` 引入
- **修改** `td-chat` 组件库，将 Vue 2 兼容层内置到组件库中
- **简化** `vite.config.ts`，移除 mocks 相关的别名配置
- **简化** `vue2-demo` 项目结构，使其与 `tdesign-vue3-demo` 保持一致

## Impact
- Affected code: 
  - `packages/vue2-demo/src/mocks/*` (删除)
  - `packages/vue2-demo/src/main.ts` (简化)
  - `packages/vue2-demo/vite.config.ts` (简化)
  - `packages/td-chat` (添加内置兼容层)
- Affected specs: 需要验证 td-chat 在无 mocks 环境下的可用性

## ADDED Requirements
### Requirement: td-chat 内置 Vue 2 兼容层
The td-chat 组件库 SHALL 内置处理 Vue 2 兼容性问题，包括：
- `@tdesign/common-js` 依赖的 mock 或替代实现
- `tdesign-vue/es/config-provider/hooks` 的兼容实现

#### Scenario: 无需外部 mocks
- **WHEN** 用户在 Vue 2 项目中安装 `@jump-mp/td-chat`
- **THEN** 可以直接使用，无需额外配置 mocks

### Requirement: vue2-demo 简洁结构
The vue2-demo 项目 SHALL 具有与 tdesign-vue3-demo 相似的简洁结构。

#### Scenario: 结构对比
- **WHEN** 对比两个 demo 项目
- **THEN** vue2-demo 不包含 mocks 目录
- **AND** main.ts 不引入 mocks 文件
- **AND** vite.config.ts 不包含 mocks 别名

## MODIFIED Requirements
### Requirement: vite.config.ts 简化
移除以下别名配置：
- `@tdesign/common-js` 别名
- `@tdesign/common-style` 别名
- `tdesign-vue/es/config-provider/hooks` 别名
- `vue` 别名（如果 td-chat 内置处理）

## REMOVED Requirements
### Requirement: 外部 mocks 文件
**Reason**: 兼容层应内置到 td-chat 组件库中
**Migration**: 将必要的兼容代码移至 td-chat 内部

## 分析：为什么需要 mocks？

### 1. `vue-patch.ts` / `vue-compat.ts`
**问题**: td-chat 组件库可能使用了 Vue 3 的 API（如 `Vue.isVNode`、`Vue.Comment`、`Vue.Fragment`），这些在 Vue 2 中不存在。

**解决方案**: 
- 方案 A：在 td-chat 内部添加兼容层
- 方案 B：修改 td-chat 代码，避免使用 Vue 3 特有 API

### 2. `@tdesign/common-js` mocks
**问题**: td-chat 依赖 `@tdesign/common-js`，但这个包：
- 可能未发布到 npm
- 可能与 Vue 2 环境不兼容
- 包含 td-chat 实际不需要的功能

**解决方案**:
- 方案 A：在 td-chat 中 mock 这些依赖
- 方案 B：将必要的工具函数复制到 td-chat 内部
- 方案 C：正确声明依赖并发布

### 3. `config-provider/hooks` mock
**问题**: td-chat 依赖 `tdesign-vue/es/config-provider/hooks`，但路径解析有问题。

**解决方案**:
- 在 td-chat 内部提供兼容的 useConfig hook
