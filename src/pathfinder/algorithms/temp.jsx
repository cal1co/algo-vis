
export const astar = (nodes, start, finish) => { 
    const visitedNodes = []
    start.distance = 0

    // Select the node with the lowest f score (current steps made + distance to target relative)

    let gDistance // steps made
    
    const [...unvisitedNodes] = nodes
    console.log("UNVISITED NODES", unvisitedNodes)
    // const nextNode = findNext(nodes, unvisitedNodes, start, finish)
    while (unvisitedNodes.length > 0){
        const nextNode = findNext(nodes, unvisitedNodes, start, finish) // ! 
        // const nextNode = unvisitedNodes.shift()
        console.log(nextNode)
        console.log(unvisitedNodes.length)
        if (nextNode?.wall){
            continue;
        };
        if (nextNode.distance === Infinity){
            return visitedNodes
        }
        nextNode.visited = true
        visitedNodes.push(nextNode)
        if (nextNode === finish){
            return visitedNodes
        }
        console.log("YO")
        updateUnvisitedNeighbours(nextNode, nodes, finish)
    }
}

const findNext = (nodes, unvisitedNodes, node, finish) => {
    unvisitedNodes.forEach((e, i) => {
        const h = hDist(e, finish)
        e.hDistance = h
    })
    const checkNeighbour = (neighbourNode) => {
        if (!neighbourNode.wall){
            neighbours.push(neighbourNode)
        } 
    }
    let neighbours = []
    const { row, column } = node
    if (row > 0){
        const neighbourNode = nodes[row - 1][column]
        checkNeighbour(neighbourNode)
    }
    if (row < nodes.length - 1){
        const neighbourNode = nodes[row + 1][column]
        checkNeighbour(neighbourNode)
    }
    if (column > 0) {
        const neighbourNode = nodes[row][column - 1]
        checkNeighbour(neighbourNode)
    }
    if (column < nodes[0].length - 1){
        const neighbourNode = nodes[row][column + 1]
        checkNeighbour(neighbourNode)
    }
    
    
    // console.log(unvisitedNodes)
    // return currClosest
    neighbours.sort((a, b) => a.hDistance - b.hDistance)
    return neighbours[0]

}

const updateUnvisitedNeighbours = (node, grid, finish) => {
    // console.log("UNVISITED N CALLED")
    const unvisitedNeighbours = getUnvisitedNeighbours(node, grid)
    for (const neighbour of unvisitedNeighbours){
        neighbour.distance = node.distance + 1
        neighbour.prevNode = node
        neighbour.hDistance = hDist(neighbour, finish) 
    }
}// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const hDist = (currNode, finish) => {
    const x = Math.abs(currNode.row - finish.row)
    const y = Math.abs(currNode.column - finish.column)
    // console.log("HDIST", x + y)
    return x + y
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

