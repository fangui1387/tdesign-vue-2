# Checklist

- [x] package.json 中 Vue 版本为 2.7.x
- [x] package.json 中 tdesign-vue 版本兼容 Vue 2
- [x] package.json 中包含 `"@tdesign/td-chat": "file:../td-chat"`
- [x] vite.config.ts 使用 @vitejs/plugin-vue2
- [x] main.ts 使用 Vue 2 的 new Vue() 创建实例
- [x] demo.vue 使用 export default 而非 <script setup>
- [x] Toolcall.vue 使用 Vue 2 兼容语法
- [x] pnpm install 成功执行无错误
- [x] pnpm dev 成功启动 dev server
- [ ] 页面正常显示聊天界面
- [ ] 可以正常发送消息
- [ ] SSE 流式响应正常工作
- [ ] ToolCall 组件正常渲染
- [ ] 操作栏（复制、点赞）功能正常
