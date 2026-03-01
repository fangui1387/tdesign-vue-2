import { defineComponent, ref, computed, provide, onMounted, onUnmounted, toRefs, watch, nextTick } from 'vue';
import { merge } from 'lodash-es';
import ChatList from '../chat-list';
import ChatSender from '../chat-sender';
import ChatMessage from '../chat-message';
import ChatActionbar from '../chat-actionbar';
import { useConfig, usePrefixClass, useTNodeJSX } from '../utils/hooks';
import props, {
  ChatMessagesData,
  ChatRequestParams,
  ChatMessageStatus,
  TdChatMessageConfig,
  TdChatMessageConfigItem,
  TdChatListScrollToOptions,
  AIMessageContent,
  ModelRoleEnum,
} from './chatbot-props';

import type { ChatMessageStore } from 'tdesign-web-components/lib/chat-engine';

const DefaultChatMessageActionsName = ['replay', 'copy', 'good', 'bad'];

function isAIMessage(message: ChatMessagesData): boolean {
  return message.role === 'assistant';
}

function getMessageContentForCopy(message: ChatMessagesData): string {
  const content = message.content;
  if (typeof content === 'string') {
    return content;
  }
  if (Array.isArray(content)) {
    return content
      .filter((item) => item.type === 'text')
      .map((item) => (item as any).text || '')
      .join('\n');
  }
  return '';
}

export default defineComponent({
  name: 'TChatbot',
  props,
  emits: ['messageChange', 'chatReady', 'chatAfterSend', 'send', 'stop'],
  setup(props, { emit }) {
    const COMPONENT_NAME = usePrefixClass('chat');
    const { globalConfig } = useConfig('chat');
    const renderTNodeJSX = useTNodeJSX();

    const chatListRef = ref<InstanceType<typeof ChatList>>();
    const chatSenderRef = ref<InstanceType<typeof ChatSender>>();
    const senderValue = ref('');
    const chatStatus = ref<ChatMessageStatus>('idle');
    const isChatEngineReady = ref(false);
    const messages = ref<ChatMessagesData[]>([...props.defaultMessages]);
    const uploadedAttachments = ref<any[]>([]);

    const messageRoleProps = ref<TdChatMessageConfig>({
      user: {
        variant: 'text',
        placement: 'right',
      },
      assistant: {
        variant: 'text',
        placement: 'left',
      },
      system: {},
    });

    let chatEngine: any = null;
    let unsubscribeMsg: (() => void) | null = null;

    const senderLoading = computed(() => {
      return chatStatus.value === 'pending' || chatStatus.value === 'streaming';
    });

    const layoutClass = computed(() => {
      return props.layout === 'both'
        ? `${COMPONENT_NAME.value}-layout-both`
        : `${COMPONENT_NAME.value}-layout-single`;
    });

    const classes = computed(() => {
      return [COMPONENT_NAME.value, layoutClass.value];
    });

    const initChat = async () => {
      const { chatServiceConfig, autoSendPrompt } = props;

      if (typeof props.messageProps === 'object') {
        messageRoleProps.value = merge({}, messageRoleProps.value, props.messageProps);
      }

      try {
        const ChatEngineClass = (await import('tdesign-web-components/lib/chat-engine')).default;
        chatEngine = new ChatEngineClass();

        const config = typeof chatServiceConfig === 'function' ? chatServiceConfig() : chatServiceConfig;
        chatEngine.init(config, messages.value);

        subscribeToChat();

        if (autoSendPrompt && autoSendPrompt !== 'undefined') {
          await chatEngine.sendUserMessage({ prompt: autoSendPrompt });
        }

        isChatEngineReady.value = true;
        emit('chatReady');
      } catch (error) {
        console.warn('ChatEngine initialization failed, using local mode:', error);
        isChatEngineReady.value = true;
        emit('chatReady');
      }
    };

    const subscribeToChat = () => {
      if (!chatEngine?.messageStore) return;

      unsubscribeMsg = chatEngine.messageStore.subscribe((state: ChatMessageStore) => {
        syncState(state.messages);
      });
    };

    const syncState = (newMessages: ChatMessagesData[]) => {
      messages.value = newMessages;
      const lastMessage = newMessages[newMessages.length - 1];
      chatStatus.value = lastMessage?.status || 'idle';
      emit('messageChange', newMessages);
    };

    const getMessageProps = (message: ChatMessagesData): TdChatMessageConfigItem => {
      const role = message.role as ModelRoleEnum;
      let itemProps: TdChatMessageConfigItem = {
        ...(messageRoleProps.value[role] || {}),
        message,
      };

      if (typeof props.messageProps === 'function') {
        itemProps = merge({}, itemProps, props.messageProps(message) || {});
      }

      return itemProps;
    };

    const getChatActionBar = (messageProps: TdChatMessageConfigItem, message: ChatMessagesData) => {
      const { actions } = messageProps;
      const ids = messages.value.map((m) => m.id);
      const isLast = message.id === ids[ids.length - 1];
      const isFirstAI = isAIMessage(message) && message.id === ids[0];

      if (!isAIMessage(message) || !actions || isFirstAI || ids.length === 1) {
        return false;
      }

      let filterActions = actions;
      if (actions === true) {
        filterActions = DefaultChatMessageActionsName;
      }
      if (Array.isArray(filterActions) && !isLast) {
        filterActions = (filterActions as string[]).filter((item) => item !== 'replay');
      }

      return filterActions;
    };

    const handleClickAction = (action: string, message: ChatMessagesData) => {
      if (action === 'replay') {
        regenerate();
      }
    };

    const renderMessages = () => {
      const items = props.reverse ? [...messages.value].reverse() : messages.value;

      return items.map((item) => {
        const itemProps = getMessageProps(item);
        const actionBar = getChatActionBar(itemProps, item);

        if (actionBar) {
          return (
            <ChatMessage
              key={item.id}
              role={item.role}
              avatar={item.avatar || itemProps.avatar}
              name={item.name || itemProps.name}
              content={item.content}
              datetime={item.datetime}
              status={item.status === 'pending' ? 'pending' : 'complete'}
              variant={itemProps.variant}
              placement={itemProps.placement}
              message={item}
            >
              <ChatActionbar
                actionBar={actionBar as string[]}
                copyText={getMessageContentForCopy(item)}
                comment={isAIMessage(item) ? item.comment : false}
                onActions={(action: string) => handleClickAction(action, item)}
              />
            </ChatMessage>
          );
        }

        return (
          <ChatMessage
            key={item.id}
            role={item.role}
            avatar={item.avatar || itemProps.avatar}
            name={item.name || itemProps.name}
            content={item.content}
            datetime={item.datetime}
            status={item.status === 'pending' ? 'pending' : 'complete'}
            variant={itemProps.variant}
            placement={itemProps.placement}
            message={item}
          />
        );
      });
    };

    const handleSend = async (value: string, context: { e: MouseEvent | KeyboardEvent }) => {
      emit('send', value, context);

      if (chatEngine) {
        const params: ChatRequestParams = {
          prompt: value,
          attachments: uploadedAttachments.value,
        };
        await sendUserMessage(params);
      } else {
        messages.value.push({
          id: Date.now().toString(),
          role: 'user',
          content: value,
          datetime: new Date().toLocaleTimeString(),
          status: 'complete',
        });

        chatStatus.value = 'pending';

        await nextTick();
        scrollList({ to: 'bottom' });

        setTimeout(() => {
          messages.value.push({
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: 'This is a simulated response.',
            datetime: new Date().toLocaleTimeString(),
            status: 'complete',
          });
          chatStatus.value = 'complete';
          emit('messageChange', messages.value);
        }, 1000);
      }

      senderValue.value = '';
      uploadedAttachments.value = [];
    };

    const handleStop = (value: string, context: { e: MouseEvent }) => {
      emit('stop', value, context);
      if (chatEngine) {
        chatEngine.abortChat();
      } else {
        chatStatus.value = 'idle';
      }
    };

    const sendUserMessage = async (params: ChatRequestParams) => {
      if (chatEngine) {
        await chatEngine.sendUserMessage(params);
        uploadedAttachments.value = [];
        scrollList({ to: 'bottom' });
        emit('chatAfterSend', params);
      }
    };

    const sendAIMessage = async (options?: { params?: ChatRequestParams; content?: AIMessageContent[]; sendRequest?: boolean }) => {
      if (chatEngine) {
        await chatEngine.sendAIMessage(options);
      }
    };

    const sendSystemMessage = (msg: string) => {
      if (chatEngine) {
        chatEngine.sendSystemMessage(msg);
      }
    };

    const clearMessages = () => {
      if (!isChatEngineReady.value) return;
      if (chatEngine?.messageStore) {
        chatEngine.messageStore.clearHistory();
      } else {
        messages.value = [];
        emit('messageChange', []);
      }
    };

    const setMessages = (newMessages: ChatMessagesData[], mode: 'replace' | 'prepend' | 'append' = 'replace') => {
      if (!isChatEngineReady.value) return;
      if (newMessages.length === 0) {
        clearMessages();
        return;
      }
      if (chatEngine?.messageStore) {
        chatEngine.messageStore.setMessages(newMessages, mode);
      } else {
        if (mode === 'replace') {
          messages.value = [...newMessages];
        } else if (mode === 'prepend') {
          messages.value = [...newMessages, ...messages.value];
        } else if (mode === 'append') {
          messages.value = [...messages.value, ...newMessages];
        }
        emit('messageChange', messages.value);
      }
    };

    const abortChat = async () => {
      if (chatEngine) {
        await chatEngine.abortChat();
      } else {
        chatStatus.value = 'idle';
      }
    };

    const regenerate = async (keepVersion: boolean = false) => {
      if (chatEngine) {
        await chatEngine.regenerateAIMessage(keepVersion);
      }
    };

    const registerMergeStrategy = <T extends AIMessageContent>(type: T['type'], handler: (chunk: T, existing?: T) => T) => {
      if (chatEngine) {
        chatEngine.registerMergeStrategy(type, handler);
      }
    };

    const addPrompt = (prompt: string, autoFocus: boolean = true) => {
      senderValue.value = prompt;
      if (autoFocus && chatSenderRef.value) {
        (chatSenderRef.value as any).focus?.();
      }
    };

    const selectFile = () => {
      if (chatSenderRef.value) {
        (chatSenderRef.value as any).selectFile?.();
      }
    };

    const scrollList = (options?: TdChatListScrollToOptions) => {
      if (chatListRef.value) {
        chatListRef.value.scrollToBottom(options);
      }
    };

    provide('chatEngine', chatEngine);

    onMounted(() => {
      initChat();
    });

    onUnmounted(() => {
      if (unsubscribeMsg) {
        unsubscribeMsg();
      }
      if (chatEngine) {
        chatEngine.abortChat();
      }
    });

    watch(
      () => props.defaultMessages,
      (newMessages) => {
        if (!chatEngine && newMessages.length > 0) {
          messages.value = [...newMessages];
        }
      },
      { deep: true }
    );

    return {
      sendUserMessage,
      sendAIMessage,
      sendSystemMessage,
      clearMessages,
      setMessages,
      abortChat,
      addPrompt,
      scrollList,
      regenerate,
      registerMergeStrategy,
      selectFile,
      chatMessageValue: messages,
      chatStatus,
      senderLoading,
      isChatEngineReady,
      classes,
      chatListRef,
      chatSenderRef,
      messages,
      senderValue,
      globalConfig,
      handleSend,
      handleStop,
      COMPONENT_NAME,
    };
  },
  render() {
    const {
      classes,
      chatListRef,
      messages,
      chatStatus,
      COMPONENT_NAME,
      chatSenderRef,
      senderValue,
      senderLoading,
      globalConfig,
      handleSend,
      handleStop,
    } = this as any;

    return (
      <div class={classes.value}>
        {messages.value.length > 0 && (
          <ChatList
            ref={chatListRef}
            data={messages.value}
            layout={this.layout}
            reverse={this.reverse}
            textLoading={chatStatus.value === 'pending'}
            {...this.listProps}
          />
        )}
        <div class={`${COMPONENT_NAME.value}-input-wrapper`}>
          <ChatSender
            ref={chatSenderRef}
            v-model={senderValue.value}
            loading={senderLoading.value}
            placeholder={globalConfig.value.placeholder}
            onSend={handleSend}
            onStop={handleStop}
            {...this.senderProps}
          />
        </div>
      </div>
    );
  },
});
