import { AutoformatRule } from '@skylakes/slate-autoformat'
import { ELEMENT_DEFAULT } from '@skylakes/slate-core'
import { DIGITS, DIGITS_WITH_SPACE } from './autoformatConstants'
import { formatText } from './autoformatUtils'

const multiplicationWithoutSpace: AutoformatRule[] = DIGITS.map((digit) => ({
  type: ELEMENT_DEFAULT,
  mode: 'block',
  match: [`${digit}*`, `${digit}x`],
  trigger: [...DIGITS, ...DIGITS_WITH_SPACE],
  insertTrigger: true,
  format: (editor) => formatText(editor, `${digit}×`),
}))

const multiplicationWithSpace: AutoformatRule[] = DIGITS.map((digit) => ({
  type: ELEMENT_DEFAULT,
  mode: 'block',
  match: [`${digit} *`, `${digit} x`],
  trigger: [...DIGITS, ...DIGITS_WITH_SPACE],
  insertTrigger: true,
  format: (editor) => formatText(editor, `${digit} ×`),
}))

export const autoformatMultiplication: AutoformatRule[] = [
  ...multiplicationWithoutSpace,
  ...multiplicationWithSpace,
]
