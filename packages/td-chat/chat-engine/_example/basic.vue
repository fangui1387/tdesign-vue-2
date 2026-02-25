<template>
  <div class="chat-engine-demo">
    <t-chat-list ref="listRef" style="height: 500px">
      <t-chat-message v-for="(msg, idx) in messages" :key="msg.id" :role="msg.role" :content="msg.content" />
      <template #footer>
        <t-chat-sender v-model="inputValue" :loading="isLoading" @send="handleSend" @stop="handleStop" />
      </template>
    </t-chat-list>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const listRef = ref(null);
    const inputValue = ref('');
    const isLoading = ref(false);
    const messages = ref([]);

    const handleSend = async function (value) {
      if (!value || isLoading.value) return;

      messages.value.push({
        id: Date.now().toString(),
        role: 'user',
        content: [{ type: 'text', data: value }],
      });

      inputValue.value = '';
      isLoading.value = true;

      setTimeout(() => {
        messages.value.push({
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: [{ type: 'text', data: '这是一个模拟的回复。' }],
        });
        isLoading.value = false;
        listRef.value?.scrollToBottom();
      }, 1000);
    };

    const handleStop = function () {
      isLoading.value = false;
    };

    return {
      listRef,
      inputValue,
      isLoading,
      messages,
      handleSend,
      handleStop,
    };
  },
});
</script>
<style>
.chat-engine-demo {
  height: 500px;
}
</style>
