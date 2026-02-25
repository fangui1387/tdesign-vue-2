:: BASE_DOC ::

## API

### ChatThinking Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
content | Object | - | 思考内容配置。TS 类型：`{ title?: string; text?: string }` | N
status | String | - | 思考状态。可选项：pending / streaming / complete | N
maxHeight | Number | - | 最大高度 | N
collapsed | Boolean | - | 是否折叠 | N
animation | String | - | 加载过程动画。可选项：moving / gradient / circle | N
onCollapsedChange | Function |  | TS 类型：`(e: CustomEvent) => void`<br/>折叠状态变化事件 | N

### ChatThinking Events

名称 | 参数 | 描述
-- | -- | --
collapsedChange | `(e: CustomEvent)` | 折叠状态变化事件
