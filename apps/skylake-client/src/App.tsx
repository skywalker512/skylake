import './App.css'
import {
  Plate,
  createPlugins,
  withProps,
  createPluginFactory,
  Value,
  PlatePlugin,
  TEditor,
  useEditorRef,
} from '@skylakes/slate-core'
import { createParagraphPlugin } from '@skylakes/slate-paragraph'
import { createBlockquotePlugin } from '@skylakes/slate-block-quote'
import { createCodeBlockPlugin } from '@skylakes/slate-code-block'
import { createHeadingPlugin, KEYS_HEADING } from '@skylakes/slate-heading'
import { createAutoformatPlugin } from '@skylakes/slate-autoformat'
import { createResetNodePlugin } from '@skylakes/slate-reset-node'
import { createHorizontalRulePlugin } from '@skylakes/slate-horizontal-rule'

import {
  createBoldPlugin,
  createCodePlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createUnderlinePlugin,
} from '@skylakes/slate-basic-marks'
import { createAlignPlugin } from '@skylakes/slate-alignment'
import { createDeserializeDocxPlugin } from '@skylakes/slate-docx'

import {
  Text,
  Blockquote,
  Title,
  TitleOrder,
  Box,
  Code,
  Divider,
} from '@mantine/core'
import {
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from '@skylakes/slate-break'
import {
  createListPlugin,
  createTodoListPlugin,
  ELEMENT_LI,
  ELEMENT_OL,
  ELEMENT_UL,
} from '@skylakes/slate-list'

import { useEffect, useMemo } from 'react'
import * as Y from 'yjs'
import { HocuspocusProvider } from '@hocuspocus/provider'
import { withCursors, withYHistory, withYjs, YjsEditor } from '@slate-yjs/core'

import randomColor from 'randomcolor'
import { StyledElement, StyledLeaf } from './StyledElement'
import { autoformatRules } from './config/autoformat/autoformatRules'
import { resetBlockRules } from './config/resetBlock/resetBlock'
import { exitBreakRules, softBreakRules } from './config/break/break'
import { Toolbar } from './Toolbar/Toolbar'
import { CursorData } from './types'
import { RemoteCursorOverlay } from './RemoteCursorOverlay'
import { TodoListElement } from './Element/TodoList'

export const withTYjs = <
  V extends Value = Value,
  E extends TEditor<V> = TEditor<V>,
  EE extends E = E & YjsEditor
>(
  editor: E,
  yDoc: HocuspocusProvider['document']
) => {
  const sharedType = yDoc.get('content', Y.XmlText) as Y.XmlText
  return withYjs(editor as any, sharedType, { autoConnect: false }) as EE
}

export const withTYHistory = <
  V extends Value = Value,
  E extends TEditor<V> = TEditor<V>,
  EE extends E = E & YjsEditor
>(
  editor: E
) => withYHistory(editor as any) as EE

export const withTYjsCursors = <
  V extends Value = Value,
  E extends TEditor<V> = TEditor<V>,
  EE extends E = E & YjsEditor
>(
  editor: E,
  awareness: HocuspocusProvider['awareness']
) => {
  const cursorData: CursorData = {
    color: randomColor({
      luminosity: 'dark',
      alpha: 1,
      format: 'hex',
    }),
    name: (Math.random() + 1).toString(36).substring(7),
  }
  return withCursors(editor as any, awareness, { data: cursorData }) as EE
}

const createYjsPlugin = (doc: Y.Doc) =>
  createPluginFactory({
    key: 'yjs',
    withOverrides: (editor) => withTYjs(editor, doc),
  })()

const createYjsCursorsPlugin = (awareness: HocuspocusProvider['awareness']) =>
  createPluginFactory({
    key: 'yjs-awareness',
    withOverrides: (editor) => withTYjsCursors(editor, awareness),
  })()

const createYHistoryPlugin: () => PlatePlugin = () => ({
  key: 'yjs-history',
  withOverrides: withTYHistory,
})

const EditorEffect = () => {
  const editor = useEditorRef() as unknown as TEditor<Value> & YjsEditor
  useEffect(() => {
    YjsEditor.connect(editor)
    return () => YjsEditor.disconnect(editor)
  }, [editor])
  return null
}

const useProvider = () => {
  const provider = useMemo(
    () =>
      new HocuspocusProvider({
        url: import.meta.env.PROD
          ? 'wss://e.wc.atowerlight.cn'
          : 'ws://localhost:1234',
        name: 'slate-yjs-demo',
        connect: false,
      }),
    []
  )

  useEffect(() => {
    provider.connect()
    return () => {
      provider.disconnect()
    }
  }, [provider])

  return provider
}

const App = () => {
  const provider = useProvider()

  const plugins = useMemo(
    () =>
      createPlugins([
        createYjsPlugin(provider.document),
        createYjsCursorsPlugin(provider.awareness),
        createYHistoryPlugin(),
        createParagraphPlugin({ component: StyledElement(Text) }),
        createBlockquotePlugin({ component: StyledElement(Blockquote) }),
        createCodeBlockPlugin(),
        createHeadingPlugin({
          overrideByKey: Object.fromEntries(
            KEYS_HEADING.map((key, index) => [
              key,
              {
                component: StyledElement(
                  withProps(Title, { order: (index + 1) as TitleOrder })
                ),
              },
            ])
          ),
        }),
        createAutoformatPlugin({
          options: {
            rules: [...autoformatRules],
          },
        }),
        createResetNodePlugin({
          options: {
            rules: [...resetBlockRules],
          },
        }),
        createSoftBreakPlugin({
          options: {
            rules: [...softBreakRules],
          },
        }),
        createExitBreakPlugin({
          options: {
            rules: [...exitBreakRules],
          },
        }),
        createBoldPlugin({
          component: StyledLeaf(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            withProps(Text, { component: 'strong' })
          ),
        }),
        createItalicPlugin({
          component: StyledLeaf(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            withProps(Text, { component: 'em' })
          ),
        }),
        createUnderlinePlugin({
          component: StyledLeaf(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            withProps(Text, { component: 'u', underline: true })
          ),
        }),

        createStrikethroughPlugin({
          component: StyledLeaf(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            withProps(Text, {
              component: 's',
              sx: { textDecoration: 'line-through' },
            })
          ),
        }),

        createSubscriptPlugin({
          component: StyledLeaf(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            withProps(Text, {
              component: 'sub',
              size: 'xs',
            })
          ),
        }),

        createSuperscriptPlugin({
          component: StyledLeaf(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            withProps(Text, {
              component: 'sup',
              size: 'xs',
            })
          ),
        }),

        createCodePlugin({
          component: StyledLeaf(withProps(Code, {})),
        }),

        createAlignPlugin(),

        createHorizontalRulePlugin({ component: StyledElement(Divider) }),

        createListPlugin({
          overrideByKey: {
            [ELEMENT_UL]: {
              component: StyledElement(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                withProps(Text, {
                  component: 'ul',
                })
              ),
            },
            [ELEMENT_LI]: {
              component: StyledElement(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                withProps(Text, {
                  component: 'li',
                })
              ),
            },
            [ELEMENT_OL]: {
              component: StyledElement(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                withProps(Text, {
                  component: 'ol',
                })
              ),
            },
            // [ELEMENT_LIC]: {
            //   component: StyledElement(
            //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //     // @ts-expect-error
            //     withProps(Text, {
            //       component: 'lic',
            //     })
            //   ),
            // },
          },
        }),

        createTodoListPlugin({ component: TodoListElement }),

        createDeserializeDocxPlugin(),
      ]),
    [provider.document, provider.awareness]
  )
  return (
    <Box
      sx={() => ({
        padding: 40,
        maxWidth: 800,
        margin: 'auto',
      })}
    >
      <Box
        sx={(theme) => ({
          border: `1px solid ${
            theme.colorScheme === 'dark'
              ? theme.colors.dark[5]
              : theme.colors.gray[4]
          }`,
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
          borderRadius: theme.radius.xs,
        })}
      >
        <Plate
          renderEditable={(editable) => (
            <Box
              sx={(theme) => ({
                padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
              })}
            >
              <RemoteCursorOverlay>{editable}</RemoteCursorOverlay>
            </Box>
          )}
          plugins={plugins}
        >
          <EditorEffect />
          <Toolbar
            controls={[
              ['bold', 'italic', 'underline', 'strike', 'code'],
              ['h1', 'h2', 'h3', 'h4'],
              ['unorderedList', 'orderedList'],
              ['blockquote'],
              ['alignLeft', 'alignCenter', 'alignRight'],
              ['sup', 'sub'],
            ]}
          />
        </Plate>
      </Box>
    </Box>
  )
}

export default App
