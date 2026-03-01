import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import vueJsx from '@vitejs/plugin-vue2-jsx';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      // 启用 JSX 支持
      include: [/\.tsx?$/, /\.jsx?$/],
    }),
  ],
  resolve: {
    alias: {
      '@tdesign/common-js/utils/easing': path.resolve(__dirname, './src/mocks/easing.ts'),
      // 确保 Vue 版本一致
      'vue': path.resolve(__dirname, './node_modules/vue/dist/vue.esm.js'),
    },
    dedupe: ['vue'],
  },
  optimizeDeps: {
    include: [
      'vue',
      'tdesign-vue',
      '@jump-mp/td-chat',
      'tdesign-web-components',
      'tdesign-icons-vue',
    ],
    exclude: [],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
