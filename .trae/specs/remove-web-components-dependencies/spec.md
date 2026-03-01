# 移除 Web Components 依赖，使用纯 Vue 2.7 实现组件 Spec

## Why
`omi-vueify` 包要求 Vue 3，与 `td-chat` 的 Vue 2.7 存在根本性架构不兼容。需要移除对 Web Components 的依赖，使用纯 Vue 2.7 重新实现相关组件。

## What Changes
- 移除 `omi-vueify`、`tdesign-web-components` 依赖
- 使用纯 Vue 2.7 重新实现以下组件：
  - chat-message
  - chat-thinking
  - chat-loading
  - chatbot
  - chat-markdown
  - attachments
- 更新 package.json 移除不兼容的依赖

## Impact
- Affected specs: td-chat 包的多个组件
- Affected code:
  - chat-message/chat-message.tsx
  - chat-thinking/chat-thinking.tsx
  - chat-loading/index.ts
  - chatbot/index.ts
  - chat-markdown/index.ts
  - attachments/index.ts
  - package.json

## ADDED Requirements

### Requirement: 纯 Vue 2.7 实现
所有使用 `omi-vueify` 的组件必须使用纯 Vue 2.7 重新实现。

#### 需要重新实现的组件

| 组件 | 当前实现 | 目标实现 |
|--------|----------|----------|
| chat-message | 使用 omiVueify 包装 Web Component | 纯 Vue 2.7 组件 |
| chat-thinking | 使用 omiVueify 包装 Web Component | 纯 Vue 2.7 组件 |
| chat-loading | 使用 omiVueify 包装 Web Component | 纯 Vue 2.7 组件 |
| chatbot | 使用 omiVueify 包装 Web Component | 纯 Vue 2.7 组件 |
| chat-markdown | 使用 omiVueify 包装 Web Component | 纯 Vue 2.7 组件 |
| attachments | 使用 omiVueify 包装 Web Component | 纯 Vue 2.7 组件 |

#### Scenario: 组件正常工作
- **WHEN** 用户使用重新实现的组件
- **THEN** 组件功能与原有 Web Components 版本一致
- **AND** 不存在 Vue 版本兼容性问题
- **AND** TypeScript 类型定义正确

### Requirement: 依赖清理
移除不兼容的依赖，保留必要的依赖。

#### 保留的依赖

| 依赖包 | 版本 | 用途 |
|--------|------|------|
| clipboard | ^2.0.11 | 剪贴板功能 |
| lodash-es | ^4.17.21 | 工具函数 |
| tdesign-icons-vue | ^0.3.4 | 图标组件 |
| marked | ^12.0.2 | Markdown 解析 |
| marked-highlight | ^2.2.1 | Markdown 代码高亮 |
| highlight.js | ^11.11.1 | 代码语法高亮 |
| @tdesign/shared-utils | workspace:^ | 工具函数 |

#### 移除的依赖

| 依赖包 | 原因 |
|--------|------|
| omi-vueify | 与 Vue 2.7 不兼容 |
| tdesign-web-components | 通过 omi-vueify 使用，与 Vue 2.7 不兼容 |

## MODIFIED Requirements

### Requirement: package.json 依赖配置
package.json 需要更新为：

```json
{
  "dependencies": {
    "clipboard": "^2.0.11",
    "highlight.js": "^11.11.1",
    "lodash-es": "^4.17.21",
    "marked": "^12.0.2",
    "marked-highlight": "^2.2.1",
    "tdesign-icons-vue": "^0.3.4",
    "@tdesign/shared-utils": "workspace:^"
  },
  "peerDependencies": {
    "vue": "^2.7.16",
    "tdesign-vue": "^1.0.0"
  }
}
```

## REMOVED Requirements

### Requirement: Web Components 依赖
**原因**：`omi-vueify` 和 `tdesign-web-components` 与 Vue 2.7 不兼容

**迁移**：使用纯 Vue 2.7 重新实现相关组件
