import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';

export default {
  input: 'src/indicator-grid-card.ts',
  output: {
    file: 'dist/indicator-grid-card.js',
    format: 'es',
    sourcemap: true,
    inlineDynamicImports: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      declaration: false,
    }),
    json(),
    terser({
      format: {
        comments: false,
      },
    }),
  ],
};
