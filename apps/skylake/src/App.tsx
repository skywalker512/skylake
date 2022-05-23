import './App.css'
import { Plate, createPlugins, withProps } from '@skylakes/slate-core'
import { createParagraphPlugin } from '@skylakes/slate-paragraph'
import { createBlockquotePlugin } from '@skylakes/slate-block-quote'
import { createCodeBlockPlugin } from '@skylakes/slate-code-block'
import { createHeadingPlugin, KEYS_HEADING } from '@skylakes/slate-heading'
import { createAutoformatPlugin } from '@skylakes/slate-autoformat'
import { createResetNodePlugin } from '@skylakes/slate-reset-node'

import { Text, Blockquote, Title, TitleOrder, Box } from '@mantine/core'
import {
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from '@skylakes/slate-break'
import { StyledElement } from './StyledElement'
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
        ])}
      >
        <Toolbar
          controls={[
            ['bold', 'italic', 'underline', 'strike', 'clean'],
            ['h1', 'h2', 'h3', 'h4'],
            ['unorderedList', 'orderedList'],
            ['link', 'image', 'video', 'blockquote', 'codeBlock'],
            ['alignLeft', 'alignCenter', 'alignRight'],
            ['sup', 'sub'],
          ]}
        />
      </Plate>
    </Box>
  </Box>
)

export default App
