import 'tdesign-web-components/lib/chatbot';
import type { DefineComponent } from 'vue';
import { omiVueify } from 'omi-vueify';
import type {
  TdChatListProps,
  TdChatProps,
  TdChatSearchContentProps,
  TdChatSuggestionContentProps,
} from 'tdesign-web-components';

export const Chatbot = omiVueify('t-chatbot', {
  methodNames: [
    'addPrompt',
    'regenerate',
    'selectFile',
    'registerMergeStrategy',
    'setMessages',
    'clearMessages',
    'sendUserMessage',
    'sendAIMessage',
    'sendSystemMessage',
    'abortChat',
    'scrollList',
  ],
}) as DefineComponent<TdChatProps>;

export const ChatSearchContentComponent = omiVueify('t-chat-search-content', {
  methodNames: [],
}) as DefineComponent<TdChatSearchContentProps>;

export const ChatSuggestionContentComponent = omiVueify('t-chat-suggestion-content', {
  methodNames: [],
}) as DefineComponent<TdChatSuggestionContentProps>;

export const ChatListComponent = omiVueify('t-chat-list', {
  methodNames: ['scrollToBottom'],
}) as DefineComponent<TdChatListProps>;

export default Chatbot;
