
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

const rootDir = '/Users/mengfangui/work/mfg/company/agui/code/tdesign-kimi/0224/tdesign-vue-next-feature-attachments/packages/td-chat';
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
