<template>
  <t-space direction="vertical" style="width: 100%">
    <t-attachments :items="items" overflow="scrollX" />
    <t-attachments :items="items" overflow="scrollY" style="height: 200px" />
    <t-attachments :items="items" overflow="wrap" />
  </t-space>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          name: 'document.pdf',
          url: 'https://example.com/document.pdf',
          type: 'file',
        },
        {
          name: 'image.png',
          url: 'https://tdesign.gtimg.com/site/avatar.jpg',
          type: 'image',
        },
        {
          name: 'data.xlsx',
          url: 'https://example.com/data.xlsx',
          type: 'file',
        },
      ],
    };
  },
};
</script>
