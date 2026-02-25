:: BASE_DOC ::

## API

### ChatMessage Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
content | Array | - | 消息内容。TS 类型：`ChatMessageContent[]` | N
role | String | - | 角色。可选项：user / assistant / system | N
variant | String | - | 气泡框样式。可选项：base / outline / text | N
placement | String | - | 消息位置。可选项：left / right | N
avatar | String / Object | - | 头像配置。TS 类型：`string \| AvatarProps` | N
name | String | - | 昵称 | N
datetime | String | - | 时间 | N
loading | Boolean | false | 是否加载中 | N
