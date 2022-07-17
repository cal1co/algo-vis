export const astar = (nodes, start, finish) => {
    const visitedNodes = []
    start.distance = 0
    console.log("START", start)
    const unvisitedNodes = fetchNodes(nodes)
    
    unvisitedNodes.forEach(node => {
        node.hDistance = hDist(node, finish)
    })
    console.log(unvisitedNodes)
    sortNodesDist(unvisitedNodes)
    while (unvisitedNodes.length > 0){
        sortNodesFScore(unvisitedNodes)
        console.log(unvisitedNodes)
        const node = unvisitedNodes.shift()
        console.log(node)
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
    // console.log(unvisitedNodes)
}

const sortNodesFScore = (unvisitedNodes) => {
    unvisitedNodes.sort((a, b) => a.fScore - b.fScore)
    unvisitedNodes.forEach((e) => {
        if (e.fScore === 20){
            console.log(unvisitedNodes.indexOf(e))
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


export const findShortestPathNodes = (target) => {
    const shortestPathNodes = []
    let currNode = target
    while (currNode !== null){
        shortestPathNodes.unshift(currNode)
        currNode = currNode.prevNode
    }
    return shortestPathNodes
}