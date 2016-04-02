'use strict'

const compose = (...args) => initial =>
  args.reduceRight((result, fn) =>
    fn(result), initial)

const curry = (fn, ...args) => (...args2) => fn(...args, ...args2)

const Graph = function(x) {
  this.__value = x
}

Graph.of = function(x) {
  return new Graph(x)
}

Graph.prototype.map = function(f) {
  return Graph.of(f(this.__value))
}

const map = (f) => (F) => F.map(f)

const getExistingNodeFromGraph = (node, graph) => graph.find(n => n.item === node.item)

const createNode = item => Object.freeze({item, successors: [], predecessors: []})

const addNewNode = (node, graph) => !getExistingNodeFromGraph(node, graph) ?
                                      graph.concat([node]) : graph

const addEdge = (from, to, graph) => {
  const copy = [].concat(graph)
  //TODO: Do not push into successors and predecessors.
  from.successors.push(to)
  to.predecessors.push(from)
  const updatedGraph = addNewNode(to, copy)
  const resultGraph = addNewNode(from, graphOne)
  return resultGraph
}

const reduce = connect => Fnodes => Fnodes.reduce((graph, pair) => {
  // TODO: getExistingNodeFromGraph could be returning a Maybe/Either instead, returning part[1] if node does not exist in graph,
  // provided that graph in this context also is a Functor (Maybe), then our outer Graph would have to be a Maybe and the need of
  // a Monad is at hand. Or different type of Functors are nested and we would need to implement Monad transformers.
  const to = getExistingNodeFromGraph(pair[1], graph) || pair[1]
  const from = getExistingNodeFromGraph(pair[0], graph) || pair[0]
  return connect(from, to, graph)
}, [])

const addEdges = connect => Fnodes => map(reduce(connect))(Fnodes)

const degreeMap = type => graph => graph.map(edge => [edge.item, edge[type].length])

const degree = (type, Fnodes) => map(degreeMap(type))(Fnodes)

const outDegree = curry(degree, 'successors')
const inDegree = curry(degree, 'predecessors')

const nodeCount = Fnodes => map(graph => graph.length)(Fnodes)
const edgeCount = Fnodes => map(graph => graph.reduce((previous, current) =>
  previous + current.predecessors.length, 0))(Fnodes)

const deepConvertItemsToNodes = makeNode => items => items.map(item => convertItemsToNodes(makeNode)(item))

const convertItemsToNodes = makeNode => items => items.map(makeNode)

const graph = items => items[0] instanceof Array
  ? compose(
      addEdges(addEdge),
      map(deepConvertItemsToNodes(createNode))
    )(Graph.of(items))
  : compose(
      map(convertItemsToNodes(createNode))
    )(Graph.of(items))

module.exports = {
  graph,
  outDegree,
  inDegree,
  nodeCount,
  edgeCount,
}
