<template>
  <t-chat-sender
    ref="chatSenderRef"
    v-model="inputValue"
    class="chat-sender"
    :textarea-props="{
      placeholder: '请输入消息...',
    }"
    :attachments-props="{
      items: filesList,
      overflow: 'scrollX',
    }"
    :loading="loading"
    @send="inputEnter"
    @file-select="handleUploadFile"
    @file-click="handleFileClick"
    @remove="handleRemoveFile"
  >
    <template #suffix="{ renderPresets }">
      <component :is="renderPresets([{ name: 'uploadImage' }, { name: 'uploadAttachment' }])" />
    </template>
    <template #footer-prefix>
      <div class="model-select">
        <t-tooltip :content="'切换模型'" trigger="hover">
          <t-select
            v-model="selectValue"
            :options="selectOptions"
            value-type="object"
          ></t-select>
        </t-tooltip>
        <t-button class="check-box" :class="{ 'is-active': isChecked }" variant="outline" @click="checkClick">
          <span>深度思考</span>
        </t-button>
      </div>
    </template>
    <template #inner-header>
      <div class="reference-content">
        <div class="reference-text">
          <span class="quote-icon">“</span>
          <p>牛顿第一定律（惯性定律）仅适用于惯性参考系，而不适用于非惯性参考系。</p>
        </div>
        <span class="close-icon">×</span>
      </div>
    </template>
  </t-chat-sender>
</template>

<script>
export default {
  name: 'ChatSenderMix',
  data() {
    return {
      loading: false,
      chatSenderRef: null,
      inputValue: '',
      selectOptions: [
        {
          label: '默认模型',
          value: 'default',
        },
        {
          label: 'Deepseek',
          value: 'deepseek-r1',
        },
        {
          label: '混元',
          value: 'hunyuan',
        },
      ],
      selectValue: {
        label: '默认模型',
        value: 'default',
      },
      isChecked: false,
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
    checkClick() {
      this.isChecked = !this.isChecked;
    },
    inputEnter() {
      if (this.loading) {
        return;
      }
      if (!this.inputValue) return;
      this.inputValue = '';
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

<style scoped>
.chat-sender .model-select {
  display: flex;
  align-items: center;
}
.chat-sender .model-select .t-select {
  width: 112px;
  margin-right: 8px;
}
.chat-sender .model-select .check-box {
  width: 112px;
}
.chat-sender .model-select .check-box.is-active {
  border-color: #0052d9;
  background: #e6f0ff;
  color: #0052d9;
}
.reference-content {
  display: flex;
  width: 100%;
  margin-bottom: 8px;
  padding-bottom: 8px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e7e7e7;
}
.reference-text {
  flex: 1;
  display: flex;
  align-items: center;
}
.quote-icon {
  font-size: 20px;
  color: #909399;
  padding: 6px;
}
.reference-text p {
  font-size: 14px;
  color: #909399;
  margin-left: 4px;
}
.close-icon {
  font-size: 20px;
  color: #909399;
  padding: 6px;
  cursor: pointer;
}
</style>
