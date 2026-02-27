<template>
  <div class="chat-thinking-demo">
    <t-space direction="vertical">
      <t-space>
        <t-space direction="vertical">
          <h5>layout：</h5>
          <t-radio-group :value="layout" @change="handleLayoutChange">
            <t-radio value="border">border</t-radio>
            <t-radio value="block">block</t-radio>
          </t-radio-group>
        </t-space>
        <t-space direction="vertical">
          <h5>animation：</h5>
          <t-radio-group :value="animation" @change="handleAnimationChange">
            <t-radio value="dots">dots</t-radio>
            <t-radio value="moving">moving</t-radio>
            <t-radio value="gradient">gradient</t-radio>
          </t-radio-group>
        </t-space>
      </t-space>
      <t-chat-thinking
        :content="{
          title: title,
        }"
        :status="status"
        :layout="layout"
        :animation="animation"
      >
        <template #content>
          <div class="content-box">
            {{ displayText }}
          </div>
        </template>
      </t-chat-thinking>
    </t-space>
  </div>
</template>

<script>
export default {
  name: 'ThinkStyle',
  data() {
    return {
      fullText: '嗯，用户问牛顿第一定律是不是适用于所有参考系。首先，我得先回忆一下牛顿第一定律的内容。牛顿第一定律，也就是惯性定律，说物体在没有外力作用时会保持静止或匀速直线运动。也就是说，保持原来的运动状态。那问题来了，这个定律是否适用于所有参考系呢？记得以前学过的参考系分惯性系和非惯性系。惯性系里，牛顿定律成立；非惯性系里，可能需要引入惯性力之类的修正。所以牛顿第一定律应该只在惯性参考系中成立，而在非惯性系中不适用，比如加速的电梯或者旋转的参考系，这时候物体会有看似无外力下的加速度，所以必须引入假想的力来解释。',
      displayText: '',
      status: 'pending',
      title: '正在思考中...',
      layout: 'block',
      animation: 'moving',
      timerRef: null,
      currentIndex: 0,
      startTime: Date.now(),
    };
  },
  mounted() {
    this.startTime = Date.now();
    this.timerRef = setTimeout(this.typeEffect, 500);
  },
  beforeDestroy() {
    if (this.timerRef) clearTimeout(this.timerRef);
  },
  methods: {
    typeEffect() {
      if (this.currentIndex < this.fullText.length) {
        const char = this.fullText[this.currentIndex];
        this.currentIndex += 1;
        this.displayText += char;
        this.timerRef = setTimeout(this.typeEffect, 50);
        this.status = 'streaming';
      } else {
        const costTime = parseInt(((Date.now() - this.startTime) / 1000).toString(), 10);
        this.title = `已完成思考（耗时${costTime}秒）`;
        this.status = 'complete';
      }
    },
    resetTypingEffect() {
      this.displayText = '';
      this.status = 'pending';
      this.title = '正在思考中...';
      this.currentIndex = 0;
      if (this.timerRef) clearTimeout(this.timerRef);
    },
    handleLayoutChange(value) {
      this.resetTypingEffect();
      this.layout = value;
      this.startTime = Date.now();
      this.timerRef = setTimeout(this.typeEffect, 500);
    },
    handleAnimationChange(value) {
      this.resetTypingEffect();
      this.animation = value;
      this.startTime = Date.now();
      this.timerRef = setTimeout(this.typeEffect, 500);
    },
  },
};
</script>

<style scoped>
.chat-thinking-demo {
  padding: 16px;
}
.content-box {
  padding: 12px;
}
h5 {
  margin: 0;
}
</style>
