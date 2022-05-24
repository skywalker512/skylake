import './App.css'
import { Plate, createPlugins, withProps } from '@skylakes/slate-core'
import { createParagraphPlugin } from '@skylakes/slate-paragraph'
import { createBlockquotePlugin } from '@skylakes/slate-block-quote'
import { createCodeBlockPlugin } from '@skylakes/slate-code-block'
import { createHeadingPlugin, KEYS_HEADING } from '@skylakes/slate-heading'
import { createAutoformatPlugin } from '@skylakes/slate-autoformat'
import { createResetNodePlugin } from '@skylakes/slate-reset-node'
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

import { Text, Blockquote, Title, TitleOrder, Box, Code } from '@mantine/core'
import {
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from '@skylakes/slate-break'
import { StyledElement, StyledLeaf } from './StyledElement'
import { autoformatRules } from './config/autoformat/autoformatRules'
import { resetBlockRules } from './config/resetBlock/resetBlock'
import { exitBreakRules, softBreakRules } from './config/break/break'
import { Toolbar } from './Toolbar/Toolbar'

const App = () => (
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
            {editable}
          </Box>
        )}
        plugins={createPlugins([
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
        ])}
      >
        <Toolbar
          controls={[
            ['bold', 'italic', 'underline', 'strike', 'code'],
            ['h1', 'h2', 'h3', 'h4'],
            ['unorderedList', 'orderedList'],
            ['link', 'image', 'video', 'blockquote'],
            ['alignLeft', 'alignCenter', 'alignRight'],
            ['sup', 'sub'],
          ]}
        />
      </Plate>
    </Box>
  </Box>
)

export default App
