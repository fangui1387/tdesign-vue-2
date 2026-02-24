/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { TdChatReasoningProps } from '../type';
import { PropType } from 'vue';

export default {
  /** 透传给 CollapsePanel 组件的全部属性 */
  collapsePanelProps: {
    type: Object as PropType<TdChatReasoningProps['collapsePanelProps']>,
  },
  /** 当前折叠面板展开图标。优先级低于collapsePanelProps.expandIcon */
  expandIcon: {
    type: [String, Function] as PropType<TdChatReasoningProps['expandIcon']>,
  },
  /** 展开图标位置，可选项：left/right */
  expandIconPlacement: {
    type: String as PropType<TdChatReasoningProps['expandIconPlacement']>,
    default: 'right',
    validator: (value: string) => ['left', 'right'].includes(value),
  },
  /** 折叠面板头内容。优先级低于collapsePanelProps.header */
  header: {
    type: [String, Function] as PropType<TdChatReasoningProps['header']>,
  },
  /** 折叠面板尾内容。优先级低于collapsePanelProps.headerRightContent */
  headerRightContent: {
    type: [String, Function] as PropType<TdChatReasoningProps['headerRightContent']>,
  },
  /** 展开图标点击事件 */
  onExpandChange: Function as PropType<TdChatReasoningProps['onExpandChange']>,
  /** 是否折叠 */
  collapsed: {
    type: Boolean,
    default: true,
  },
  /** 布局方式 */
  layout: {
    type: String as PropType<TdChatReasoningProps['layout']>,
    default: 'block',
  },
  /** 加载过程动画 */
  animation: {
    type: String as PropType<TdChatReasoningProps['animation']>,
    default: 'moving',
  },
};
