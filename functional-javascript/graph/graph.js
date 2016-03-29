'use strict'

const compose = (...args) => initial =>
  args.reduceRight((result, fn) =>
    fn(result), initial)

const curry = (fn, ...args1) => (...args2) => fn(...args1, ...args2)

const addNodes = nodes => nodes.map(addNode)

const addNode = node => Object.freeze({
  item: node,
  successors: new Set(),
  predecessors: new Set(),
})

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

const addNodeWithEdge = () => compose(
  addEdge,
  addNodes
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
const graph = pairs => pairs.map(pair => addNodeWithEdge()(pair))

module.exports = {
  graph,
  outDegree,
  inDegree
}
