# 完善 vue2-demo 项目 Spec

## Why
当前 `packages/vue2-demo` 项目存在以下问题需要修复：
1. `Login.vue` 组件错误地使用了 `tdesign-icons-vue-next`（Vue 3 版本），应该使用 `tdesign-icons-vue`（Vue 2 版本）
2. 目录结构与 `tdesign-vue3-demo` 不一致，缺少 `.vscode/` 和 `public/` 目录
3. `index.html` 中的入口文件引用不一致

## What Changes
- 修复 `Login.vue` 中的图标库导入，将 `tdesign-icons-vue-next` 改为 `tdesign-icons-vue`
- 添加 `.vscode/` 目录，包含 `extensions.json` 和 `settings.json`（适配 Vue 2）
- 添加 `public/` 目录，包含 `favicon.ico`
- 统一 `index.html` 的入口文件引用格式

## Impact
- Affected code: `packages/vue2-demo/src/components/Login.vue`
- Affected code: `packages/vue2-demo/.vscode/*`（新增）
- Affected code: `packages/vue2-demo/public/*`（新增）
- Affected code: `packages/vue2-demo/index.html`

## ADDED Requirements
### Requirement: 正确的图标库导入
The system SHALL 在 Vue 2 项目中使用 `tdesign-icons-vue` 图标库。

#### Scenario: Login 组件正常渲染
- **WHEN** 用户访问页面并查看 Login 组件
- **THEN** 图标正常显示，无导入错误

### Requirement: 目录结构一致性
The system SHALL 与 tdesign-vue3-demo 保持一致的目录结构。

#### Scenario: 项目结构完整
- **WHEN** 检查项目目录
- **THEN** 存在 `.vscode/` 和 `public/` 目录

### Requirement: VSCode 配置适配 Vue 2
The system SHALL 提供 Vue 2 兼容的 VSCode 配置。

#### Scenario: IDE 推荐正确的扩展
- **WHEN** 用户在 VSCode 中打开项目
- **THEN** 推荐安装 Vetur 扩展（Vue 2 推荐）

## MODIFIED Requirements
### Requirement: Login.vue 组件
Login 组件 SHALL 使用 Vue 2 兼容的图标库：
- 将 `import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue-next'` 改为 `import { DesktopIcon, LockOnIcon } from 'tdesign-icons-vue'`
