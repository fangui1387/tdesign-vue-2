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
  /** 是否处于思考状态 */
  thinking: {
    type: Boolean,
    default: false,
  },
  /** 状态 */
  status: {
    type: String as PropType<'thinking' | 'done' | 'error'>,
    default: 'thinking',
  },
};
