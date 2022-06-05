/* eslint-disable react/require-default-props */
import React from 'react'
import { ActionIcon, ActionIconProps } from '@mantine/core'
import useStyles from './ToolbarButton.styles'

interface ToolbarButtonProps extends ActionIconProps<'button'> {
  /** Control icon */
  children: React.ReactNode

  /** Quill specific control */
  controls: string

  /** Value for quill control */
  value?: string

  /** Disable active styles */
  active?: boolean
}

export const ToolbarButton = ({
  className,
  children,
  controls,
  value,
  active,
  ...others
}: ToolbarButtonProps) => {
  const { classes, cx } = useStyles()

  return (
    <ActionIcon
      className={cx(classes.control, active && classes.active, className)}
      value={value}
      radius={0}
      {...others}
    >
      {children}
    </ActionIcon>
  )
}

ToolbarButton.displayName = '@skylakes/ToolbarButton'
