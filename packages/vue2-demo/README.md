# tdesign-vue2-demo

这是一个基于 Vue 2.7.16 的 TDesign 示例工程，可以直接运行。它展示了在 Vue 2.7 + Vite 环境中 TDesign 组件的基本使用方法。

## 推荐的 IDE 配置

[VS Code](https://code.visualstudio.com/) + [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)（Vue 2 推荐使用 Vetur）。

## 推荐的浏览器配置

- 基于 Chromium 的浏览器（Chrome、Edge、Brave 等）：
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [在 Chrome DevTools 中开启自定义对象格式化器](http://bit.ly/object-formatters)
- Firefox：
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [在 Firefox DevTools 中开启自定义对象格式化器](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## 关于 TDesign

[TDesign](https://tdesign.tencent.com/) 是腾讯开发的一套全面的设计系统，为 Web 应用提供高质量的 UI 组件。本项目使用 `tdesign-vue`，即 TDesign 的 Vue 2 实现。

### 主要特性
- **丰富的组件库**：包含按钮、表单、模态框、表格等多种组件
- **TypeScript 支持**：完整的 TypeScript 类型定义，提升开发体验
- **响应式设计**：适配不同屏幕尺寸
- **可定制主题**：轻松调整样式以匹配品牌形象

## TypeScript 对 `.vue` 导入的类型支持

TypeScript 默认无法处理 `.vue` 导入的类型信息。Vue 2.7 支持 Composition API，在编辑器中推荐使用 [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) 来获得更好的 TypeScript 和 Vue 组件支持。

## 项目结构

```
tdesign-vue2-demo/
├── src/                 # 源代码
│   ├── assets/          # 静态资源
│   ├── components/      # Vue 组件
│   ├── App.vue          # 根组件
│   └── main.ts          # 入口文件
├── public/              # 公共文件
├── index.html           # HTML 模板
├── vite.config.ts       # Vite 配置
├── tsconfig.json        # TypeScript 配置
└── package.json         # 项目依赖
```

## 自定义配置

请参考 [Vite 配置参考](https://vite.dev/config/)。

## 项目设置

```sh
pnpm install
```

### 开发环境编译和热重载

```sh
pnpm dev
```

### 生产环境类型检查、编译和压缩

```sh
pnpm build
```

### 预览生产构建

```sh
pnpm serve
```
