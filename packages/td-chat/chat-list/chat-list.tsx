import { defineComponent, computed, provide, ref, onMounted, onUnmounted } from 'vue';
import { ClearIcon, ArrowDownIcon } from 'tdesign-icons-vue';
import { useConfig, usePrefixClass, useTNodeJSX } from '../utils/hooks';
import { isArray, throttle, debounce } from 'lodash-es';
import { Divider, Popconfirm, Button } from 'tdesign-vue';
import { ChatMessage } from '../chat-message';
import { TdChatItemMeta, ScrollToBottomParams } from '../type';
import props from './props';

const handleScrollToBottom = (target: HTMLDivElement, behavior?: 'auto' | 'smooth') => {
  const currentScrollHeight = target.scrollHeight;
  const currentClientHeight = target.clientHeight;
  const innerBehavior = behavior ?? 'auto';
  if (innerBehavior === 'auto') {
    target.scrollTop = currentScrollHeight - currentClientHeight;
  } else {
    const startScrollTop = target.scrollTop;
    const endScrollTop = currentScrollHeight - currentClientHeight;
    const duration = 300;
    const step = (endScrollTop - startScrollTop) / duration;
    let startTime: number | undefined;
    const animateScroll = (time: number) => {
      if (!startTime) {
        startTime = time;
      }
      const elapsed = time - startTime;
      const top = Math.min(endScrollTop, startScrollTop + elapsed * step);
      target.scrollTop = top;
      if (top < endScrollTop) {
        requestAnimationFrame(animateScroll);
      }
    };
    requestAnimationFrame(animateScroll);
  }
};

export default defineComponent({
  name: 'TChatList',
  props,
  emits: ['clear', 'scroll'],
  setup(props, { emit }) {
    const COMPONENT_NAME = usePrefixClass('chat');
    const { globalConfig } = useConfig('chat');
    const renderTNodeJSX = useTNodeJSX();
    provide('textLoading', props.textLoading);
    provide('animation', props.animation);
    provide('reverse', props.reverse);

    const classes = computed(() => {
      return [
        COMPONENT_NAME.value,
        {
          [`${COMPONENT_NAME.value}--normal`]: props.layout === 'both',
        },
      ];
    });

    const listClasses = computed(() => {
      return [
        `${COMPONENT_NAME.value}__list`,
        {
          [`${COMPONENT_NAME.value}__list--reverse`]: props.reverse,
        },
      ];
    });

    const renderBody = () => {
      const data = renderTNodeJSX('data');
      if (isArray(data) && data.length > 0) {
        const setPlacement = (item: TdChatItemMeta) => {
          if (props.layout === 'both') {
            if (item.role === 'assistant') return 'left';
            if (item.role === 'user') return 'right';
            return 'left';
          }
          return 'left';
        };
        return data.map((item: TdChatItemMeta, index: number) => (
          <ChatMessage
            avatar={item.avatar}
            name={item.name}
            role={item.role}
            status={
              item.status || (props.textLoading && (props.reverse ? index === 0 : index === data.length - 1))
                ? 'pending'
                : ''
            }
            content={item.content}
            datetime={item.datetime}
            animation={props.animation}
            placement={setPlacement(item)}
            {...{
              scopedSlots: {
                actionbar: () =>
                  renderTNodeJSX('actionbar', {
                    params: { item, index },
                  }) ||
                  renderTNodeJSX('actions', {
                    params: { item, index },
                  }),
                name: () => renderTNodeJSX('name', { params: { item, index } }),
                avatar: () => renderTNodeJSX('avatar', { params: { item, index } }),
                datetime: () => renderTNodeJSX('datetime', { params: { item, index } }),
                header: () => renderTNodeJSX('header', { params: { item, index } }),
                content: () => renderTNodeJSX('content', { params: { item, index } }),
              },
            }}
          />
        ));
      } else {
        return renderTNodeJSX('default');
      }
    };

    const clearConfirm = (context: { e: MouseEvent }) => {
      emit('clear', context);
    };

    const defaultClearHistory = (
      <Popconfirm content={globalConfig.value.confirmClearHistory} onConfirm={clearConfirm}>
        <Divider class="clear-btn">
          <ClearIcon size="14px" />
          <span class="clear-btn-text">{globalConfig.value.clearHistoryBtnText}</span>
        </Divider>
      </Popconfirm>
    );

    const showFooter = computed(() => renderTNodeJSX('footer'));
    const listRef = ref<HTMLDivElement>();
    const innerRef = ref<HTMLDivElement>();
    const scrollButtonVisible = ref(false);

    const checkAndShowScrollButton = debounce(() => {
      if (!props.showScrollButton) {
        scrollButtonVisible.value = false;
        return;
      }
      const list = listRef.value;
      if (!list) return;
      if (!props.reverse) {
        if (list && list.scrollHeight - list.clientHeight - list.scrollTop > 0) {
          scrollButtonVisible.value = true;
        } else {
          scrollButtonVisible.value = false;
        }
      } else {
        scrollButtonVisible.value = list.scrollTop < 0;
      }
    }, 70);

    const scrollTopTmp = ref(0);
    const scrollHeightTmp = ref(0);
    const preventAutoScroll = ref(false);
    const isAutoScrollEnabled = ref(false);
    const observer = ref<ResizeObserver | null>(null);

    const scrollToBottom = (data?: ScrollToBottomParams) => {
      if (!listRef.value) return;
      const behavior = data?.behavior ?? 'auto';
      handleScrollToBottom(listRef.value, behavior);
    };

    const handleAutoScroll = throttle(() => {
      const { autoScroll, defaultScrollTo, reverse } = props;
      // 如果未启用自动滚动、自动滚动未激活或反向滚动，则直接返回
      if (!autoScroll || !isAutoScrollEnabled.value || reverse) {
        return;
      }

      // 如果列表引用不存在，则直接返回
      if (!listRef.value) return;

      // 根据默认滚动位置执行滚动
      if (defaultScrollTo === 'top') {
        // 滚动到顶部
        listRef.value.scrollTo({
          top: 0,
          behavior: 'auto',
        });
      } else {
        // 滚动到底部
        scrollToBottom({
          behavior: 'auto',
        });
      }
    }, 50);

    const checkAutoScroll = throttle(() => {
      if (!listRef.value || props.reverse) return;
      const { scrollTop, scrollHeight, clientHeight } = listRef.value;
      const { defaultScrollTo } = props;
      const scrollDiff = scrollTopTmp.value - scrollTop;
      const upScroll = scrollHeight === scrollHeightTmp.value && scrollDiff >= 10 ? true : false;
      if (upScroll) {
        isAutoScrollEnabled.value = false;
        preventAutoScroll.value = true;
      } else {
        const threshold = 50;
        let isNearTarget = false;
        if (defaultScrollTo === 'top') {
          isNearTarget = scrollTop <= threshold;
        } else {
          isNearTarget = scrollHeight - (scrollTop + clientHeight) <= threshold;
        }

        if (preventAutoScroll.value) {
          if (isNearTarget) {
            isAutoScrollEnabled.value = true;
            preventAutoScroll.value = false;
          }
        } else {
          isAutoScrollEnabled.value = true;
        }
      }
      scrollTopTmp.value = scrollTop;
    }, 60);

    const handleScroll = (e: Event) => {
      checkAutoScroll();
      checkAndShowScrollButton();
      emit('scroll', {
        e,
      });
    };

    onMounted(() => {
      const { defaultScrollTo } = props;
      defaultScrollTo === 'bottom' && !props.reverse && (isAutoScrollEnabled.value = true);
      const list = listRef.value;
      const inner = innerRef.value;
      checkAndShowScrollButton();
      if (list) {
        observer.value = new ResizeObserver(() => {
          if (list?.scrollHeight !== scrollHeightTmp.value) {
            handleAutoScroll();
          }
          scrollHeightTmp.value = list?.scrollHeight || 0;
        });
        if (inner) {
          observer.value?.observe(inner);
        }
      }
    });

    onUnmounted(() => {
      observer.value?.disconnect();
    });

    const backBottom = () => {
      scrollToBottom({ behavior: 'smooth' });
    };

    return {
      scrollToBottom,
      classes,
      listClasses,
      listRef,
      innerRef,
      handleScroll,
      renderBody,
      renderTNodeJSX,
      defaultClearHistory,
      showFooter,
      scrollButtonVisible,
      backBottom,
      COMPONENT_NAME,
    };
  },
  render() {
    const ctx = this as any;
    const classes = ctx.classes?.value ?? [];
    const listClasses = ctx.listClasses?.value ?? [];
    const componentName = ctx.COMPONENT_NAME?.value ?? 't-chat';
    const showFooterVal = ctx.showFooter?.value;
    const scrollButtonVisibleVal = ctx.scrollButtonVisible?.value;

    return (
      <div class={classes}>
        <div class={listClasses} ref={ctx.listRef} onScroll={ctx.handleScroll}>
          {ctx.reverse && <div class="place-holder"></div>}
          {ctx.reverse && ctx.clearHistory && ctx.renderTNodeJSX('clearHistory', ctx.defaultClearHistory)}
          {ctx.reverse ? ctx.renderBody() : <div ref={ctx.innerRef}>{ctx.renderBody()}</div>}
          {!ctx.reverse && ctx.clearHistory && ctx.renderTNodeJSX('clearHistory', ctx.defaultClearHistory)}
        </div>
        {showFooterVal && <div class={`${componentName}__footer`}>{showFooterVal}</div>}
        {ctx.showScrollButton && scrollButtonVisibleVal && (
          <Button variant="text" class={`${componentName}__to-bottom`} onClick={ctx.backBottom}>
            <div class={`${componentName}__to-bottom-inner`}>
              <ArrowDownIcon />
            </div>
          </Button>
        )}
      </div>
    );
  },
});
