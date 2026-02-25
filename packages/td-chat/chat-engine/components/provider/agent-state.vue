<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue';
import { provideAgentState, useAgentState, type UseStateActionReturn } from '../../hooks/useAgentState';

export default defineComponent({
  name: 'AgentStateProvider',
  props: {
    initialState: {
      type: Object,
      default: () => ({}),
    },
    subscribeKey: {
      type: String,
      default: undefined,
    },
  },
  setup(props) {
    const state = useAgentState({
      initialState: props.initialState,
      subscribeKey: props.subscribeKey,
    });

    provideAgentState(state);

    return {
      state,
    };
  },
});
</script>
