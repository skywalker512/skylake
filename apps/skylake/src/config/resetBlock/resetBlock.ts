import { ELEMENT_BLOCKQUOTE } from '@skylakes/slate-block-quote'
import { isSelectionAtBlockStart } from '@skylakes/slate-core'
import { KEYS_HEADING } from '@skylakes/slate-heading'
import { ELEMENT_PARAGRAPH } from '@skylakes/slate-paragraph'
import { ResetNodePluginRule } from '@skylakes/slate-reset-node'

const resetBlockTypesCommonRule = {
  types: [ELEMENT_BLOCKQUOTE, ...KEYS_HEADING],
  defaultType: ELEMENT_PARAGRAPH,
}

export const resetBlockRules: ResetNodePluginRule[] = [
  // {
  //   ...resetBlockTypesCommonRule,
  //   hotkey: 'Enter',
  //   predicate: isBlockAboveEmpty,
  // },
  {
    ...resetBlockTypesCommonRule,
    hotkey: 'Backspace',
    predicate: isSelectionAtBlockStart,
  },
]
