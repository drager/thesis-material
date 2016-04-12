const Graph = require('./graph')
const Dfs = require('./dfs')
const computeClosure = require('./transitive-closure')

// const graph = new Graph([[1, 2], [1, 3]])
// const graph = new Graph([['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'G'], ['A', 'E'], ['E', 'F'], ['A', 'A']])
//const graph = new Graph([1, 2, 3])
// const graph = new Graph([[0, 4], [2, 0], [2, 1], [2, 3], [1, 4], [1, 3], [3, 4], [0, 0]])
const graph = new Graph([[0, 1], [1, 2], [2, 2] ,[2, 3]])
// console.log('Outdegree:', graph.outDegree())
// console.log('Indegree:', graph.inDegree())
// console.log('Node count:', graph.nodeCount())
// console.log('Edge count:', graph.edgeCount())

const root = graph.vertices.get(0)

// console.log('Graph:', graph.vertices.get('A'))
// console.log('Outdegree:', outDegree(g))
// console.log('Indegree:', inDegree(g))
// console.log('Node count:', nodeCount(g))
// console.log('Edge count:', edgeCount(g))
const dfs = new Dfs()
// console.log(root)
// console.log('Deep first search:', dfs.dfs(graph, root))

// d.forEach(a => console.log(a.item))

console.log('Is cyclic:', dfs.isCyclic(graph))
console.log('TransitiveClosure:', computeClosure(graph))