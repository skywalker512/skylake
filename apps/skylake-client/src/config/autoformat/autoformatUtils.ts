import { AutoformatBlockRule } from '@skylakes/slate-autoformat'
import {
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
} from '@skylakes/slate-code-block'
import {
  getParentNode,
  isElement,
  isType,
  PlateEditor,
  Value,
} from '@skylakes/slate-core'
import { toggleList } from '@skylakes/slate-list'

export const clearBlockFormat: AutoformatBlockRule['preFormat'] = (editor) =>
  // unwrapList(editor);
  {}

export const format = <V extends Value>(
  editor: PlateEditor<V>,
  customFormatting: any
) => {
  if (editor.selection) {
    const parentEntry = getParentNode(editor, editor.selection)
    if (!parentEntry) return
    const [node] = parentEntry
    if (
      isElement(node) &&
      !isType(editor, node, ELEMENT_CODE_BLOCK) &&
      !isType(editor, node, ELEMENT_CODE_LINE)
    ) {
      customFormatting()
    }
  }
}

export const formatList = <V extends Value>(
  editor: PlateEditor<V>,
  elementType: string
) => {
  format(editor, () =>
    toggleList(editor, {
      type: elementType,
    })
  )
}

export const formatText = <V extends Value>(
  editor: PlateEditor<V>,
  text: string
) => {
  format(editor, () => editor.insertText(text))
}
