/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { PropType } from 'vue';

export default {
  /** 思考内容 */
  content: {
    type: [String, Function] as PropType<string | Function>,
  },
  /** 布局方式 */
  layout: {
    type: String as PropType<'block' | 'border'>,
    default: 'block',
  },
  /** 最大高度 */
  maxHeight: {
    type: [String, Number] as PropType<string | number>,
  },
  /** 动画效果 */
  animation: {
    type: String as PropType<'dots' | 'moving' | 'gradient'>,
    default: 'dots',
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
