<template>
  <div style="margin-top: -18px; height: 408px; display: flex; flex-direction: column">
    <!-- 与 pro-components 一致：用 :data 驱动列表，确保 messages 更新时列表重渲染 -->
    <t-chat-list
      ref="listRef"
      :data="messages"
      :message-props="messageProps"
      :clear-history="false"
      :text-loading="senderLoading"
      :animation="messageProps.assistant?.animation || 'skeleton'"
    >
      <template #content="{ item, index }">
        <!-- reasoning 段：自定义渲染（仅当 content 为 AGUI 分段数组时） -->
        <template v-for="(contentItem, contentIndex) in (Array.isArray(item.content) ? item.content : [])">
          <div v-if="contentItem.type === 'reasoning'" :key="`reasoning-${contentIndex}`" class="toolcall-wrapper">
            <div
              v-for="(subItem, subIndex) in (contentItem.data || [])"
              :key="`toolcall-${contentIndex}-${subIndex}`"
              class="toolcall-wrapper"
            >
              <CustomToolCallRenderer
                v-if="subItem.type === 'toolcall'"
                :tool-call="subItem.data"
                :status="subItem.status"
              />
            </div>
          </div>
          <!-- text / markdown 段由 t-chat-message 内部渲染 -->
        </template>
      </template>
      <template #actionbar="{ item, index }">
        <t-chat-actionbar
          v-if="isAIMessage(item) && item.status === 'complete'"
          :action-bar="getChatActionBar(index === messages.length - 1)"
          :content="getMessageContentForCopy(item)"
          :comment="item.comment || ''"
          @actions="(name) => actionHandler(name, { message: item, idx: index })"
        />
      </template>
    </t-chat-list>

    <t-chat-sender
      ref="inputRef"
      v-model="inputValue"
      placeholder="请输入内容"
      :loading="senderLoading"
      @change="inputChangeHandler"
      @send="sendHandler"
      @stop="stopHandler"
    >
      <template #suffix="{ renderPresets }">
        <!-- Vue 2: 不能用 <component :is="renderPresets([])" />，:is 需要组件选项而非 VNode，用 RenderHelper 渲染返回的 VNode -->
        <render-helper :render-fn="() => renderPresets([])" />
      </template>
    </t-chat-sender>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import {
  TdChatMessageConfig,
  ChatRequestParams,
  ChatMessagesData,
  TdChatActionsName,
  TdChatListApi,
  TdChatSenderApi,
  isAIMessage,
  getMessageContentForCopy,
  AGUIAdapter,
  useChat,
} from '@jump-mp/td-chat';
import { MessagePlugin } from 'tdesign-vue';
import CustomToolCallRenderer from './components/Toolcall.vue';
import RenderHelper from './components/RenderHelper';

export default defineComponent({
  name: 'Demo',
  components: {
    CustomToolCallRenderer,
    RenderHelper,
  },
  setup() {
    const listRef = ref<TdChatListApi | null>(null);
    const inputRef = ref<TdChatSenderApi | null>(null);
    const inputValue = ref<string>('AG-UI协议的作用是什么');
    const loadingHistory = ref<boolean>(false);

    const { chatEngine, messages, status } = useChat({
      defaultMessages: [],
      // 聊天服务配置
      chatServiceConfig: {
        // 对话服务地址
        endpoint: `https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/sse/agui-simple`,
        // 开启agui协议解析支持
        protocol: 'agui',
        stream: true,
        onStart: (chunk) => {
          console.log('onStart', chunk);
        },
        // 流式对话结束（aborted为true时，表示用户主动结束对话，params为请求参数）
        onComplete: (aborted: boolean, params: RequestInit, event) => {
          console.log('onComplete', aborted, params, event);
        },
        // 流式对话过程中出错业务自定义行为
        onError: (err: Error | Response) => {
          console.error('Chatservice Error:', err);
        },
        // 流式对话过程中用户主动结束对话业务自定义行为
        onAbort: async () => {},
        // 自定义请求参数
        onRequest: (innerParams: ChatRequestParams) => {
          const { prompt } = innerParams;
          return {
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify({
              uid: 'agent_uid',
              prompt,
            }),
          };
        },
      },
    });

    const senderLoading = computed(() => {
      if (status.value === 'pending' || status.value === 'streaming') {
        return true;
      }
      return false;
    });

    // 消息属性配置
    const messageProps: TdChatMessageConfig = {
      user: {
        variant: 'base',
        placement: 'right',
      },
      assistant: {
        placement: 'left',
        // 内置的消息渲染配置
        chatContentProps: {
          thinking: {
            maxHeight: 300,
          },
          reasoning: {
            maxHeight: 300,
            defaultCollapsed: false,
          },
        },
      },
    };

    const getChatActionBar = (isLast: boolean): TdChatActionsName[] => {
      let filterActions: TdChatActionsName[] = ['replay', 'good', 'bad', 'copy'];
      if (!isLast) {
        // 只有最后一条AI消息才能重新生成
        filterActions = filterActions.filter((item) => item !== 'replay');
      }
      return filterActions;
    };

    const actionHandler = (name: string, { message, idx }: { message: any; idx: number }) => {
      switch (name) {
        case 'replay': {
          chatEngine.value?.regenerateAIMessage();
          return;
        }
        case 'good':
        case 'bad':
          // 设置comment状态
          if (idx !== undefined && messages.value[idx]) {
            const curMessage = message;
            curMessage.comment = curMessage.comment === name ? '' : name;
          }
          break;
        default:
          console.log('触发action', name, 'data', message);
      }
    };

    const sendUserMessage = async (requestParams: ChatRequestParams) => {
      await chatEngine.value?.sendUserMessage(requestParams);
      listRef.value?.scrollToBottom();
    };

    // 输入变更处理
    const inputChangeHandler = (value: string) => {
      inputValue.value = value;
    };

    // 发送处理
    const sendHandler = async (params: string) => {
      if (senderLoading.value) {
        MessagePlugin.error('回答输出中，请稍后操作或点击停止回答');
      } else {
        await sendUserMessage({ prompt: params });
        inputValue.value = '';
      }
    };

    // 停止处理
    const stopHandler = () => {
      chatEngine.value?.abortChat();
    };

    // 加载历史消息
    const loadHistoryMessages = async () => {
      loadingHistory.value = true;
      try {
        const response = await fetch(`http://127.0.0.1:3000/api/conversation/history?type=simple`);
        const result = await response.json();
        if (result.success && result.data) {
          const historyMessages = AGUIAdapter.convertHistoryMessages(result.data);
          chatEngine.value?.setMessages(historyMessages);
          listRef.value?.scrollToBottom();
        }
      } catch (error) {
        console.error('加载历史消息出错:', error);
        MessagePlugin.error('加载历史消息出错');
      } finally {
        loadingHistory.value = false;
      }
    };

    // 清空消息
    const clearMessages = () => {
      chatEngine.value?.clearMessages();
      MessagePlugin.success('已清空消息');
    };

    return {
      listRef,
      inputRef,
      inputValue,
      loadingHistory,
      messages,
      senderLoading,
      messageProps,
      isAIMessage,
      getMessageContentForCopy,
      getChatActionBar,
      actionHandler,
      sendUserMessage,
      inputChangeHandler,
      sendHandler,
      stopHandler,
      loadHistoryMessages,
      clearMessages,
    };
  },
});
</script>

<style scoped>
.toolcall-wrapper {
  margin: 8px 0;
}
</style>
