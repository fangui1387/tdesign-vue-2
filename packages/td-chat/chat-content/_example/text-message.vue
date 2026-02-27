<template>
  <t-chat-content :content="content"></t-chat-content>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const ask = `import TDesign from 'tdesign-vue-next'; // 引入tdesign组件库
app.use(TDesign).use(router).mount('#app');`;

    const content = ref({
      type: 'text',
      data: ask,
    });

    return {
      content,
    };
  },
});
</script>
