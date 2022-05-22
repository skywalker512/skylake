import { defineConfig } from 'tsup'

export default defineConfig({
  target: 'esnext',
  entry: ['src/index.ts'],
  clean: true,
  format: ['esm'],
})
