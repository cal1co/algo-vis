export const dijkstra = (nodes:any, start:any, finish:any) => {
    const visitedNodes:any = []
    start.distance = 0
    const unvisitedNodes = fetchNodes(nodes)
    while (unvisitedNodes.length > 0){
        sortNodesDist(unvisitedNodes)
        const nextNode = unvisitedNodes.shift()
        console.log(nextNode)
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
        updateUnvisitedNeighbours(nextNode, nodes)
    }
}

const fetchNodes = (grid:any) => {
    const nodes:Array<any> = []
    for (const row of grid){
        for (const node of row){
            nodes.push(node)
        }
    }
    return nodes
}

const sortNodesDist = (unvisitedNodes:Array<any>) => {
    unvisitedNodes.sort((a, b) => a.distance - b.distance)
}

const updateUnvisitedNeighbours = (node:any, grid:any) => {
    const unvisitedNeighbours = getUnvisitedNeighbours(node, grid)
    for (const neighbour of unvisitedNeighbours){
        neighbour.distance = node.distance + 1
        neighbour.prevNode = node
    }
}

const getUnvisitedNeighbours = (node:any, grid:any) => {
    const neighbours:any = []
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
    return neighbours.filter((a:any) => !a.visited)
}



export const findShortestPathNodes = (target:any) => {
    const shortestPathNodes:any = []
    let currNode = target
    // console.log("CURRNODE", currNode)
    // console.log("SHORT", shortestPathNodes)
    while (currNode !== null){
        shortestPathNodes.unshift(currNode)
        // console.log("CURRNODE AGAIN!", currNode)

        currNode = currNode.prevNode
    }
    return shortestPathNodes
}