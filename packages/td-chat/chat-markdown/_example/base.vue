<template>
  <t-chat-content :content="markdownContent" />
</template>
<script>
export default {
  data() {
    return {
      doc: `
# Markdown 示例

这是一段 **Markdown** 内容。

## 代码块

\`\`\`javascript
const greeting = 'Hello, TDesign!';
console.log(greeting);
\`\`\`

## 列表

- 项目 1
- 项目 2
- 项目 3

## 引用

> 这是一段引用文字
`,
    };
  },
  computed: {
    markdownContent() {
      return {
        type: 'markdown',
        data: this.doc,
      };
    },
  },
};
</script>
