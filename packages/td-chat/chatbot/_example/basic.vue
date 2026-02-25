<template>
  <div class="chatbot-demo">
    <t-chatbot ref="chatbotRef" :messages="messages" :loading="loading" @send="handleSend" @stop="handleStop" />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const chatbotRef = ref(null);
    const loading = ref(false);
    const messages = ref([
      {
        id: '1',
        role: 'user',
        content: '你好，请介绍一下自己',
        datetime: '今天16:38',
      },
      {
        id: '2',
        role: 'assistant',
        content: '你好！我是 TDesign AI 助手，很高兴为你服务。',
        datetime: '今天16:38',
      },
    ]);

    const handleSend = function (value) {
      if (loading.value) return;

      messages.value.push({
        id: Date.now().toString(),
        role: 'user',
        content: value,
        datetime: new Date().toLocaleTimeString(),
      });

      loading.value = true;

      setTimeout(() => {
        messages.value.push({
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '这是一个模拟的回复消息。',
          datetime: new Date().toLocaleTimeString(),
        });
        loading.value = false;
      }, 1000);
    };

    const handleStop = function () {
      loading.value = false;
    };

    return {
      chatbotRef,
      loading,
      messages,
      handleSend,
      handleStop,
    };
  },
});
</script>
<style>
.chatbot-demo {
  height: 600px;
}
</style>
