import { glob } from 'glob';
import { readFile, writeFile, remove, mkdir } from 'fs-extra';
import { rollup, Plugin } from 'rollup';
import url from '@rollup/plugin-url';
import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import ignoreImport from 'rollup-plugin-ignore-import';
import { terser } from 'rollup-plugin-terser';
import multiInput from 'rollup-plugin-multi-input';
import staticImport from 'rollup-plugin-static-import';
import vuePlugin from 'rollup-plugin-vue';
import { posix, dirname, win32 } from 'node:path';

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

const pkg = require(joinTdChatRoot('package.json'));

const name = '@tdesign/td-chat';
const esExternalDeps = Object.keys(pkg.dependencies || {}).concat('tdesign-vue/es/config-provider/hooks');
const externalDeps = [...esExternalDeps, /@babel\/runtime/];
const externalPeerDeps = Object.keys(pkg.peerDependencies || {});
const DEFAULT_EXTENSIONS = ['.js', '.jsx', '.es6', '.es', '.mjs', '.cjs'];
const banner = `/**
 * ${name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */
`;

const inputList = [
  joinTdChatRoot('**/*.ts'),
  joinTdChatRoot('**/*.tsx'),
  joinTdChatRoot('**/*.vue'),
  `!${joinTdChatRoot('**/demos')}`,
  `!${joinTdChatRoot('**/*.d.ts')}`,
  `!${joinTdChatRoot('**/type.ts')}`,
  `!${joinTdChatRoot('**/types.ts')}`,
  `!${joinTdChatRoot('**/__tests__')}`,
  `!${joinTdChatRoot('**/_example')}`,
  `!${joinTdChatRoot('**/node_modules')}`,
];

const getPlugins = ({
  cssBuildType,
  env,
  isProd,
}: {
  cssBuildType?: 'single' | 'multi' | 'source' | 'ignore';
  env?: string;
  isProd?: boolean;
} = {}) => {
  const plugins = [
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.node', '.ts', '.tsx', '.vue'],
    }) as unknown as Plugin,
    vuePlugin(),
    commonjs(),
    esbuild({
      target: 'esnext',
      minify: false,
      jsx: 'transform',
    }),
    babel({
      babelHelpers: 'runtime',
      extensions: [...DEFAULT_EXTENSIONS, '.vue', '.ts', '.tsx'],
    }),
    json(),
    url(),
    replace({
      preventAssignment: true,
      values: {
        PKG_VERSION: JSON.stringify(pkg.version),
      },
    }),
  ];

  if (cssBuildType === 'single') {
    plugins.push(
      postcss({
        extract: `${isProd ? `${name}.min` : name}.css`,
        minimize: isProd,
        sourceMap: true,
        extensions: ['.sass', '.scss', '.css', '.less'],
      }),
    );
  }
  if (cssBuildType === 'multi') {
    plugins.push(
      staticImport({
        baseDir: getTdChatRoot(),
        include: [joinTdChatRoot('**/style/css.mjs')],
      }),
      ignoreImport({
        include: [joinTdChatRoot('**/style/*')],
        body: 'import "./style/css.mjs";',
      }),
      copy({
        targets: [
          {
            src: [joinTdChatRoot('**/style/css.js'), `!${joinTdChatRoot('**/node_modules')}`],
            dest: joinTdChatRoot('es'),
            rename: (name: string, extension: string, fullPath: string) =>
              `${fullPath.replace(getTdChatRoot(), '').slice(0, -6)}${name}.mjs`,
          },
        ],
        verbose: true,
      }),
    );
  }
  if (cssBuildType === 'ignore') {
    plugins.push(
      ignoreImport({
        include: [joinTdChatRoot('**/style/index.js')],
      }),
    );
  }

  if (env) {
    plugins.push(
      replace({
        preventAssignment: true,
        values: {
          'process.env.NODE_ENV': JSON.stringify(env),
        },
      }),
    );
  }

  if (isProd) {
    plugins.push(
      terser({
        output: {
          ascii_only: true,
        },
      }),
    );
  }
  return plugins;
};

export const buildEs = async () => {
  const buildCss = async () => {
    const bundle = await rollup({
      input: [joinTdChatRoot('**/style/index.js')],
      plugins: [multiInput({ relative: getTdChatRoot() }), postcss({ extract: true }), nodeResolve()],
    });
    bundle.write({
      banner,
      dir: joinTdChatRoot('es/'),
      assetFileNames: '[name].css',
    });
  };

  const buildComp = async () => {
    const esExternal = [...esExternalDeps, ...externalPeerDeps];

    const bundle = await rollup({
      input: [...inputList, `!${joinTdChatRoot('index-lib.ts')}`],
      treeshake: false,
      external: (id: string) => esExternal.some((dep) => id === dep || id.startsWith(`${dep}/`) || id.endsWith('.css')),
      plugins: [multiInput({ relative: getTdChatRoot() }), ...getPlugins({ cssBuildType: 'multi' })],
    });
    bundle.write({
      banner,
      dir: joinTdChatRoot('es/'),
      format: 'esm',
      sourcemap: true,
      entryFileNames: '[name].mjs',
      chunkFileNames: '_chunks/dep-[hash].mjs',
    });
    const files = await glob(`${joinTdChatRoot('es/**/style/index.js')}`);
    const rewrite = files.map(async (filePath: string) => {
      await remove(filePath);
    });
    await Promise.all(rewrite);
  };
  await buildCss();
  await buildComp();
};

export const buildEsm = async () => {
  const externalDepsForEsm = [...esExternalDeps, externalPeerDeps, /@tdesign\/common-style/];
  const bundle = await rollup({
    input: [...inputList, `!${joinTdChatRoot('index-lib.ts')}`],
    external: (id: string) =>
      externalDepsForEsm.some(
        (dep) => id === dep || id.startsWith(`${dep}/`) || id.endsWith('.css') || id.endsWith('.less'),
      ),
    plugins: [multiInput({ relative: getTdChatRoot() }), ...getPlugins({ cssBuildType: 'source' })],
  });
  await bundle.write({
    banner,
    dir: joinTdChatRoot('esm/'),
    format: 'esm',
    sourcemap: true,
    chunkFileNames: '_chunks/dep-[hash].js',
  });

  const files = await glob(`${joinTdChatRoot('esm/**/*.*')}`);
  const rewrite = files.map(async (filePath: string) => {
    const content = await readFile(filePath, 'utf8');
    await writeFile(filePath, content.replace(/@tdesign\/common-style/g, 'tdesign-vue/esm/common/style'), 'utf8');
  });
  await Promise.all(rewrite);

  await mkdir(joinTdChatRoot('esm/style'));
  await writeFile(joinTdChatRoot('esm/style/index.js'), `import 'tdesign-vue/esm/style/index.js';`, 'utf8');
};

export const deleteOutput = async () => {
  const removes = ['es', 'esm'].map(async (filePath: string) => await remove(joinTdChatRoot(filePath)));
  await Promise.all(removes);
};

export const buildComponents = async () => {
  await deleteOutput();
  await buildEs();
  await buildEsm();
};
