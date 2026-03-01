<template>
  <div :class="componentClass">
    <div v-if="animation === 'skeleton'" class="t-chat-loading-skeleton">
      <div class="t-chat-loading-skeleton-line"></div>
      <div class="t-chat-loading-skeleton-line"></div>
      <div class="t-chat-loading-skeleton-line short"></div>
    </div>
    <div v-else-if="animation === 'moving'" class="t-chat-loading-moving">
      <div class="t-chat-loading-moving-dot"></div>
      <div class="t-chat-loading-moving-dot"></div>
      <div class="t-chat-loading-moving-dot"></div>
    </div>
    <div v-else-if="animation === 'gradient'" class="t-chat-loading-gradient">
      <div class="t-chat-loading-gradient-bar"></div>
    </div>
    <div v-else-if="animation === 'circle'" class="t-chat-loading-circle">
      <svg class="t-chat-loading-circle-svg" viewBox="25 25 50 50">
        <circle
          class="t-chat-loading-circle-path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke="currentColor"
          stroke-width="4"
        />
      </svg>
    </div>
    <div v-if="text" class="t-chat-loading-text">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'TChatLoading',
  props: {
    animation: {
      type: String,
      default: 'gradient',
      validator(val) {
        return ['skeleton', 'moving', 'gradient', 'circle'].includes(val);
      },
    },
    text: {
      type: String,
      default: '',
    },
  },
  computed: {
    componentClass() {
      return ['t-chat-loading', `t-chat-loading--${this.animation}`];
    },
  },
};
</script>

<style lang="less" scoped>
.t-chat-loading {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.t-chat-loading-skeleton {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 200px;
}

.t-chat-loading-skeleton-line {
  height: 12px;
  background: linear-gradient(
    90deg,
    var(--td-bg-color-component, #f3f3f3) 25%,
    var(--td-bg-color-container-hover, #e7e7e7) 50%,
    var(--td-bg-color-component, #f3f3f3) 75%
  );
  background-size: 200% 100%;
  border-radius: 4px;
  animation: skeleton-loading 1.5s ease-in-out infinite;
}

.t-chat-loading-skeleton-line.short {
  width: 60%;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.t-chat-loading-moving {
  display: flex;
  gap: 8px;
  align-items: center;
}

.t-chat-loading-moving-dot {
  width: 8px;
  height: 8px;
  background-color: var(--td-brand-color, #0052d9);
  border-radius: 50%;
  animation: moving-dot 1.4s ease-in-out infinite;
}

.t-chat-loading-moving-dot:nth-child(1) {
  animation-delay: 0s;
}

.t-chat-loading-moving-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.t-chat-loading-moving-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes moving-dot {
  0%,
  80%,
  100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.t-chat-loading-gradient {
  display: flex;
  align-items: center;
}

.t-chat-loading-gradient-bar {
  width: 40px;
  height: 4px;
  background: linear-gradient(
    90deg,
    var(--td-brand-color, #0052d9) 0%,
    var(--td-brand-color-light, #5a8fff) 50%,
    var(--td-brand-color, #0052d9) 100%
  );
  background-size: 200% 100%;
  border-radius: 2px;
  animation: gradient-loading 1.5s ease-in-out infinite;
}

@keyframes gradient-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.t-chat-loading-circle {
  display: flex;
  align-items: center;
}

.t-chat-loading-circle-svg {
  width: 24px;
  height: 24px;
  animation: circle-rotate 1s linear infinite;
}

.t-chat-loading-circle-path {
  stroke: var(--td-brand-color, #0052d9);
  stroke-linecap: round;
  stroke-dasharray: 90;
  stroke-dashoffset: 0;
  animation: circle-dash 1.5s ease-in-out infinite;
}

@keyframes circle-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes circle-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -124;
  }
}

.t-chat-loading-text {
  font-size: 14px;
  color: var(--td-text-color-secondary, #666);
  margin-top: 4px;
}
</style>
