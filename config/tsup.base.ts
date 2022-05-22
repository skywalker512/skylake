import { defineConfig } from 'tsup'

export const tsUpBaseConfig = defineConfig({
  name: 'tsup',
  target: 'node12.20.0',
  dts: {
    resolve: true,
  },
})
