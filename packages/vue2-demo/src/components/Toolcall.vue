<template>
  <t-collapse style="margin: 8px 0">
    <t-collapse-panel :header="panelHeader">
      <!-- 使用 slot 自定义 header-right-content -->
      <template #header-right-content>
        <t-tag :theme="statusTheme" size="small">{{ statusText }}</t-tag>
      </template>

      <!-- 搜索工具的特殊渲染 -->
      <div v-if="toolCallName === 'search' && searchResult">
        <div style="font-size: 13px; color: #666; margin-bottom: 8px">
          {{ searchResult.title }}
        </div>
        <div v-if="searchResult.references && searchResult.references.length > 0">
          <div
            v-for="(ref, idx) in searchResult.references"
            :key="idx"
            style="font-size: 12px; margin-bottom: 2px; padding-left: 8px"
          >
            <a :href="ref.url" target="_blank" rel="noopener noreferrer" style="color: #1976d2; text-decoration: none">
              📄 {{ ref.title }}
            </a>
          </div>
        </div>
      </div>

      <!-- 默认工具调用渲染 -->
      <div v-else>
        <div v-if="args" style="font-size: 12px; color: #666; margin-bottom: 4px">
          参数: {{ typeof args === 'string' ? args : JSON.stringify(args) }}
        </div>
        <div v-if="result" style="font-size: 12px; color: #333">
          结果: {{ typeof result === 'string' ? result : JSON.stringify(result) }}
        </div>
      </div>
    </t-collapse-panel>
  </t-collapse>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Collapse as TCollapse, CollapsePanel as TCollapsePanel, Tag as TTag } from 'tdesign-vue';

interface ToolCall {
  toolCallName?: string;
  args?: any;
  result?: any;
}

// 状态配置
const statusConfig = {
  pending: { theme: 'warning', text: '处理中' },
  streaming: { theme: 'primary', text: '执行中' },
  complete: { theme: 'success', text: '已完成' },
};

export default defineComponent({
  name: 'Toolcall',
  components: {
    TCollapse,
    TCollapsePanel,
    TTag,
  },
  props: {
    toolCall: {
      type: Object as () => ToolCall,
      required: true,
    },
    status: {
      type: String as () => 'pending' | 'streaming' | 'complete',
      default: 'complete',
    },
  },
  computed: {
    toolCallName(): string | undefined {
      return this.toolCall?.toolCallName;
    },
    args(): any {
      return this.toolCall?.args;
    },
    result(): any {
      return this.toolCall?.result;
    },
    panelHeader(): string {
      if (this.toolCallName === 'search') {
        return '🔍 搜索工具调用';
      }
      return '🔧 工具调用';
    },
    statusTheme(): string {
      const config = statusConfig[this.status] || statusConfig.complete;
      return config.theme;
    },
    statusText(): string {
      const config = statusConfig[this.status] || statusConfig.complete;
      return config.text;
    },
    searchResult(): { title: string; references: any[] } | null {
      if (this.toolCallName !== 'search') return null;

      try {
        return typeof this.result === 'string' ? JSON.parse(this.result) : this.result;
      } catch (e) {
        return { title: '解析错误', references: [] };
      }
    },
  },
});
</script>

<style scoped>
/* 如果需要额外的样式可以在这里添加 */
</style>
