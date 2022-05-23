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
    controls: 'code',
  },

  codeBlock: {
    icon: CodeIcon,
    controls: 'code-block',
  },

  bold: {
    icon: FontBoldIcon,
    controls: 'bold',
  },

  italic: {
    icon: FontItalicIcon,
    controls: 'italic',
  },

  underline: {
    icon: UnderlineIcon,
    controls: 'underline',
  },

  strike: {
    icon: StrikethroughIcon,
    controls: 'strike',
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
    controls: 'align',
    value: 'center',
  },

  alignLeft: {
    icon: TextAlignLeftIcon,
    controls: 'align',
  },

  alignRight: {
    icon: TextAlignRightIcon,
    controls: 'align',
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
    controls: 'script',
    value: 'super',
  },

  sub: {
    icon: Sub,
    controls: 'script',
    value: 'sub',
  },

  blockquote: {
    icon: QuoteIcon,
    controls: ELEMENT_BLOCKQUOTE,
  },
} as const

export type ToolbarControl = keyof typeof CONTROLS
