# 检查并修复 td-chat 包依赖声明 Spec

## Why
td-chat 包中多个组件使用了未在 package.json 中声明的依赖，如 `omi-vueify`、`tdesign-web-components`、`marked`、`marked-highlight`、`highlight.js`、`@tdesign/shared-utils` 等，这会导致运行时错误。

**关键发现**：`omi-vueify` 包要求 Vue 3，但 `td-chat` 是 Vue 2.7 包，存在根本性的架构不兼容问题。

## What Changes
- 在 package.json 的 dependencies 中添加缺失的依赖声明
- **注意**：`omi-vueify` 与 Vue 2.7 不兼容，需要架构层面的解决方案

## Impact
- Affected specs: td-chat 包的所有组件
- Affected code: package.json

## ADDED Requirements

### Requirement: 依赖声明完整性
td-chat 包的 package.json 必须声明所有组件实际使用的第三方依赖。

#### 缺失的依赖分析

| 依赖包 | 使用位置 | 类型 | 建议声明位置 | 版本 |
|--------|----------|------|--------------|------|
| `omi-vueify` | chat-message.tsx, chat-thinking.tsx, chat-loading/index.ts, chatbot/index.ts, chat-markdown/index.ts, attachments/index.ts | 运行时依赖 | dependencies | ^0.0.12 (与 Vue 2.7 不兼容) |
| `tdesign-web-components` | 多个组件的导入和类型引用 | 运行时依赖 | dependencies | 1.3.0-alpha.2 |
| `marked` | chat-content.tsx | 运行时依赖 | dependencies | ^12.0.2 |
| `marked-highlight` | chat-content.tsx | 运行时依赖 | dependencies | ^2.2.1 |
| `highlight.js` | chat-content.tsx | 运行时依赖 | dependencies | ^11.11.1 |
| `@tdesign/shared-utils` | index.ts (withInstall) | 运行时依赖 | dependencies | workspace:^ |

#### Scenario: 依赖安装后可正常运行
- **WHEN** 用户执行 `npm install @jump-mp/td-chat`
- **THEN** 所有必要的依赖都被正确安装
- **AND** 组件可以正常导入和使用，不会出现模块找不到的错误

### Requirement: 架构兼容性警告
由于 `omi-vueify` 0.0.12 的 peerDependencies 要求 `vue@>=3`，而 `td-chat` 使用 `vue@^2.7.16`，存在以下问题：

1. **运行时警告**：pnpm install 会显示 peer dependency 警告
2. **类型错误**：TypeScript 编译会出现类型不匹配错误
3. **潜在运行时错误**：Vue 2.7 与 Vue 3 的 Web Components 适配器可能不兼容

#### 建议的解决方案
1. 将 `td-chat` 迁移到 Vue 3（推荐）
2. 寻找或开发 Vue 2.7 兼容的 Web Components 适配器
3. 移除对 Web Components 的依赖，使用纯 Vue 2.7 实现

## MODIFIED Requirements

### Requirement: package.json 依赖配置
package.json 需要更新以下配置：

```json
{
  "dependencies": {
    "clipboard": "^2.0.11",
    "highlight.js": "^11.11.1",
    "lodash-es": "^4.17.21",
    "marked": "^12.0.2",
    "marked-highlight": "^2.2.1",
    "omi-vueify": "^0.0.12",
    "tdesign-icons-vue": "^0.3.4",
    "tdesign-web-components": "1.3.0-alpha.2",
    "@tdesign/shared-utils": "workspace:^"
  },
  "peerDependencies": {
    "vue": "^2.7.16",
    "tdesign-vue": "^1.0.0"
  }
}
```

**注意**：添加 `omi-vueify` 后会产生 peer dependency 警告，因为该包要求 Vue 3。

## REMOVED Requirements
无
