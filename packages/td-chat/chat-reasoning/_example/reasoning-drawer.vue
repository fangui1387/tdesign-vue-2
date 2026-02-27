<template>
  <t-space align="center">
    <t-button theme="primary" @click="visible = true">AI助手悬窗展示</t-button>
  </t-space>
  <t-drawer v-model="visible" :footer="false" size="480px" class="drawer-box">
    <template #header>
      <t-avatar size="32px" shape="circle" image="https://tdesign.gtimg.com/site/chat-avatar.png"></t-avatar>
      <span class="title">Hi, 我是AI</span>
    </template>
    <t-chat layout="both" :clear-history="chatList.length > 0 && !isStreamLoad">
      <template v-for="(item, index) in chatList">
        <t-chat-item
          :key="index"
          :role="item.role"
          :text-loading="index === chatList.length - 1 && loading"
          :content="item.content"
          :variant="getStyle(item.role)"
        >
        </t-chat-item>
      </template>
      <template #footer>
        <t-chat-sender
          v-model="inputValue"
          :loading="isStreamLoad"
          placeholder="请输入消息..."
          @stop="onStop"
          @send="inputEnter"
        >
          <template #footer-prefix>
            <div class="model-select">
              <t-select v-model="selectValue" :options="selectOptions" value-type="object"></t-select>
              <t-button :class="{ 'is-active': isChecked }" variant="text" @click="checkClick">
                <span>深度思考</span>
              </t-button>
            </div>
          </template>
        </t-chat-sender>
      </template>
    </t-chat>
  </t-drawer>
</template>

<script>
export default {
  name: 'ReasoningDrawer',
  data() {
    return {
      visible: false,
      inputValue: '',
      loading: false,
      isStreamLoad: false,
      selectOptions: [
        { label: '默认模型', value: 'default' },
        { label: '深度思考', value: 'deepseek-r1' },
        { label: '混元', value: 'hunyuan' },
      ],
      selectValue: { label: '默认模型', value: 'default' },
      isChecked: false,
      chatList: [
        {
          avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
          name: '自己',
          datetime: '今天16:38',
          content: '牛顿第一定律是否适用于所有参考系？',
          role: 'user',
        },
        {
          avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
          name: 'TDesignAI',
          datetime: '今天16:38',
          reasoning: '嗯，用户问牛顿第一定律是不是适用于所有参考系...',
          content: '牛顿第一定律（惯性定律）**并不适用于所有参考系**，它只在**惯性参考系**中成立。',
          role: 'assistant',
        },
      ],
    };
  },
  methods: {
    getStyle(role) {
      if (role === 'assistant') return 'outline';
      if (role === 'user') return 'base';
      return 'text';
    },
    checkClick() {
      this.isChecked = !this.isChecked;
    },
    onStop() {
      this.loading = false;
      this.isStreamLoad = false;
    },
    inputEnter(value) {
      if (this.isStreamLoad) return;
      if (!value) return;
      this.chatList.push({
        avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
        name: '自己',
        datetime: new Date().toDateString(),
        content: value,
        role: 'user',
      });
      this.inputValue = '';
    },
  },
};
</script>

<style scoped>
.title {
  margin-left: 16px;
  font-size: 20px;
  font-weight: 600;
}
.model-select {
  display: flex;
  align-items: center;
}
.model-select .t-select {
  width: 112px;
  margin-right: 8px;
}
.model-select .check-box.is-active {
  border-color: #0052d9;
  background: #e6f0ff;
  color: #0052d9;
}
</style>
