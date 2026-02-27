import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@tdesign/common-js/utils/easing': path.resolve(__dirname, './src/mocks/easing.ts'),
    },
  },
});
