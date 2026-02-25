# Tasks

- [x] Task 1: 在根目录 package.json 中添加 build:td-chat 指令
  - [x] SubTask 1.1: 在 scripts 中添加 `"build:td-chat": "pnpm -C internal/builds build:td-chat"`

- [x] Task 2: 在 internal/builds/package.json 中添加构建脚本
  - [x] SubTask 2.1: 在 scripts 中添加 `"build:td-chat": "cross-env NODE_ENV=production tsx ./td-chat/index.ts"`

- [x] Task 3: 创建 internal/builds/td-chat/ 目录和构建文件
  - [x] SubTask 3.1: 创建 td-chat/index.ts 主构建入口
  - [x] SubTask 3.2: 创建 td-chat/build-components.ts 组件构建配置
  - [x] SubTask 3.3: 创建 td-chat/build-types.ts 类型构建配置

# Task Dependencies
- [Task 2] depends on [Task 3]
- [Task 1] depends on [Task 2]
