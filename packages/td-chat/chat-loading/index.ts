import { TdChatLoadingProps } from 'tdesign-web-components';
import 'tdesign-web-components/lib/chat-loading';
import type { DefineComponent } from 'vue';
import { omiVueify } from 'omi-vueify';

export const ChatLoading = omiVueify('t-chat-loading', {
  methodNames: [],
}) as DefineComponent<TdChatLoadingProps>;
export default ChatLoading;
export { default as chatLoadingProps } from './chat-loading-props';
