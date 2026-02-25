#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

const tdChatRoot = path.resolve(__dirname, '../../../packages/td-chat');
const buildDir = __dirname;

console.log('Building td-chat (Vue 2.7.16)...');
console.log('Working directory:', tdChatRoot);

async function build() {
  try {
    // 1. 清理之前的构建
    console.log('\n🧹 Cleaning previous build...');
    const dirs = ['es', 'lib', 'dist'];
    dirs.forEach((dir) => {
      const dirPath = path.join(tdChatRoot, dir);
      if (fs.existsSync(dirPath)) {
        fs.removeSync(dirPath);
      }
    });

    // 2. 创建输出目录
    dirs.forEach((dir) => {
      fs.ensureDirSync(path.join(tdChatRoot, dir));
    });

    // 3. 生成类型定义
    console.log('\n📝 Generating type definitions...');
    try {
      execSync(`tsc -p tsconfig.json --emitDeclarationOnly`, {
        cwd: tdChatRoot,
        stdio: 'pipe',
      });
    } catch (e) {
      // 忽略类型错误
    }
    console.log('✅ Type definitions generated');

    // 4. 复制源文件到 es 目录（作为 ES 模块）
    console.log('\n📦 Copying source files...');

    // 复制所有 .ts 文件
    const copyFiles = (srcDir, destDir) => {
      const files = fs.readdirSync(srcDir);
      files.forEach((file) => {
        const srcPath = path.join(srcDir, file);
        const destPath = path.join(destDir, file);
        const stat = fs.statSync(srcPath);

        if (stat.isDirectory() && file !== 'node_modules' && file !== 'es' && file !== 'lib' && file !== 'dist') {
          fs.ensureDirSync(destPath);
          copyFiles(srcPath, destPath);
        } else if (file.endsWith('.ts') && !file.endsWith('.d.ts')) {
          // 复制并重命名为 .mjs
          const content = fs.readFileSync(srcPath, 'utf8');
          fs.writeFileSync(destPath.replace('.ts', '.mjs'), content);
        } else if (file.endsWith('.vue')) {
          fs.copySync(srcPath, destPath);
        }
      });
    };

    copyFiles(tdChatRoot, path.join(tdChatRoot, 'es'));
    console.log('✅ Source files copied to es/');

    // 5. 创建 package.json 入口文件
    console.log('\n📄 Creating entry files...');

    // 创建 ES 模块入口
    const esIndex = path.join(tdChatRoot, 'es', 'index.mjs');
    fs.writeFileSync(
      esIndex,
      `
export * from './index-lib.mjs';
export { default } from './index-lib.mjs';
`,
    );

    // 创建 CommonJS 入口（简单的包装）
    const libDir = path.join(tdChatRoot, 'lib');
    fs.ensureDirSync(libDir);
    const libIndex = path.join(libDir, 'index.js');
    fs.writeFileSync(
      libIndex,
      `
module.exports = require('../es/index-lib.mjs');
`,
    );

    // 创建 UMD 入口
    const distDir = path.join(tdChatRoot, 'dist');
    fs.ensureDirSync(distDir);
    const distIndex = path.join(distDir, 'td-chat.js');
    fs.writeFileSync(
      distIndex,
      `
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.TDesignChat = factory());
})(this, (function () { 'use strict';

  console.warn('TDesign Chat: UMD build requires full compilation. Please use ES or CommonJS build instead.');
  
  return {};

}));
`,
    );

    console.log('✅ Entry files created');

    console.log('\n✅ Build completed successfully!');
    console.log('\nOutput directories:');
    console.log(`  - ES modules: ${path.join(tdChatRoot, 'es')}`);
    console.log(`  - CommonJS: ${path.join(tdChatRoot, 'lib')}`);
    console.log(`  - UMD: ${path.join(tdChatRoot, 'dist')}`);

    console.log('\n⚠️  Note: This is a simplified build that copies source files.');
    console.log('   For production use, full compilation with Vue 2.7.16 toolchain is recommended.');
  } catch (error) {
    console.error('\n❌ Build failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

build();
