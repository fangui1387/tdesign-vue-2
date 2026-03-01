/* eslint-disable */

import { PropType } from 'vue';

export interface TdAttachmentItem {
  key?: string;
  name: string;
  url?: string;
  size?: number;
  status?: 'success' | 'fail' | 'progress';
  percent?: number;
  description?: string;
  fileType?: 'image' | 'file' | 'video' | 'audio';
  type?: string;
  extension?: string;
}

export interface TdAttachmentsProps {
  items: TdAttachmentItem[];
  overflow?: 'scrollX' | 'scrollY' | 'wrap';
  removable?: boolean;
  imageViewer?: boolean;
}

export default {
  items: {
    type: Array as PropType<TdAttachmentsProps['items']>,
    default: () => [],
  },
  overflow: {
    type: String as PropType<TdAttachmentsProps['overflow']>,
    default: 'wrap',
    validator: (val: TdAttachmentsProps['overflow']): boolean => {
      return ['scrollX', 'scrollY', 'wrap'].includes(val);
    },
  },
  removable: {
    type: Boolean as PropType<TdAttachmentsProps['removable']>,
    default: true,
  },
  imageViewer: {
    type: Boolean as PropType<TdAttachmentsProps['imageViewer']>,
    default: true,
  },
};
