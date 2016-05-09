'use strict'

import {dfs} from './dfs'
import {
  graph,
  Graph,
  Fmap,
  compose,
  curry
} from './graph'

const transitiveMap = functor => graph =>
  graph.map(node => dfs(functor, node).join())
    .reduce((a, b) => a.concat(b), [])

export const transitiveClosure = fNodes => Fmap(transitiveMap(fNodes))(fNodes)
