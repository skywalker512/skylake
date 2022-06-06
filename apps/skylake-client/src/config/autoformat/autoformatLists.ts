import { AutoformatRule } from '@skylakes/slate-autoformat'
import { setNodes, isBlock } from '@skylakes/slate-core'
import {
  ELEMENT_LI,
  ELEMENT_UL,
  ELEMENT_OL,
  ELEMENT_TODO_LI,
  TTodoListItemElement,
} from '@skylakes/slate-list'
import { clearBlockFormat, formatList } from './autoformatUtils'

export const autoformatLists: AutoformatRule[] = [
  {
    mode: 'block',
    type: ELEMENT_LI,
    match: ['* ', '- '],
    preFormat: clearBlockFormat,
    format: (editor) => formatList(editor, ELEMENT_UL),
  },
  {
    mode: 'block',
    type: ELEMENT_LI,
    match: ['1. ', '1) '],
    preFormat: clearBlockFormat,
    format: (editor) => formatList(editor, ELEMENT_OL),
  },
  {
    mode: 'block',
    type: ELEMENT_TODO_LI,
    match: '[] ',
  },
  {
    mode: 'block',
    type: ELEMENT_TODO_LI,
    match: '[x] ',
    format: (editor) =>
      setNodes<TTodoListItemElement>(
        editor,
        { type: ELEMENT_TODO_LI, checked: true },
        {
          match: (n) => isBlock(editor, n),
        }
      ),
  },
]
