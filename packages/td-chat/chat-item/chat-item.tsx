import { defineComponent, computed, provide } from 'vue';
import { useConfig, usePrefixClass, useTNodeJSX } from '../utils/hooks';

import props from './chat-item-props';
import { isString, isObject } from 'lodash-es';
import { Skeleton } from 'tdesign-vue';
import Text from '../chat-content/chat-content';
import { CheckCircleIcon } from 'tdesign-icons-vue';
import ChatLoading from '../chat-loading';
import ChatReasoning from '../chat-reasoning/chat-reasoning';

export default defineComponent({
  name: 'TChatItem',
  props: {
    ...props,
    reasoningLoading: {
      type: Boolean,
      default: false,
    },
  },
  emits: [],
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('chat');
    const { globalConfig } = useConfig('chat');
    const renderTNodeJSX = useTNodeJSX();
    const role = computed(() => renderTNodeJSX('role'));
    const variant = computed(() => renderTNodeJSX('variant'));
    provide('role', role);

    const renderContent = () => {
      const roleValue = renderTNodeJSX('role');
      const name = renderTNodeJSX('name', { slotFirst: true }) || props.name;
      const datetime = renderTNodeJSX('datetime', { slotFirst: true }) || props.datetime;
      const avatar = renderTNodeJSX('avatar', { slotFirst: true }) || props.avatar;
      const showNameDatetime = computed(() => name || datetime);
      const content = renderTNodeJSX('content', { slotFirst: true }) || props.content;
      const contentClasses = computed(() => {
        return showNameDatetime.value
          ? [`${COMPONENT_NAME.value}__content`]
          : [`${COMPONENT_NAME.value}__content`, `${COMPONENT_NAME.value}__content--base`];
      });
      const avatarDom = avatar ? (
        <div class={`${COMPONENT_NAME.value}__avatar`}>
          <div class={`${COMPONENT_NAME.value}__avatar__box`}>
            {isString(avatar) ? <img src={avatar} alt="" class={`${COMPONENT_NAME.value}__avatar-image`} /> : avatar}
          </div>
        </div>
      ) : null;
      const nameDatetimeDom = showNameDatetime.value && (
        <div class={`${COMPONENT_NAME.value}__base`}>
          {name && <span class={`${COMPONENT_NAME.value}__name`}>{name}</span>}
          {datetime && <span class={`${COMPONENT_NAME.value}__time`}>{datetime}</span>}
        </div>
      );
      const textLoading = props.textLoading;
      const reasoningLoading = props.reasoningLoading;
      const showActions = computed(() => renderTNodeJSX('actionbar') || renderTNodeJSX('actions'));
      const renderHeader = () => {
        const { loadingText, loadingEndText } = globalConfig.value;
        if (reasoningLoading) {
          return <ChatLoading text={loadingText} />;
        }
        return (
          <div style="display:flex;align-items:center">
            <CheckCircleIcon
              style={{
                color: 'var(--td-success-color-5)',
                fontSize: '20px',
                marginRight: '8px',
              }}
            />
            <span>{loadingEndText}</span>
          </div>
        );
      };
      const contentDom = [
        role.value !== 'model-change' && avatarDom,
        <div class={contentClasses.value}>
          {role.value !== 'model-change' && nameDatetimeDom}
          {textLoading &&
            (props.animation === 'skeleton' ? (
              <Skeleton loading={textLoading} animation={'gradient'}></Skeleton>
            ) : (
              <ChatLoading animation={props.animation}></ChatLoading>
            ))}
          {!textLoading && (
            <div class={`${COMPONENT_NAME.value}__detail`}>
              {isObject(props.reasoning) && role.value === 'assistant' && (
                <ChatReasoning
                  expandIconPlacement={(props.reasoning as Record<string, any>).expandIconPlacement}
                  onExpandChange={(props.reasoning as Record<string, any>).onExpandChange}
                  collapse-panel-props={{
                    ...(props.reasoning as Record<string, any>).collapsePanelProps,
                  }}
                ></ChatReasoning>
              )}
              {isString(props.reasoning) && role.value === 'assistant' && (
                <ChatReasoning
                  expandIconPlacement={'right'}
                  collapse-panel-props={{
                    header: renderHeader(),
                    content: (
                      <Text
                        content={{ type: 'text', data: props.reasoning as unknown as string }}
                        role={role.value}
                      />
                    ),
                  }}
                ></ChatReasoning>
              )}
              {isString(content) ? <Text content={content} role={role.value} status={props.status} /> : content}
            </div>
          )}
          {role.value === 'assistant' && showActions.value && (
            <div class={`${COMPONENT_NAME.value}__actions-margin`}>
              {renderTNodeJSX('actionbar') || renderTNodeJSX('actions')}
            </div>
          )}
        </div>,
      ];
      return (
        <div
          class={`${COMPONENT_NAME.value}__inner ${roleValue} ${COMPONENT_NAME.value}__text--variant--${variant.value}`}
        >
          {contentDom}
        </div>
      );
    };

    return renderContent;
  },
});
