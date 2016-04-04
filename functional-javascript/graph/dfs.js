'use strict'

const graph = require('./graph')
const map = graph.map
const Graph = graph.Graph
const compose = graph.compose
const curry = graph.curry

const dfs = (graph, rootNode) => rootNode
  ? compose(
      dfsWithRoot(rootNode),
      map(clearNodes)
    )(graph, rootNode)
  : compose(
      dfsWithGraph,
      map(clearNodes)
    )(graph)

const clearNodes = nodes => nodes.map(clearNode)

const clearNode = root => {
  const node = Object.assign({}, root, {visited: false})

  return node.visited ? clearNodes(node.successors) : node
}

const mapNode = rootNode => () => {
  const nodes = []
  const node = Object.assign({}, rootNode, {visited: true})

  nodes.push(node)

  node.successors.filter(next => !next.visited)
    .map(next => {
      next.visited = true
      nodes.push(next)
      return mapNode(next)()
    })
  return nodes
}

const dfsWithRoot = rootNode => fNodes => map(mapNode(rootNode))(fNodes)

const dfsWithGraph = fNodes => map(nodes => nodes
  .filter(node => !node.visited)
  .map(node => mapNode(node)(nodes))
  .reduce((a, b) => a.concat(b), []))(fNodes)

const isCyclic = fNodes => map(graph =>
  graph.map(node =>
    node.successors.filter(next => next === node))
    .filter(node => node.length > 0).length > 0)(fNodes)

module.exports = {
  dfs,
  isCyclic,
}