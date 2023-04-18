import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    outDir: 'build',
    target: 'node12',
    platform: 'node',
    format: ['cjs', 'esm'],
    sourcemap: true,
    minify: false,
    shims: true,
    dts: true,
  },
])
