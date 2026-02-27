<template>
  <t-chat-input :stop-disabled="loading" placeholder="请输入消息..." @send="inputEnter" @stop="handleStop">
    <template #suffixIcon>
      <t-button theme="default" variant="text" size="large" class="btn"> 发送 </t-button>
    </template>
  </t-chat-input>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const loading = ref(false);

    const handleStop = function () {
      loading.value = false;
    };

    const inputEnter = function (inputValue) {
      if (loading.value) {
        return;
      }
      if (!inputValue) return;
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 5000);
    };

    return {
      loading,
      handleStop,
      inputEnter,
    };
  },
});
</script>
<style lang="less">
.btn {
  color: var(--td-text-color-disabled);
  border: none;
  &:hover {
    color: var(--td-brand-color-hover);
    border: none;
    background: none;
  }
}
</style>
