:: BASE_DOC ::

## API

### ChatContent Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
content | String / Object | - | 聊天内容，支持多种内容类型。TS 类型：`string \| ChatContentData` | N
role | String | - | 角色，不同选项配置不同的样式，支持类型包括用户、助手、错误、模型切换、系统消息。可选项：user / assistant / model-change / system | N
markdownProps | Object | - | Markdown引擎类型，用于解析Markdown内容 | N
status | String | - | 消息状态。可选项：'' / error | N
