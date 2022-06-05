import { ExitBreakRule, SoftBreakRule } from '@skylakes/slate-break'
import { ELEMENT_BLOCKQUOTE } from '@skylakes/slate-block-quote'
import { ELEMENT_CODE_BLOCK } from '@skylakes/slate-code-block'
import { KEYS_HEADING } from '@skylakes/slate-heading'

export const softBreakRules: SoftBreakRule[] = [
  { hotkey: 'shift+enter' },
  {
    hotkey: 'enter',
    query: {
      allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE],
    },
  },
]

export const exitBreakRules: ExitBreakRule[] = [
  {
    hotkey: 'mod+enter',
  },
  {
    hotkey: 'mod+shift+enter',
    before: true,
  },
  {
    hotkey: 'enter',
    query: {
      start: true,
      end: true,
      allow: KEYS_HEADING,
    },
  },
]
