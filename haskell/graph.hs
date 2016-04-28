import Data.Array

-- | Abstract representation of vertices.
type Vertex = Int
-- | Table indexed by a contiguous set of vertices.
type Table a = Array Vertex a
-- | Adjacency list representation of a graph, mapping each vertex to its
-- list of successors.
type Graph = Table [Vertex]
-- | The bounds of a 'Table'.
type Bounds = (Vertex, Vertex)
-- | An edge from the first vertex to the second.
type Edge = (Vertex, Vertex)


-- | All vertices of a graph.
vertices :: Graph -> [Vertex]
vertices  = indices

-- | All edges of a graph.
edges :: Graph -> [Edge]
edges g = [ (v, w) | v <- vertices g, w <- g!v ]

-- to the right of |: indices t returns an array with integer indexes for the array. Each v is an integer index.
-- to the left of |: the function will return an array with tuples on the format (v, (f v (t!v)))
-- (f v (t!v)): the first argument v is ignored (see numEdges in outdegree) and the second argument (t!v) is the array item value in t corresponding
-- to integer index v.
mapTable :: (Vertex -> a -> b) -> Table a -> Table b
mapTable f t = array (bounds t) [ (,) v (f v (t!v)) | v <- indices t ]

-- | Build a graph from a list of edges.
buildG :: Bounds -> [Edge] -> Graph
buildG bounds0 edges0 = accumArray (flip (:)) [] bounds0 edges0

-- | The graph obtained by reversing all edges.
transposeG  :: Graph -> Graph
transposeG g = buildG (bounds g) (reverseE g)

reverseE :: Graph -> [Edge]
reverseE g   = [ (w, v) | (v, w) <- edges g ]

-- | A table of the count of edges from each node.
-- In the where clause a function numEdges is defined with the arguments _ ws.
-- mapTable is called with the numEdges function as an argument. Since mapTable is curried it will return a function expecting
-- the last argument which is a graph.
outdegree :: Graph -> Table Int
outdegree  = mapTable numEdges
             where numEdges _ ws = length ws

-- | A table of the count of edges into each node.
indegree :: Graph -> Table Int
indegree  = outdegree . transposeG


-- graph = buildG (50, 53) [(50, 51), (50, 52), (52, 53)]
graph = buildG (50, 54) [(50, 51), (50, 52), (50, 54), (52, 53)]
-- graph = buildG (50, 54) [(50, 51), (50, 52), (50, 54), (52, 53)]
