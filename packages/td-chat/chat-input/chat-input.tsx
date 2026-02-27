import { defineComponent, toRefs, computed, ref } from 'vue';
import { SendIcon, StopCircleIcon } from 'tdesign-icons-vue';
import { Button, Textarea } from 'tdesign-vue';
import { useConfig, useTNodeJSX, usePrefixClass, useVModel } from '../utils/hooks';
import props from './chat-input-props';

export default defineComponent({
  name: 'TChatInput',
  props,
  emits: ['send', 'stop', 'update:modelValue', 'blur', 'focus'],
  setup(props, { emit }) {
    const COMPONENT_NAME = usePrefixClass('chat');
    const { globalConfig } = useConfig('chat');
    const { value } = toRefs(props);
    const [textValue, setInnerValue] = useVModel(value, props.defaultValue, props.onChange);

    const disabled = computed(() => props.stopDisabled);
    const textareaDisabled = computed(() => props.disabled);
    const autofocus = computed(() => props.autofocus);
    const autosize = computed(() => props.autosize);
    const placeholderText = computed(() => props.placeholder ?? globalConfig.value.placeholder);

    let shiftDownFlag = false;
    const isComposition = false;
    const renderTNodeJSX = useTNodeJSX();

    const sendClick = (e: MouseEvent | KeyboardEvent) => {
      if (textValue.value && !disabled.value) {
        emit('send', textValue.value, { e });
        setInnerValue('', { e });
      }
    };

    const handleStop = (e: MouseEvent) => {
      emit('stop', textValue.value, { e });
    };

    const textChange = (value: string, context: { e: InputEvent }) => {
      setInnerValue(value, context);
    };

    const blurFn = (value: string, context: { e: FocusEvent }) => {
      shiftDownFlag = false;
      emit('blur', value, context);
    };

    const focusFn = (value: string, context: { e: FocusEvent }) => {
      emit('focus', value, context);
    };

    const keydownFn = (value: string, context: { e: KeyboardEvent }) => {
      const {
        e: { key },
      } = context;
      if (key === 'Shift') {
        shiftDownFlag = true;
      }
      if (key === 'Enter' && !shiftDownFlag && !isComposition) {
        context.e.cancelBubble = true;
        context.e.preventDefault();
        context.e.stopPropagation();
        sendClick(context.e);
      }
    };

    const keyupFn = (value: any, context: any) => {
      const {
        e: { key },
      } = context;
      if (key === 'Shift') {
        shiftDownFlag = false;
      }
    };

    const getDefaultSuffixIcon = () => {
      return (
        <Button
          theme="default"
          size="small"
          variant="text"
          class={[
            `${COMPONENT_NAME.value}__footer__textarea__icon__default`,
            textValue.value ? `${COMPONENT_NAME.value}__footer__textarea__icon--focus` : '',
          ]}
          disabled={disabled.value || !textValue.value || textareaDisabled.value}
        >
          <SendIcon />
        </Button>
      );
    };

    const renderSuffixIcon = () => {
      const suffixIcon = renderTNodeJSX('suffixIcon');
      return suffixIcon ? suffixIcon : getDefaultSuffixIcon();
    };

    const renderContent = () => (
      <div class={`${COMPONENT_NAME.value}__footer__content`}>
        <div class={`${COMPONENT_NAME.value}__footer__textarea`}>
          <Textarea
            value={textValue.value}
            class="noscrollbar"
            placeholder={placeholderText.value}
            disabled={textareaDisabled.value}
            autofocus={autofocus.value}
            autosize={autosize.value}
            onChange={textChange}
            onBlur={blurFn}
            onFocus={focusFn}
            onKeydown={keydownFn}
            onKeyup={keyupFn}
          />
          <div class={`${COMPONENT_NAME.value}__footer__textarea__icon`} onClick={sendClick}>
            {renderSuffixIcon()}
          </div>
        </div>
        {disabled.value && !textareaDisabled.value && (
          <div class={`${COMPONENT_NAME.value}__footer__stopbtn`}>
            <Button variant="outline" onClick={handleStop}>
              <StopCircleIcon />
              {globalConfig.value.stopBtnText}
            </Button>
          </div>
        )}
      </div>
    );

    return renderContent;
  },
});
