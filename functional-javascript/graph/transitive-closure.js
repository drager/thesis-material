'use strict'

const dfs = require('./dfs')
const graph = require('./graph')
const map = graph.map
const Graph = graph.Graph
const compose = graph.compose
const curry = graph.curry

const transitiveMap = functor => graph =>
  graph.map(g => dfs.dfs(functor, g).__value)
    .reduce((a, b) => a.concat(b), [])

const transitiveClosure = fNodes => map(transitiveMap(fNodes))(fNodes)

module.exports = transitiveClosure