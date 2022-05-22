import { defaults } from 'lodash-es'
import { TNode } from '../../slate/node/TNode'
import {
  applyDeepToNodes,
  ApplyDeepToNodesOptions,
} from '../../utils/applyDeepToNodes'

/** Recursively merge a source object to children nodes with a query. */
export const defaultsDeepToNodes = <N extends TNode>(
  options: Omit<ApplyDeepToNodesOptions<N>, 'apply'>
) => {
  applyDeepToNodes({ ...options, apply: defaults })
}
