# Tasks

- [x] Task 1: 分析 td-chat 对外部依赖的实际使用情况
  - [x] SubTask 1.1: 检查 td-chat 中对 `@tdesign/common-js` 的引用
  - [x] SubTask 1.2: 检查 td-chat 中对 `tdesign-vue/es/config-provider/hooks` 的引用
  - [x] SubTask 1.3: 确定需要 mock 或内置的最小依赖集

- [x] Task 2: 在 td-chat 内部添加兼容层
  - [x] SubTask 2.1: 创建 `td-chat/utils/hooks.ts` 存放兼容代码
  - [x] SubTask 2.2: 从 tdesign-vue/es/hooks 导入 useConfig, usePrefixClass, useVModel, useTNodeJSX
  - [x] SubTask 2.3: 更新所有组件使用内部 hooks 导入
  - [x] SubTask 2.4: 更新 td-chat 的导出，使用内部兼容实现

- [x] Task 3: 更新 td-chat 构建配置
  - [x] SubTask 3.1: 修改 build-full.js，移除 @tdesign/common-js 外部依赖声明
  - [x] SubTask 3.2: 移除 paths 配置中的外部依赖映射
  - [x] SubTask 3.3: 更新 tsconfig.json 移除 paths 配置
  - [x] SubTask 3.4: 重新构建 td-chat

- [x] Task 4: 简化 vue2-demo 项目
  - [x] SubTask 4.1: 删除 `src/mocks` 目录（大部分）
  - [x] SubTask 4.2: 简化 `main.ts`，移除 mocks 引入
  - [x] SubTask 4.3: 简化 `vite.config.ts`，保留必要的别名
  - [x] SubTask 4.4: 更新 package.json 使用 @jump-mp/td-chat@^0.1.14

- [x] Task 5: 验证简化后的项目
  - [x] SubTask 5.1: 执行 pnpm install 成功
  - [x] SubTask 5.2: 执行 pnpm dev 成功启动 (http://localhost:5174/)
  - [ ] SubTask 5.3: 验证聊天功能正常

# Task Dependencies
- Task 2 依赖于 Task 1
- Task 3 依赖于 Task 2
- Task 4 依赖于 Task 3
- Task 5 依赖于 Task 4
