/* eslint-disable react/require-default-props */
import { DefaultProps, Selectors } from '@mantine/core'
import {
  getPreventDefaultHandler,
  isCollapsed,
  isMarkActive,
  someNode,
  toggleMark,
  toggleNodeType,
  usePlateEditorState,
} from '@skylakes/slate-core'
import { KEY_ALIGN, setAlign } from '@skylakes/slate-alignment'
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

const getIsMark = (control: Record<string, unknown> & { mark?: boolean }) =>
  !!control.mark

const getIsAlign = (control: Record<string, unknown> & { align?: boolean }) =>
  !!control.align

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
        const isMark = getIsMark(CONTROLS[item])
        const isAlign = getIsAlign(CONTROLS[item])

        return (
          <ToolbarButton
            className={classes.toolbarControl}
            controls={CONTROLS[item].controls}
            active={
              !!editor?.selection &&
              (() => {
                if (isMark) {
                  return isMarkActive(editor, CONTROLS[item].controls)
                }

                if (isAlign) {
                  return (
                    isCollapsed(editor?.selection) &&
                    someNode(editor, {
                      match: { [KEY_ALIGN]: CONTROLS[item].controls },
                    })
                  )
                }

                return someNode(editor, {
                  match: { type: CONTROLS[item].controls },
                })
              })()
            }
            key={item}
            onMouseDown={
              editor
                ? (() => {
                    if (isMark) {
                      return getPreventDefaultHandler(toggleMark, editor, {
                        key: CONTROLS[item].controls,
                      })
                    }
                    if (isAlign) {
                      return getPreventDefaultHandler(setAlign, editor, {
                        value: CONTROLS[item].controls as any,
                      })
                    }
                    return getPreventDefaultHandler(toggleNodeType, editor, {
                      activeType: CONTROLS[item].controls,
                    })
                  })()
                : undefined
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
