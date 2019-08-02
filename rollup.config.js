import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocessPostcss from 'svelte-preprocess-postcss';

const stylePreprocessor = sveltePreprocessPostcss();

const production = false;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'esm',
    name: 'app',
    dir: "public/modules"
  },
  plugins: [
    svelte({
      dev: !production,
      preprocess: {
        style: stylePreprocessor
      },
      css: css => {
        css.write('public/bundle.css');
      },
    }),
    resolve({
      browser: true,
      dedupe: importee =>
        importee === 'svelte' || importee.startsWith('svelte/'),
    }),
    commonjs(),

    !production && livereload('public'),

    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
