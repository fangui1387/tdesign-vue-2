/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { PropType } from 'vue';

export default {
  /** 思考内容 */
  content: {
    type: [Object, Function] as PropType<string | Function>,
  },
  /** 布局方式 */
  layout: {
    type: String as PropType<'block' | 'border'>,
    default: 'block',
  },
  /** 最大高度 */
  maxHeight: {
    type: Number as PropType<number>,
  },
  /** 动画效果 */
  animation: {
    type: String as PropType<'dots' | 'moving' | 'gradient'>,
    default: 'moving',
  },
  /** 是否折叠 */
  collapsed: {
    type: Boolean,
    default: false,
  },
  /** 状态 */
  status: {
    type: String as PropType<'pending' | 'complete' | 'stop' | 'error'>,
    default: 'pending',
  },
};
