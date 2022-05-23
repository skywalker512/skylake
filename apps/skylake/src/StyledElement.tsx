import {
  EElement,
  PlateRenderElementProps,
  TElement,
  Value,
} from '@skylakes/slate-core'
import { HTMLAttributes } from 'react'

export type StyledElementProps<
  V extends Value = Value,
  N extends TElement = EElement<V>
> = PlateRenderElementProps<V, N> & HTMLAttributes<HTMLElement>

/** StyledElement with no default styles. */
export const StyledElement =
  <V extends Value = Value, N extends EElement<V> = EElement<V>>(
    As: React.FC | string = 'div'
  ) =>
  (props: StyledElementProps<V, N>) => {
    const { attributes, children, nodeProps, editor, element, ...args } = props

    return (
      <As {...attributes} {...nodeProps} {...args}>
        {children}
      </As>
    )
  }
