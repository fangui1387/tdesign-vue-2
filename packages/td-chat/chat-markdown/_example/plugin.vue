<template>
  <t-space direction="vertical">
    <t-space>
      <strong>动态加载插件：</strong>
      <t-space align="center">
        <span>公式</span>
        <t-switch v-model="hasKatex" size="large" @change="handleKatexChange" />
      </t-space>
    </t-space>
    <t-chat-markdown :key="rerenderKey" :content="mdContent" :options="options" />
  </t-space>
</template>

<script>
export default {
  name: 'ChatMarkdownPlugin',
  data() {
    return {
      hasKatex: false,
      rerenderKey: 1,
      mdContent: `---

## 块级公式

$$
E=mc^2
$$

## 行内公式
这是一个行内公式 $\\sqrt{3x-1}+(1+x)^2$
`,
    };
  },
  computed: {
    options() {
      return {
        engine: {
          syntax: this.hasKatex
            ? {
                mathBlock: {
                  engine: 'katex',
                },
                inlineMath: {
                  engine: 'katex',
                },
              }
            : undefined,
        },
      };
    },
  },
  methods: {
    handleKatexChange(checked) {
      this.hasKatex = checked;
      this.rerenderKey += 1;
    },
  },
};
</script>

<style scoped></style>
