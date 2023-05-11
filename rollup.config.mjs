import { nodeResolve as resolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.ts',
    output: {
      name: 'myLib',
      file: "dist/my-lib.umd.js",
      format: 'umd',
    },
    plugins: [resolve(), commonjs(), typescript({ tsconfig: './tsconfig.json' })],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.ts',
    output: [
      { file: "dist/my-lib.cjs.js", format: 'cjs' },
      { file: "dist/my-lib.esm.js", format: 'es' },
    ],
    plugins: [typescript({ tsconfig: './tsconfig.json' })],
  },
]
