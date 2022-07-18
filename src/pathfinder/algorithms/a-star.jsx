export const astar = (nodes, start, finish) => {
    const visitedNodes = []
    start.distance = 0
    const unvisitedNodes = fetchNodes(nodes)
    
    unvisitedNodes.forEach(node => {
        node.hDistance = hDist(node, finish)
    })
    sortNodesDist(unvisitedNodes)
    while (stack.length > 0){
        sortNodesFScore(unvisitedNodes)
        // console.log(unvisitedNodes)
        const node = unvisitedNodes.shift()
        if (node.wall){
            continue;
        }
        if (node.distance === Infinity){
            return visitedNodes
        }
        node.visited = true;
        visitedNodes.push(node)
        if (node === finish){
            return visitedNodes
        }
        updateNeighbours(node, nodes)
    }
}

const fetchNodes = (grid) => {
    const nodes = []
    for (const row of grid){
        for (const node of row){
            nodes.push(node)
        }
    }
    return nodes
}

const sortNodesDist = (unvisitedNodes) => {
    unvisitedNodes.sort((a, b) => a.distance - b.distance)
}

const sortNodesFScore = (unvisitedNodes) => {
    unvisitedNodes.sort((a, b) => {
        const difference = a.fScore - b.fScore 
        switch (difference) {
            case 0: 
                return a.hDistance - b.hDistance
            default:
                return difference
        }
    })
}

const hDist = (currNode, finish) => {
    const x = Math.abs(currNode.row - finish.row)
    const y = Math.abs(currNode.column - finish.column)
    return x + y
}

const updateNeighbours = (node, grid) => {
    const neighbours = getUnvisitedNeighbours(node, grid)
    for (const neighbour of neighbours){
        neighbour.distance = node.distance + 1
        neighbour.prevNode = node
        neighbour.fScore = neighbour.distance + neighbour.hDistance
    }
}

const getUnvisitedNeighbours = (node, grid) => {
    const neighbours = []
    const { row, column } = node
    if (row > 0){
        neighbours.push(grid[row - 1][column])
    }
    if (row < grid.length - 1){
        neighbours.push(grid[row + 1][column])
    }
    if (column > 0) {
        neighbours.push(grid[row][column - 1])
    }
    if (column < grid[0].length - 1){
        neighbours.push(grid[row][column + 1])
    }
    return neighbours.filter((a) => !a.visited)
}
