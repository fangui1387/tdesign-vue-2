/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { PropType } from 'vue';

export default {
  /** 头像 */
  avatar: {
    type: [String, Object, Function] as PropType<string | object | Function>,
  },
  /** 昵称 */
  name: {
    type: [String, Function] as PropType<string | Function>,
  },
  /** 角色 */
  role: {
    type: String as PropType<'user' | 'assistant' | 'error' | 'model-change' | 'system'>,
    default: 'assistant',
  },
  /** 内容 */
  content: {
    type: [String, Function] as PropType<string | Function>,
  },
  /** 时间 */
  datetime: {
    type: [String, Function] as PropType<string | Function>,
  },
  /** 状态 */
  status: {
    type: String as PropType<'pending' | 'complete' | 'error'>,
    default: 'complete',
  },
  /** 位置 */
  placement: {
    type: String as PropType<'left' | 'right'>,
    default: 'left',
  },
  /** 动画效果 */
  animation: {
    type: String as PropType<'skeleton' | 'moving' | 'gradient'>,
    default: 'skeleton',
  },
  /** 是否允许内容分段自定义 */
  allowContentSegmentCustom: {
    type: Boolean,
    default: false,
  },
};
