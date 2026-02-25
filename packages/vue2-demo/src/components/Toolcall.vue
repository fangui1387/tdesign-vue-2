<template>
  <t-collapse style="margin: 8px 0">
    <t-collapse-panel :header="panelHeader" :header-right-content="() => renderStatusTag(status)">
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

<script setup lang="tsx">
import { computed } from 'vue';
import { Collapse as TCollapse, CollapsePanel as TCollapsePanel, Tag } from 'tdesign-vue-next';

// 定义 props
interface ToolCall {
  toolCallName?: string;
  args?: any;
  result?: any;
}

interface Props {
  toolCall: ToolCall;
  status?: 'pending' | 'streaming' | 'complete';
}

const props = withDefaults(defineProps<Props>(), {
  status: 'complete',
});

// 状态配置
const statusConfig = {
  pending: { color: 'warning', text: '处理中' },
  streaming: { color: 'processing', text: '执行中' },
  complete: { color: 'success', text: '已完成' },
};

// 状态渲染函数
const renderStatusTag = (status: 'pending' | 'streaming' | 'complete') => {
  const config = statusConfig[status] || statusConfig.complete;

  return (
    <Tag theme={config.color} size="small">
      {config.text}
    </Tag>
  );
};

// 使用 computed 监听 props.toolCall 的变化
const toolCallName = computed(() => props.toolCall?.toolCallName);
const args = computed(() => props.toolCall?.args);
const result = computed(() => props.toolCall?.result);

// 计算面板标题
const panelHeader = computed(() => {
  if (toolCallName.value === 'search') {
    return '🔍 搜索工具调用';
  }
  return '🔧 工具调用';
});

// 解析搜索结果
const searchResult = computed(() => {
  if (toolCallName.value !== 'search') return null;

  try {
    return typeof result.value === 'string' ? JSON.parse(result.value) : result.value;
  } catch (e) {
    return { title: '解析错误', references: [] };
  }
});
</script>

<style scoped>
/* 如果需要额外的样式可以在这里添加 */
</style>
