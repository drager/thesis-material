'use strict'

const compose = (...args) => initial =>
  args.reduceRight((result, fn) =>
    fn(result), initial)

const curry = (fn, ...args) => (...args2) => fn(...args, ...args2)

const getNodeFromGraph = (graph, node) => graph.find(n => n.item === node.item)

const createNode = item => Object.freeze({item, successors: [], predecessors: []})

const addEdge = (from, to, graph) => {
  const nodes = [...graph]
  from.successors.push(to)
  to.predecessors.push(from)
  getNodeFromGraph(graph, from) ? nodes.push(to) : nodes.push(from, to)
  return nodes
}

const addEdges = connect => nodes =>
  nodes.reduce((graph, pair) => {
    const to = pair[1]
    const from = getNodeFromGraph(graph, pair[0]) || pair[0]
    return Object.freeze(connect(from, to, graph))
  }, [])

const degree = (type, graph) => graph.map(edge => [edge.item, edge[type].length])

const outDegree = curry(degree, 'successors')
const inDegree = curry(degree, 'predecessors')

const nodeCount = graph => graph.length
const edgeCount = graph => graph.reduce((previous, current) =>
  previous + current.predecessors.length, 0)

const deepConvertItemsToNodes = makeNode => items => items
  .map(pair => convertItemsToNodes(makeNode)(pair))

const convertItemsToNodes = makeNode => items => items.map(makeNode)

const graph = items => items[0] instanceof Array
  ? compose(
      addEdges(addEdge),
      deepConvertItemsToNodes(createNode)
    )(Object.freeze(items))
  : compose(
      convertItemsToNodes(createNode)
    )(Object.freeze(items))

module.exports = {
  graph,
  outDegree,
  inDegree,
  nodeCount,
  edgeCount,
}
