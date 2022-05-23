import {
  isCollapsed,
  KeyboardHandlerReturnType,
  PlateEditor,
  setElements,
  someNode,
  Value,
  WithPlatePlugin,
} from '@skylakes/slate-core'
import isHotkey from 'is-hotkey'
import { ResetNodePlugin } from './types'

export const SIMULATE_BACKSPACE: any = {
  key: '',
  which: 8,
}

export const onKeyDownResetNode =
  <V extends Value = Value, E extends PlateEditor<V> = PlateEditor<V>>(
    editor: E,
    { options: { rules } }: WithPlatePlugin<ResetNodePlugin, V, E>
  ): KeyboardHandlerReturnType =>
  (event) => {
    let reset = false

    if (editor.selection && isCollapsed(editor.selection)) {
      rules!.forEach(({ types, defaultType, hotkey, predicate, onReset }) => {
        if (hotkey && isHotkey(hotkey, event as any)) {
          if (
            predicate(editor as any) &&
            someNode(editor, { match: { type: types } })
          ) {
            event.preventDefault?.()

            setElements(editor, { type: defaultType })

            if (onReset) {
              onReset(editor as any)
            }

            reset = true
          }
        }
      })
    }

    return reset
  }
