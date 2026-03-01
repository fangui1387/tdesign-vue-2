import { defineComponent, computed, ref, watch } from 'vue';
import { Collapse, CollapsePanel } from 'tdesign-vue';
import { CheckCircleIcon, CloseCircleIcon } from 'tdesign-icons-vue';
import { usePrefixClass, useTNodeJSX } from '../utils/hooks';
import props from './chat-thinking-props';
import ChatLoading from '../chat-loading';

export default defineComponent({
  name: 'TChatThinking',
  props,
  emits: ['collapsed-change'],
  setup(props, { slots, emit }) {
    const COMPONENT_NAME = usePrefixClass('chat__item');
    const renderTNodeJSX = useTNodeJSX();
    const innerCollapsed = ref(props.collapsed);

    watch(
      () => props.collapsed,
      (val) => {
        innerCollapsed.value = val;
      },
    );

    const layoutClass = computed(() =>
      props.layout === 'border' ? `${COMPONENT_NAME.value}__think-layout-border` : '',
    );

    const contentStyle = computed(() => {
      if (props.maxHeight) {
        const height = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight;
        return {
          maxHeight: height,
          overflowY: 'auto',
        };
      }
      return {};
    });

    const onChangeFn = (value: Array<number>) => {
      const newCollapsed = value.length === 0;
      innerCollapsed.value = newCollapsed;
      emit('collapsed-change', newCollapsed);
    };

    const renderThinkingStatus = () => {
      const { status } = props;
      if (status === 'complete' || status === 'stop') {
        return (
          <CheckCircleIcon
            class={`${COMPONENT_NAME.value}__think__status--complete`}
            style={{ color: 'var(--td-success-color, #00a870)', fontSize: '18px' }}
          />
        );
      }
      if (status === 'error') {
        return (
          <CloseCircleIcon
            class={`${COMPONENT_NAME.value}__think__status--error`}
            style={{ color: 'var(--td-error-color, #d54941)', fontSize: '18px' }}
          />
        );
      }
      return <ChatLoading animation={props.animation} />;
    };

    const renderHeader = () => {
      const { status } = props;
      const content = props.content as any;
      const title = content?.title || '正在思考中...';

      return (
        <div class={`${COMPONENT_NAME.value}__think__header__content`}>
          {status !== 'stop' && renderThinkingStatus()}
          {status === 'stop' ? '思考已终止' : title}
        </div>
      );
    };

    const renderContent = () => {
      const content = props.content as any;
      const text = content?.text;

      const slotContent = slots.content?.() || slots.default?.() || renderTNodeJSX('content');

      if (slotContent) {
        return <div style={contentStyle.value}>{slotContent}</div>;
      }

      if (text) {
        return (
          <div class={`${COMPONENT_NAME.value}__think__inner`} style={contentStyle.value}>
            {text.split('\n').filter(Boolean).map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        );
      }

      return null;
    };

    const renderMain = () => (
      <div class={`${COMPONENT_NAME.value}__think ${layoutClass.value}`}>
        <Collapse
          borderless={true}
          expandIconPlacement="right"
          onChange={onChangeFn}
          value={innerCollapsed.value ? [] : [0]}
        >
          <CollapsePanel
            expandIcon={true}
            value={0}
            {...{
              scopedSlots: {
                header: renderHeader,
                default: renderContent,
              },
            }}
          />
        </Collapse>
      </div>
    );

    return {
      renderMain,
    };
  },
  render() {
    return (this as any).renderMain();
  },
});
