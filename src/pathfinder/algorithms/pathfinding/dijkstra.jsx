export const dijkstra = (nodes, start, finish) => {
    const visitedNodes = []
    start.distance = 0
    const unvisitedNodes = fetchNodes(nodes)
    while (unvisitedNodes.length > 0){
        sortNodesDist(unvisitedNodes)
        const nextNode = unvisitedNodes.shift()
        if (nextNode?.wall){
            continue;
        }
        if (nextNode.distance === Infinity){
            return visitedNodes
        }
        nextNode.visited = true
        visitedNodes.push(nextNode)
        if (nextNode === finish){
            return visitedNodes
        }
        updateUnvisitedNeighbours(nextNode, nodes)
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

const updateUnvisitedNeighbours = (node, grid) => {
    const unvisitedNeighbours = getUnvisitedNeighbours(node, grid)
    for (const neighbour of unvisitedNeighbours){
        neighbour.distance = node.distance + 1
        neighbour.prevNode = node
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

export const findShortestPathNodes = (target) => {
    const shortestPathNodes = []
    let currNode = target
    while (currNode !== null){
        shortestPathNodes.unshift(currNode)
        currNode = currNode.prevNode
    }
    return shortestPathNodes
}