'use strict'

import {dfs} from './dfs'
import {
  graph,
  Graph,
  map,
  compose,
  curry
} from './graph'

const transitiveMap = functor => graph =>
  graph.map(node => dfs(functor, node).join())
    .reduce((a, b) => a.concat(b), [])

export const transitiveClosure = fNodes => map(transitiveMap(fNodes))(fNodes)
