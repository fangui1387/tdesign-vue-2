<template>
  <t-chat-sender
    ref="chatSenderRef"
    v-model="inputValue"
    class="chat-sender"
    :textarea-props="{
      placeholder: currentPlaceholder,
    }"
    :loading="loading"
    @send="inputEnter"
  >
    <template #input-prefix>
      <t-dropdown :options="options" @click="" trigger="clickswitchScene">
        <t-tag
          shape="round"
          variant="light"
          color="#0052d9"
          style="margin-right: 4px; cursor: pointer"
        >
          {{ currentContent }}
        </t-tag>
      </t-dropdown>
    </template>
    <template #footer-prefix>
      <div class="model-select">
        <t-select
          v-model="selectValue"
          :options="selectOptions"
          value-type="object"
        ></t-select>
        <t-button class="check-box" :class="{ 'is-active': isChecked }" variant="outline" @click="checkClick">
          <span>深度思考</span>
        </t-button>
      </div>
    </template>
  </t-chat-sender>
</template>

<script>
export default {
  name: 'ChatSenderSlot',
  data() {
    return {
      loading: false,
      chatSenderRef: null,
      inputValue: '',
      options: [
        {
          content: '帮我写作',
          value: 1,
          placeholder: '输入你要撰写的主题',
        },
        {
          content: '图像生成',
          value: 2,
          placeholder: '说说你的创作灵感',
        },
        {
          content: '网页摘要',
          value: 3,
          placeholder: '输入你要解读的网页地址',
        },
      ],
      scene: 1,
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
    };
  },
  computed: {
    currentPlaceholder() {
      const item = this.options.find((option) => option.value === this.scene);
      return item ? item.placeholder : '';
    },
    currentContent() {
      const item = this.options.find((option) => option.value === this.scene);
      return item ? item.content : '';
    },
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
    switchScene(data) {
      this.scene = data.value;
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
</style>
