import { defineComponent } from 'vue';
import type { DefineComponent } from 'vue';
import type { TdChatThinkContentProps } from 'tdesign-web-components/lib/chat-message/content/thinking-content';
import 'tdesign-web-components/lib/chat-message/content/thinking-content';
import { omiVueify } from 'omi-vueify';
import props from './chat-thinking-props';
import { useTNodeJSX } from '../utils/hooks';

const BaseChatThinking = omiVueify('t-chat-thinking-content', {
  methodNames: [],
}) as DefineComponent<TdChatThinkContentProps>;

export default defineComponent({
  name: 'ChatThinking',
  props,
  setup(props, { slots }) {
    const renderTNodeJSX = useTNodeJSX();

    const renderContent = () => {
      const vSlots = {
        content: () => {
          const content = (renderTNodeJSX('content', { slotFirst: true }) && slots.content?.()) || slots.default?.();
          return content ? <div>{content}</div> : null;
        },
      };
      return (
        <BaseChatThinking
          {...(props as TdChatThinkContentProps)}
          v-slots={{
            ...vSlots,
          }}
        />
      );
    };

    return renderContent;
  },
}) as any;
