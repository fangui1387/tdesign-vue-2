# Tasks

- [x] Task 1: 安装并配置 JSX 插件
  - [x] SubTask 1.1: 安装 `@vitejs/plugin-vue2-jsx` 依赖
  - [x] SubTask 1.2: 更新 vite.config.ts 添加 JSX 插件配置
  - [x] SubTask 1.3: 配置 babel 以支持 Vue 2 JSX

- [x] Task 2: 修复依赖兼容性问题
  - [x] SubTask 2.1: 检查 `tdesign-vue` 版本兼容性
  - [x] SubTask 2.2: 修复 demo.vue 中的类型导入问题
  - [x] SubTask 2.3: 配置 optimizeDeps 排除问题依赖

- [x] Task 3: 修复 HTML 结构问题
  - [x] SubTask 3.1: 修复 index.html 缺少基本结构的问题
  - [x] SubTask 3.2: 重新安装依赖 `pnpm install`
  - [x] SubTask 3.3: 启动开发服务器 `pnpm dev`

# Task Dependencies
- Task 2 依赖于 Task 1
- Task 3 依赖于 Task 2
