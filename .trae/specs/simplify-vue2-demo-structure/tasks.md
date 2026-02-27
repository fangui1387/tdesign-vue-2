# Tasks

- [ ] Task 1: 分析 td-chat 对外部依赖的实际使用情况
  - [ ] SubTask 1.1: 检查 td-chat 中对 `@tdesign/common-js` 的引用
  - [ ] SubTask 1.2: 检查 td-chat 中对 `tdesign-vue/es/config-provider/hooks` 的引用
  - [ ] SubTask 1.3: 确定需要 mock 或内置的最小依赖集

- [ ] Task 2: 在 td-chat 内部添加兼容层
  - [ ] SubTask 2.1: 创建 `td-chat/utils/compat` 目录存放兼容代码
  - [ ] SubTask 2.2: 实现 `useConfig` hook 的兼容版本
  - [ ] SubTask 2.3: 实现 Vue 2/3 API 兼容层（如需要）
  - [ ] SubTask 2.4: 更新 td-chat 的导出，使用内部兼容实现

- [ ] Task 3: 更新 td-chat 构建配置
  - [ ] SubTask 3.1: 修改 build-full.js，将兼容代码打包进组件库
  - [ ] SubTask 3.2: 移除对外部 mocks 的依赖声明
  - [ ] SubTask 3.3: 重新构建 td-chat

- [ ] Task 4: 简化 vue2-demo 项目
  - [ ] SubTask 4.1: 删除 `src/mocks` 目录
  - [ ] SubTask 4.2: 简化 `main.ts`，移除 mocks 引入
  - [ ] SubTask 4.3: 简化 `vite.config.ts`，移除 mocks 别名
  - [ ] SubTask 4.4: 更新 package.json（如需要）

- [ ] Task 5: 验证简化后的项目
  - [ ] SubTask 5.1: 执行 pnpm install
  - [ ] SubTask 5.2: 执行 pnpm dev 验证运行
  - [ ] SubTask 5.3: 验证聊天功能正常

# Task Dependencies
- Task 2 依赖于 Task 1
- Task 3 依赖于 Task 2
- Task 4 依赖于 Task 3
- Task 5 依赖于 Task 4
