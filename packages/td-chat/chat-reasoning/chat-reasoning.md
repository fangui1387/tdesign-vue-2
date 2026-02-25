:: BASE_DOC ::

## API

### ChatReasoning Props

名称 | 类型 | 默认值 | 描述 | 必传
-- | -- | -- | -- | --
collapsePanelProps | Object | - | 透传给 CollapsePanel 组件的全部属性。TS 类型：`CollapsePanelProps` | N
expandIcon | Slot / Function | - | 当前折叠面板展开图标。优先级低于collapsePanelProps.expandIcon。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
expandIconPlacement | String | right | 展开图标位置，可选项：left/right。可选项：left / right | N
header | Slot / Function | - | 折叠面板头内容。优先级低于collapsePanelProps.header。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
headerRightContent | Slot / Function | - | 折叠面板尾内容。优先级低于collapsePanelProps.headerRightContent。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
collapsed | Boolean | - | 是否折叠 | N
layout | String | - | 布局方式。可选项：border / block | N
animation | String | - | 加载过程动画。可选项：moving / gradient / circle | N
onExpandChange | Function |  | TS 类型：`(value: boolean) => void`<br/>展开图标点击事件 | N

### ChatReasoning Events

名称 | 参数 | 描述
-- | -- | --
expandChange | `(value: boolean)` | 展开图标点击事件
