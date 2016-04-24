'use strict'

const graph = require('./graph')
const map = graph.map
const Graph = graph.Graph
const compose = graph.compose
const curry = graph.curry

const dfs = (graph, rootNode) =>
  compose(
    map(dfsWithRoot(rootNode)([])),
    map(clearNodes)
  )(graph, rootNode)

const clearNodes = nodes => nodes.map(clearNode)

const clearNode = root => {
  const node = Object.assign({}, root, {visited: false})

  return node.visited ? clearNodes(node.successors) : node
}

// const mapNode =

const dfsWithRoot = node => a => {
  node.visited = true
  let nodes = [...a]
  nodes.push(node)

  node.successors.filter(next => !next.visited)
    .map(next => {
      // nodes.push(next)
      dfsWithRoot(next)(nodes)
    })

  return nodes
}

const filterCirular = fNodes => compose(
  map(graph => graph.filter(node => node.length > 0)),
  map(graph => graph.map(node => {
    const suc = node.successors.filter(next => next.item === node.item)
    const pred = node.predecessors.filter(next => next.item === node.item)
    return [...suc, ...pred]
  }))
)(fNodes)

const isCyclic = fNodes => {
  return filterCirular(fNodes).join().length > 0
}

module.exports = {
  dfs,
  isCyclic,
}
