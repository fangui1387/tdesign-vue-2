# td-chat 组件库功能完善 Spec

## Why
`packages/td-chat` 是基于 Vue 2.7.16 版本实现的组件库，需要与 `packages/pro-components`（Vue 3 版本）功能完全一致。经过详细对比分析，发现多个组件的 props 定义、示例文件、校验器等方面存在差异，需要统一完善。

## What Changes
- **td-chat**: 修复 chat-input/chat-sender 组件缺少 modelValue 属性
- **td-chat**: 修复 chat-message 组件缺少 variant/message/chatContentProps/status 属性
- **td-chat**: 修复 chat-reasoning 组件缺少 modelValue/defaultCollapsed 属性
- **td-chat**: 修复 chat-thinking 组件缺少 layout/maxHeight/animation/collapsed 属性
- **td-chat**: 修复 chat-list 组件默认值差异（reverse、data.default）
- **td-chat**: 修复 chat-content 组件 markdown 引擎默认值差异
- **td-chat**: 为多个组件添加 validator 校验器
- **td-chat**: 补充约 51 个 _example 示例文件
- **td-chat**: 修复 _usage 目录 chat-thinking 的 animation 缺少 gradient 选项
- **td-chat**: chat-loading 移除多余的 chatLoadingProps 导出

## Impact
- Affected specs: td-chat 组件库功能完整性
- Affected code: 
  - `packages/td-chat/*/ *-props.ts` 多个文件
  - `packages/td-chat/*/ _example/` 目录
  - `packages/td-chat/*/ _usage/` 目录

## ADDED Requirements

### Requirement: Props 定义完整性
td-chat 组件 SHALL 与 pro-components 保持 props 定义一致。

#### Scenario: 用户使用 v-model 语法
- **WHEN** 用户在 chat-input 或 chat-sender 上使用 v-model
- **THEN** 组件应支持 modelValue 属性

#### Scenario: 用户设置消息变体样式
- **WHEN** 用户在 chat-message 上设置 variant 属性
- **THEN** 组件应支持气泡样式变体

#### Scenario: 用户控制思考过程折叠
- **WHEN** 用户在 chat-reasoning 上设置 collapsed 属性
- **THEN** 组件应支持折叠/展开控制

#### Scenario: 用户配置思考组件布局
- **WHEN** 用户在 chat-thinking 上设置 layout 属性
- **THEN** 组件应支持 block/border 布局

### Requirement: 示例文件完整性
td-chat 组件库 SHALL 为每个组件提供与 pro-components 对应的完整示例文件。

#### Scenario: 用户查看组件完整示例
- **WHEN** 用户需要了解组件的完整功能
- **THEN** 可以在 _example 目录下找到约 65 个示例文件

### Requirement: Props 校验器完整性
td-chat 组件 SHALL 为关键属性添加 validator 校验器。

#### Scenario: 用户传入无效的属性值
- **WHEN** 用户设置不符合枚举值的属性
- **THEN** 组件应提示校验错误

## MODIFIED Requirements

### chat-input-props.ts 修改
| 属性 | 修改前 | 修改后 |
|------|--------|--------|
| modelValue | 无 | 添加 modelValue 属性 |
| defaultValue | String | String \| Number |
| value | String | String \| Number |
| suffixIcon | - | 类型更改为 Function |

### chat-sender-props.ts 修改
| 属性 | 修改前 | 修改后 |
|------|--------|--------|
| modelValue | 无 | 添加 modelValue 属性 |

### chat-message-props.ts 修改
| 属性 | 修改前 | 修改后 |
|------|--------|--------|
| animation | skeleton/moving/gradient | 增加 circle 选项 |
| variant | 无 | 添加 variant 属性 |
| message | 无 | 添加 message 属性 |
| chatContentProps | 无 | 添加 chatContentProps 属性 |
| status | 无 | 添加 status 属性 |

### chat-reasoning-props.ts 修改
| 属性 | 修改前 | 修改后 |
|------|--------|--------|
| collapsed | true | false (与 pro-components 一致) |
| modelValue | 无 | 添加 modelValue 属性 |
| defaultCollapsed | 无 | 添加 defaultCollapsed 属性 |
| expandIcon | [String, Function] | Function |
| onExpandChange | 无 default | 添加 default: () => {} |

### chat-thinking-props.ts 修改
| 属性 | 修改前 | 修改后 |
|------|--------|--------|
| thinking | 有 | **移除** (与 pro-components 一致) |
| status | thinking/done/error | pending/complete/stop/error |
| layout | 无 | 添加 layout 属性 |
| maxHeight | 无 | 添加 maxHeight 属性 |
| animation | 无 | 添加 animation 属性 |
| collapsed | 无 | 添加 collapsed 属性 |

### chat-list/props.ts 修改
| 属性 | 修改前 | 修改后 |
|------|--------|--------|
| data.default | () => [] | 移除默认值 |
| defaultScrollTo | 无 validator | 添加 validator (top/bottom) |
| animation | 无 validator | 添加 validator |
| layout | 无 validator | 添加 validator (both/single) |
| reverse.default | true | false |

### chat-content-props.ts 修改
| 属性 | 修改前 | 修改后 |
|------|--------|--------|
| markdownProps.default.engine | marked | cherry-markdown |
| role | 无 validator | 添加 validator |

## REMOVED Requirements
- chat-loading: 移除多余的 chatLoadingProps 导出（pro-components 不导出）

## 详细差异清单

### 1. Props 定义差异 (14 项)

| 组件 | 差异项 | 优先级 |
|------|--------|--------|
| chat-input | 缺少 modelValue/defaultValue 支持 Number | 高 |
| chat-sender | 缺少 modelValue | 高 |
| chat-message | 缺少 variant/message/chatContentProps/status | 高 |
| chat-reasoning | 缺少 modelValue/defaultCollapsed | 高 |
| chat-thinking | 缺少 layout/maxHeight/animation/collapsed | 高 |
| chat-list | reverse 默认值错误/缺少 validator | 中 |
| chat-content | markdown 引擎默认值错误 | 中 |

### 2. 示例文件差异

td-chat 缺少约 51 个示例文件，包括：
- attachments: 缺少 scrollX、scrollY
- chat-item: 缺少 avatar-name、change-model-message、slot、error
- chat-list: 缺少 drag、drawer、footer-slot、with-message
- chat-message: 缺少 action、configure、content、custom、status
- chat-reasoning: 缺少 custom-slot、custom、drag、drawer、style
- chat-sender: 缺少 attachments、mix、slot
- chat-thinking: 缺少 style
- chatbot: 缺少 14+ 个示例
- chat-engine: 缺少 7+ 个示例

### 3. _usage 目录差异

| 组件 | 差异项 |
|------|--------|
| chat-thinking | animation 缺少 gradient 选项 |
