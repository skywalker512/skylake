import { FunctionComponent, forwardRef } from 'react'

/** HOC adding props. */
export const withProps: <T>(
  Component: FunctionComponent<T>,
  props: Partial<T>
) => FunctionComponent<any> = (Component, props) =>
  forwardRef((_props, ref) => <Component ref={ref} {..._props} {...props} />)
