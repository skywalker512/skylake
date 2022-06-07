import {
  removeHtmlNodesBetweenComments,
  traverseHtmlElements,
} from '@skylakes/slate-core'

export const getDocxListContentHtml = (rootElement: Element): string => {
  const clonedElement = rootElement.cloneNode(true) as Element

  removeHtmlNodesBetweenComments(clonedElement, '[if !supportLists]', '[endif]')

  traverseHtmlElements(clonedElement, (element) => {
    const styleAttribute = element.getAttribute('style')

    if (styleAttribute === 'mso-list:Ignore') {
      element.remove()
    }

    return true
  })

  return clonedElement.innerHTML
}
