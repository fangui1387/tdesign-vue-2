import { defineComponent } from 'vue';
import type { DefineComponent } from 'vue';
import type { TdChatMessageProps } from 'tdesign-web-components';
import 'tdesign-web-components/lib/chat-message';
import { omiVueify } from 'omi-vueify';
import props from './chat-message-props';
import { useTNodeJSX } from '../utils/hooks';

const BaseChatMessage = omiVueify('t-chat-item', {
  methodNames: [],
}) as DefineComponent<TdChatMessageProps>;

export default defineComponent({
  name: 'ChatMessage',
  props,
  setup(props, { slots }) {
    const renderTNodeJSX = useTNodeJSX();

    const renderContent = () => {
      const baseSlots = {
        actionbar: () => {
          const actionbar = renderTNodeJSX('actionbar', { slotFirst: true }) && slots.actionbar?.();
          return actionbar ? <div>{actionbar}</div> : null;
        },
        name: () => {
          const name = renderTNodeJSX('name', { slotFirst: true }) && slots.name?.();
          return name ? <div>{name}</div> : null;
        },
        avatar: () => {
          const avatar = renderTNodeJSX('avatar', { slotFirst: true }) && slots.avatar?.();
          return avatar ? <div>{avatar}</div> : null;
        },
        datetime: () => {
          const datetime = renderTNodeJSX('datetime', { slotFirst: true }) && slots.datetime?.();
          return datetime ? <div>{datetime}</div> : null;
        },
        header: () => {
          const header = renderTNodeJSX('header', { slotFirst: true }) && slots.header?.();
          return header ? <div>{header}</div> : null;
        },
      };

      let vSlots = null;
      if (props.allowContentSegmentCustom) {
        vSlots = {
          ...slots,
          ...baseSlots,
        };
      } else {
        vSlots = {
          ...baseSlots,
          content: () => {
            const content = (renderTNodeJSX('content', { slotFirst: true }) && slots.content?.()) || slots.default?.();
            return content ? <div>{content}</div> : null;
          },
        };
      }

      return (
        <BaseChatMessage
          {...(props as TdChatMessageProps)}
          v-slots={{
            ...vSlots,
          }}
        />
      );
    };

    return renderContent;
  },
}) as any;
