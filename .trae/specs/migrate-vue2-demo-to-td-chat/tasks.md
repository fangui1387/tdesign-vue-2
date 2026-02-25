# Tasks

- [x] Task 1: 更新 package.json 依赖配置
  - [x] SubTask 1.1: 将 Vue 3 替换为 Vue 2.7
  - [x] SubTask 1.2: 将 tdesign-vue-next 替换为 tdesign-vue
  - [x] SubTask 1.3: 添加本地 td-chat 依赖 (file:../td-chat)
  - [x] SubTask 1.4: 更新 vite 插件为 Vue 2 版本

- [x] Task 2: 配置 Vite 支持 Vue 2
  - [x] SubTask 2.1: 安装 @vitejs/plugin-vue2
  - [x] SubTask 2.2: 修改 vite.config.ts 使用 Vue 2 插件
  - [x] SubTask 2.3: 配置别名解析 td-chat

- [x] Task 3: 重写 main.ts 为 Vue 2 兼容
  - [x] SubTask 3.1: 使用 new Vue() 创建实例
  - [x] SubTask 3.2: 更新组件引入方式
  - [x] SubTask 3.3: 调整样式引入路径

- [x] Task 4: 重写 demo.vue 为 Vue 2 兼容
  - [x] SubTask 4.1: 将 <script setup> 改为 export default
  - [x] SubTask 4.2: 重写 useChat hooks 调用
  - [x] SubTask 4.3: 调整组件 API 调用
  - [x] SubTask 4.4: 修复类型定义

- [x] Task 5: 重写 Toolcall.vue 组件
  - [x] SubTask 5.1: 将 <script setup> 改为 Vue 2 语法
  - [x] SubTask 5.2: 调整 props 和 emits 定义

- [x] Task 6: 验证构建和运行
  - [x] SubTask 6.1: 执行 pnpm install
  - [x] SubTask 6.2: 执行 pnpm dev 验证运行
  - [x] SubTask 6.3: 验证聊天功能正常

# Task Dependencies
- Task 2 依赖于 Task 1
- Task 3 依赖于 Task 2
- Task 4 依赖于 Task 3
- Task 5 依赖于 Task 3
- Task 6 依赖于 Task 4 和 Task 5
