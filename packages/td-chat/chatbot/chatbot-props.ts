import { PropType } from 'vue';
import type { TNode } from '../type';

export type ChatMessageStatus = 'idle' | 'pending' | 'streaming' | 'complete' | 'stop' | 'error';
export type ModelRoleEnum = 'assistant' | 'user' | 'system';
export type Layout = 'single' | 'both';
export type ChatMessageSetterMode = 'replace' | 'prepend' | 'append';

export interface MetaData {
  avatar?: string;
  name?: string;
  [key: string]: any;
}

export interface AIMessageContent {
  type: string;
  [key: string]: any;
}

export interface ChatMessagesData {
  id: string;
  role: ModelRoleEnum;
  content: AIMessageContent[] | string;
  status?: ChatMessageStatus;
  datetime?: string;
  avatar?: string;
  name?: string;
  comment?: 'good' | 'bad' | '';
  [key: string]: any;
}

export interface ChatRequestParams {
  prompt?: string;
  attachments?: any[];
  [key: string]: any;
}

export interface ChatServiceConfigSetter {
  model?: string;
  apiKey?: string;
  baseUrl?: string;
  [key: string]: any;
}

export interface TdChatMessageConfigItem {
  variant?: 'base' | 'outline' | 'text';
  placement?: 'left' | 'right';
  avatar?: string | object;
  name?: string;
  actions?: boolean | string[];
  [key: string]: any;
}

export type TdChatMessageConfig = {
  [key in ModelRoleEnum]?: TdChatMessageConfigItem;
};

export interface TdChatListScrollToOptions {
  behavior?: 'auto' | 'smooth';
  to?: 'top' | 'bottom';
}

export interface TdChatbotProps {
  layout?: Layout;
  reverse?: boolean;
  defaultMessages?: ChatMessagesData[];
  messageProps?: TdChatMessageConfig | ((msg: ChatMessagesData) => TdChatMessageConfigItem);
  listProps?: Record<string, any>;
  senderProps?: Record<string, any>;
  chatServiceConfig?: ChatServiceConfigSetter | (() => ChatServiceConfigSetter);
  autoSendPrompt?: string;
  onMessageChange?: (messages: ChatMessagesData[]) => void;
  onChatReady?: () => void;
  onChatAfterSend?: (params: ChatRequestParams) => void;
}

export interface TdChatbotApi {
  sendUserMessage: (params: ChatRequestParams) => Promise<void>;
  sendSystemMessage: (msg: string) => void;
  sendAIMessage: (options?: { params?: ChatRequestParams; content?: AIMessageContent[]; sendRequest?: boolean }) => Promise<void>;
  setMessages: (messages: ChatMessagesData[], mode?: ChatMessageSetterMode) => void;
  clearMessages: () => void;
  abortChat: () => Promise<void>;
  addPrompt: (prompt: string, autoFocus?: boolean) => void;
  scrollList: (opt?: TdChatListScrollToOptions) => void;
  regenerate: (keepVersion?: boolean) => Promise<void>;
  registerMergeStrategy: <T extends AIMessageContent>(type: T['type'], handler: (chunk: T, existing?: T) => T) => void;
  selectFile: () => void;
  readonly chatMessageValue: ChatMessagesData[];
  readonly chatStatus: ChatMessageStatus;
  readonly senderLoading: boolean;
  readonly isChatEngineReady: boolean;
}

const props = {
  layout: {
    type: String as PropType<Layout>,
    default: 'both' as Layout,
    validator: (val: string) => ['single', 'both'].includes(val),
  },
  reverse: {
    type: Boolean,
    default: false,
  },
  defaultMessages: {
    type: Array as PropType<ChatMessagesData[]>,
    default: () => [],
  },
  messageProps: {
    type: [Object, Function] as PropType<TdChatMessageConfig | ((msg: ChatMessagesData) => TdChatMessageConfigItem)>,
  },
  listProps: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  senderProps: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  chatServiceConfig: {
    type: [Object, Function] as PropType<ChatServiceConfigSetter | (() => ChatServiceConfigSetter)>,
  },
  autoSendPrompt: {
    type: String,
    default: '',
  },
};

export default props;
