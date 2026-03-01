/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { PropType } from 'vue';
import { TdChatThinkingProps } from '../type';
import { TNode } from 'tdesign-vue';

export default {
  /** 思考内容 */
  content: {
    type: [Object, Function, String] as PropType<TdChatThinkingProps['content'] | TNode>,
  },
  /** 布局方式 */
  layout: {
    type: String as PropType<TdChatThinkingProps['layout']>,
    default: 'block' as TdChatThinkingProps['layout'],
    validator(val: TdChatThinkingProps['layout']): boolean {
      if (!val) return true;
      return ['block', 'border'].includes(val);
    },
  },
  /** 最大高度 */
  maxHeight: {
    type: [Number, String] as PropType<TdChatThinkingProps['maxHeight']>,
  },
  /** 动画效果 */
  animation: {
    type: String as PropType<TdChatThinkingProps['animation']>,
    default: 'moving' as TdChatThinkingProps['animation'],
    validator(val: TdChatThinkingProps['animation']): boolean {
      if (!val) return true;
      return ['dots', 'moving', 'gradient'].includes(val);
    },
  },
  /** 是否折叠 */
  collapsed: {
    type: Boolean as PropType<TdChatThinkingProps['collapsed']>,
    default: false as TdChatThinkingProps['collapsed'],
  },
  /** 状态 */
  status: {
    type: String as PropType<TdChatThinkingProps['status']>,
    default: 'pending' as TdChatThinkingProps['status'],
    validator(val: TdChatThinkingProps['status']): boolean {
      if (!val) return true;
      return ['pending', 'complete', 'stop', 'error'].includes(val);
    },
  },
};
