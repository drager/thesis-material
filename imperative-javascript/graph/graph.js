'use strict'

const isArray = (item) => Object.prototype.toString.call(item) === '[object Array]'

class Graph {
  constructor(pairs) {
    this.vertices = new Map()
    this.edges = []

    if (isArray(pairs[0])) {
      this.addNodes(pairs)
      this.addEdges(this.edges)
    } else {
      this.addNodes(pairs)
    }
  }

  addNodes(pairs) {
    if (isArray(pairs)) {
      for (let i = 0; i < pairs.length; i++) {
        this.addNodes(pairs[i])
      }
      return
    }

    this.edges.push(this.addNode(pairs))
  }

  addNode(item) {
    if (!this.vertices.has(item)) {
      this.vertices.set(item, new Node(item))
    }

    return this.getNode(item)
  }

  addEdges(nodes) {
    for (let i = 1; i < nodes.length; i++) {
      if (i % 2 !== 0) {
        this.addEdge(nodes[i-1], nodes[i])
      }
    }
  }

  addEdge(from, to) {
    if (!from.successors.has(to)) {
      from.successors.add(to)
      to.predecessors.add(from)
    }
  }

  getNode(item) {
    let node

    if (this.vertices.has(item)) {
      node = this.vertices.get(item)
    }

    return node
  }

  outDegree() {
    let out = []

    for (let key of this.vertices.keys()) {
      out.push([this.vertices.get(key).item, this.vertices.get(key).successors.size])
    }

    return out
  }

  inDegree() {
    let ind = []

    for (let key of this.vertices.keys()) {
      ind.push([this.vertices.get(key).item, this.vertices.get(key).predecessors.size])
    }

    return ind
  }

  nodeCount() {
    let count = 0

    for (let graph of this.vertices.keys()) {
      if (graph != null) {
        count++
      }
    }
    return count
  }

  edgeCount() {
    let count = 0

    for (let node of this.vertices.values()) {
      count += node.outDegree()
    }

    return count
  }
}

class Node {
  constructor(item) {
    this.successors = new Set()
    this.predecessors = new Set()
    this.item = item
  }
}

module.exports = Graph