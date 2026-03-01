import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

const escapeTest = /[&<>"']/;
const escapeReplace = new RegExp(escapeTest.source, 'g');
const escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
const escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, 'g');

type IEscape = {
  [key in '&<>"\'']: string;
};

const escapeReplacements: IEscape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const getEscapeReplacement = (ch: string): string => escapeReplacements[ch as keyof IEscape];

function escape(html: string, encode: Boolean = false) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else if (escapeTestNoEncode.test(html)) {
    return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
  }

  return html;
}

export default defineComponent({
  name: 'TChatMarkdown',
  props: {
    content: {
      type: String,
      default: '',
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['ready'],
  setup(props, { emit }) {
    const htmlContent = ref('');
    const markedInstance = ref<Marked | null>(null);

    const initMarked = () => {
      const options = props.options || {};
      
      markedInstance.value = new Marked(
        markedHighlight({
          highlight(code) {
            return hljs.highlightAuto(code).value;
          },
        }),
        {
          renderer: {
            code(code, lang, escaped) {
              return `<pre class="hljs"><div class="t-chat__code-header">
        <span class="t-chat__language-txt">${escape(lang || '')}</span>
        <div class="t-chat__copy-btn" data-clipboard-action="copy">复制</div>
        </div><code class="hljs language-${escape(lang || '')}" >${escaped ? code : escape(code)}</code></pre>`;
            },
          },
          ...options,
        }
      );
    };

    const renderMarkdown = () => {
      if (!markedInstance.value) {
        initMarked();
      }
      
      if (!props.content) {
        htmlContent.value = '';
        return;
      }

      try {
        htmlContent.value = markedInstance.value?.parse(props.content) || '';
      } catch (error) {
        console.error('Markdown parse error:', error);
        htmlContent.value = props.content;
      }
    };

    const initClipboard = () => {
      if (typeof window !== 'undefined' && window.Clipboard) {
        const clipboard = new Clipboard('.t-chat__copy-btn', {
          target: (trigger: HTMLDivElement) => {
            const codeBlock = trigger.closest('pre');
            const codeElement = codeBlock?.querySelector('code');
            return codeElement || trigger;
          },
        });

        clipboard.on('success', (e) => {
          const trigger = e.trigger as HTMLElement;
          const originalText = trigger.textContent;
          trigger.textContent = '已复制';
          setTimeout(() => {
            trigger.textContent = originalText;
          }, 2000);
          e.clearSelection();
        });

        clipboard.on('error', (e) => {
          console.error('Clipboard error:', e);
        });
      }
    };

    watch(
      () => props.content,
      () => {
        renderMarkdown();
      },
      { immediate: true }
    );

    watch(
      () => props.options,
      () => {
        initMarked();
        renderMarkdown();
      },
      { deep: true }
    );

    onMounted(() => {
      renderMarkdown();
      initClipboard();
      emit('ready');
    });

    return {
      htmlContent,
    };
  },
  render() {
    return (
      <div class="t-chat-markdown">
        <div domPropsInnerHTML={this.htmlContent}></div>
      </div>
    );
  },
});
