import { traverseHtmlElements } from '@skylakes/slate-core'

/** Clean elements style mso-list to mso-list:Ignore */
export const cleanDocxListElements = (rootNode: Node): void => {
  traverseHtmlElements(rootNode, (element) => {
    const styleAttribute = element.getAttribute('style')

    if (styleAttribute) {
      element.setAttribute(
        'style',
        styleAttribute.replace(/mso-list:\s*Ignore/gim, 'mso-list:Ignore')
      )
    }

    return true
  })
}
