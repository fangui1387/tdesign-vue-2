import { ref, onMounted, onUnmounted, watch, type Ref } from 'vue';
import type { ChatMessagesData, ChatStatus, ChatServiceConfig } from 'tdesign-web-components/lib/chat-engine';
import { TdChatProps } from 'tdesign-web-components';
import ChatEngine from 'tdesign-web-components/lib/chat-engine';

export const useChat = (options: {
  defaultMessages: TdChatProps['defaultMessages'];
  chatServiceConfig: ChatServiceConfig;
}) => {
  const messages: Ref<ChatMessagesData[]> = ref([]);
  const status: Ref<ChatStatus> = ref('idle');
  const chatEngineRef = ref<ChatEngine | null>(null);
  const msgSubscribeRef = ref<(() => void) | null>(null);
  const prevInitialMessages = ref<ChatMessagesData[]>([]);

  const toPlainMessages = (state: ChatMessagesData[] | undefined): ChatMessagesData[] => {
    if (!state || !state.length) return [];
    return JSON.parse(JSON.stringify(state));
  };

  const syncState = (state: ChatMessagesData[]) => {
    // Vue 2: 避免把 MessageStore/Immer 产生的代理或 Vue3 响应式对象直接赋给 ref，否则会触发 observeArray 等错误
    messages.value = toPlainMessages(state);
    status.value = messages.value[messages.value.length - 1]?.status || 'idle';
  };

  const subscribeToChat = () => {
    if (!chatEngineRef.value) return;

    msgSubscribeRef.value = chatEngineRef.value.messageStore.subscribe((state: any) => {
      // 兼容 state 为 { messages } 或直接为 messages 数组（与 pro-components / AGUI 引擎一致）
      const list = Array.isArray(state) ? state : state?.messages;
      syncState(list ?? []);
    });
  };

  const initChat = () => {
    chatEngineRef.value = new ChatEngine();
    // Vue 2: 只传普通对象给引擎，避免引擎内部持有响应式引用导致 Immer setState 时 observeArray 报错
    const plainDefault = toPlainMessages(options.defaultMessages || []);
    chatEngineRef.value.init(options.chatServiceConfig, plainDefault);
    syncState(plainDefault);
    subscribeToChat();
  };

  onMounted(() => {
    initChat();
  });

  onUnmounted(() => {
    if (msgSubscribeRef.value) {
      msgSubscribeRef.value();
    }
  });

  watch(
    () => options.defaultMessages,
    (newMessages) => {
      const hasChanged = JSON.stringify(prevInitialMessages.value) !== JSON.stringify(newMessages);

      if (hasChanged && newMessages && newMessages.length > 0) {
        prevInitialMessages.value = newMessages;
        const plainNew = toPlainMessages(newMessages);
        if (chatEngineRef.value) {
          chatEngineRef.value.setMessages(plainNew, 'replace');
          syncState(plainNew);
        }
      }
    },
    { deep: true },
  );

  return {
    chatEngine: chatEngineRef,
    messages,
    status,
  };
};
