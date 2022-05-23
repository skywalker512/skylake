import './App.css'
import { Plate, createPlugins, withProps } from '@skylakes/slate-core'
import { createParagraphPlugin } from '@skylakes/slate-paragraph'
import { createBlockquotePlugin } from '@skylakes/slate-block-quote'
import { createCodeBlockPlugin } from '@skylakes/slate-code-block'
import { createHeadingPlugin, KEYS_HEADING } from '@skylakes/slate-heading'
import { createAutoformatPlugin } from '@skylakes/slate-autoformat'
import { createResetNodePlugin } from '@skylakes/slate-reset-node'

import { Text, Blockquote, Title, TitleOrder } from '@mantine/core'
import { StyledElement } from './StyledElement'
import { autoformatRules } from './config/autoformat/autoformatRules'
import { resetBlockRules } from './config/resetBlock/resetBlock'

const App = () => (
  <div>
    <Plate
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
      ])}
    />
  </div>
)

export default App
