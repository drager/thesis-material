class Dfs {

  dfs(graph, rootNode) {
    this.clearNodes(graph.vertices)
    return this.dfsWithRoot(rootNode, [])
  }

  clearNodes(nodes) {
    for (let node of nodes.values()) {
      this.clearNode(node)
    }
  }

  clearNode(rootNode) {
    rootNode.visited = false

    return rootNode.visited ? clearNodes(rootNode.successors) : rootNode
  }

  dfsWithRoot(rootNode, nodes) {
    rootNode.visited = true
    nodes.push(rootNode)

    for (let next of rootNode.successors.values()) {
      if (!next.visited) {
        this.dfsWithRoot(next, nodes)
      }
    }

    return nodes
  }

  isCyclic(graph) {
    let cyclic = false

    for (let value of graph.vertices.values()) {
      for (let successor of value.successors) {
        if (successor === value) {
          cyclic = true
        }
      }
      for (let predressor of value.predecessors) {
        if (predressor === value) {
          cyclic = true
        }
      }
    }

    return cyclic
  }
}

module.exports = Dfs