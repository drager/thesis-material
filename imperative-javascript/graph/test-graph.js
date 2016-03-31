const Graph = require('./graph')

const graph = new Graph([[1, 2], [1, 3]])
//const graph = new Graph([1, 2, 3])

console.log('Outdegree:', graph.outDegree())
console.log('Indegree:', graph.inDegree())
console.log('Node count:', graph.nodeCount())
console.log('Edge count:', graph.edgeCount())
