# Vue2 Demo 对齐 Vue3 Demo 规范

## Why
vue2-demo 需要完全对齐 tdesign-vue3-demo 的目录结构和功能，确保两个项目在功能上保持一致，仅在使用的技术栈（Vue 2 vs Vue 3）和组件库（td-chat vs pro-components）上有所区别。

## What Changes
- 添加 `public/favicon.ico` 文件，与 tdesign-vue3-demo 保持一致
- 统一 `index.html` 格式，采用与 tdesign-vue3-demo 一致的简化格式
- 保留 Vue 2 特有的配置文件（`.vscode/`、`src/mocks/easing.ts`），这些是 Vue 2 项目必需的

## Impact
- Affected specs: 无
- Affected code:
  - `packages/vue2-demo/public/favicon.ico`（新增）
  - `packages/vue2-demo/index.html`（修改）

## ADDED Requirements

### Requirement: 目录结构对齐
vue2-demo 的目录结构应与 tdesign-vue3-demo 保持一致，同时保留 Vue 2 特有的必要配置。

#### Scenario: 添加 public 目录
- **WHEN** 检查 vue2-demo 目录结构
- **THEN** 应存在 `public/favicon.ico` 文件

#### Scenario: 统一 index.html 格式
- **WHEN** 查看 index.html 文件
- **THEN** 格式应与 tdesign-vue3-demo 一致（简化格式）

### Requirement: 功能对齐
vue2-demo 的核心功能应与 tdesign-vue3-demo 完全一致。

#### Scenario: demo.vue 功能对齐
- **WHEN** 运行 vue2-demo
- **THEN** 应能正常显示聊天界面，包含消息列表、输入框、工具调用渲染等功能

#### Scenario: 组件对齐
- **WHEN** 查看 components 目录
- **THEN** 应包含 Login.vue 和 Toolcall.vue，功能与 tdesign-vue3-demo 一致

## Current Status Analysis

### 已对齐的部分
| 文件/目录 | 状态 | 说明 |
|-----------|------|------|
| `src/demo.vue` | ✅ 已对齐 | 使用 Vue 2 语法，功能与 Vue 3 版本一致 |
| `src/components/Login.vue` | ✅ 已对齐 | 使用 tdesign-icons-vue |
| `src/components/Toolcall.vue` | ✅ 已对齐 | 使用 Vue 2 语法 |
| `src/mock-data/sseRequest.ts` | ✅ 已对齐 | Mock 数据文件 |
| `src/mock-data/sseRequest-reasoning.ts` | ✅ 已对齐 | Mock 数据文件 |
| `src/index.css` | ✅ 已对齐 | 样式文件 |
| `src/main.ts` | ✅ 已对齐 | 入口文件 |
| `package.json` | ✅ 已对齐 | 使用正确的依赖 |
| `vite.config.ts` | ✅ 已对齐 | 使用 Vue 2 插件 |
| `tsconfig.*.json` | ✅ 已对齐 | TypeScript 配置 |
| `.vscode/extensions.json` | ✅ 已对齐 | 推荐 Vetur 扩展 |
| `README.md` | ✅ 已对齐 | 项目说明文档 |
| `.gitignore` | ✅ 已对齐 | Git 忽略配置 |

### 需要对齐的部分
| 文件/目录 | 状态 | 说明 |
|-----------|------|------|
| `public/favicon.ico` | ❌ 缺失 | 需要添加 |
| `index.html` | ⚠️ 格式不一致 | 需要统一格式 |

### Vue 2 特有文件（应保留）
| 文件/目录 | 说明 |
|-----------|------|
| `src/mocks/easing.ts` | Vue 2 依赖 mock 文件 |
| `src/demo-simple.vue` | 简单测试文件 |
| `src/main-simple.ts` | 简单测试入口 |
