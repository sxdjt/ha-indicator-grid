import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';

const createConfig = (input, output) => ({
  input,
  output: {
    file: output,
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
  ],
});

export default [
  createConfig('src/indicator-grid-card.ts', 'dist/indicator-grid-card.js'),
];
