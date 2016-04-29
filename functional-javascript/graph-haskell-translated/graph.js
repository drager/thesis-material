
import {compose} from '../graph/graph'
import {indices, accumArray} from './helpers'

// buildG :: Bounds -> [Edge] -> Graph
const buildG = edges0 => {
  const graph = accumArray(edges0)
  return Object.keys(graph).map(key => ({[key]: graph[key]}))
}
// console.log(buildG([[50, 51], [50, 52], [52, 53], [53, 54]]))
console.log('graph: ', buildG([[50, 51], [50, 52], [50, 54], [52, 53]]))

// edges :: Graph -> [Edge]
const edges = g => g
  .map(e => e[Object.keys(e)]
    .map(v => [Object.keys(e)[0], v]))
  .filter(v => v.length > 0)
  .reduce((acc, curr) => acc.concat(curr))

edges(buildG([[50, 51], [50, 52], [52, 53], [53, 54]]))

const vertices = indices
// const result = vertices(buildG([[50, 51], [50, 52], [52, 53], [53, 54]]))

// [{'50': [54,52,51]}, {'51': []}, {'52': [53]}, {'53': []}, {'54': []}] => [{54: 50}, {52: 50}, {51: 50}, {53: 52}]
// reverseE :: Graph -> [Edge]
const reverseE = g => edges(g).map(edge => [...edge.reverse()])
console.log('reverseE: ', reverseE(buildG([[50, 51], [50, 52], [50, 54], [52, 53]])))

// transposeG  :: Graph -> Graph
const transposeG = g => compose(buildG, reverseE)(g)
console.log('transposeG: ', transposeG(buildG([[50, 51], [50, 52], [50, 54], [52, 53]])))
// console.log('graph: ', transposeG(buildG([[50, 51], [50, 52], [50, 54], [52, 53]])))

const mapTable = f => g => indices(g).map((v, i) => [v, f(g[i][v])])

const outdegree = mapTable((ws) => ws.length)
console.log('outdegree: ', outdegree(buildG([[50, 51], [50, 52], [50, 54], [52, 53]])))

const indegree = compose(outdegree, transposeG)
console.log('indegree: ', indegree(buildG([[50, 51], [50, 52], [50, 54], [52, 53]])))
// console.log(accumArray(reverseE(buildG([[50, 51], [50, 52], [50, 54], [52, 53]])))) // debugg indegree
// reverseE(buildG([[50, 51], [50, 52], [50, 54], [52, 53]]))
// console.log(reverseE(buildG([[50, 51], [50, 52], [50, 54], [52, 53]])))
