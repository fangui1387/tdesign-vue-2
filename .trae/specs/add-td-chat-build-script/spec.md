# 新增 td-chat 编译指令 Spec

## Why
需要为 Vue 2.7.16 版本的 td-chat 组件库添加独立的编译指令，类似于现有的 `build:chat` 指令，以便能够单独编译 td-chat 包。

## What Changes
- 在 `package.json` 中添加 `build:td-chat` 指令
- 在 `internal/builds/package.json` 中添加对应的构建脚本
- 创建 `internal/builds/td-chat/` 目录及构建配置文件

## Impact
- Affected specs: 构建系统
- Affected code: 
  - `package.json`
  - `internal/builds/package.json`
  - `internal/builds/td-chat/` (新建目录)

## ADDED Requirements

### Requirement: 新增 td-chat 编译指令
系统 SHALL 提供 `build:td-chat` 指令用于编译 td-chat 组件库。

#### Scenario: 编译 td-chat
- **WHEN** 用户运行 `pnpm build:td-chat`
- **THEN** 系统应编译 td-chat 组件库并输出到指定目录

### Requirement: 创建 td-chat 构建配置
系统 SHALL 在 `internal/builds/td-chat/` 目录下创建构建配置文件。

#### Scenario: 构建配置文件
- **WHEN** 构建系统加载 td-chat 构建配置
- **THEN** 应正确解析 td-chat 的入口文件和输出目录
