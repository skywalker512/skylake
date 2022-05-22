import { Value } from '../slate/editor/TEditor'
import { PlateEditor } from '../types/PlateEditor'
import { PlatePlugin, WithPlatePlugin } from '../types/plugins/PlatePlugin'
import { PluginKey } from '../types/plugins/PlatePluginKey'
import { getKeysByTypes } from './getKeysByTypes'

/** Map plugin inject props to injected plugin */
export const mapInjectPropsToPlugin = <
  P = {},
  V extends Value = Value,
  E extends PlateEditor<V> = PlateEditor<V>
>(
  editor: E,
  plugin: WithPlatePlugin<P, V, E>,
  injectedPlugin: Partial<PlatePlugin>
) => {
  const validTypes = plugin.inject.props?.validTypes
  if (!validTypes) return

  const keys = getKeysByTypes(editor, validTypes)

  const injected: Record<PluginKey, Partial<PlatePlugin>> = {}

  keys.forEach((key) => {
    injected[key] = injectedPlugin
  })

  return {
    inject: {
      pluginsByKey: injected,
    },
  }
}
