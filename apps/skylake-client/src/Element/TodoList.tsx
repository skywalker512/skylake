import { Box } from '@mantine/core'
import { findNodePath, setNodes } from '@skylakes/slate-core'
import { TTodoListItemElement } from '@skylakes/slate-list'
import { useReadOnly } from 'slate-react'
import { StyledElementProps } from '../StyledElement'

export const TodoListElement = (props: StyledElementProps) => {
  const { attributes, children, nodeProps, element, editor } = props

  const readOnly = useReadOnly()

  const { checked } = element

  return (
    <Box {...attributes} sx={{ display: 'flex' }}>
      <div contentEditable={false}>
        <input
          data-testid="TodoListElementCheckbox"
          type="checkbox"
          checked={!!checked}
          onChange={(e) => {
            const path = findNodePath(editor, element)
            if (!path) return

            setNodes<TTodoListItemElement>(
              editor,
              { checked: e.target.checked },
              {
                at: path,
              }
            )
          }}
          {...nodeProps}
        />
      </div>
      <Box
        sx={{ flex: 1 }}
        contentEditable={!readOnly}
        suppressContentEditableWarning
      >
        {children}
      </Box>
    </Box>
  )
}
