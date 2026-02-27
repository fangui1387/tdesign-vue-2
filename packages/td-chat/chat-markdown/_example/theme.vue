<template>
  <t-space direction="vertical">
    <t-space>
      <t-space align="center">
        <span>代码块主题切换：</span>
        <t-switch v-model="isDarkTheme" size="large" @change="handleCodeThemeChange" />
      </t-space>
    </t-space>
    <t-chat-markdown :key="rerenderKey" :content="mdContent" :options="options" />
  </t-space>
</template>

<script>
export default {
  name: 'ChatMarkdownTheme',
  data() {
    return {
      isDarkTheme: false,
      rerenderKey: 1,
      mdContent: `---

## 代码块主题设置演示

\`\`\`javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 输出: 55
\`\`\`

\`\`\`python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)
\`\`\`
`,
    };
  },
  computed: {
    options() {
      return {
        themeSettings: {
          codeBlockTheme: this.isDarkTheme ? 'dark' : 'light',
        },
      };
    },
  },
  methods: {
    handleCodeThemeChange(checked) {
      this.isDarkTheme = checked;
      this.rerenderKey += 1;
    },
  },
};
</script>

<style scoped></style>
