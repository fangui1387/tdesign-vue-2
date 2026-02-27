<template>
  <t-chat-markdown :content="displayText" />
</template>

<script>
export default {
  name: 'ChatMarkdownEvent',
  data() {
    return {
      displayText: '',
      isTyping: false,
      timerRef: null,
      currentIndex: 0,
      doc: `这是一个markdown[链接地址](http://example.com), 点击后**不会**自动跳转.`,
    };
  },
  mounted() {
    document.addEventListener('click', this.handleResourceClick);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleResourceClick);
    if (this.timerRef) clearTimeout(this.timerRef);
  },
  methods: {
    findTargetElement(event, selector) {
      const selectors = Array.isArray(selector) ? selector : selector.split(',').map((s) => s.trim());
      const eventPath = event.composedPath();
      for (const el of eventPath) {
        if (el instanceof HTMLElement) {
          if (selectors.some((sel) => el.matches && el.matches(sel))) {
            return el;
          }
        }
      }
      return null;
    },
    handleResourceClick(event) {
      event.preventDefault();
      const targetResource = this.findTargetElement(event, ['a[part=md_a]']);
      if (targetResource) {
        const href = targetResource.getAttribute('href');
        if (href) {
          console.log('跳转链接href', href);
        }
      }
    },
  },
};
</script>

<style scoped></style>
