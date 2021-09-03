module.exports = {

  root: './',
  workspaceRoot: './',

  mount: {
    './public': '/',
    './src': '/_dist_',
  },

  alias: {
  },

  plugins: [
    ['@snowpack/plugin-svelte', {
      compilerOptions: {
        css: false
      },
    }],
    '@snowpack/plugin-sass',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-optimize',
    '@snowpack/plugin-postcss',
    [
      '@snowpack/plugin-run-script',
      { cmd: 'svelte-check --workspace src --output human', watch: '$1 --watch', output: 'stream' },
    ],
  ],

  exclude: ['**/node_modules/**/*','*.js','*.json'],

  devOptions: {
    open: 'none',
    output: 'stream',
  },

  buildOptions: {
    sourcemap: true,
    clean: true,
    out: 'build',
    watch: true
  },

  packageOptions: {
    polyfillNode: true,
  },

};
