# 修复 td-chat TypeScript 类型错误 Spec

## Why
td-chat 包存在 192 个 TypeScript 编译错误，主要是 JSX 类型不兼容、类型导出问题、全局变量未定义等问题，需要修复以确保代码质量。

## What Changes
- 修复 type.ts 中的类型导出问题
- 修复 JSX 组件类型兼容性问题
- 添加 PKG_VERSION 全局变量声明
- 修复 class 属性类型问题

## Impact
- Affected specs: td-chat 包的所有组件
- Affected code: type.ts, tsconfig.json, 各组件文件

## ADDED Requirements

### Requirement: TypeScript 类型正确性
所有 TypeScript 编译错误必须修复，确保类型定义正确。

#### 错误分类

| 错误类型 | 数量 | 说明 |
|----------|------|------|
| JSX 组件类型不兼容 | ~150 | tdesign-vue/tdesign-icons-vue 与 omi JSX 类型冲突 |
| TNode 导出问题 | 2 | type.ts 未正确导出 TNode |
| CollapsePanelProps 名称错误 | 1 | 应为 TdCollapsePanelProps |
| PKG_VERSION 未定义 | 4 | 需要全局变量声明 |
| class 属性类型问题 | ~30 | omi class 期望 string，传了 string[] |

#### Scenario: TypeScript 编译成功
- **WHEN** 执行 `pnpm run build:type`
- **THEN** TypeScript 编译成功，无错误
- **AND** 类型定义正确导出

## MODIFIED Requirements

### Requirement: tsconfig.json 配置
需要调整 JSX 类型配置，避免 omi 和 Vue JSX 类型冲突。

### Requirement: type.ts 类型导出
正确导出 TNode 和其他类型。

## REMOVED Requirements
无
