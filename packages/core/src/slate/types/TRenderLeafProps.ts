import { RenderLeafProps } from 'slate-react'
import { Modify } from '../../common/types/utility/types'
import { Value } from '../editor/TEditor'
import { EText } from '../text/TText'

export type TRenderLeafProps<
  V extends Value,
  N extends EText<V> = EText<V>
> = Modify<
  RenderLeafProps,
  {
    leaf: N
    text: N
  }
>

export type RenderLeafFn<V extends Value> = (
  props: TRenderLeafProps<V>
) => JSX.Element
