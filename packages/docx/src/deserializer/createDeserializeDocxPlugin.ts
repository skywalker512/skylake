import {
  createPluginFactory,
  DeserializeHtml,
  KEY_DESERIALIZE_HTML,
  PlatePlugin,
} from '@skylakes/slate-core'
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from '@skylakes/slate-heading'
import { ELEMENT_PARAGRAPH } from '@skylakes/slate-paragraph'
import { cleanDocx } from '../docx-cleaner/cleanDocx'
import { getDocxListContentHtml } from '../docx-cleaner/utils/getDocxListContentHtml'
import { isDocxList } from '../docx-cleaner/utils/isDocxList'

export const KEY_DESERIALIZE_DOCX = 'deserializeDocx'

const getListNode =
  (type: string): DeserializeHtml['getNode'] =>
  (element) => {
    const node: any = { type }

    if (isDocxList(element)) {
      element.innerHTML = getDocxListContentHtml(element)
    }

    return node
  }

const KEYS = [
  ELEMENT_PARAGRAPH,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
]

const overrideByKey: Record<string, Partial<PlatePlugin>> = {}

KEYS.forEach((key) => {
  overrideByKey[key] = {
    then: (editor, { type }) => ({
      deserializeHtml: {
        getNode: getListNode(type),
      },
    }),
  }
})

export const createDeserializeDocxPlugin = createPluginFactory({
  key: KEY_DESERIALIZE_DOCX,
  inject: {
    pluginsByKey: {
      [KEY_DESERIALIZE_HTML]: {
        editor: {
          insertData: {
            transformData: (data, { dataTransfer }) => {
              const rtf = dataTransfer.getData('text/rtf')

              return cleanDocx(data, rtf)
            },
          },
        },
      },
    },
  },
  overrideByKey: {
    ...overrideByKey,
  },
})
