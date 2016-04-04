const graph = require('./graph')
const outDegree = graph.outDegree
const inDegree = graph.inDegree
const edgeCount = graph.edgeCount
const nodeCount = graph.nodeCount
const dfs = require('./dfs')
const transitiveClosure = require('./transitive-closure')

const g = graph.graph([['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'G'], ['A', 'E'], ['E', 'F'], ['A', 'A']])
// const g = graph.graph([[1, 2], [1, 3]])
// const g = graph.graph([[1, 2], [2, 4], [1, 3], [3, 7], [1, 5], [5, 6]])
// const g = graph.graph([[0, 4], [2, 0], [2, 1], [2, 3], [1, 4], [1, 3], [3, 4], [0, 0]])
const root = g.__value[1]

// console.log('Graph:', g)
// console.log('Outdegree:', outDegree(g))
// console.log('Indegree:', inDegree(g))
// console.log('Node count:', nodeCount(g))
// console.log('Edge count:', edgeCount(g))
const d = dfs.dfs(g, root).__value
// console.log(root)
// console.log('Deep first search:', d)

d.forEach(a => console.log(a.item))

console.log('Is cyclic:', dfs.isCyclic(g).__value)

console.log(transitiveClosure(g))
