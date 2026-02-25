# td-chat _usage 目录补充 Spec

## Why
`packages/td-chat` 下的组件缺少 `_usage` 目录，而 `packages/pro-components/chat` 中的部分组件有 `_usage` 目录用于组件文档站点的交互式属性配置面板。需要为 td-chat 补充这些目录以保持与 pro-components 的一致性。

## What Changes
- 为 td-chat 的以下组件添加 `_usage` 目录：
  - attachments/_usage
  - chat-list/_usage
  - chat-message/_usage
  - chat-thinking/_usage
- 每个目录包含 `index.vue` 和 `props.json` 文件
- 需要将 Vue 3 语法转换为 Vue 2.7 语法

## Impact
- Affected specs: td-chat 组件库文档完整性
- Affected code: `packages/td-chat/` 目录结构

## ADDED Requirements

### Requirement: _usage 目录完整性
td-chat 组件库 SHALL 为需要交互式属性配置的组件提供 `_usage` 目录。

#### Scenario: 用户在文档站点配置组件属性
- **WHEN** 用户在文档站点查看组件属性
- **THEN** 可以通过交互式面板动态配置组件属性

### Requirement: props.json 配置正确性
每个 `_usage/props.json` 文件 SHALL 正确定义组件的可配置属性。

#### Scenario: 组件属性配置
- **WHEN** 用户修改属性配置
- **THEN** 组件实时响应配置变化

## MODIFIED Requirements
无

## REMOVED Requirements
无

## 需要创建的文件清单

### 1. attachments/_usage/
- `index.vue` - 交互式属性配置组件
- `props.json` - 属性配置定义

### 2. chat-list/_usage/
- `index.vue` - 交互式属性配置组件
- `props.json` - 属性配置定义

### 3. chat-message/_usage/
- `index.vue` - 交互式属性配置组件
- `props.json` - 属性配置定义

### 4. chat-thinking/_usage/
- `index.vue` - 交互式属性配置组件
- `props.json` - 属性配置定义
