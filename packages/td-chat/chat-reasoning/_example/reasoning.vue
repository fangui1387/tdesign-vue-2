<template>
  <t-chat-reasoning :collapsed="collapsed" :animation="animation" @expand-change="handleExpandChange">
    <template #header>
      <span>思考过程</span>
    </template>
    <t-chat-content :content="reasoningContent" role="assistant" />
  </t-chat-reasoning>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const collapsed = ref(false);
    const animation = ref('moving');

    const reasoningContent = {
      type: 'text',
      data: '这是一个思考过程的示例内容。用户问了一个问题，我需要仔细思考如何回答...',
    };

    const handleExpandChange = function (value) {
      collapsed.value = value;
    };

    return {
      collapsed,
      animation,
      reasoningContent,
      handleExpandChange,
    };
  },
});
</script>
