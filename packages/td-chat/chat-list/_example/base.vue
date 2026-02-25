<template>
  <div class="chat-box">
    <t-chat-list
      ref="chatRef"
      :clear-history="chatList.length > 0 && !isStreamLoad"
      :data="chatList"
      :text-loading="loading"
      style="height: 600px"
      animation="gradient"
      @scroll="handleChatScroll"
      @clear="clearConfirm"
    >
      <template #content="{ item, index }">
        <template v-for="(content, contentIndex) in item.content" :key="contentIndex">
          <t-chat-thinking v-if="content.type === 'thinking'" :status="content.status" :content="content.data" />
          <t-chat-content v-else :content="content.data" :role="item.role" />
        </template>
      </template>
      <template #actionbar="{ item, index }">
        <t-chat-actionbar
          v-if="item.role === 'assistant'"
          :content="getActionContent(item.content)"
          :action-bar="['good', 'bad', 'replay', 'copy']"
          :comment="item.comment"
          @actions="(type) => handleOperation(type, { item, index })"
        />
      </template>
      <template #footer>
        <t-chat-sender v-model="query" :loading="isStreamLoad" @send="inputEnter" @stop="onStop"> </t-chat-sender>
      </template>
    </t-chat-list>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const chatRef = ref(null);
    const loading = ref(false);
    const isStreamLoad = ref(false);
    const query = ref('');

    const chatList = ref([
      {
        avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
        name: '自己',
        datetime: '今天16:38',
        role: 'user',
        content: [
          {
            type: 'text',
            data: '南极的自动提款机叫什么名字？',
          },
        ],
      },
      {
        avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
        name: 'TDesignAI',
        datetime: '今天16:38',
        role: 'assistant',
        content: [
          {
            type: 'text',
            data: '它叫 McMurdo Station ATM，是美国富国银行安装在南极洲最大科学中心麦克默多站的一台自动提款机。',
          },
        ],
      },
    ]);

    const handleChatScroll = function ({ e }) {
      console.log('handleChatScroll', e);
    };

    const clearConfirm = function () {
      chatList.value = [];
    };

    const handleOperation = function (type, { item, index }) {
      console.log('handleOperation', type, { item, index });
      if (type === 'good' || type === 'bad') {
        if (item) {
          item.comment = item.comment === type ? '' : type;
        }
      }
    };

    const getActionContent = function (contentArray) {
      const textContent = contentArray.find((item) => item.type === 'text' || item.type === 'markdown');
      return textContent ? textContent.data : '';
    };

    const onStop = function () {
      loading.value = false;
      isStreamLoad.value = false;
    };

    const inputEnter = function (inputValue) {
      if (isStreamLoad.value) return;
      if (!inputValue) return;

      const params = {
        avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
        name: '自己',
        datetime: new Date().toDateString(),
        role: 'user',
        content: [
          {
            type: 'text',
            data: inputValue,
          },
        ],
      };

      chatList.value.push(params);
      query.value = '';

      const params2 = {
        avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
        name: 'TDesignAI',
        datetime: new Date().toDateString(),
        role: 'assistant',
        content: [
          {
            type: 'text',
            data: '这是一个模拟的回复消息。',
          },
        ],
      };

      chatList.value.push(params2);
    };

    return {
      chatRef,
      loading,
      isStreamLoad,
      query,
      chatList,
      handleChatScroll,
      clearConfirm,
      handleOperation,
      getActionContent,
      onStop,
      inputEnter,
    };
  },
});
</script>
<style>
.chat-box {
  height: 600px;
}
</style>
