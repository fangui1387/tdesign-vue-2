import { ref, onMounted, onUnmounted, watch, type Ref } from 'vue';
import type { AgentToolcallConfig, ToolcallComponentProps } from '../components/toolcall/types';
import { agentToolcallRegistry } from '../components/toolcall/registry';

export interface UseAgentToolcallReturn {
  register: (config: AgentToolcallConfig | AgentToolcallConfig[]) => void;
  unregister: (names: string | string[]) => void;
  isRegistered: (name: string) => boolean;
  getRegistered: () => string[];
  config: Ref<any>;
}

export function useAgentToolcall<TArgs extends object = any, TResult = any, TResponse = any>(
  config?:
    | AgentToolcallConfig<TArgs, TResult, TResponse>
    | AgentToolcallConfig<TArgs, TResult, TResponse>[]
    | null
    | undefined,
): UseAgentToolcallReturn {
  const registeredNamesRef = ref<Set<string>>(new Set());
  const autoRegisteredNamesRef = ref<Set<string>>(new Set());
  const configRef = ref(config);

  const register = (newConfig: AgentToolcallConfig | AgentToolcallConfig[]) => {
    if (!newConfig) {
      console.warn('[useAgentToolcall] 配置为空，跳过注册');
      return;
    }

    const configs = Array.isArray(newConfig) ? newConfig : [newConfig];

    configs.forEach((cfg) => {
      if (agentToolcallRegistry.get(cfg.name)) {
        console.warn(`[useAgentToolcall] 配置名称 "${cfg.name}" 已存在于注册表中，将被覆盖`);
      }

      agentToolcallRegistry.register(cfg);
      registeredNamesRef.value.add(cfg.name);
    });
  };

  const unregister = (names: string | string[]) => {
    const nameArray = Array.isArray(names) ? names : [names];

    nameArray.forEach((name) => {
      agentToolcallRegistry.unregister(name);
      registeredNamesRef.value.delete(name);
      autoRegisteredNamesRef.value.delete(name);
    });
  };

  const isRegistered = (name: string) => registeredNamesRef.value.has(name) || autoRegisteredNamesRef.value.has(name);

  const getRegistered = () => Array.from(new Set([...registeredNamesRef.value, ...autoRegisteredNamesRef.value]));

  onMounted(() => {
    if (!config) {
      return;
    }

    const configs = Array.isArray(config) ? config : [config];
    configs.forEach((cfg) => {
      if (agentToolcallRegistry.get(cfg.name)) {
        console.warn(`[useAgentToolcall] 配置名称 "${cfg.name}" 已存在于注册表中，将被覆盖`);
      }

      agentToolcallRegistry.register(cfg);
      autoRegisteredNamesRef.value.add(cfg.name);
    });
  });

  onUnmounted(() => {
    if (!config) {
      return;
    }

    const configs = Array.isArray(config) ? config : [config];
    configs.forEach((cfg) => {
      agentToolcallRegistry.unregister(cfg.name);
      autoRegisteredNamesRef.value.delete(cfg.name);
    });
  });

  watch(
    () => config,
    (newConfig) => {
      configRef.value = newConfig;
    },
    { deep: true },
  );

  return {
    register,
    unregister,
    isRegistered,
    getRegistered,
    config: configRef,
  };
}

export interface ToolConfigWithStateOptions<TArgs extends object = any, TResult = any> {
  name: string;
  description: string;
  parameters: Array<{ name: string; type: string }>;
  subscribeKey?: (props: ToolcallComponentProps<TArgs, TResult>) => string | undefined;
  component: new (props: ToolcallComponentProps<TArgs, TResult> & { agentState?: Record<string, any> }) => any;
}
