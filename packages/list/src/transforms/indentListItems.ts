import { PlateEditor, Value } from '@skylakes/slate-core'
import { moveListItems } from './moveListItems'

export const indentListItems = <V extends Value>(editor: PlateEditor<V>) => {
  moveListItems(editor, { increase: true })
}
