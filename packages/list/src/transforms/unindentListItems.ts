import { PlateEditor, Value } from '@skylakes/slate-core'
import { moveListItems, MoveListItemsOptions } from './moveListItems'

export type UnindentListItemsOptions = Omit<MoveListItemsOptions, 'increase'>

export const unindentListItems = <V extends Value>(
  editor: PlateEditor<V>,
  options: UnindentListItemsOptions = {}
): void => moveListItems(editor, { ...options, increase: false })
