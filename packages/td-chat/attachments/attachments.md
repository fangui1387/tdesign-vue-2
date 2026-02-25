:: BASE_DOC ::

## API

### Attachments Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
items | Array | - | 附件列表。TS 类型：`AttachmentItem[]` | N
overflow | String | scrollX | 溢出处理方式。可选项：scrollX / scrollY / wrap | N

### Attachments Events

名称 | 参数 | 描述
-- | -- | --
remove | `(e: CustomEvent)` | 删除附件事件
fileClick | `(e: CustomEvent)` | 点击附件事件
