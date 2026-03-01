import { defineComponent, computed, provide, inject, ComputedRef, toRefs } from 'vue';
import { usePrefixClass, useTNodeJSX, useVModelDual } from '../utils/hooks';
import props from './chat-reasoning-props';
import { Collapse, CollapsePanel } from 'tdesign-vue';

export default defineComponent({
  name: 'TChatReasoning',
  props,
  emits: ['change', 'update:collapsed'],
  setup(props, { emit }) {
    const COMPONENT_NAME = usePrefixClass('chat');
    const injectedRole = inject<ComputedRef<string>>('role');
    const role = computed(() => injectedRole?.value || '');
    provide('role', role);
    const renderTNodeJSX = useTNodeJSX();
    const { collapsed, modelValue } = toRefs(props);
    const [innerCollapsed, setInnerCollapsed] = useVModelDual(
      collapsed,
      modelValue,
      props.defaultCollapsed,
      props.onExpandChange,
      'collapsed',
      props,
      emit,
    );
    const layoutClass = computed(() =>
      props.layout === 'border' ? `${COMPONENT_NAME.value}__detail-reasoning-border` : '',
    );

    const onChangeFn = (value: Array<number>) => {
      setInnerCollapsed(value.length === 0);
    };

    const renderContent = () => (
      <div class={`${COMPONENT_NAME.value}__detail-reasoning`}>
        <Collapse
          borderless={true}
          class={`${layoutClass.value}`}
          expandIconPlacement={props.expandIconPlacement}
          onChange={onChangeFn}
          value={innerCollapsed.value ? [] : [0]}
        >
          <CollapsePanel
            expandIcon={true}
            value={0}
            destroyOnCollapse={props?.collapsePanelProps?.destroyOnCollapse}
            disabled={props?.collapsePanelProps?.disabled}
            {...{
              scopedSlots: {
                default: () => props?.collapsePanelProps?.content || renderTNodeJSX('default'),
                header: () => props?.collapsePanelProps?.header || renderTNodeJSX('header'),
                expandIcon: () => props?.collapsePanelProps?.expandIcon || renderTNodeJSX('expandIcon'),
                headerRightContent: () =>
                  props?.collapsePanelProps?.headerRightContent || renderTNodeJSX('headerRightContent'),
                content: () => props?.collapsePanelProps?.content || renderTNodeJSX('default'),
              },
            }}
          ></CollapsePanel>
        </Collapse>
      </div>
    );

    return {
      renderContent,
    };
  },
  render() {
    return (this as any).renderContent();
  },
});
