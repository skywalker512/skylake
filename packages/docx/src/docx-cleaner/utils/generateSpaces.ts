import { SPACE, TAB } from '@skylakes/slate-core'

export const generateSpaces = (count: number): string =>
  Array.from({ length: count }, () => SPACE).join('')

export const generateTabs = (count: number): string =>
  Array.from({ length: count }, () => TAB).join('')
