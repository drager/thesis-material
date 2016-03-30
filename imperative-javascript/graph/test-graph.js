const Graph = require('./graph')

const graph = new Graph([[1, 2], [1, 3]])
//const graph = new Graph([1, 2, 3])

console.log(graph.outDegree())
console.log(graph.inDegree())
