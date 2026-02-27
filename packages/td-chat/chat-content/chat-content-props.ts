/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */
import { TdChatContentProps } from '../type';
import { PropType } from 'vue';

export default {
  /** 聊天内容，支持多种内容类型 */
  content: {
    type: [String, Object] as PropType<TdChatContentProps['content']>,
    default: '',
  },
  /** 角色，不同选项配置不同的样式，支持类型包括用户、助手、错误、模型切换、系统消息 */
  role: {
    type: String as PropType<TdChatContentProps['role']>,
    default: '',
    validator(val: string): boolean {
      if (!val) return true;
      return ['', 'user', 'assistant', 'error', 'model-change', 'system'].includes(val);
    },
  },
  /** Markdown引擎类型，用于解析Markdown内容 */
  markdownProps: {
    type: Object as PropType<TdChatContentProps['markdownProps']>,
    default: () => ({ engine: 'cherry-markdown', options: {} }),
  },
  status: {
    type: String as PropType<TdChatContentProps['status']>,
    default: '',
  },
};
