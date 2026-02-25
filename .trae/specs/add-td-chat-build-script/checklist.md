# Checklist

## 根目录 package.json
- [x] 已添加 `build:td-chat` 指令

## internal/builds/package.json
- [x] 已添加 `build:td-chat` 脚本

## internal/builds/td-chat/ 目录
- [x] 已创建 index.ts 主构建入口
- [x] 已创建 build-components.ts 组件构建配置
- [x] 已创建 build-types.ts 类型构建配置

## internal/utils 路径工具
- [x] 已添加 td-chat 相关路径函数

## 构建功能验证
- [ ] `pnpm build:td-chat` 指令可正常执行
- [ ] 编译输出目录正确
