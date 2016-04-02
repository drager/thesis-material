const graph = require('./graph')
const outDegree = graph.outDegree
const inDegree = graph.inDegree
const edgeCount = graph.edgeCount
const nodeCount = graph.nodeCount

// const g = graph.graph([['A', 'B'], ['B', 'D'], ['A', 'C'], ['C', 'G'], ['A', 'E'], ['E', 'F']])
// const g = graph.graph([1, 2, 3])
// const g = graph.graph([[1, 2], [1, 3], [1, 5], [5, 3]])
const g = graph.graph([[1, 2], [1, 3], [4, 3], [3, 1]])

console.log('Graph', g.__value)
console.log('Outdegree', outDegree(g))
console.log('Indegree', inDegree(g))
console.log('Node count:', nodeCount(g))
console.log('Edge count:', edgeCount(g))
