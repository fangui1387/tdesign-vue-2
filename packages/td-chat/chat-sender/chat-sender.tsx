import { defineComponent, ref, computed, toRefs } from 'vue';
import { SendFilledIcon, FileAttachmentIcon, ImageIcon } from 'tdesign-icons-vue';
import { Button, Textarea, Tooltip } from 'tdesign-vue';
import Attachments from '../attachments';
import { useConfig, usePrefixClass, useTNodeJSX, useVModelDual } from '../utils/hooks';
import props from './chat-sender-props';

import type { TdChatSenderProps, UploadActionType, UploadActionConfig } from '../type';

export default defineComponent({
  name: 'TChatSender',
  props: {
    ...props,
    attachmentsProps: {
      type: Object,
      default: () => ({ items: [], overflow: 'scrollX' }),
    },
  },
  emits: ['send', 'stop', 'update:modelValue', 'blur', 'focus', 'fileSelect', 'remove', 'fileClick'],
  setup(props, { emit }) {
    const isComposition = false;
    const senderTextarea = ref(null);
    const COMPONENT_NAME = usePrefixClass('chat');
    const { globalConfig } = useConfig('chat');
    const { value, modelValue } = toRefs(props);
    const [textValue, setInnerValue] = useVModelDual(
      value,
      modelValue,
      props.defaultValue,
      props.onChange,
      'value',
      props,
      emit,
    );

    const focusFlag = ref(false);
    const showStopBtn = computed(() => props.loading || props.stopDisabled);
    const disabled = computed(() => props.disabled || false);
    const uploadImageRef = ref(null);
    const uploadFileRef = ref(null);
    const renderTNodeJSX = useTNodeJSX();

    const sendClick = (e: MouseEvent | KeyboardEvent) => {
      if (textValue.value && !disabled.value) {
        emit('send', textValue.value, { e });
      }
    };

    const handleStop = (e: MouseEvent) => {
      e.stopPropagation();
      emit('stop', textValue.value, { e });
    };

    const keydownFn = (value: string, context: { e: KeyboardEvent }) => {
      const {
        e: { key, shiftKey },
      } = context;
      if (key === 'Enter') {
        if (isComposition || context.e.isComposing) {
          return;
        }
        if (shiftKey) {
          return;
        }
        context.e.preventDefault();
        context.e.stopPropagation();
        sendClick(context.e);
      }
    };

    const focusFn = (value: string, context: { e: FocusEvent }) => {
      focusFlag.value = true;
      emit('focus', value, context);
    };

    const blurFn = (value: string, context: { e: FocusEvent }) => {
      focusFlag.value = false;
      emit('blur', value, context);
    };

    const textChange = (value: string, context: { e: InputEvent }) => {
      setInnerValue(value, context);
    };

    // Vue 2: 不要用 reactive([]) 作为根，否则 watch/watchEffect 无法追踪，改用 ref
    const actionsDefault = ref<UploadActionConfig[]>([
      {
        name: 'uploadImage',
        uploadProps: {
          multiple: true,
          accept: 'image/*',
        },
        action: ({ files, name, e }) => {
          emit('fileSelect', { files, name, e });
        },
      },
      {
        name: 'uploadAttachment',
        action: ({ files, name, e }) => {
          emit('fileSelect', { files, name, e });
        },
      },
    ]);

    const getDefaultSuffixIcon = (actions = actionsDefault.value) => {
      const getDefaultAction = (name: UploadActionType) => {
        const defaultAction = actionsDefault.value.find((item) => item.name === name)?.action;
        return defaultAction || (({ files, name, e }) => emit('fileSelect', { files, name, e }));
      };
      const config = globalConfig?.value ?? {};
      const { uploadAttachmentText, uploadImageText } = config;
      const compNameUpload = COMPONENT_NAME?.value ?? 't-chat';
      const uploadAttachment = actions.find((item) => item.name === 'uploadAttachment');
      const uploadAttachmentButton = uploadAttachment ? (
        <div>
          <input
            {...uploadAttachment.uploadProps}
            ref={uploadFileRef}
            type="file"
            onChange={(e: InputEvent) => {
              const files = Array.from((e.target as HTMLInputElement).files || []);
              if (!files.length) {
                return;
              }
              const action = uploadAttachment.action || getDefaultAction('uploadAttachment');
              action({ files, name: uploadAttachment.name, e });
              (e.target as HTMLInputElement).value = '';
            }}
            hidden
          />
          <Tooltip content={uploadAttachmentText}>
            <Button
              theme="default"
              onClick={() => uploadFileRef.value?.click()}
              shape="circle"
              variant="text"
              class={[`${compNameUpload}-sender__upload`]}
            >
              <FileAttachmentIcon size="20px" />
            </Button>
          </Tooltip>
        </div>
      ) : null;

      const uploadImage = actions.find((item) => item.name === 'uploadImage');
      const renderUploadImageButton = uploadImage ? (
        <div>
          <input
            {...uploadImage.uploadProps}
            ref={uploadImageRef}
            type="file"
            onChange={(e: InputEvent) => {
              const files = Array.from((e.target as HTMLInputElement).files || []);
              if (!files.length) {
                return;
              }
              const action = uploadImage.action || getDefaultAction('uploadImage');
              action({ files, name: uploadImage.name, e });
              (e.target as HTMLInputElement).value = '';
            }}
            hidden
          />
          <Tooltip content={uploadImageText}>
            <Button
              theme="default"
              onClick={() => uploadImageRef.value?.click()}
              shape="circle"
              variant="text"
              class={[`${compNameUpload}-sender__upload`]}
            >
              <ImageIcon size="20px" />
            </Button>
          </Tooltip>
        </div>
      ) : null;
      const buttonComponents = {
        uploadAttachment: uploadAttachmentButton,
        uploadImage: renderUploadImageButton,
      };

      const compName = COMPONENT_NAME?.value ?? 't-chat';
      const showStop = showStopBtn?.value ?? false;
      const txtVal = textValue?.value;
      const dis = disabled?.value ?? false;

      return (
        <div>
          {actions.length > 0 &&
            actions
              .filter(
                (item): item is { name: UploadActionType; action: () => void } =>
                  item.name === 'uploadAttachment' || item.name === 'uploadImage',
              )
              .map((item) => buttonComponents[item.name])}
          {!showStop ? (
            <Button
              theme="default"
              size="small"
              variant="text"
              class={[
                `${compName}-sender__button__default`,
                txtVal ? '' : `${compName}-sender__button--disabled`,
              ]}
              onClick={sendClick}
              disabled={dis || showStop || !txtVal}
            >
              <SendFilledIcon />
            </Button>
          ) : (
            <Button variant="text" class={`${compName}-sender__button__default`} onClick={handleStop}>
              <div class={`${compName}-sender__button__stopicon`} />
            </Button>
          )}
        </div>
      );
    };

    const renderSuffixIcon = () => {
      const suffix = renderTNodeJSX('suffix', { params: { renderPresets: getDefaultSuffixIcon } });
      return suffix ? suffix : getDefaultSuffixIcon([]);
    };

    const handleRemove = (e: CustomEvent) => {
      emit('remove', e);
    };

    const handleFileClick = (e: CustomEvent) => {
      emit('fileClick', e);
    };

    const renderHeader = () => {
      const compName = COMPONENT_NAME?.value ?? 't-chat';
      return props.attachmentsProps.items.length > 0 ? (
        <Attachments
          items={props.attachmentsProps.items}
          onRemove={handleRemove}
          onFileClick={handleFileClick}
          class={`${compName}-sender__attachment`}
          overflow={props.attachmentsProps.overflow}
        />
      ) : (
        renderTNodeJSX('header')
      );
    };

    const renderInputPrefix = () => renderTNodeJSX('input-prefix') || null;

    const renderContent = () => {
      const compName = COMPONENT_NAME?.value ?? 't-chat';
      const txtVal = textValue?.value ?? '';
      const dis = disabled?.value ?? false;
      const focus = focusFlag?.value ?? false;
      return (
        <div class={`${compName}-sender`}>
          <div
            class={[
              `${compName}-sender__textarea`,
              focus ? `${compName}-sender__textarea--focus` : '',
            ]}
          >
            <div class={`${compName}-sender__header`}>{renderHeader()}</div>
            <div class={`${compName}-sender__inner-header`}>{renderTNodeJSX('inner-header')}</div>
            <div class={`${compName}-sender__textarea__wrapper`}>
              {renderInputPrefix()}
              <Textarea
                ref={senderTextarea}
                value={txtVal}
                onChange={textChange}
                disabled={dis}
                autosize={
                  (props.textareaProps as TdChatSenderProps['textareaProps'])?.autosize || {
                    minRows: 2,
                    maxRows: 5,
                  }
                }
                {...(props.textareaProps as TdChatSenderProps['textareaProps'])}
                onKeydown={keydownFn}
                onFocus={focusFn}
                onBlur={blurFn}
              />
            </div>
            <div class={`${compName}-sender__footer`}>
              <div class={`${compName}-sender__mode`}>{renderTNodeJSX('footer-prefix')}</div>
              <div class={`${compName}-sender__button`}>
                <div class={`${compName}-sender__button__sendbtn`}>{renderSuffixIcon()}</div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return {
      renderContent,
    };
  },
  render() {
    return (this as any).renderContent();
  },
});
