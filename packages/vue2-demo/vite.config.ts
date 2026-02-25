import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
      '@tdesign/common-js': path.resolve(__dirname, '../components/src'),
      '@tdesign/common-style': path.resolve(__dirname, './node_modules/tdesign-vue/esm/_common/style'),
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
