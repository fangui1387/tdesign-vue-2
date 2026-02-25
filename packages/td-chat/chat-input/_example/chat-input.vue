<template>
  <t-chat-input v-model="query" :stop-disabled="loading" @send="inputEnter" @stop="handleStop"> </t-chat-input>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const query = ref('');
    const loading = ref(false);

    const handleStop = function () {
      loading.value = false;
    };

    const inputEnter = function (inputValue) {
      if (loading.value) return;
      if (!inputValue) return;
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 5000);
    };

    return {
      query,
      loading,
      handleStop,
      inputEnter,
    };
  },
});
</script>
