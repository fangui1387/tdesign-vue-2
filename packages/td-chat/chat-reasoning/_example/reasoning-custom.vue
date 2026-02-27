<template>
  <t-chat ref="chatRef" layout="both" style="height: 550px" :clear-history="false" :reverse="false">
    <template v-for="(item, index) in chatList1">
      <t-chat-item
        :key="index"
        :avatar="item.avatar"
        :name="item.name"
        :role="item.role"
        :datetime="item.datetime"
        :text-loading="index === 0 && loading"
        :variant="item.role === 'assistant' ? 'outline' : 'base'"
      >
        <template #content>
          <t-chat-reasoning
            v-if="item.reasoning && item.reasoning.length > 0"
            expand-icon-placement="right"
            :collapse-panel-props="{
              header: renderHeader(index === 0 && isStreamLoad, item),
              content: item.reasoning
            }"
            @expand-change="handleChange($event, { index })"
          >
          </t-chat-reasoning>
          <t-chat-content v-if="item.content && item.content.length > 0" :content="item.content" />
        </template>
      </t-chat-item>
    </template>
  </t-chat>
</template>

<script>
export default {
  name: 'ReasoningCustom',
  data() {
    return {
      loading: false,
      isStreamLoad: false,
      chatRef: null,
      chatList1: [
        {
          avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
          name: '自己',
          datetime: '今天16:38',
          content: '牛顿第一定律是否适用于所有参考系？',
          role: 'user',
          reasoning: '',
        },
        {
          avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
          name: 'TDesignAI',
          datetime: '今天16:38',
          reasoning: `嗯，用户问牛顿第一定律是不是适用于所有参考系。首先，我得先回忆一下牛顿第一定律的内容。牛顿第一定律，也就是惯性定律，说物体在没有外力作用时会保持静止或匀速直线运动。也就是说，保持原来的运动状态。

那问题来了，这个定律是否适用于所有参考系呢？记得以前学过的参考系分惯性系和非惯性系。惯性系里，牛顿定律成立；非惯性系里，可能需要引入惯性力之类的修正。所以牛顿第一定律应该只在惯性参考系中成立，而在非惯性系中不适用，比如加速的电梯或者旋转的参考系，这时候物体会有看似无外力下的加速度，所以必须引入假想的力来解释。`,
          content: `牛顿第一定律（惯性定律）**并不适用于所有参考系**，它只在**惯性参考系**中成立。以下是关键点：

---

### **1. 牛顿第一定律的核心**
- **内容**：物体在不受外力（或合力为零）时，将保持静止或匀速直线运动状态。
- **本质**：定义了惯性系的存在——即存在一类参考系，在其中惯性定律成立。

---`,
          role: 'assistant',
        },
      ],
    };
  },
  methods: {
    handleChange(value, { index }) {
      console.log('handleChange', value, index);
    },
    renderHeader(flag, item) {
      if (flag) {
        return '思考中...';
      }
      const endText = item.duration ? `已深度思考(用时${item.duration}秒)` : '已深度思考';
      return endText;
    },
  },
};
</script>

<style scoped></style>
