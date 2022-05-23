import { createPluginFactory } from '@skylakes/slate-core'
import { AutoformatPlugin } from './types'
import { withAutoformat } from './withAutoformat'

export const KEY_AUTOFORMAT = 'autoformat'

/** @see {@link withAutoformat} */
export const createAutoformatPlugin = createPluginFactory<AutoformatPlugin>({
  key: KEY_AUTOFORMAT,
  withOverrides: withAutoformat,
  options: {
    rules: [],
  },
})
