import {
  createPluginFactory,
  onKeyDownToggleMark,
  ToggleMarkPlugin,
} from '@skylakes/slate-core'

export const MARK_SUPERSCRIPT = 'superscript'
const MARK_SUBSCRIPT = 'subscript'

/** Enables support for superscript formatting. */
export const createSuperscriptPlugin = createPluginFactory<ToggleMarkPlugin>({
  key: MARK_SUPERSCRIPT,
  isLeaf: true,
  handlers: {
    onKeyDown: onKeyDownToggleMark,
  },
  options: {
    hotkey: 'mod+.',
    clear: MARK_SUBSCRIPT,
  },
  deserializeHtml: {
    rules: [
      { validNodeName: ['SUP'] },
      {
        validStyle: {
          verticalAlign: 'super',
        },
      },
    ],
  },
})
