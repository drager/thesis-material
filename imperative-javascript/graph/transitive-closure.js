'use strict'

const Dfs = require('./dfs')

function computeClosure(graph) {
  const nodeMap = new Map()
  const dfs = new Dfs()

  for (let node of graph.vertices.values()) {
    const nodes = [...dfs.dfs(graph, node)]
    nodeMap.set(node, nodes)
  }

  return nodeMap
}

module.exports = computeClosure