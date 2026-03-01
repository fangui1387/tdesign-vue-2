#!/usr/bin/env node

/**
 * 完整的 Vue 2.7.16 构建脚本
 * 使用独立的 npm 环境避免 Vue 版本冲突
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

const rootDir = path.resolve(__dirname, '..');
const buildTempDir = path.join(rootDir, '.build-temp');

console.log('Building td-chat (Vue 2.7.16) - Full Compilation...');
console.log('Root directory:', rootDir);

// 创建独立的 package.json
const packageJson = {
  name: '@tdesign/td-chat-build',
  version: '0.1.0',
  private: true,
  dependencies: {
    '@babel/core': '^7.23.0',
    '@babel/plugin-proposal-nullish-coalescing-operator': '^7.18.6',
    '@babel/plugin-proposal-optional-chaining': '^7.21.0',
    '@babel/plugin-transform-runtime': '^7.23.0',
    '@babel/preset-env': '^7.23.0',
    '@babel/preset-typescript': '^7.23.0',
    '@rollup/plugin-babel': '^6.0.3',
    '@rollup/plugin-commonjs': '^24.0.0',
    '@rollup/plugin-node-resolve': '^16.0.1',
    '@rollup/plugin-replace': '^5.0.2',
    '@vue/babel-preset-jsx': '^1.4.0',
    autoprefixer: '^10.4.16',
    'fs-extra': '^11.3.0',
    glob: '^11.0.1',
    postcss: '^8.4.32',
    rollup: '^2.79.1',
    'rollup-plugin-postcss': '^4.0.2',
    'rollup-plugin-terser': '^7.0.2',
    'rollup-plugin-vue': '^5.1.9',
    sass: '^1.69.5',
    typescript: '^5.8.3',
    vue: '^2.7.16',
    'vue-template-compiler': '^2.7.16',
  },
};

// 创建 babel 配置
const babelConfig = `module.exports = {
  presets: [
    ['@babel/preset-env', { modules: false }],
    ['@vue/babel-preset-jsx', { compositionAPI: false }],
    '@babel/preset-typescript'
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator'
  ]
};`;

// 创建 Rollup 构建脚本
const rollupScript = `
const { rollup } = require('rollup');
const vue = require('rollup-plugin-vue');
const babel = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const nodeResolve = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const postcss = require('rollup-plugin-postcss');
const { terser } = require('rollup-plugin-terser');
const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');

const rootDir = '${rootDir.replace(/\\/g, '\\\\')}';
const outputDirs = {
  es: path.join(rootDir, 'es'),
  lib: path.join(rootDir, 'lib'),
  dist: path.join(rootDir, 'dist')
};

function getEntries() {
  const entries = {
    index: path.join(rootDir, 'index.ts'),
    'index-lib': path.join(rootDir, 'index-lib.ts')
  };

  const components = glob.sync('*', { 
    cwd: rootDir,
    onlyDirectories: true 
  }).filter(dir => {
    return !['node_modules', 'es', 'lib', 'dist', 'style', 'utils', 'scripts', '.build-temp'].includes(dir);
  });

  components.forEach(comp => {
    const entryFile = path.join(rootDir, comp, 'index.ts');
    if (fs.existsSync(entryFile)) {
      entries[comp] = entryFile;
    }
  });

  const utilsEntry = path.join(rootDir, 'utils', 'index.ts');
  if (fs.existsSync(utilsEntry)) {
    entries.utils = utilsEntry;
  }

  return entries;
}

function getPlugins(format, isMin = false) {
  const plugins = [
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      preferBuiltins: false
    }),
    commonjs(),
    vue({
      css: true,
      compileTemplate: true,
      template: { isProduction: true }
    }),
    babel({
      babelHelpers: 'runtime',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      exclude: 'node_modules/**'
    }),
    postcss({
      extract: true,
      minimize: isMin,
      sourceMap: true
    }),
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(isMin ? 'production' : 'development'),
        PKG_VERSION: JSON.stringify('0.1.0')
      }
    })
  ];

  if (isMin) plugins.push(terser());
  return plugins;
}

// 判断是否为外部依赖
function isExternal(id) {
  const coreExternals = ['vue', 'tdesign-vue', 'tdesign-icons-vue', 'lodash-es', 'clipboard', 'tdesign-web-components'];
  for (const ext of coreExternals) {
    if (id === ext || id.startsWith(ext + '/')) {
      return true;
    }
  }
  
  // 将 @tdesign 包的样式和工具模块标记为外部依赖
  const tdesignExternals = ['@tdesign/common-js', '@tdesign/common-style'];
  for (const ext of tdesignExternals) {
    if (id.startsWith(ext)) {
      return true;
    }
  }
  
  return false;
}

async function build() {
  // 清理
  Object.values(outputDirs).forEach(dir => {
    if (fs.existsSync(dir)) fs.removeSync(dir);
    fs.ensureDirSync(dir);
  });

  const entries = getEntries();
  
  // ES 模块
  console.log('Building ES modules...');
  const esBundle = await rollup({
    input: entries,
    external: isExternal,
    plugins: getPlugins('es')
  });
  await esBundle.write({
    dir: outputDirs.es,
    format: 'esm',
    entryFileNames: '[name].mjs',
    chunkFileNames: '_chunks/[name]-[hash].mjs',
    sourcemap: true
  });

  // CommonJS
  console.log('Building CommonJS modules...');
  const cjsBundle = await rollup({
    input: entries,
    external: isExternal,
    plugins: getPlugins('cjs')
  });
  await cjsBundle.write({
    dir: outputDirs.lib,
    format: 'cjs',
    entryFileNames: '[name].js',
    chunkFileNames: '_chunks/[name]-[hash].js',
    sourcemap: true,
    exports: 'named'
  });

  // UMD
  console.log('Building UMD bundles...');
  const umdBundle = await rollup({
    input: path.join(rootDir, 'index-lib.ts'),
    external: (id) => {
      // UMD 只排除核心依赖
      return ['vue', 'tdesign-vue'].includes(id) || id.startsWith('vue/') || id.startsWith('tdesign-vue/');
    },
    plugins: getPlugins('umd')
  });
  await umdBundle.write({
    file: path.join(outputDirs.dist, 'td-chat.js'),
    format: 'umd',
    name: 'TDesignChat',
    globals: { vue: 'Vue', 'tdesign-vue': 'TDesign' },
    sourcemap: true
  });

  // UMD minified
  const umdMinBundle = await rollup({
    input: path.join(rootDir, 'index-lib.ts'),
    external: (id) => {
      return ['vue', 'tdesign-vue'].includes(id) || id.startsWith('vue/') || id.startsWith('tdesign-vue/');
    },
    plugins: getPlugins('umd', true)
  });
  await umdMinBundle.write({
    file: path.join(outputDirs.dist, 'td-chat.min.js'),
    format: 'umd',
    name: 'TDesignChat',
    globals: { vue: 'Vue', 'tdesign-vue': 'TDesign' },
    sourcemap: true
  });

  console.log('Build completed!');
}

build().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
`;

async function build() {
  try {
    // 1. 清理
    console.log('\n🧹 Cleaning...');
    if (fs.existsSync(buildTempDir)) {
      fs.removeSync(buildTempDir);
    }
    fs.ensureDirSync(buildTempDir);

    // 2. 创建独立环境
    console.log('\n📦 Setting up isolated build environment...');
    fs.writeFileSync(path.join(buildTempDir, 'package.json'), JSON.stringify(packageJson, null, 2));
    fs.writeFileSync(path.join(buildTempDir, 'babel.config.js'), babelConfig);
    fs.writeFileSync(path.join(buildTempDir, 'build.js'), rollupScript);

    // 3. 检查并安装依赖
    console.log('\n📥 Checking dependencies...');
    const nodeModulesPath = path.join(buildTempDir, 'node_modules');
    const packageJsonPath = path.join(buildTempDir, 'package.json');

    if (!fs.existsSync(nodeModulesPath)) {
      console.log('  Installing dependencies...');
      execSync('npm install', {
        cwd: buildTempDir,
        stdio: 'inherit',
      });
    } else {
      console.log('  ✓ Dependencies already installed, skipping...');
    }

    // 4. 运行构建（增加内存限制）
    console.log('\n🔨 Building...');
    execSync('node --max-old-space-size=4096 build.js', {
      cwd: buildTempDir,
      stdio: 'inherit',
    });

    // 5. 清理临时目录
    console.log('\n🧹 Cleaning up...');
    fs.removeSync(buildTempDir);

    console.log('\n✅ Build completed successfully!');
    console.log('\nOutput directories:');
    console.log(`  - ES modules: ${path.join(rootDir, 'es')}`);
    console.log(`  - CommonJS: ${path.join(rootDir, 'lib')}`);
    console.log(`  - UMD: ${path.join(rootDir, 'dist')}`);
  } catch (error) {
    console.error('\n❌ Build failed:', error.message);
    process.exit(1);
  }
}

build();
