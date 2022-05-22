import { cloneDeep } from 'lodash-es'
import { Value } from '../slate/editor/TEditor'
import { OverrideByKey } from '../types/OverrideByKey'
import { PlateEditor } from '../types/PlateEditor'
import { PlatePlugin } from '../types/plugins/PlatePlugin'
import { PlatePluginComponent } from '../types/plugins/PlatePluginComponent'
import { overridePluginsByKey } from './overridePluginsByKey'

/**
 * Creates a new array of plugins by overriding the plugins in the original
 * array. Components can be overridden by key using `components` in the second
 * param. Any other properties can be overridden by key using `overrideByKey` in
 * the second param.
 */
export const createPlugins = <
  V extends Value = Value,
  E extends PlateEditor<V> = PlateEditor<V>
>(
  plugins: PlatePlugin<{}, V, E>[],
  {
    components,
    overrideByKey,
  }: {
    /** Override plugin component by key. */
    components?: Record<string, PlatePluginComponent>

    /** Override plugin by key. */
    overrideByKey?: OverrideByKey<V, E>
  } = {}
): PlatePlugin<{}, V, E>[] => {
  let allOverrideByKey: OverrideByKey<V, E> = {}

  if (overrideByKey) {
    allOverrideByKey = cloneDeep(overrideByKey)
  }

  if (components) {
    Object.keys(components).forEach((key) => {
      if (!allOverrideByKey[key]) allOverrideByKey[key] = {}

      allOverrideByKey[key].component = components[key]
    })
  }

  if (Object.keys(allOverrideByKey).length) {
    return plugins.map((plugin) => {
      return overridePluginsByKey<{}, V, E>(plugin, allOverrideByKey)
    })
  }

  return plugins
}
