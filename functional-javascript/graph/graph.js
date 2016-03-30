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

const isArray = (item) => Object.prototype.toString.call(item) === '[object Array]'

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

const createNode = (node, graph) => {
  if(graph.find(n => n.item === node)) {
    return graph.find(n => n.item === node)
  } else {
    return Object.freeze({item: node, successors: new Set(), predecessors: new Set(),})
  }
}

const addEdge = (nodes) => {
  const edges = []
  const graph = nodes.slice()

  graph.reduce((from, to, i) => {
    if (!from.successors.has(to) && !to.predecessors.has(from) && i % 2 !== 0) {
      from.successors.add(to)
      to.predecessors.add(from)
    }
    return to
  })

  return graph
}

const addNodeWithEdge = () => compose(
  addEdge,
  addNodes
)

const degree = (type, graph) => {
  const degrees = []
  const walked = []

  graph.map(edge => {
      if (walked.indexOf(edge.item) !== 0) {
        degrees.push([edge.item, edge[type].size])
      }
      walked.push(edge.item)
    })

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
