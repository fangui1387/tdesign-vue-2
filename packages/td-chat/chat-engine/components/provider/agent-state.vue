<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { provideAgentState, useAgentState, type UseStateActionReturn } from '../../hooks/useAgentState';

const props = defineProps<{
  initialState?: Record<string, any>;
  subscribeKey?: string;
}>();

const state = useAgentState({
  initialState: props.initialState,
  subscribeKey: props.subscribeKey,
});

provideAgentState(state);

defineExpose({
  state,
});
</script>
