import { defineComponent, PropType } from 'vue';
import { usePrefixClass } from '../utils/hooks';

export interface SuggestionItem {
  title: string;
  [key: string]: any;
}

export interface TdChatSuggestionContentProps {
  content?: SuggestionItem[];
  handlePromptClick?: (params: { event: MouseEvent; content: SuggestionItem }) => void;
}

export default defineComponent({
  name: 'TChatSuggestionContent',
  props: {
    content: {
      type: Array as PropType<SuggestionItem[]>,
    },
    handlePromptClick: {
      type: Function as PropType<(params: { event: MouseEvent; content: SuggestionItem }) => void>,
    },
  },
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('chat__item');

    const handleClick = (e: MouseEvent, item: SuggestionItem) => {
      props.handlePromptClick?.({ event: e, content: item });
    };

    return () => {
      const { content } = props;
      if (!content || !content.length) return null;

      return (
        <div class={`${COMPONENT_NAME.value}__suggestion`}>
          {content.map((s, i) =>
            s?.title ? (
              <div
                key={i}
                class={`${COMPONENT_NAME.value}__suggestion-item`}
                onClick={(e) => handleClick(e, s)}
              >
                <span>{s.title}</span>
                <svg
                  viewBox="0 0 24 24"
                  width="16px"
                  height="16px"
                  fill="none"
                  class={`${COMPONENT_NAME.value}__suggestion-arrow`}
                >
                  <path
                    stroke="currentColor"
                    d="M3 14L20 14L15 9"
                    strokeLinecap="square"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            ) : null
          )}
        </div>
      );
    };
  },
});
