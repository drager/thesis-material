'use strict'

class Graph {
  constructor(lists) {
    this.vertices = new Map()

    for (let i = 0; i < lists.length; i++) {
      let firstNode = this.addNodeFor(lists[i][0])
      let secondNode = this.addNodeFor(lists[i][1])
      this.addEdgeFor(firstNode, secondNode)
    }
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

  addNodeFor(item) {
    if (item == null) {
      throw Error('Item cannot be null!')
    }

    if (!this.containsNodeFor(item)) {
      const node = new Node(item)
      this.vertices.set(item, node)
    }

    return this.getNodeFor(item)
  }

  addEdgeFor(from, to) {
    let isAdded = false

    if (from == null || to == null) {
      throw Error('From or to cannot be null!')
    }

    if (!from.hasSucc(to)) {
      from.addSucc(to)
      to.addPred(from)
      isAdded = true
    }

    return isAdded
  }

  containsNodeFor(item) {
    if (item == null) {
      throw Error('Item cannot be null!')
    }

    return this.vertices.has(item)
  }

  getNodeFor(item) {
    let found = false
    let node = null

    if (item == null) {
      throw Error('Item cannot be null!')
    }

    if (this.vertices.has(item)) {
      found = true
      node = this.vertices.get(item)
    }

    if (!found) {
      throw Error('Could not find item!')
    }

    return node
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

  hasSucc(node) {
    return this.successors.has(node)
  }

  addSucc(succ) {
    this.successors.add(succ)
  }

  addPred(pred) {
    this.predecessors.add(pred)
  }
}

module.exports = Graph