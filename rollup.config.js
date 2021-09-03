import * as fs from 'fs';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import postcss from 'rollup-plugin-postcss';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import includePaths from 'rollup-plugin-includepaths';
import json from '@rollup/plugin-json';
import babel from 'rollup-plugin-babel';
import svg from 'rollup-plugin-svg';
import typescript from '@rollup/plugin-typescript';
import sveltePreprocess, { scss } from 'svelte-preprocess';
import cssModules from 'svelte-preprocess-cssmodules';
import visualizer from 'rollup-plugin-visualizer';
import del from 'rollup-plugin-delete';
import {fileScopedCss, simpleGetLocalIdent} from './rollup-localcss.js';

const production = !process.env.ROLLUP_WATCH;
const usesourcemap = true;

const inputs = ['src/typescript.js'];
const outputs = [];

const CSSparam = {
  minimize: true,
  extract: true,
  sourceMap: usesourcemap
};

let CSSCombinded = postcss(CSSparam)

inputs.forEach((file, i) => {
  outputs[i] = {
    input: './' + file,
    output: {
      format: 'iife',
      file: `./html/dist/${file.match(/(\w+\.*\w*)+\.\w+$/)[1]}.js`,
      globals: {
      },
      sourcemap: usesourcemap,
    },
    plugins: [

      includePaths({
        paths: ['node_modules/'],
        extensions: ['.js', '.ts'],
      }),

      alias({
        resolve: ['.js', '.ts'],
        entries: [
          // { find: "quill-better-table", replacement: "../../quill-better-table-orig/src/quill-better-table" },
          // { find: "svelte-dnd-action", replacement: "../svelte-dnd-action/src/index.js" },
        ]
      }),

      typescript({
        baseUrl: 'src',
        sourceMap: usesourcemap,
        paths: {
          // 'svelte-gestures': ['../../ux/git/svelte-gestures/src/'],
        },
        include: [
          'src/**/*',
          // '../quill-delta-to-html/**/*',
        ]
      }),

      svelte({
        compilerOptions: {
          dev: !production,
          cssHash: fileScopedCss,
        },

        preprocess: [

          cssModules({
            localIdentName: '[path][name]_[local]',
            getLocalIdent: simpleGetLocalIdent,
          }),

          sveltePreprocess({
            postcss: {}
          }),

          scss()

        ],

      }),

      resolve({
        browser: true,
        dedupe: ['@s-libs/micro-dash', 'lodash-es/clonedeep', 'lodash-es/merge', 'lodash-es/isequal', 'svelte'],
        extensions: ['.js', '.ts'],
      }),

      commonjs(),

      svg(),

      json(),

      // Watch the `html` directory and refresh the
      // browser on changes when not in production
      !production && livereload({
        watch: [
          './html/css/*.css',
          `./html/dist/${file.match(/(\w+\.*\w*)+\.\w+$/)[1]}.js`
        ],
        exts: 'css, html, js, svelte, ts',
        verbose: true,
        port: 35731,
        // https: {
        //     key: fs.readFileSync('server/10.0.1.201.key'),
        //     cert: fs.readFileSync('server/10.0.1.201.crt')
        // }
      }),

      // compile to good old IE11 compatible ES5
      babel({
        extensions: ['.js', '.mjs', '.html', '.svelte', '.ts'],
        sourceMaps: usesourcemap,
        comments: false,
        exclude: ['node_modules/@babel/**', 'node_modules/core-js/**'],
        presets: [
          ['@babel/preset-env',
            {
              targets: { ie: '11' },
              useBuiltIns: 'usage',
              corejs: 3,
              debug: true,
            }
          ],
          '@babel/preset-typescript',
        ],
        plugins: [
          ['@babel/plugin-transform-typescript', { allowNamespaces: true }],
          '@babel/plugin-proposal-class-properties',
          // 'transform-remove-console',
        ]
      }),

      production ? CSSCombinded : postcss(CSSparam),

      production && terser(),

      visualizer({
        filename: 'visualizer.html',
        template: 'treemap',
        gzipSize: true
      })

    ],
    watch: {
      clearScreen: false
    }
  }
});

export default [
  {
    input: 'src/assets/common.scss',
    output: {
      file: 'html/css/common.css',
      format: 'es',
    },
    plugins: [
      del({targets: 'html/css/common.css'}),
      production ? CSSCombinded : postcss(CSSparam)
    ]
  },
  ...outputs
];

