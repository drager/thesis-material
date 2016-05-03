import {compose} from '../graph/graph'
import {accumArray, head, indices} from './helpers'

// buildG :: Bounds -> [Edge] -> Graph
const buildG = edges0 => accumArray(edges0)
// console.log('graph: ', buildG([[50, 51], [50, 52], [50, 54], [52, 53]]))

// edges :: Graph -> [Edge]
const edges = g => g
  .map(e => e[Object.keys(e)]
    .map(v => [head(Object.keys(e)), v]))
  .filter(v => v.length > 0)
  .reduce((acc, curr) => acc.concat(curr))

// vertices :: Graph -> [Vertex]
const vertices = indices

// reverseE :: Graph -> [Edge]
const reverseE = g => edges(g).map(edge => [...edge.reverse()])
// console.log('reverseE: ', reverseE(buildG([[50, 51], [50, 52], [50, 54], [52, 53]])))

// transposeG  :: Graph -> Graph
const transposeG = g => compose(buildG, reverseE)(g)
// console.log('transposeG: ', transposeG(buildG([[50, 51], [50, 52], [50, 54], [52, 53]])))

// mapTable :: (Vertex -> a -> b) -> Table a -> Table b
const mapTable = f => g => indices(g).map((v, i) => [v, f(g[i][v])])

// outdegree :: Graph -> Table Int
const outdegree = mapTable((ws) => ws.length)
// console.log('outdegree: ', outdegree(buildG([[50, 51], [50, 52], [50, 54], [52, 53]])))

// indegree :: Graph -> Table Int
const indegree = compose(outdegree, transposeG)
// console.log('indegree: ', indegree(buildG([[50, 51], [50, 52], [50, 54], [52, 53]])))
