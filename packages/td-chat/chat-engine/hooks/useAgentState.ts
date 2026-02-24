import { ref, onMounted, onUnmounted, computed, provide, inject, watch, type Ref, type InjectionKey } from 'vue';
import { stateManager } from 'tdesign-web-components/lib/chat-engine';

export interface StateActionOptions {
  initialState?: Record<string, any>;
  subscribeKey?: string;
}

export interface UseStateActionReturn {
  stateMap: Ref<Record<string, any>>;
  currentStateKey: Ref<string | null>;
  setStateMap: (stateMap: Record<string, any> | ((prev: Record<string, any>) => Record<string, any>)) => void;
  getCurrentState: () => Record<string, any>;
  getStateByKey: (key: string) => any;
}

export const useAgentState = <T = any>(options: StateActionOptions = {}): UseStateActionReturn => {
  const { initialState, subscribeKey } = options;
  const stateMap = ref<Record<string, any>>(initialState || {});
  const currentStateKey = ref<string | null>(null);

  const stateMapRef = ref(stateMap.value);

  let unsubscribe: (() => void) | null = null;

  onMounted(() => {
    unsubscribe = stateManager.subscribeToLatest((newState: T, newStateKey: string) => {
      if (subscribeKey && newStateKey !== subscribeKey) {
        stateMapRef.value = {
          ...stateMapRef.value,
          [newStateKey]: newState,
        };
        return;
      }

      stateMap.value = {
        ...stateMap.value,
        [newStateKey]: newState,
      };
      currentStateKey.value = newStateKey;
      stateMapRef.value = stateMap.value;
    });
  });

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  watch(
    () => subscribeKey,
    () => {
      if (unsubscribe) {
        unsubscribe();
      }

      unsubscribe = stateManager.subscribeToLatest((newState: T, newStateKey: string) => {
        if (subscribeKey && newStateKey !== subscribeKey) {
          stateMapRef.value = {
            ...stateMapRef.value,
            [newStateKey]: newState,
          };
          return;
        }

        stateMap.value = {
          ...stateMap.value,
          [newStateKey]: newState,
        };
        currentStateKey.value = newStateKey;
        stateMapRef.value = stateMap.value;
      });
    },
  );

  const setStateMap = (newStateMap: Record<string, any> | ((prev: Record<string, any>) => Record<string, any>)) => {
    if (typeof newStateMap === 'function') {
      stateMap.value = newStateMap(stateMap.value);
    } else {
      stateMap.value = newStateMap;
    }
    stateMapRef.value = stateMap.value;
  };

  return {
    stateMap,
    currentStateKey,
    setStateMap,
    getCurrentState: () => stateMapRef.value,
    getStateByKey: (key: string) => stateMapRef.value[key],
  };
};

export const AgentStateKey: InjectionKey<UseStateActionReturn> = Symbol('AgentState');

export const provideAgentState = (state: UseStateActionReturn) => {
  provide(AgentStateKey, state);
};

export const useAgentStateDataByKey = (stateKey?: Ref<string | undefined> | string) => {
  const contextState = inject<UseStateActionReturn | null>(AgentStateKey, null);

  const resolvedKey = computed(() => {
    if (stateKey === undefined) return undefined;
    if (typeof stateKey === 'string') return stateKey;
    return stateKey.value;
  });

  const stateMap = ref<Record<string, any>>({});
  const currentStateKey = ref<string | null>(null);
  let unsubscribe: (() => void) | null = null;

  onMounted(() => {
    unsubscribe = stateManager.subscribeToLatest((newState: any, newStateKey: string) => {
      stateMap.value = {
        ...stateMap.value,
        [newStateKey]: newState,
      };
      currentStateKey.value = newStateKey;
    });
  });

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  return computed(() => {
    const key = resolvedKey.value;

    if (contextState) {
      const { stateMap: contextStateMap } = contextState;
      return key ? contextStateMap.value[key] : contextStateMap.value;
    }

    return key ? stateMap.value[key] : stateMap.value;
  });
};

export const useAgentStateContext = (): UseStateActionReturn => {
  const context = inject<UseStateActionReturn | null>(AgentStateKey, null);

  if (!context) {
    throw new Error('useAgentState must be used within AgentStateProvider (component that calls provideAgentState)');
  }

  return context;
};
