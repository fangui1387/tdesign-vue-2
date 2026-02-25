:: BASE_DOC ::

## API

### Chatbot Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
messages | Array | - | 消息列表。TS 类型：`ChatMessagesData[]` | N
inputProps | Object | - | 输入框属性配置 | N
senderProps | Object | - | 发送框属性配置 | N
loading | Boolean | false | 是否加载中 | N
onSend | Function |  | TS 类型：`(value: string, context: { e: MouseEvent \| KeyboardEvent }) => void`<br/>发送消息回调 | N
onStop | Function |  | TS 类型：`(value: string, context: { e: MouseEvent }) => void`<br/>停止消息回调 | N

### Chatbot Methods

名称 | 参数 | 返回值 | 描述
-- | -- | -- | --
scrollToBottom | `(params?: ScrollToBottomParams)` | - | 滚动到底部
clearMessages | - | - | 清空消息
