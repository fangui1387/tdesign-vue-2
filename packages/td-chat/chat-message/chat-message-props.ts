/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { PropType } from 'vue';

export default {
  /** 动画效果 */
  animation: {
    type: String as PropType<'skeleton' | 'moving' | 'gradient' | 'circle'>,
    default: 'circle',
    validator(val: string): boolean {
      if (!val) return true;
      return ['skeleton', 'moving', 'gradient', 'circle'].includes(val);
    },
  },
  /** 头像 */
  avatar: {
    type: [String, Object, Function] as PropType<string | object | Function>,
  },
  /** 对话单元的时间配置 */
  datetime: {
    type: [String, Function] as PropType<string | Function>,
  },
  /** 自定义的昵称 */
  name: {
    type: [String, Function] as PropType<string | Function>,
  },
  /** 气泡框样式，支持基础、线框、文字三种类型 */
  variant: {
    type: String as PropType<'base' | 'outline' | 'text'>,
    default: 'text',
    validator(val: string): boolean {
      if (!val) return true;
      return ['base', 'outline', 'text'].includes(val);
    },
  },
  /** 消息对象 */
  message: {
    type: Object as PropType<any>,
  },
  /** 角色 */
  role: {
    type: String as PropType<'user' | 'assistant' | 'error' | 'model-change' | 'system'>,
    default: 'assistant',
    validator(val: string): boolean {
      if (!val) return true;
      return ['user', 'assistant', 'error', 'model-change', 'system'].includes(val);
    },
  },
  /** 内容，支持字符串、渲染函数或分段数组（如 AGUI 协议的多段 content） */
  content: {
    type: [String, Function, Array, Object] as PropType<string | Function | any[] | Record<string, unknown>>,
    validator: (val: unknown): boolean =>
      val == null ||
      typeof val === 'string' ||
      typeof val === 'function' ||
      Array.isArray(val) ||
      (typeof val === 'object' && val !== null),
  },
  /** 位置 */
  placement: {
    type: String as PropType<'left' | 'right'>,
    default: 'left',
  },
  /** 聊天内容属性 */
  chatContentProps: {
    type: Object as PropType<any>,
  },
  /** 状态 */
  status: {
    type: String as PropType<'pending' | 'complete' | 'stop' | 'error'>,
    default: 'complete',
    validator(val: string): boolean {
      if (!val) return true;
      return ['pending', 'complete', 'stop', 'error'].includes(val);
    },
  },
  /** 是否允许内容分段自定义 */
  allowContentSegmentCustom: {
    type: Boolean,
    default: false,
  },
};
