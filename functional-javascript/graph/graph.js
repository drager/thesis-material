'use strict'
var compose = function compose() {
 for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
   args[_key] = arguments[_key];
 }

 return function (initial) {
   return args.reduceRight(function (result, fn) {
     return fn(result);
   }, initial);
 };
};

var curry = function curry(fn) {
 for (var _len2 = arguments.length, args1 = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
   args1[_key2 - 1] = arguments[_key2];
 }

 return function () {
   for (var _len3 = arguments.length, args2 = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
     args2[_key3] = arguments[_key3];
   }

   return fn.apply(undefined, args1.concat(args2));
 };
};

const includes = (arr, item) => !!~arr.indexOf(item)
const isArray = (item) => item instanceof Array

const addNodes = (pairs, graph) => {
  if (graph === undefined) graph = []
  return pairs.reduce((graph, item) => {
    if (isArray(item)) {
      return addNodes(item, graph)
    }
    graph.push(createNode(item, graph))
    return graph
  }, graph)
}

const createNode = (node, graph) =>
  graph.find(n => n.item === node)
    ? graph.find(n => n.item === node)
    : Object.freeze({item: node, successors: new Set(), predecessors: new Set(),})

const addEdges = nodes => {
  const graph = []

  nodes.reduce((from, to, i) => {
    if (i % 2 !== 0) {
      addEdge(from, to)
    }
    if (!includes(graph, to)) {
      graph.push(to)
    }
    return to
  })

  return graph
}

const addEdge = (first, second) => {
  const from = Object.assign({}, first)
  const to = Object.assign({}, second)

  if (!from.successors.has(to)) {
    from.successors.add(to)
    to.predecessors.add(from)
  }
}

const addNodeWithEdge = () => compose(
  addEdges,
  addNodes
)

const degree = (type, graph) => {
  const degrees = []

  graph.map(edge => degrees.push([edge.item, edge[type].size]))

  return degrees
}

const outDegree = curry(degree, 'successors')
const inDegree = curry(degree, 'predecessors')

const graph = pairs => {
  let graph
  if (isArray(pairs[0])) {
    graph = addNodeWithEdge()(pairs)
  } else {
    graph = addNodes(pairs)
  }

  return graph
}

module.exports = {
  graph,
  outDegree,
  inDegree
}
