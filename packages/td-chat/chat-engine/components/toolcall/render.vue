<template>
  <div v-if="MemoizedComponent">
    <component :is="MemoizedComponent" v-bind="componentProps" />
  </div>
</template>

<script setup lang="tsx">
import { ref, computed, onMounted, watch, type Ref } from 'vue';
import type { ToolCall } from 'tdesign-web-components/lib/chat-engine';
import { isNonInteractiveConfig, type ToolcallComponentProps } from './types';
import { agentToolcallRegistry } from './registry';
import { useAgentStateDataByKey } from '../../hooks/useAgentState';

interface ToolCallRendererProps {
  toolCall: ToolCall;
  onRespond?: (toolCall: ToolCall, response: any) => void;
}

const props = defineProps<ToolCallRendererProps>();

const actionState: Ref<{
  status: ToolcallComponentProps['status'];
  result?: any;
  error?: Error;
}> = ref({
  status: 'idle',
});

const config = computed(() => {
  return agentToolcallRegistry.get(props.toolCall.toolCallName);
});

const isRegistered = ref(() => !!agentToolcallRegistry.getRenderFunction(props.toolCall.toolCallName));

const args = computed(() => {
  try {
    return props.toolCall.args ? JSON.parse(props.toolCall.args) : {};
  } catch (error) {
    console.error('解析工具调用参数失败:', error);
    return {};
  }
});

const handleRespond = (response: any) => {
  if (props.onRespond) {
    props.onRespond(props.toolCall, response);
    actionState.value = {
      ...actionState.value,
      status: 'complete',
      result: response,
    };
  }
};

watch(
  () => [config.value, args.value, props.toolCall.result, props.toolCall.eventType],
  async () => {
    if (!config.value) return;

    if (isNonInteractiveConfig(config.value)) {
      try {
        actionState.value = { status: 'executing' };

        let backendResult;
        if (props.toolCall.result) {
          try {
            backendResult = JSON.parse(props.toolCall.result);
          } catch (error) {
            console.warn('解析后端结果失败，使用原始字符串:', error);
            backendResult = props.toolCall.result;
          }
        }

        const result = await config.value.handler(args.value, backendResult);
        actionState.value = {
          status: 'complete',
          result,
        };
      } catch (error) {
        actionState.value = {
          status: 'error',
          error: error as Error,
        };
      }
    } else if (props.toolCall.result) {
      try {
        const result = JSON.parse(props.toolCall.result);
        actionState.value = {
          status: 'complete',
          result,
        };
      } catch (error) {
        actionState.value = {
          status: 'error',
          error: error as Error,
        };
      }
    } else if (props.toolCall.eventType === 'TOOL_CALL_END' || props.toolCall.eventType === 'TOOL_CALL_RESULT') {
      actionState.value = { status: 'complete' };
    } else {
      actionState.value = { status: 'executing' };
    }
  },
  { immediate: true },
);

const subscribeKeyExtractor = computed(() => config.value?.subscribeKey);

const targetStateKey = computed(() => {
  if (!subscribeKeyExtractor.value) return undefined;

  const fullProps = {
    status: actionState.value.status,
    args: args.value,
    result: actionState.value.result,
    error: actionState.value.error,
    respond: handleRespond,
  };

  return subscribeKeyExtractor.value(fullProps);
});

onMounted(() => {
  const handleRegistered = (event: CustomEvent) => {
    if (event.detail?.name === props.toolCall.toolCallName) {
      isRegistered.value = true;
    }
  };

  if (!isRegistered.value) {
    window.addEventListener('toolcall-registered', handleRegistered as EventListener);
  }

  return () => {
    window.removeEventListener('toolcall-registered', handleRegistered as EventListener);
  };
});

const agentState = useAgentStateDataByKey(targetStateKey);

const componentProps = computed<ToolcallComponentProps>(() => ({
  status: actionState.value.status,
  args: args.value,
  result: actionState.value.result,
  error: actionState.value.error,
  respond: handleRespond,
  agentState: agentState.value,
}));

const MemoizedComponent = computed(() => agentToolcallRegistry.getRenderFunction(props.toolCall.toolCallName));
</script>
