import { AutoformatRule } from '@skylakes/slate-autoformat'
import { ELEMENT_BLOCKQUOTE } from '@skylakes/slate-block-quote'
import {
  ELEMENT_CODE_BLOCK,
  insertEmptyCodeBlock,
} from '@skylakes/slate-code-block'
// import {
//   ELEMENT_DEFAULT,
//   getPluginType,
//   // insertElements,
//   // setElements,
// } from '@skylakes/slate-core'

import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from '@skylakes/slate-heading'
import { clearBlockFormat } from './autoformatUtils'

export const autoformatBlocks: AutoformatRule[] = [
  {
    mode: 'block',
    type: ELEMENT_H1,
    match: '# ',
    preFormat: clearBlockFormat,
  },
  {
    mode: 'block',
    type: ELEMENT_H2,
    match: '## ',
    preFormat: clearBlockFormat,
  },
  {
    mode: 'block',
    type: ELEMENT_H3,
    match: '### ',
    preFormat: clearBlockFormat,
  },
  {
    mode: 'block',
    type: ELEMENT_H4,
    match: '#### ',
    preFormat: clearBlockFormat,
  },
  {
    mode: 'block',
    type: ELEMENT_H5,
    match: '##### ',
    preFormat: clearBlockFormat,
  },
  {
    mode: 'block',
    type: ELEMENT_H6,
    match: '###### ',
    preFormat: clearBlockFormat,
  },
  {
    mode: 'block',
    type: ELEMENT_BLOCKQUOTE,
    match: '> ',
    preFormat: clearBlockFormat,
  },
  // {
  //   mode: 'block',
  //   type: ELEMENT_HR,
  //   match: ['---', '—-'],
  //   preFormat: clearBlockFormat,
  //   format: (editor) => {
  //     setElements(editor, { type: ELEMENT_HR });
  //     insertElements(editor, {
  //       type: ELEMENT_DEFAULT,
  //       children: [{ text: '' }],
  //     });
  //   },
  // },
  {
    mode: 'block',
    type: ELEMENT_CODE_BLOCK,
    match: '``` ',
    triggerAtBlockStart: false,
    preFormat: clearBlockFormat,
    format: (editor) => {
      insertEmptyCodeBlock(editor, {
        insertNodesOptions: { select: true },
      })
    },
  },
]
