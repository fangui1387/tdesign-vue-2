<template>
  <base-usage :code="usageCode" :config-list="configList" :panel-list="panelList" @panel-change="onPanelChange">
    <template #chat="{ configProps }">
      <div style="width: 560px">
        <t-chat-message
          avatar="https://tdesign.gtimg.com/site/chat-avatar.png"
          datetime="今天16:38"
          name="TDesignAI"
          role="user"
          :content="[
            {
              type: 'text',
              data: '牛顿第一定律是否适用于所有参考系？',
            },
          ]"
          v-bind="configProps"
        />
        <t-chat-message
          avatar="https://tdesign.gtimg.com/site/chat-avatar.png"
          datetime="今天16:38"
          name="TDesignAI"
          role="assistant"
          status="pending"
          v-bind="configProps"
        />
      </div>
    </template>
  </base-usage>
</template>

<script>
import { defineComponent, ref } from 'vue';
import configJson from './props.json';

export default defineComponent({
  setup() {
    const configList = ref(configJson);
    const panelList = [{ label: 'ChatMessage', value: 'chat' }];

    const usageCodeMap = {
      chat: ` 
  <div style="width: 560px">
  <t-chat-message
        avatar="https://tdesign.gtimg.com/site/chat-avatar.png"
        datetime="今天16:38"
        name="TDesignAI"
        role="user"
          :content="[
            {
              type: 'text',
              data: '牛顿第一定律是否适用于所有参考系？',
            },
          ]"
        v-bind="configProps"
      />
      <t-chat-message
        avatar="https://tdesign.gtimg.com/site/chat-avatar.png"
        datetime="今天16:38"
        name="TDesignAI"
        role="assistant"
        status="pending"
        v-bind="configProps"
      />
       </div>
      `,
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
