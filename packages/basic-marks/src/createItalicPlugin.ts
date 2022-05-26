import {
  createPluginFactory,
  HotkeyPlugin,
  onKeyDownToggleMark,
  someHtmlElement,
} from '@skylakes/slate-core'

export const MARK_ITALIC = 'italic'

/** Enables support for italic formatting. */
export const createItalicPlugin = createPluginFactory<HotkeyPlugin>({
  key: MARK_ITALIC, // 类型
  isLeaf: true, // 是否是叶子节点
  handlers: {
    // 当按下快捷键时
    onKeyDown: onKeyDownToggleMark, // Toggle
  },
  options: {
    hotkey: 'mod+i', // 快捷键
  },
  deserializeHtml: {
    rules: [
      { validNodeName: ['EM', 'I'] },
      {
        validStyle: {
          fontStyle: 'italic',
        },
      },
    ],
    query: (el) =>
      !someHtmlElement(el, (node) => node.style.fontStyle === 'normal'),
  },
})
