<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #chat="{ configProps }">
      <t-chat-list
        v-bind="configProps"
        :data="[
          {
            avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
            role: 'user',
            content: [
              {
                type: 'text',
                data: '南极的自动提款机叫什么名字？',
              },
            ],
          },
          {
            avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
            role: 'assistant',
            content: [
              {
                type: 'text',
                data: '它叫 McMurdo Station ATM，是美国富国银行安装在南极洲最大科学中心麦克默多站的一台自动提款机。',
              },
            ],
          },
        ]"
      >
      </t-chat-list>
    </template>
  </base-usage>
</template>

<script>
import { defineComponent, ref } from 'vue';
import configJson from './props.json';

export default defineComponent({
  setup() {
    const configList = ref(configJson);
    const panelList = [{ label: 'chat', value: 'chat' }];

    const usageCodeMap = {
      chat: "\n      <t-chat-list \n        v-bind=\"configProps\"\n        :data=\"[\n          {\n            avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',\n            role: 'user',\n            content: [\n              {\n                type: 'text',\n                data: '南极的自动提款机叫什么名字？',\n              },\n            ],\n          },\n          {\n            avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',\n            role: 'assistant',\n            content: [\n              {\n                type: 'text',\n                data: '它叫 McMurdo Station ATM，是美国富国银行安装在南极洲最大科学中心麦克默多站的一台自动提款机。',\n              },\n            ],\n          },\n        ]\"\n      >\n      </t-chat-list>",
    };

    const usageCode = ref(`<template>${usageCodeMap[panelList[0].value].trim()}</template>`);

    const onPanelChange = function (panel) {
      usageCode.value = `<template>${usageCodeMap[panel].trim()}</template>`;
    };

    return {
      configList,
      panelList,
      usageCode,
      onPanelChange,
    };
  },
});
</script>
