<template>
  <t-chat-sender
    v-model="query"
    :stop-disabled="loading"
    :textarea-props="{
      placeholder: '请输入消息...',
    }"
    @send="inputEnter"
  >
    <template #suffix="{ renderPresets }">
      <component :is="renderPresets([])" />
    </template>
  </t-chat-sender>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const query = ref('');
    const loading = ref(false);

    const inputEnter = function () {
      if (loading.value) return;
      if (!query.value) return;
      query.value = '';
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 5000);
    };

    return {
      query,
      loading,
      inputEnter,
    };
  },
});
</script>
<style>
.test {
  color: var(--td-brand-color);
}
</style>
