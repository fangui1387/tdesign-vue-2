import { defineComponent, h, computed, type DefineComponent } from 'vue';
import { useAgentStateDataByKey } from '../../hooks/useAgentState';

export type WithAgentStateProps<P extends object = any> = P & { agentState?: Record<string, any> };

export const withAgentStateToolcall1 = <P extends object = any>(
  Component: DefineComponent<WithAgentStateProps<P>>,
): DefineComponent<P> => {
  return defineComponent({
    name: `withAgentState(${Component.name || 'Component'})`,
    props: Component.props,
    setup(props: any) {
      const agentState = useAgentStateDataByKey();

      return () => {
        return h(Component as any, {
          ...props,
          agentState: agentState.value,
        });
      };
    },
  });
};

export const withAgentStateToolcall = <P extends object = any>(
  Component: DefineComponent<WithAgentStateProps<P>>,
  subscribeKeyExtractor?: (props: P) => string | undefined,
): DefineComponent<P> => {
  return defineComponent({
    name: `withAgentState(${Component.name || 'Component'})`,
    props: Component.props,
    setup(props: any) {
      const targetStateKey = computed(() => (subscribeKeyExtractor ? subscribeKeyExtractor(props) : undefined));

      const agentState = useAgentStateDataByKey(targetStateKey.value);

      return () => {
        return h(Component as any, {
          ...props,
          agentState: agentState.value,
        });
      };
    },
  });
};
