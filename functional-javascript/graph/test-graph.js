import {
  graph,
  outDegree,
  inDegree,
  edgeCount,
  nodeCount
} from './graph'

import {
  dfs,
  isCyclic
} from './dfs'

import {transitiveClosure} from './transitive-closure'

// const g = graph.graph([['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'G'], ['A', 'E'], ['E', 'F'], ['A', 'A']])
// const g = graph.graph([[1, 2], [1, 3]])
// const g = graph.graph([[1, 2], [2, 4], [1, 3], [3, 7], [1, 5], [5, 6]])
// const g = graph.graph([[0, 4], [2, 0], [2, 1], [2, 3], [1, 4], [1, 3], [3, 4]])
const g = graph([[0, 1], [1, 1], [1, 2], [2, 3], [3, 1]])

const root = g.__value[1]

// console.log('Graph:', g)
// console.log('Outdegree:', outDegree(g))
// console.log('Indegree:', inDegree(g))
// console.log('Node count:', nodeCount(g))
// console.log('Edge count:', edgeCount(g))
// console.log('root,', root)
const d = dfs(g, root).__value
console.log('Deep first search:', d)

d.forEach(a => console.log(a.item))

console.log('Is cyclic:', isCyclic(g))

console.log(transitiveClosure(g))
