const graph = require('./graph').graph
const outDegree = require('./graph').outDegree
const inDegree = require('./graph').inDegree

const g = graph([[1, 2], [1, 3]])

console.log('Graph', g)
console.log('Outdegree', outDegree(g))
console.log('Indegree', inDegree(g))