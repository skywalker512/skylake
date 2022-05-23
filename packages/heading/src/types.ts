import { HotkeyPlugin } from '@skylakes/slate-core'

export interface HeadingPlugin extends HotkeyPlugin {}

export interface HeadingsPlugin {
  /** Heading levels supported from 1 to `levels` */
  levels?: number
}
