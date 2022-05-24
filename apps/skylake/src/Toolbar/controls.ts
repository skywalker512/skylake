import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  ListBulletIcon,
  Link1Icon,
  ImageIcon,
  TextNoneIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextAlignCenterIcon,
  VideoIcon,
  QuoteIcon,
  CodeIcon,
} from '@modulz/radix-icons'
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
} from '@skylakes/slate-basic-marks'
import { ELEMENT_BLOCKQUOTE } from '@skylakes/slate-block-quote'
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from '@skylakes/slate-heading'
import { OrderedList, H1, H2, H3, H4, H5, H6, Sub, Sup } from './icons'

export const CONTROLS = {
  code: {
    icon: CodeIcon,
    controls: MARK_CODE,
    mark: true,
  },

  codeBlock: {
    icon: CodeIcon,
    controls: 'code-block',
  },

  bold: {
    icon: FontBoldIcon,
    controls: MARK_BOLD,
    mark: true,
  },

  italic: {
    icon: FontItalicIcon,
    controls: MARK_ITALIC,
    mark: true,
  },

  underline: {
    icon: UnderlineIcon,
    controls: MARK_UNDERLINE,
    mark: true,
  },

  strike: {
    icon: StrikethroughIcon,
    controls: MARK_STRIKETHROUGH,
    mark: true,
  },

  unorderedList: {
    icon: ListBulletIcon,
    controls: 'list',
    value: 'bullet',
  },

  orderedList: {
    icon: OrderedList,
    controls: 'list',
  },

  link: {
    icon: Link1Icon,
    controls: 'link',
  },

  image: {
    icon: ImageIcon,
    controls: 'image',
  },

  clean: {
    icon: TextNoneIcon,
    controls: 'clean',
  },

  alignCenter: {
    icon: TextAlignCenterIcon,
    controls: 'center',
    align: true,
  },

  alignLeft: {
    icon: TextAlignLeftIcon,
    controls: 'left',
    align: true,
  },

  alignRight: {
    icon: TextAlignRightIcon,
    controls: 'right',
    align: true,
  },

  video: {
    icon: VideoIcon,
    controls: 'video',
  },

  h1: {
    icon: H1,
    controls: ELEMENT_H1,
  },

  h2: {
    icon: H2,
    controls: ELEMENT_H2,
    value: '2',
  },

  h3: {
    icon: H3,
    controls: ELEMENT_H3,
    value: '3',
  },

  h4: {
    icon: H4,
    controls: ELEMENT_H4,
    value: '4',
  },

  h5: {
    icon: H5,
    controls: ELEMENT_H5,
    value: '5',
  },

  h6: {
    icon: H6,
    controls: ELEMENT_H6,
    value: '6',
  },

  sup: {
    icon: Sup,
    controls: MARK_SUPERSCRIPT,
    mark: true,
  },

  sub: {
    icon: Sub,
    controls: MARK_SUBSCRIPT,
    mark: true,
  },

  blockquote: {
    icon: QuoteIcon,
    controls: ELEMENT_BLOCKQUOTE,
  },
} as const

export type ToolbarControl = keyof typeof CONTROLS
