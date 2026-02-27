import _ChatList from './chat-list';
import _ChatItem from './chat-item';
import _ChatInput from './chat-input';
import _ChatContent from './chat-content';
import _ChatReasoning from './chat-reasoning';
import _ChatLoading from './chat-loading';

import _ChatActionbar from './chat-actionbar';
import _ChatSender from './chat-sender';
import _Attachments from './attachments';
import _ChatThinking from './chat-thinking';
import _Chatbot from './chatbot';
import _ChatMarkdown from './chat-markdown';
import { ChatSearchContentComponent, ChatSuggestionContentComponent } from './chatbot';

import _ChatMessage from './chat-message';
import { withInstall } from '@tdesign/shared-utils';
import { ToolCallRenderer } from './chat-engine/components/toolcall';
export * from './chat-engine';

import {
  TdChatProps,
  TdChatItemProps,
  TdChatContentProps,
  TdChatActionProps,
  TdChatInputProps,
  TdChatSenderProps,
  TdChatReasoningProps,
  TdChatLoadingProps,
  TdChatThinkingProps,
} from './type';

import './style';
import 'tdesign-web-components/lib/style/index.css';
import 'tdesign-web-components/lib/chat-message/content/search-content';
import 'tdesign-web-components/lib/chat-message/content/suggestion-content';
import { TdMarkdownEngine } from 'tdesign-web-components/lib/chat-message';

export * from './type';

export type ChatProps = TdChatProps;
export type ChatItemProps = TdChatItemProps;
export type ChatContentProps = TdChatContentProps;
export type ChatActionProps = TdChatActionProps;
export type ChatInputProps = TdChatInputProps;
export type ChatSenderProps = TdChatSenderProps;
export type ChatReasoningProps = TdChatReasoningProps;
export type ChatLoadingProps = TdChatLoadingProps;
export type ChatThinkingProps = TdChatThinkingProps;

export const ChatList = withInstall(_ChatList);
export const ChatSender = withInstall(_ChatSender);
export const ChatActionbar = withInstall(_ChatActionbar);
export const ChatLoading = withInstall(_ChatLoading);
export const Attachments = withInstall(_Attachments);
export const ChatThinking = withInstall(_ChatThinking, 't-chat-thinking');
export const Chatbot = withInstall(_Chatbot, 't-chatbot');
export const ChatMessage = withInstall(_ChatMessage, 't-chat-message');
export const ChatContent = withInstall(_ChatContent);
export const ChatSearchContent = withInstall(ChatSearchContentComponent, 't-chat-search-content');

export const ChatSuggestionContent = withInstall(ChatSuggestionContentComponent, 't-chat-suggestion-content');

export const ChatMarkdown = withInstall(_ChatMarkdown, 't-chat-markdown');

export const Chat = withInstall(_ChatList);
export const ChatAction = withInstall(_ChatActionbar);
export const ChatInput = withInstall(_ChatInput);
export const ChatReasoning = withInstall(_ChatReasoning);
export const ChatItem = withInstall(_ChatItem);

export { TdMarkdownEngine as MarkdownEngine };

export { ToolCallRenderer };

export default {
  install(Vue: any, config?: Record<string, unknown>) {
    Vue.use(Chatbot, config);
    Vue.use(ChatList, config);
    Vue.use(ChatContent, config);
    Vue.use(ChatMarkdown, config);
    Vue.use(ChatActionbar, config);
    Vue.use(ChatLoading, config);
    Vue.use(ChatSender, config);
    Vue.use(ChatThinking, config);
    Vue.use(ChatMessage, config);
    Vue.use(Attachments, config);
    Vue.use(ChatSearchContent, config);
    Vue.use(ChatSuggestionContent, config);
    Vue.use(ChatInput, config);
    Vue.use(ChatItem, config);
    Vue.use(ChatReasoning, config);
    Vue.component('TChat', Chat);
    Vue.component('TChatAction', ChatAction);
  },
  version: typeof PKG_VERSION === 'undefined' ? '' : PKG_VERSION,
};

export {
  AGUIAdapter,
  getMessageContentForCopy,
  isAIMessage,
  isToolCallContent,
} from 'tdesign-web-components/lib/chat-engine';

export type {
  SSEChunkData,
  AIMessageContent,
  ChatRequestParams,
  ChatMessagesData,
  ChatServiceConfig,
} from 'tdesign-web-components/lib/chat-engine';
