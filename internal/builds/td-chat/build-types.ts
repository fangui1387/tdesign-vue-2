import { glob } from 'glob';
import { readFile, copy, writeFile, remove } from 'fs-extra';
import { posix, win32 } from 'node:path';

// 本地路径工具函数
const normalizePathRegExp = new RegExp(`\\${win32.sep}`, 'g');
const toPosixPath = (filename: string) => filename.replace(normalizePathRegExp, posix.sep);
const joinPosix = (...paths: string[]) => toPosixPath(posix.join(...paths));

// 获取 td-chat 根目录
const getTdChatRoot = () => {
  return joinPosix(__dirname, '../../../packages/td-chat');
};

const joinTdChatRoot = (...paths: string[]) => {
  return joinPosix(getTdChatRoot(), ...paths);
};

// 简单的 run 函数
const run = async (command: string) => {
  const { execSync } = require('child_process');
  execSync(command, { stdio: 'inherit', cwd: process.cwd() });
};

const typesTempDir = 'td-chat-types';

const generateSourceTypes = async () => {
  await run(`tsc --outDir ${typesTempDir} -p tsconfig.json --emitDeclarationOnly`);
  const typesRoot = joinTdChatRoot(typesTempDir);

  const styleDirPaths = await glob(`${joinTdChatRoot('**/style')}`);
  await Promise.all(
    styleDirPaths.map(async (styleDirPath: string) => {
      await remove(styleDirPath);
    }),
  );

  await copy(joinPosix(typesRoot, `packages/td-chat`), getTdChatRoot());
};

const generateTargetTypes = async (target: 'es' | 'esm' | 'lib' | 'cjs') => {
  const typesRoot = joinTdChatRoot(typesTempDir);
  const targetDir = joinTdChatRoot(`${target}`);

  await copy(joinPosix(typesRoot, `packages/td-chat`), targetDir);

  const dtsPaths = await glob(`${joinPosix(targetDir, '**/*.d.ts')}`);
  const rewrite = dtsPaths.map(async (filePath: string) => {
    const content = await readFile(filePath, 'utf8');
    await writeFile(filePath, content.replace(/@tdesign\/common-js/g, `tdesign-vue/${target}/common/js`), 'utf8');
  });
  await Promise.all(rewrite);
};

const removeSourceTypes = async () => {
  const distTypesRoot = joinTdChatRoot(typesTempDir);
  await remove(distTypesRoot);
};

const buildTypes = async () => {
  try {
    await removeSourceTypes();
    await generateSourceTypes();
    const targets = ['es', 'esm'] as const;
    await Promise.all(
      targets.map(async (target) => {
        await generateTargetTypes(target);
      }),
    );
  } catch (error) {
    console.error(error);
  } finally {
    await removeSourceTypes();
  }
};

export const build = async () => {
  await buildTypes();
};
