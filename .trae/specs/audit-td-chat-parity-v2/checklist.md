# td-chat 与 pro-components 一致性审计 - 验证清单

## 示例文件验证

- [ ] Checkpoint 1: `chat-sender/_example/chat-sender.vue` 文件存在且内容正确
- [ ] Checkpoint 2: `chat-reasoning/_example/mock-data/sseRequest-reasoning.ts` 文件存在且内容正确
- [ ] Checkpoint 3: `chat-reasoning/_example/mock-data/sseRequest.ts` 文件存在且内容正确
- [ ] Checkpoint 4: `chat-list/_example/chat-drawer.vue` 文件存在且内容正确
- [ ] Checkpoint 5: `chat-list/_example/chat-footer-slot.vue` 文件存在且内容正确
- [ ] Checkpoint 6: `chat-list/_example/chat-with-message.vue` 文件存在且内容正确
- [ ] Checkpoint 7: `chat-markdown/_example/footnote.vue` 文件存在且内容正确

## chatbot 示例文件验证

- [ ] Checkpoint 8: `chatbot/_example/agent.vue` 文件存在且内容正确
- [ ] Checkpoint 9: `chatbot/_example/agui.vue` 文件存在且内容正确
- [ ] Checkpoint 10: `chatbot/_example/chatbot-base.vue` 文件存在且内容正确
- [ ] Checkpoint 11: `chatbot/_example/code.vue` 文件存在且内容正确
- [ ] Checkpoint 12: `chatbot/_example/custom.vue` 文件存在且内容正确
- [ ] Checkpoint 13: `chatbot/_example/docs.vue` 文件存在且内容正确
- [ ] Checkpoint 14: `chatbot/_example/hookComponent.vue` 文件存在且内容正确
- [ ] Checkpoint 15: `chatbot/_example/image.vue` 文件存在且内容正确
- [ ] Checkpoint 16: `chatbot/_example/initial-messages.vue` 文件存在且内容正确
- [ ] Checkpoint 17: `chatbot/_example/instance-methods.vue` 文件存在且内容正确
- [ ] Checkpoint 18: `chatbot/_example/quick-start.vue` 文件存在且内容正确
- [ ] Checkpoint 19: `chatbot/_example/role-message-config.vue` 文件存在且内容正确
- [ ] Checkpoint 20: `chatbot/_example/sender-config.vue` 文件存在且内容正确
- [ ] Checkpoint 21: `chatbot/_example/service-config.vue` 文件存在且内容正确
- [ ] Checkpoint 22: `chatbot/_example/components/Login.vue` 文件存在且内容正确
- [ ] Checkpoint 23: `chatbot/_example/components/Toolcall.vue` 文件存在且内容正确

## chat-engine 示例文件验证

- [ ] Checkpoint 24: `chat-engine/_example/agui-basic.vue` 文件存在且内容正确
- [ ] Checkpoint 25: `chat-engine/_example/agui-comprehensive.vue` 文件存在且内容正确
- [ ] Checkpoint 26: `chat-engine/_example/agui-toolcall.vue` 文件存在且内容正确
- [ ] Checkpoint 27: `chat-engine/_example/comprehensive.vue` 文件存在且内容正确
- [ ] Checkpoint 28: `chat-engine/_example/custom-content.vue` 文件存在且内容正确
- [ ] Checkpoint 29: `chat-engine/_example/initial-messages.vue` 文件存在且内容正确
- [ ] Checkpoint 30: `chat-engine/_example/instance-methods.vue` 文件存在且内容正确
- [ ] Checkpoint 31: `chat-engine/_example/components/ImageGenProgress.vue` 文件存在且内容正确
- [ ] Checkpoint 32: `chat-engine/_example/components/ImageGenStart.vue` 文件存在且内容正确
- [ ] Checkpoint 33: `chat-engine/_example/components/PlanningSteps.vue` 文件存在且内容正确
- [ ] Checkpoint 34: `chat-engine/_example/components/ProgressPanel.vue` 文件存在且内容正确
- [ ] Checkpoint 35: `chat-engine/_example/components/UserPreferencesForm.vue` 文件存在且内容正确
- [ ] Checkpoint 36: `chat-engine/_example/components/WeatherCard.vue` 文件存在且内容正确

## 测试文件验证

- [ ] Checkpoint 37: `chat-actionbar/__tests__/index.test.jsx` 文件存在且测试通过
- [ ] Checkpoint 38: `chat-actionbar/__tests__/__snapshots__/index.test.jsx.snap` 文件存在
- [ ] Checkpoint 39: `chat-item/__tests__/index.test.jsx` 文件存在且测试通过
- [ ] Checkpoint 40: `chat-loading/__tests__/index.test.jsx` 文件存在且测试通过
- [ ] Checkpoint 41: `chat-reasoning/__tests__/index.test.jsx` 文件存在且测试通过
- [ ] Checkpoint 42: `chat-reasoning/__tests__/__snapshots__/index.test.jsx.snap` 文件存在

## Props 和代码一致性验证

- [ ] Checkpoint 43: `chat-list/props.ts` 注释与 pro-components 一致
- [ ] Checkpoint 44: `chat-sender.tsx` 功能与 pro-components 一致
- [ ] Checkpoint 45: `chat-list.tsx` 功能与 pro-components 一致

## 最终验证

- [ ] Checkpoint 46: 所有新增示例文件无 TypeScript/ESLint 错误
- [ ] Checkpoint 47: 所有新增测试文件可以正常运行
- [ ] Checkpoint 48: td-chat 目录结构与 pro-components/chat 一致
