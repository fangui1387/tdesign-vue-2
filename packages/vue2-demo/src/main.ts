import Vue from 'vue';
import TDesign from 'tdesign-vue';
import TDesignChat from '@tdesign/td-chat';
import Demo from './demo.vue';
import 'tdesign-vue/es/style/index.css';
import './index.css';

Vue.use(TDesign);
Vue.use(TDesignChat);

new Vue({
  render: (h) => h(Demo),
}).$mount('#app');
