
// buildG :: Bounds -> [Edge] -> Graph
// buildG bounds0 edges0 = accumArray (flip (:)) [] bounds0 edges0
// Input: [50, 53], [[50, 51], [50, 52], [52, 53]]

// Returns: [{50: [51, 52, 53], {51: []}, {52: [53]}, {53: []}}]
const accumArray = edges0 => edges0.reduce((acc, curr) => {
    !acc.hasOwnProperty(curr[0]) ?
      acc[curr[0]] = [].concat([curr[1]]) :
      acc[curr[0]] = acc[curr[0]].concat([curr[1]])

      acc[curr[1]] = !acc.hasOwnProperty(curr[1]) ? [] : null
    return acc
  }, {})

const buildG = edges0 => {
  const graph = accumArray(edges0)
  return Object.keys(graph).map(key => ({[key]: graph[key]}))
}
// console.log(buildG([[50, 51], [50, 52], [52, 53], [53, 54]]))

// -- | All edges of a graph.
// edges :: Graph -> [Edge]
// edges g = [ (v, w) | v <- vertices g, w <- g!v ]

// input [ { '50': [ 51, 52 ] }, { '52': [ 53 ] }, { '53': [ 54 ] } ]
// output [[50, 51], [50, 52], [52, 53], [53, 54]]

// edges :: Graph -> [Edge]
const edges = g => g
  .map(e => e[Object.keys(e)]
    .map(v => [Object.keys(e)[0], v]))
  .filter(v => v.length > 0)
  .reduce((acc, curr) => acc.concat(curr))

edges(buildG([[50, 51], [50, 52], [52, 53], [53, 54]]))
