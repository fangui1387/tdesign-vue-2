# Checklist

## td-chat 兼容层
- [ ] td-chat 内部包含 useConfig hook 兼容实现
- [ ] td-chat 不依赖外部的 `@tdesign/common-js`
- [ ] td-chat 不依赖外部的 `tdesign-vue/es/config-provider/hooks`
- [ ] td-chat 构建成功，无外部依赖错误

## vue2-demo 简化
- [ ] `vue2-demo/src/mocks` 目录已删除
- [ ] `vue2-demo/src/main.ts` 不包含 mocks 引入
- [ ] `vue2-demo/vite.config.ts` 不包含 mocks 别名
- [ ] vue2-demo 项目结构与 tdesign-vue3-demo 相似

## 功能验证
- [ ] pnpm install 成功执行无错误
- [ ] pnpm dev 成功启动 dev server
- [ ] 页面正常显示聊天界面
- [ ] 可以正常发送消息
- [ ] SSE 流式响应正常工作
