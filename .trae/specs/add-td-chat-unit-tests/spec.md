# td-chat 组件单元测试规范

## Why
td-chat 包包含多个聊天相关组件，目前没有任何单元测试覆盖。为了确保代码质量和稳定性，需要为所有组件编写单元测试，并达到 100% 测试覆盖率。

## What Changes
- 创建 td-chat 测试目录和配置
- 为每个组件创建单元测试文件
- 配置覆盖率报告

## Impact
- Affected specs: td-chat 所有组件
- Affected code: 
  - packages/td-chat/test/ (新建)
  - packages/td-chat/**/__tests__/ (新建)

## ADDED Requirements

### Requirement: 测试环境配置
系统应提供完整的测试环境配置，包括：
- Vitest 配置文件
- 测试依赖安装
- 覆盖率报告配置

#### Scenario: 测试环境初始化
- **WHEN** 开发者运行测试命令
- **THEN** 测试框架应正确加载所有测试文件并生成覆盖率报告

### Requirement: 组件单元测试
每个组件都应有完整的单元测试覆盖：

#### 组件列表
1. **attachments** - 附件组件 ✅ 测试文件已创建
2. **chat-actionbar** - 聊天操作栏组件 ✅ 测试文件已创建
3. **chat-content** - 聊天内容组件 ✅ 测试文件已创建
4. **chat-engine** - 聊天引擎 ✅ 测试通过 (13 tests)
5. **chat-input** - 聊天输入组件 ✅ 测试文件已创建
6. **chat-item** - 聊天项组件 ✅ 测试文件已创建
7. **chat-list** - 聊天列表组件 ✅ 测试文件已创建
8. **chat-loading** - 聊天加载组件 ✅ 测试文件已创建
9. **chat-markdown** - Markdown 渲染组件 ✅ 测试文件已创建
10. **chat-message** - 聊天消息组件 ✅ 测试文件已创建
11. **chat-reasoning** - 推理展示组件 ✅ 测试文件已创建
12. **chat-sender** - 聊天发送组件 ✅ 测试文件已创建
13. **chat-thinking** - 思考过程组件 ✅ 测试文件已创建
14. **chatbot** - 聊天机器人组件 ✅ 测试文件已创建
15. **utils** - 工具函数 ✅ 测试通过 (11 tests)

## Known Issues

### Vue 2/3 混合环境问题
由于 monorepo 中同时存在 Vue 2.7 (td-chat) 和 Vue 3 (tdesign-vue-next)，测试运行时会出现 Vue 版本冲突。

**解决方案**:
1. 在独立环境中运行 td-chat 测试
2. 或将 td-chat 迁移到 Vue 3
3. 或使用独立的测试项目隔离 Vue 版本

## 运行测试

```bash
cd packages/td-chat/test
pnpm install
pnpm test
```

## 当前测试状态
- chat-engine: ✅ 13 tests passed
- utils: ✅ 11 tests passed
- 其他组件: 测试文件已创建，需要解决 Vue 版本冲突后运行
