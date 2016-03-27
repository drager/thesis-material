'use strict'

const compose = (...args) => initial =>
  args.reduceRight((result, fn) =>
    fn(result), initial)

const curry = (fn, ...args1) => (...args2) => fn(...args1, ...args2)

const addNodes = obj => obj.nodes.map(node => checkNode(node, obj.vertices))

const addNode = (obj, vertices) => {
  const node = Object.freeze({
    item: obj,
    successors: new Set(),
    predecessors: new Set(),
  })

  vertices[node.item] = node

  return node
}

const checkNode = (node, vertices) =>
  !vertices[node]
    ? addNode(node, vertices)
    : vertices[node]

const addEdge = nodes => {
  const from = Object.freeze(Object.assign({}, nodes[0]))
  const to = Object.freeze(Object.assign({}, nodes[1]))
  const obj = []

  if (!from.successors.has(to)) {
    obj.push(from, to)
    from.successors.add(to)
    to.predecessors.add(from)
  }

  return obj
}

const addNodeWithEdge = (nodes, vertices) => compose(
  addEdge,
  addNodes,
  () => {
    return {nodes: nodes, vertices: vertices}
  }
)

const degree = (type, graph) => {
  const degrees = []
  const walked = []

  graph.map(vertices =>
    vertices.map(edge => {
      if (walked.indexOf(edge.item) !== 0) {
        degrees.push([edge.item, edge[type].size])
      }
      walked.push(edge.item)
    })
  )
  return degrees
}

const outDegree = curry(degree, 'successors')
const inDegree = curry(degree, 'predecessors')

function graph(lists) {
  const vertices = {}
  return lists.map(nodes => addNodeWithEdge(nodes, vertices)())
}

module.exports = {
  graph,
  outDegree,
  inDegree
}
