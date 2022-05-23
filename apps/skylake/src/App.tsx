import './App.css'
import { Plate } from '@skylakes/slate-core'
import { createParagraphPlugin } from '@skylakes/slate-paragraph'
import { createBlockquotePlugin } from '@skylakes/slate-block-quote'
import { createCodeBlockPlugin } from '@skylakes/slate-code-block'
import { createHeadingPlugin } from '@skylakes/slate-heading'

const App = () => (
  <div>
    <Plate
      plugins={[
        createParagraphPlugin(),
        createBlockquotePlugin(),
        createCodeBlockPlugin(),
        createHeadingPlugin(),
      ]}
    />
  </div>
)

export default App
