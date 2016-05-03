export const indices = g => g.reduce((acc, v) => acc.concat(...Object.keys(v)), [])

export const accumArray = edges0 => {
  // Each key value in {} corresponds to a tuple
  const edges = edges0.reduce((acc, edge) => {
    if (!acc.hasOwnProperty(edge[0])) {
      acc[edge[0]] = [edge[1]]
    } else {
      acc[edge[0]] = acc[edge[0]].concat([edge[1]])
    }
    acc[edge[1]] = []

    return acc
  }, {})

  return Object.keys(edges).map(key => ({[key]: edges[key]}))
}

export const head = a => a[0]
