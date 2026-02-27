# Checklist

## td-chat 兼容层
- [x] td-chat 内部包含 useConfig hook 兼容实现
- [x] td-chat 不依赖外部的 `@tdesign/common-js`（通过 tdesign-vue/es/hooks 解决）
- [x] td-chat 不依赖外部的 `tdesign-vue/es/config-provider/hooks`
- [x] td-chat 构建成功，无外部依赖错误

## vue2-demo 简化
- [x] `vue2-demo/src/mocks` 目录已删除（保留必要的 easing.ts）
- [x] `vue2-demo/src/main.ts` 不包含 mocks 引入
- [x] `vue2-demo/vite.config.ts` 保留必要的别名配置
- [x] vue2-demo 项目可以正常启动

## 功能验证
- [x] pnpm install 成功执行无错误
- [x] pnpm dev 成功启动 dev server (http://localhost:5174/)
- [ ] 页面正常显示聊天界面
- [ ] 可以正常发送消息
- [ ] SSE 流式响应正常工作
