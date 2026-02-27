<template>
  <t-chat-sender
    v-model="query"
    :stop-disabled="loading"
    :textarea-props="{
      placeholder: '请输入消息...',
    }"
    :attachments-props="{
      items: filesList,
      overflow: 'scrollX',
    }"
    @send="inputEnter"
    @file-select="handleUploadFile"
    @file-click="handleFileClick"
    @remove="handleRemoveFile"
  >
    <template #suffix="{ renderPresets }">
      <component :is="renderPresets([{ name: 'uploadImage' }, { name: 'uploadAttachment' }])" />
    </template>
  </t-chat-sender>
</template>

<script>
export default {
  name: 'ChatSenderAttachments',
  data() {
    return {
      query: '',
      loading: false,
      filesList: [
        {
          key: '1',
          name: 'excel-file.xlsx',
          size: 111111,
        },
        {
          key: '2',
          name: 'word-file.docx',
          size: 222222,
        },
        {
          key: '3',
          name: 'image-file.png',
          size: 333333,
        },
        {
          key: '4',
          name: 'pdf-file.pdf',
          size: 444444,
        },
      ],
    };
  },
  methods: {
    inputEnter(inputValue) {
      if (this.loading) {
        return;
      }
      if (!inputValue) return;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 5000);
    },
    handleRemoveFile(e) {
      const key = e.detail.key;
      this.filesList = this.filesList.filter((item) => item.key !== key);
    },
    handleUploadFile({ files, name, e }) {
      console.log('handleUploadFile:', e, files, name);
      const newFile = {
        size: files[0].size,
        name: files[0].name,
        status: 'progress',
        description: '上传中',
      };

      this.filesList = [newFile, ...this.filesList];
      console.log('filesList:', this.filesList);
      setTimeout(() => {
        this.filesList = this.filesList.map((file) =>
          file.name === newFile.name
            ? {
                ...file,
                url: 'https://tdesign.gtimg.com/site/avatar.jpg',
                status: 'success',
                description: `${Math.floor(newFile.size / 1024)}KB`,
              }
            : file,
        );
      }, 1000);
    },
    handleFileClick(e) {
      console.log('fileClick', e.detail);
    },
  },
};
</script>
