#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs-extra");
const { rollup } = require("rollup");
const vue = require("rollup-plugin-vue");
const babel = require("@rollup/plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve");
const replace = require("@rollup/plugin-replace");
const postcss = require("rollup-plugin-postcss");
const { terser } = require("rollup-plugin-terser");
const glob = require("glob");
const sass = require("sass");

const rootDir = path.resolve(__dirname, "..");

// 输出目录
const outputDirs = {
  es: path.join(rootDir, "es"),
  lib: path.join(rootDir, "lib"),
  dist: path.join(rootDir, "dist"),
};

console.log("Building td-chat (Vue 2.7.16)...");
console.log("Root directory:", rootDir);

// 编译 Sass 文件
async function compileSass(inputFile, outputFile) {
  try {
    const result = sass.compile(inputFile, {
      style: "compressed",
      loadPaths: [rootDir, path.join(rootDir, "node_modules")],
    });
    fs.ensureDirSync(path.dirname(outputFile));
    fs.writeFileSync(outputFile, result.css);
    return true;
  } catch (e) {
    console.warn(`  Warning: Failed to compile ${inputFile}:`, e.message);
    return false;
  }
}

// 编译所有样式文件
async function compileStyles() {
  console.log("\n🎨 Compiling styles...");

  // 查找所有样式文件
  const styleFiles = glob.sync("**/*.{scss,sass,css,less}", {
    cwd: rootDir,
    ignore: ["node_modules/**", "es/**", "lib/**", "dist/**", "scripts/**"],
  });

  for (const file of styleFiles) {
    const inputFile = path.join(rootDir, file);
    const outputFile = path.join(
      outputDirs.es,
      file.replace(/\.scss$/, ".css").replace(/\.sass$/, ".css")
    );

    if (file.endsWith(".scss") || file.endsWith(".sass")) {
      await compileSass(inputFile, outputFile);
    } else {
      // 复制其他样式文件
      fs.ensureDirSync(path.dirname(outputFile));
      fs.copySync(inputFile, outputFile);
    }
  }

  console.log("✅ Styles compiled");
}

// 获取所有入口文件
function getEntries() {
  const entries = {
    index: path.join(rootDir, "index.ts"),
    "index-lib": path.join(rootDir, "index-lib.ts"),
  };

  // 扫描所有组件目录
  const components = glob
    .sync("*", {
      cwd: rootDir,
      onlyDirectories: true,
    })
    .filter((dir) => {
      return ![
        "node_modules",
        "es",
        "lib",
        "dist",
        "style",
        "utils",
        "scripts",
      ].includes(dir);
    });

  components.forEach((comp) => {
    const entryFile = path.join(rootDir, comp, "index.ts");
    if (fs.existsSync(entryFile)) {
      entries[comp] = entryFile;
    }
  });

  // 添加 utils
  const utilsEntry = path.join(rootDir, "utils", "index.ts");
  if (fs.existsSync(utilsEntry)) {
    entries.utils = utilsEntry;
  }

  return entries;
}

// Rollup 插件配置
function getPlugins(format, isMin = false) {
  const plugins = [
    nodeResolve({
      extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
      preferBuiltins: false,
    }),
    commonjs(),
    vue({
      css: true,
      compileTemplate: true,
      template: {
        isProduction: true,
      },
    }),
    babel({
      babelHelpers: "runtime",
      extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
      exclude: "node_modules/**",
      configFile: path.join(__dirname, "babel.config.js"),
    }),
    postcss({
      extract: true,
      minimize: isMin,
      sourceMap: true,
      use: ["sass"],
    }),
    replace({
      preventAssignment: true,
      values: {
        "process.env.NODE_ENV": JSON.stringify(
          isMin ? "production" : "development"
        ),
        PKG_VERSION: JSON.stringify(
          require(path.join(rootDir, "package.json")).version
        ),
        "@tdesign/common-js": "@tdesign/common",
      },
    }),
  ];

  if (isMin) {
    plugins.push(terser());
  }

  return plugins;
}

// 构建 ES 模块
async function buildES() {
  console.log("\n📦 Building ES modules...");

  const entries = getEntries();
  const bundle = await rollup({
    input: entries,
    external: (id) => {
      const externals = [
        "vue",
        "tdesign-vue",
        "tdesign-icons-vue",
        "lodash-es",
        "clipboard",
      ];
      return externals.some((ext) => id === ext || id.startsWith(`${ext}/`));
    },
    plugins: getPlugins("es"),
  });

  await bundle.write({
    dir: outputDirs.es,
    format: "esm",
    entryFileNames: "[name].mjs",
    chunkFileNames: "_chunks/[name]-[hash].mjs",
    sourcemap: true,
  });

  console.log("✅ ES modules built");
}

// 构建 CommonJS 模块
async function buildLib() {
  console.log("\n📦 Building CommonJS modules...");

  const entries = getEntries();
  const bundle = await rollup({
    input: entries,
    external: (id) => {
      const externals = [
        "vue",
        "tdesign-vue",
        "tdesign-icons-vue",
        "lodash-es",
        "clipboard",
      ];
      return externals.some((ext) => id === ext || id.startsWith(`${ext}/`));
    },
    plugins: getPlugins("cjs"),
  });

  await bundle.write({
    dir: outputDirs.lib,
    format: "cjs",
    entryFileNames: "[name].js",
    chunkFileNames: "_chunks/[name]-[hash].js",
    sourcemap: true,
    exports: "named",
  });

  console.log("✅ CommonJS modules built");
}

// 构建 UMD 模块
async function buildDist() {
  console.log("\n📦 Building UMD bundles...");

  // 开发版本
  const devBundle = await rollup({
    input: path.join(rootDir, "index-lib.ts"),
    external: ["vue", "tdesign-vue"],
    plugins: getPlugins("umd"),
  });

  await devBundle.write({
    file: path.join(outputDirs.dist, "td-chat.js"),
    format: "umd",
    name: "TDesignChat",
    globals: {
      vue: "Vue",
      "tdesign-vue": "TDesign",
    },
    sourcemap: true,
  });

  // 生产版本
  const prodBundle = await rollup({
    input: path.join(rootDir, "index-lib.ts"),
    external: ["vue", "tdesign-vue"],
    plugins: getPlugins("umd", true),
  });

  await prodBundle.write({
    file: path.join(outputDirs.dist, "td-chat.min.js"),
    format: "umd",
    name: "TDesignChat",
    globals: {
      vue: "Vue",
      "tdesign-vue": "TDesign",
    },
    sourcemap: true,
  });

  console.log("✅ UMD bundles built");
}

// 生成类型定义
async function generateTypes() {
  console.log("\n📝 Generating type definitions...");

  try {
    execSync("tsc -p tsconfig.json --emitDeclarationOnly", {
      cwd: rootDir,
      stdio: "pipe",
    });
  } catch (e) {
    // 忽略类型错误
  }

  console.log("✅ Type definitions generated");
}

// 主构建函数
async function build() {
  try {
    // 1. 清理之前的构建
    console.log("\n🧹 Cleaning previous build...");
    Object.values(outputDirs).forEach((dir) => {
      if (fs.existsSync(dir)) {
        fs.removeSync(dir);
      }
    });

    // 2. 创建输出目录
    Object.values(outputDirs).forEach((dir) => {
      fs.ensureDirSync(dir);
    });

    // 3. 执行构建
    await compileStyles();
    await buildES();
    await buildLib();
    await buildDist();
    await generateTypes();

    console.log("\n✅ Build completed successfully!");
    console.log("\nOutput directories:");
    console.log(`  - ES modules: ${outputDirs.es}`);
    console.log(`  - CommonJS: ${outputDirs.lib}`);
    console.log(`  - UMD: ${outputDirs.dist}`);
  } catch (error) {
    console.error("\n❌ Build failed:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

build();
