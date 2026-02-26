# td-chat 组件 Bug 修复 Spec

## Why
通过对比 `packages/td-chat` 和 `packages/pro-components/chat` 的实现，发现了一些组件存在潜在的 bug 和不一致问题，需要修复以确保 td-chat 组件库的功能正确性。

## What Changes
- 修复 chat-sender.tsx 中 v-model 事件绑定问题
- 修复 chat-input.tsx 中 v-model 事件绑定问题
- 补充 chat-list.tsx 中缺失的中文注释

## Impact
- Affected specs: td-chat 组件库功能正确性
- Affected code: 
  - `packages/td-chat/chat-sender/chat-sender.tsx`
  - `packages/td-chat/chat-input/chat-input.tsx`
  - `packages/td-chat/chat-list/chat-list.tsx`

## ADDED Requirements

### Requirement: v-model 事件绑定正确性
td-chat 组件 SHALL 正确声明 `update:modelValue` 事件以支持 v-model 双向绑定。

#### Scenario: 用户使用 v-model 绑定组件
- **WHEN** 用户使用 `v-model="query"` 绑定 chat-sender 或 chat-input 组件
- **THEN** 组件的 value 值应正确更新并触发 change 事件

### Requirement: 代码注释完整性
td-chat 组件 SHALL 保持与 pro-components 一致的代码注释。

#### Scenario: 开发者阅读组件源码
- **WHEN** 开发者阅读 td-chat 组件源码
- **THEN** 应能看到与 pro-components 对应的中文注释

## MODIFIED Requirements

### Requirement: chat-sender.tsx v-model 支持
修复 chat-sender.tsx 中的 emits 声明，添加 `update:modelValue` 事件。

### Requirement: chat-input.tsx v-model 支持
修复 chat-input.tsx 中的 emits 声明，添加 `update:modelValue` 事件。

### Requirement: chat-list.tsx 注释补充
为 chat-list.tsx 添加与 pro-components 一致的中文注释。

## REMOVED Requirements
无

## 详细问题清单

### 1. chat-sender.tsx 问题

**文件路径**: `packages/td-chat/chat-sender/chat-sender.tsx`

**问题描述**: emits 声明缺少 `update:modelValue` 事件

**pro-components 实现**:
```typescript
emits: ['send', 'stop', 'update:modelValue', 'blur', 'focus', 'fileSelect', 'remove', 'fileClick'],
```

**td-chat 实现**:
```typescript
emits: ['send', 'stop', 'blur', 'focus', 'fileSelect', 'remove', 'fileClick'],
```

**影响**: 使用 v-model 绑定组件时，value 值可能无法正确更新

**修复方法**: 在 emits 数组中添加 `'update:modelValue'`

---

### 2. chat-input.tsx 问题

**文件路径**: `packages/td-chat/chat-input/chat-input.tsx`

**问题描述**: emits 声明缺少 `update:modelValue` 事件

**pro-components 实现**:
```typescript
emits: ['send', 'stop', 'update:modelValue', 'blur', 'focus'],
```

**td-chat 实现**:
```typescript
emits: ['send', 'stop', 'blur', 'focus'],
```

**影响**: 使用 v-model 绑定组件时，value 值可能无法正确更新

**修复方法**: 在 emits 数组中添加 `'update:modelValue'`

---

### 3. chat-list.tsx 问题

**文件路径**: `packages/td-chat/chat-list/chat-list.tsx`

**问题描述**: 缺少与 pro-components 一致的中文注释

**pro-components 实现的注释**:
- 第 25-26 行：平滑地修改scrollTop值
- 第 71-72 行：默认反转布局
- 第 76-87 行：根据layout来设置placement，both时仅对user、assistant设置placement，其他值使用默认left
- 第 139-156 行：回到底部按钮显示
- 第 158-162 行：自动滚动相关状态
- 第 172-189 行：触发自动滚动
- 第 193-228 行：检测自动滚动是否触发
- 第 240-262 行：初始化自动滚动
- 第 268-275 行：平滑回到底部
- 第 278-297 行：clearHistory为true时，清空历史记录显示

**影响**: 代码可读性降低，维护困难

**修复方法**: 补充缺失的中文注释

---

## 修复优先级

| 问题 | 优先级 | 组件 |
|------|---------|------|
| chat-sender v-model 事件 | 高 | chat-sender |
| chat-input v-model 事件 | 高 | chat-input |
| chat-list 注释缺失 | 中 | chat-list |
