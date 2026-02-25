import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
      '@tdesign/common-js': path.resolve(__dirname, '../components/src'),
      'tdesign-vue/es/config-provider/hooks': path.resolve(__dirname, '../components/src/config-provider/hooks'),
    },
  },
  optimizeDeps: {
    exclude: ['@tdesign/td-chat'],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
