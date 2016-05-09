'use strict'

export const compose = (...args) => initial =>
  args.reduceRight((result, fn) =>
    fn(result), initial)

export const curry = (fn, ...args) => (...args2) => fn(...args, ...args2)

export const Graph = function(x) {
  this.__value = x
}

Graph.of = function(x) {
  return new Graph(x)
}

Graph.prototype.map = function(f) {
  return Graph.of(f(this.__value))
}

Graph.prototype.join = function() {
  return this.__value
}

export const Fmap = (f) => (F) => F.map(f)

const findExistingNode = (node, graph) => graph.find(n => n.item === node.item) || node

const createNode = item => ({item, successors: [], predecessors: [], visited: false})

const addNewNode = (node, graph) => !graph.find(n => n.item === node.item) ?
                                      graph.concat([node]) : graph

const addEdge = (from, to, graph) => {
  const copy = [].concat(graph)
  //TODO: Do not push into successors and predecessors.
  from.successors.push(to)
  to.predecessors.push(from)
  const updatedGraph = addNewNode(to, copy)
  const resultGraph = addNewNode(from, updatedGraph)
  return resultGraph
}

const Freduce = connect => Fnodes => Fnodes.reduce((graph, pair) => {
  const to = findExistingNode(pair[1], graph)
  const from = findExistingNode(pair[0], graph)
  return connect(from, to, graph)
}, [])

const addEdges = connect => Fnodes => Fmap(Freduce(connect))(Fnodes)

const degreeMap = type => graph => graph.map(edge => [edge.item, edge[type].length])

const degree = (type, Fnodes) => Fmap(degreeMap(type))(Fnodes)

export const outDegree = curry(degree, 'successors')
export const inDegree = curry(degree, 'predecessors')

export const nodeCount = Fnodes => Fmap(graph => graph.length)(Fnodes)
export const edgeCount = Fnodes => Fmap(graph => graph.reduce((previous, current) =>
  previous + current.predecessors.length, 0))(Fnodes)

const deepConvertItemsToNodes = makeNode => items => items.map(item => convertItemsToNodes(makeNode)(item))

const convertItemsToNodes = makeNode => items => items.map(makeNode)

export const graph = items => items[0] instanceof Array
  ? compose(
      addEdges(addEdge),
      Fmap(deepConvertItemsToNodes(createNode))
    )(Graph.of(items))
  : compose(
      Fmap(convertItemsToNodes(createNode))
    )(Graph.of(items))
