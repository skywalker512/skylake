import { castArray } from 'lodash-es'
import { TEditor, Value } from '../../slate/editor/TEditor'
import { withoutNormalizing } from '../../slate/editor/withoutNormalizing'
import { EMarks } from '../../slate/text/TText'
import { isMarkActive } from '../queries/isMarkActive'
import { ToggleMarkPlugin } from '../types/plugins/ToggleMarkPlugin'
import { removeMark } from './removeMark'

export interface ToggleMarkOptions<V extends Value, K extends keyof EMarks<V>>
  extends Pick<ToggleMarkPlugin<V, K>, 'clear'> {
  key: K
}

/**
 * Add/remove marks in the selection.
 *
 * @param editor
 * @param key Mark to toggle
 * @param clear Marks to clear when adding mark
 */
export const toggleMark = <V extends Value, K extends keyof EMarks<V>>(
  editor: TEditor<V>,
  { key, clear }: ToggleMarkOptions<V, K>
) => {
  if (!editor.selection) return

  withoutNormalizing(editor, () => {
    const isActive = isMarkActive(editor, key)

    if (isActive) {
      removeMark(editor, { key })
      return
    }

    if (clear) {
      const clears: K[] = castArray(clear)
      removeMark(editor, { key: clears })
    }

    editor.addMark(key as string, true)
  })
}
