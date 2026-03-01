import { defineComponent } from 'vue';

/**
 * Vue 2: 将“返回 VNode 的函数”作为子组件渲染。
 * 不能使用 <component :is="renderPresets([])" />，因为 :is 需要组件选项而非 VNode。
 */
export default defineComponent({
  name: 'RenderHelper',
  props: {
    renderFn: {
      type: Function,
      default: null,
    },
  },
  render() {
    return this.renderFn ? this.renderFn() : null;
  },
});
