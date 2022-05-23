import { getEditorString, TEditor, Value } from '@skylakes/slate-core'
import { IndentCodeLineOptions } from '../transforms/indentCodeLine'

export const getIndentDepth = <V extends Value>(
  editor: TEditor<V>,
  { codeLine }: IndentCodeLineOptions
) => {
  const [, codeLinePath] = codeLine
  const text = getEditorString(editor, codeLinePath)
  return text.search(/\S|$/)
}
