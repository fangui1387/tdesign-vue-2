import { defineComponent, PropType, ref, watch } from 'vue';
import { Collapse, CollapsePanel } from 'tdesign-vue';
import { usePrefixClass } from '../utils/hooks';

export interface SearchReference {
  url: string;
  title: string;
  icon?: string;
}

export interface SearchContent {
  title: string;
  references?: SearchReference[];
}

export interface TdChatSearchContentProps {
  content?: SearchContent;
  status?: string;
  useCollapse?: boolean;
  collapsed?: boolean;
  handleSearchItemClick?: (params: { event: MouseEvent; content: SearchReference }) => void;
  handleSearchResultClick?: (params: { event: MouseEvent; content: SearchContent }) => void;
}

export default defineComponent({
  name: 'TChatSearchContent',
  props: {
    content: {
      type: Object as PropType<SearchContent>,
    },
    status: {
      type: String,
      default: 'complete',
    },
    useCollapse: {
      type: Boolean,
      default: true,
    },
    collapsed: {
      type: Boolean,
      default: true,
    },
    handleSearchItemClick: {
      type: Function as PropType<(params: { event: MouseEvent; content: SearchReference }) => void>,
    },
    handleSearchResultClick: {
      type: Function as PropType<(params: { event: MouseEvent; content: SearchContent }) => void>,
    },
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('chat__item');
    const isCollapsed = ref(props.collapsed ? [] : [1]);

    watch(
      () => props.collapsed,
      (val) => {
        isCollapsed.value = val ? [] : [1];
      }
    );

    const handleCollapseChange = (value: number[]) => {
      isCollapsed.value = value;
    };

    const handleClick = (e: MouseEvent, item: SearchReference) => {
      props.handleSearchItemClick?.({ event: e, content: item });
    };

    const handleHeaderClick = (e: MouseEvent) => {
      props.handleSearchResultClick?.({ event: e, content: props.content! });
    };

    return () => {
      const { content, status, useCollapse } = props;
      if (!content) return null;

      const references = content.references || [];
      const title = content.title;
      const titleText = status === 'stop' ? '搜索已终止' : title;

      if (!references.length && status === 'complete') return null;

      const renderIcons = () => (
        <div class={`${COMPONENT_NAME.value}__search-icons`}>
          {references.map((item) =>
            item?.icon ? (
              <img
                key={item.url}
                class={`${COMPONENT_NAME.value}__search-icon`}
                alt={item.title}
                src={item.icon}
              />
            ) : null
          )}
        </div>
      );

      const renderLinks = () => (
        <div class={`${COMPONENT_NAME.value}__search-links`}>
          {references.map((item, i) => (
            <span
              key={item.url}
              class={`${COMPONENT_NAME.value}__search-link-wrapper`}
              onClick={(e) => handleClick(e, item)}
            >
              <a
                target="_blank"
                href={item.url}
                class={`${COMPONENT_NAME.value}__search-link`}
                onClick={(e) => e.stopPropagation()}
              >
                {i + 1}. {item.title}
              </a>
              <svg
                viewBox="0 0 24 24"
                width="1em"
                height="1em"
                fill="none"
                class={`${COMPONENT_NAME.value}__jump-icon`}
              >
                <path
                  stroke="currentColor"
                  d="M9 4L4 4L4 20L20 20L20 15"
                  strokeLinecap="square"
                  strokeWidth="2"
                />
                <path
                  stroke="currentColor"
                  d="M19.25 4.75L12 12M14 4H20L20 10"
                  strokeLinecap="square"
                  strokeWidth="2"
                />
              </svg>
            </span>
          ))}
        </div>
      );

      if (useCollapse) {
        return (
          <div class={`${COMPONENT_NAME.value}__search__wrapper`}>
            <Collapse
              class={`${COMPONENT_NAME.value}__search`}
              expandIconPlacement="right"
              value={isCollapsed.value}
              onChange={handleCollapseChange}
            >
              <CollapsePanel
                class={`${COMPONENT_NAME.value}__search__content`}
                header={titleText}
              >
                {renderLinks()}
              </CollapsePanel>
            </Collapse>
          </div>
        );
      }

      return (
        <div class={`${COMPONENT_NAME.value}__search__wrapper`}>
          <div class={`${COMPONENT_NAME.value}__search__header`} onClick={handleHeaderClick}>
            {renderIcons()}
            {titleText}
          </div>
        </div>
      );
    };
  },
});
