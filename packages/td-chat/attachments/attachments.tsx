import { defineComponent, ref, computed, watch, onMounted, nextTick } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, FileIcon, ImageIcon, VideoIcon, SoundIcon } from 'tdesign-icons-vue';
import { usePrefixClass } from '../utils/hooks';
import props from './attachments-props';

import type { TdAttachmentItem } from './attachments-props';

const IMG_EXTS = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg'];
const FILE_ICONS: Record<string, any> = {
  image: ImageIcon,
  video: VideoIcon,
  audio: SoundIcon,
  file: FileIcon,
};

function formatSize(size: number): string {
  if (size < 1024) {
    return `${size}B`;
  }
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)}KB`;
  }
  return `${(size / (1024 * 1024)).toFixed(1)}MB`;
}

function getFileExtension(name: string): string {
  const parts = name.split('.');
  return parts.length > 1 ? parts.pop()?.toLowerCase() || '' : '';
}

function getFileType(item: TdAttachmentItem): 'image' | 'video' | 'audio' | 'file' {
  if (item.fileType) return item.fileType;
  if (item.type?.startsWith('image/')) return 'image';
  if (item.type?.startsWith('video/')) return 'video';
  if (item.type?.startsWith('audio/')) return 'audio';
  const ext = getFileExtension(item.name);
  if (IMG_EXTS.includes(ext)) return 'image';
  if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'].includes(ext)) return 'video';
  if (['mp3', 'wav', 'ogg', 'flac', 'aac'].includes(ext)) return 'audio';
  return 'file';
}

export default defineComponent({
  name: 'TAttachments',
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    CloseIcon,
    FileIcon,
    ImageIcon,
    VideoIcon,
    SoundIcon,
  },
  props,
  emits: ['remove', 'file-click'],
  setup(props, { emit }) {
    const COMPONENT_NAME = usePrefixClass('attachment');
    const containerRef = ref<HTMLElement | null>(null);
    const showPrevButton = ref(false);
    const showNextButton = ref(false);
    const previewVisible = ref(false);
    const previewUrl = ref('');
    const previewIndex = ref(0);

    const allImages = computed(() => {
      return props.items?.every((item) => {
        const fileType = getFileType(item);
        return fileType === 'image';
      });
    });

    const imageList = computed(() => {
      return props.items?.filter((item) => getFileType(item) === 'image') || [];
    });

    const updateButtonVisibility = () => {
      const container = containerRef.value;
      if (!container || props.overflow !== 'scrollX') return;

      const { scrollLeft, scrollWidth, clientWidth } = container;
      const maxScroll = scrollWidth - clientWidth;
      showPrevButton.value = scrollLeft > 1;
      showNextButton.value = scrollLeft < maxScroll - 1;
    };

    const onScrollOffset = (offset: -1 | 1) => {
      const containerEle = containerRef.value;
      if (!containerEle) return;

      const children = containerEle.querySelectorAll('.t-attachment-item');
      if (!children.length) return;

      const firstChild = children[0] as HTMLElement;
      const childStyle = window.getComputedStyle(firstChild);
      const childWidth = firstChild.offsetWidth + parseInt(childStyle.marginLeft, 10) + parseInt(childStyle.marginRight, 10) + 12;
      const containerWidth = containerEle.clientWidth;
      const visibleCount = Math.floor(containerWidth / childWidth);
      const scrollDistance = childWidth * visibleCount;
      const currentScroll = containerEle.scrollLeft;
      const maxScroll = containerEle.scrollWidth - containerWidth;

      let targetScrollLeft = 0;
      if (offset === 1) {
        targetScrollLeft = Math.min(currentScroll + scrollDistance, maxScroll);
        if (maxScroll - targetScrollLeft < childWidth) {
          targetScrollLeft = maxScroll;
        }
      } else {
        targetScrollLeft = Math.max(currentScroll - scrollDistance, 0);
        if (targetScrollLeft < childWidth) {
          targetScrollLeft = 0;
        }
      }

      containerEle.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      });

      setTimeout(() => updateButtonVisibility(), 500);
    };

    const handleFileClick = (item: TdAttachmentItem, index: number) => {
      if (props.imageViewer && getFileType(item) === 'image') {
        previewIndex.value = imageList.value.findIndex((img) => img.url === item.url);
        previewUrl.value = item.url || '';
        previewVisible.value = true;
      }
      emit('file-click', item);
    };

    const handleRemove = (item: TdAttachmentItem) => {
      emit('remove', item);
    };

    const handlePreviewPrev = () => {
      if (previewIndex.value > 0) {
        previewIndex.value--;
        previewUrl.value = imageList.value[previewIndex.value].url || '';
      }
    };

    const handlePreviewNext = () => {
      if (previewIndex.value < imageList.value.length - 1) {
        previewIndex.value++;
        previewUrl.value = imageList.value[previewIndex.value].url || '';
      }
    };

    const closePreview = () => {
      previewVisible.value = false;
    };

    const renderProgress = (item: TdAttachmentItem) => {
      if (item.status === 'progress') {
        return (
          <div class={`${COMPONENT_NAME.value}-item__progress`}>
            <div class={`${COMPONENT_NAME.value}-item__progress-bar`}>
              <div
                class={`${COMPONENT_NAME.value}-item__progress-inner`}
                style={{ width: `${item.percent || 0}%` }}
              />
            </div>
            <span class={`${COMPONENT_NAME.value}-item__progress-text`}>{item.percent || 0}%</span>
          </div>
        );
      }
      return null;
    };

    const renderFileCard = (item: TdAttachmentItem, index: number) => {
      const fileType = getFileType(item);
      const isImage = fileType === 'image';
      const ext = getFileExtension(item.name);
      const IconComponent = FILE_ICONS[fileType] || FileIcon;

      const cardCls = [
        `${COMPONENT_NAME.value}-item`,
        allImages.value ? `${COMPONENT_NAME.value}-item--image` : `${COMPONENT_NAME.value}-item--file`,
      ].join(' ');

      if (isImage && allImages.value) {
        return (
          <div class={cardCls} key={item.key || item.name || index}>
            <div
              class={`${COMPONENT_NAME.value}-item__image-wrap`}
              onClick={() => handleFileClick(item, index)}
            >
              {item.url ? (
                <img
                  class={`${COMPONENT_NAME.value}-item__image`}
                  src={item.url}
                  alt={item.name}
                />
              ) : (
                <div class={`${COMPONENT_NAME.value}-item__placeholder`}>
                  <ImageIcon size="24px" />
                </div>
              )}
              {renderProgress(item)}
            </div>
            {props.removable && (
              <div
                class={`${COMPONENT_NAME.value}-item__remove`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(item);
                }}
              >
                <CloseIcon size="14px" />
              </div>
            )}
          </div>
        );
      }

      return (
        <div class={cardCls} key={item.key || item.name || index}>
          <div
            class={`${COMPONENT_NAME.value}-item__content`}
            onClick={() => handleFileClick(item, index)}
          >
            <div class={`${COMPONENT_NAME.value}-item__icon`}>
              <IconComponent size="24px" />
            </div>
            <div class={`${COMPONENT_NAME.value}-item__info`}>
              <div class={`${COMPONENT_NAME.value}-item__name`} title={item.name}>
                {item.name}
              </div>
              <div class={`${COMPONENT_NAME.value}-item__meta`}>
                {item.description || (item.size ? formatSize(item.size) : ext.toUpperCase())}
              </div>
              {renderProgress(item)}
            </div>
          </div>
          {props.removable && (
            <div
              class={`${COMPONENT_NAME.value}-item__remove`}
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(item);
              }}
            >
              <CloseIcon size="14px" />
            </div>
          )}
        </div>
      );
    };

    const renderPreview = () => {
      if (!previewVisible.value) return null;

      return (
        <div class={`${COMPONENT_NAME.value}-preview`} onClick={closePreview}>
          <div class={`${COMPONENT_NAME.value}-preview__mask`} />
          <div class={`${COMPONENT_NAME.value}-preview__content`} onClick={(e) => e.stopPropagation()}>
            <img class={`${COMPONENT_NAME.value}-preview__image`} src={previewUrl.value} alt="preview" />
            {previewIndex.value > 0 && (
              <div class={`${COMPONENT_NAME.value}-preview__btn--prev`} onClick={handlePreviewPrev}>
                <ChevronLeftIcon size="24px" />
              </div>
            )}
            {previewIndex.value < imageList.value.length - 1 && (
              <div class={`${COMPONENT_NAME.value}-preview__btn--next`} onClick={handlePreviewNext}>
                <ChevronRightIcon size="24px" />
              </div>
            )}
            <div class={`${COMPONENT_NAME.value}-preview__close`} onClick={closePreview}>
              <CloseIcon size="24px" />
            </div>
            <div class={`${COMPONENT_NAME.value}-preview__counter`}>
              {previewIndex.value + 1} / {imageList.value.length}
            </div>
          </div>
        </div>
      );
    };

    onMounted(() => {
      nextTick(() => {
        updateButtonVisibility();

        if (containerRef.value) {
          containerRef.value.addEventListener('scroll', updateButtonVisibility);

          const resizeObserver = new ResizeObserver(() => {
            updateButtonVisibility();
          });
          resizeObserver.observe(containerRef.value as Element);
        }
      });
    });

    watch(
      () => props.items,
      () => {
        nextTick(() => {
          updateButtonVisibility();
        });
      },
      { deep: true },
    );

    return () => {
      const listCls = `${COMPONENT_NAME.value}-list`;
      const wrapCls = `${listCls}-wrap`;
      const listClasses = [
        listCls,
        props.overflow === 'scrollX' ? `${listCls}--overflow-scrollX` : '',
        props.overflow === 'scrollY' ? `${listCls}--overflow-scrollY` : '',
        props.overflow === 'wrap' ? `${listCls}--overflow-wrap` : '',
      ].filter(Boolean).join(' ');

      return (
        <div class={wrapCls}>
          <div
            ref={containerRef}
            class={listClasses}
          >
            {props.items?.map((item, index) => renderFileCard(item, index))}
          </div>

          {props.overflow === 'scrollX' && showPrevButton.value && (
            <div class={`${listCls}-prev-btn`} onClick={() => onScrollOffset(-1)}>
              <ChevronLeftIcon size="16px" />
            </div>
          )}

          {props.overflow === 'scrollX' && showNextButton.value && (
            <div class={`${listCls}-next-btn`} onClick={() => onScrollOffset(1)}>
              <ChevronRightIcon size="16px" />
            </div>
          )}

          {renderPreview()}
        </div>
      );
    };
  },
});
