import { getPluginType, PlateEditor, Value } from '@skylakes/slate-core'
import { ELEMENT_CODE_LINE } from '../constants'

export const getCodeLineType = <V extends Value>(
  editor: PlateEditor<V>
): string => getPluginType(editor, ELEMENT_CODE_LINE)
