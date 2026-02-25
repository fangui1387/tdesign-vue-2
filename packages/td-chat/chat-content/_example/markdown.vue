<template>
  <t-chat-content :content="content" :markdown-props="markdownProps" />
</template>
<script>
export default {
  data() {
    return {
      markdownProps: {
        options: {
          themeSettings: {
            codeBlockTheme: 'dark',
          },
        },
      },
      doc: `
# This is TDesign

## This is TDesign

### This is TDesign

#### This is TDesign

The point of reference-style links is not that they're easier to write. The point is that with reference-style links, your document source is vastly more readable.

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet.

an example | *an example* | **an example**

1. Bird
1. McHale
1. Parish

- Red
- Green
- Blue

This is [an example](http://example.com/ "Title") inline link.

<http://example.com/>

\`\`\`bash
$ npm i tdesign-vue
\`\`\`

---

\`\`\`javascript
import Vue from 'vue';
import TDesignChat from '@tdesign/td-chat';

Vue.use(TDesignChat);
\`\`\`
`,
    };
  },
  computed: {
    content() {
      return {
        type: 'markdown',
        data: this.doc,
      };
    },
  },
};
</script>
