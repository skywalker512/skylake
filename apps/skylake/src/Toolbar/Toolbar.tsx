/* eslint-disable react/require-default-props */
import { DefaultProps, Selectors } from '@mantine/core'
import {
  getPreventDefaultHandler,
  someNode,
  toggleNodeType,
  usePlateEditorState,
} from '@skylakes/slate-core'
import { ToolbarButton } from './ToolbarButton'
import { CONTROLS, ToolbarControl } from './controls'
import useStyles from './Toolbar.styles'

export type ToolbarStylesNames = Selectors<typeof useStyles>

export interface ToolbarProps extends DefaultProps<ToolbarStylesNames> {
  /** Toolbar controls divided into groups */
  controls: ToolbarControl[][]

  /** Make toolbar sticky */
  sticky?: boolean

  /** Top toolbar position in any valid css value */
  stickyOffset?: number | string

  /** Id that is used to connect toolbar to editor */
  id?: string
}

export const Toolbar = ({
  controls,
  stickyOffset = 0,
  sticky = true,
  className,
  classNames,
  styles,
  id,
  ...others
}: ToolbarProps) => {
  const { classes, cx } = useStyles(
    { sticky, stickyOffset },
    { classNames, styles, name: 'RichTextEditor' }
  )

  const editor = usePlateEditorState()

  const groups = controls.map((group, index) => {
    const items = group
      .filter((item) => CONTROLS[item])
      .map((item) => {
        const Icon = CONTROLS[item].icon

        return (
          <ToolbarButton
            className={classes.toolbarControl}
            controls={CONTROLS[item].controls}
            active={
              !!editor?.selection &&
              someNode(editor, { match: { type: CONTROLS[item].controls } })
            }
            key={item}
            onMouseDown={
              editor
                ? getPreventDefaultHandler(toggleNodeType, editor, {
                    activeType: CONTROLS[item].controls,
                  })
                : () => {}
            }
          >
            <Icon style={{ width: 18, height: 18 }} />
          </ToolbarButton>
        )
      })

    return (
      // eslint-disable-next-line react/no-array-index-key
      <div className={classes.toolbarGroup} key={index}>
        {items}
      </div>
    )
  })

  return (
    <div id={id} className={cx(classes.toolbar, className)} {...others}>
      <div className={classes.toolbarInner}>{groups}</div>
    </div>
  )
}

Toolbar.displayName = '@skylakes/Toolbar'
