import { ref, computed, Ref, ComputedRef } from 'vue';

export { useConfig, usePrefixClass, useVModel } from 'tdesign-vue/es/hooks';
export { useTNodeJSX, useTNodeDefault, useContent } from 'tdesign-vue/es/hooks/tnode';

export type ChangeHandler<T, P extends any[]> = (value: T, ...args: P) => void;

/**
 * Vue 2.7 compatible useVModel that supports both value and modelValue (align with pro-components API).
 * Uses reactive "which prop is defined" so v-model works when parent passes modelValue later.
 */
export function useVModelDual<T, P extends any[]>(
  value: Ref<T | undefined>,
  modelValue: Ref<T | undefined>,
  defaultValue: T,
  onChange: ChangeHandler<T, P> | undefined,
  propName: string,
  _props: Record<string, any>,
  emit: (event: string, value: T) => void,
): [ComputedRef<T>, ChangeHandler<T, P>] {
  const internalValue = ref(defaultValue) as Ref<T>;

  const useModelValue = computed(() => modelValue.value !== undefined);
  const useValue = computed(() => value.value !== undefined && !useModelValue.value);

  const currentValue = computed(() =>
    useModelValue.value ? (modelValue.value as T) : useValue.value ? (value.value as T) : internalValue.value,
  );

  const setter: ChangeHandler<T, P> = (newValue: T, ...args: P) => {
    if (useModelValue.value) {
      emit('update:modelValue', newValue);
    } else if (useValue.value) {
      emit(`update:${propName}`, newValue);
    } else {
      internalValue.value = newValue;
    }
    onChange?.(newValue, ...args);
  };

  return [currentValue, setter];
}
