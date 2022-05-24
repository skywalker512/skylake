/* eslint-disable react/require-default-props */
import { Box } from '@mantine/core'
import {
  CaretPosition,
  CursorOverlayState,
  useRemoteCursorOverlayPositions,
} from '@slate-yjs/react'
import { CSSProperties, PropsWithChildren, useRef } from 'react'
import { CursorData } from './types'

type CaretProps = {
  position: CaretPosition
  data: CursorData
}

const Caret = ({ position, data }: CaretProps) => {
  const caretStyle: CSSProperties = {
    ...position,
    background: data.color,
  }

  const labelStyle: CSSProperties = {
    transform: 'translateY(-100%)',
    background: data.color,
  }

  return (
    <Box style={caretStyle} sx={{ position: 'absolute', width: 2 }}>
      <Box
        sx={(theme) => ({
          position: 'absolute',
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.white,
          fontSize: theme.fontSizes.xs,
          whiteSpace: 'nowrap',
          top: 0,
        })}
        style={labelStyle}
      >
        {data.name}
      </Box>
    </Box>
  )
}

const RemoteSelection = ({
  data,
  selectionRects,
  caretPosition,
}: CursorOverlayState<CursorData>) => {
  if (!data) {
    return null
  }

  const selectionStyle: CSSProperties = {
    // Add a opacity to the background color
    backgroundColor: `${data.color}66`,
  }

  return (
    <>
      {selectionRects.map((position, i) => (
        <Box
          style={{ ...selectionStyle, ...position }}
          sx={{ position: 'absolute', pointerEvents: 'none' }}
          // eslint-disable-next-line react/no-array-index-key
          key={i}
        />
      ))}
      {caretPosition && <Caret position={caretPosition} data={data} />}
    </>
  )
}

type RemoteCursorsProps = PropsWithChildren<{
  className?: string
}>

export const RemoteCursorOverlay = ({
  className,
  children,
}: RemoteCursorsProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { cursors } = useRemoteCursorOverlayPositions<CursorData>({
    containerRef,
  })

  return (
    <Box className={className} sx={{ position: 'relative' }} ref={containerRef}>
      {children}
      {cursors.map((cursor) => (
        <RemoteSelection key={cursor.clientId} {...cursor} />
      ))}
    </Box>
  )
}
