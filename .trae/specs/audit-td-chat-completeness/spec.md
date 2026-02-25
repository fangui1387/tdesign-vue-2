# td-chat 组件库完善性检查 Spec

## Why
`packages/td-chat` 是基于 Vue 2.7.16 版本实现的组件库，需要与 `packages/pro-components`（Vue 3 版本）功能完全一致。经过详细检查，发现多个需要完善的地方，包括示例文件缺失、文档缺失、构建配置问题、以及 vue2-demo 示例工程的配置错误。

## What Changes
- **td-chat**: 补充 `_example` 示例文件目录
- **td-chat**: 补充组件文档 `.md` 文件
- **td-chat**: 补充 `__tests__` 测试文件目录
- **vue2-demo**: 修复 README.md 内容错误（描述为 Vue 3 但实际是 Vue 2）
- **vue2-demo**: 修复 index.html 中 main.js 引用错误（应为 main.ts）
- **vue2-demo**: 补充更多示例场景
- **build**: 优化构建脚本，避免每次构建都重新安装依赖

## Impact
- Affected specs: td-chat 组件库功能完整性
- Affected code: 
  - `packages/td-chat/` 目录结构
  - `packages/vue2-demo/` 配置文件
  - `internal/builds/package.json` 构建配置

## ADDED Requirements

### Requirement: 示例文件完整性
td-chat 组件库 SHALL 为每个组件提供 `_example` 目录，包含与 pro-components 对应的示例文件。

#### Scenario: 用户查看组件使用示例
- **WHEN** 用户需要了解 td-chat 组件的使用方法
- **THEN** 可以在 `_example` 目录下找到与 pro-components 对应的示例代码

### Requirement: 组件文档完整性
td-chat 组件库 SHALL 为每个组件提供 `.md` 文档文件，说明组件的属性、事件、插槽和用法。

#### Scenario: 用户查阅组件文档
- **WHEN** 用户需要了解组件的 API
- **THEN** 可以在组件目录下找到对应的 `.md` 文档

### Requirement: vue2-demo 配置正确性
vue2-demo 示例工程 SHALL 正确配置为 Vue 2.7.16 环境。

#### Scenario: 用户运行 vue2-demo
- **WHEN** 用户执行 `pnpm dev` 启动示例工程
- **THEN** 应用正常启动且无配置错误

### Requirement: vue2-demo 文档准确性
vue2-demo 的 README.md SHALL 准确描述项目为 Vue 2.7.16 示例工程。

#### Scenario: 用户阅读 README
- **WHEN** 用户阅读 vue2-demo 的 README.md
- **THEN** 文档准确描述项目为 Vue 2.7.16 环境，而非 Vue 3

### Requirement: 构建脚本优化
td-chat 构建脚本 SHALL 避免每次构建都重新安装依赖。

#### Scenario: 执行构建命令
- **WHEN** 用户执行 `pnpm build:td-chat`
- **THEN** 构建过程复用已安装的依赖，仅在必要时安装

## MODIFIED Requirements
无

## REMOVED Requirements
无

## 详细问题清单

### 1. packages/td-chat 问题

| 问题类型 | 描述 | 优先级 |
|---------|------|--------|
| 缺少示例文件 | 无 `_example` 目录，pro-components 有 70+ 个示例文件 | 高 |
| 缺少文档文件 | 无 `.md` 文档文件，pro-components 每个组件都有文档 | 高 |
| 缺少测试文件 | 无 `__tests__` 目录，pro-components 有单元测试 | 中 |
| index-lib.ts 不完整 | 缺少 AGUIAdapter 等从 tdesign-web-components 的导出 | 低 |

### 2. packages/vue2-demo 问题

| 问题类型 | 描述 | 优先级 |
|---------|------|--------|
| README.md 错误 | 标题为 "tdesign-vue3-demo"，内容描述 Vue 3 环境 | 高 |
| index.html 引用错误 | 引用 `/src/main.js` 但实际文件是 `main.ts` | 高 |
| 示例场景单一 | 只有一个 demo.vue，缺少多场景示例 | 中 |

### 3. 构建配置问题

| 问题类型 | 描述 | 优先级 |
|---------|------|--------|
| 构建效率低 | 每次构建都执行 `pnpm install` | 中 |
| 构建脚本不一致 | internal/builds/td-chat/ 有独立构建脚本但未使用 | 低 |
