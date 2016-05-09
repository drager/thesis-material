'use strict'

import {
  graph,
  Fmap,
  Graph,
  compose,
  curry
} from './graph'

export const dfs = (graph, rootNode) =>
  compose(
    dfsWithRoot(rootNode),
    Fmap(clearNodes)
  )(graph, rootNode)

const clearNodes = nodes => nodes.map(clearNode)

const clearNode = root => {
  const node = Object.assign({}, root, {visited: false})

  return node.visited ? clearNodes(node.successors) : node
}

const mapNode = (node, nodes) => () => {
  node.visited = true
  nodes.push(node)

  node.successors.filter(next => !next.visited)
    .map(next => mapNode(next, nodes)())

  return nodes
}

const dfsWithRoot = rootNode => fNodes => Fmap(mapNode(rootNode, []))(fNodes)

const filterCirular = fNodes => compose(
  Fmap(graph => graph.filter(node => node.length > 0)),
  Fmap(graph => graph.map(node => {
    const suc = node.successors.filter(next => next.item === node.item)
    const pred = node.predecessors.filter(next => next.item === node.item)
    return [...suc, ...pred]
  }))
)(fNodes)

export const isCyclic = fNodes => {
  return filterCirular(fNodes).join().length > 0
}
