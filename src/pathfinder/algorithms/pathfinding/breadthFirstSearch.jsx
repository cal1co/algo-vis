export const breadthFirstSearch = (nodes, start, finish) => {
    const visitedNodes = []
    const stack = []
    stack.push(start)
    while (stack.length >  0){
        const node = stack.shift()
        if(node === undefined){
            return visitedNodes
        }
        if (node.wall){
            continue;
        }
        if (node === undefined){
            return visitedNodes
        }
        if (node.visited){
            continue
        }
        node.visited = true;
        visitedNodes.push(node)
        if (node === finish){
            return visitedNodes
        }
        const neighbours = getUnvisitedNeighbours(node, nodes)
        stack.push(...neighbours)
        updateNeighbours(node, nodes, neighbours)
    }
}

 const updateNeighbours = (node, nodes, neighbours) => {
    for (const neighbour of neighbours){
        neighbour.prevNode = node
    }
}

const getUnvisitedNeighbours = (node, grid) => {
    const neighbours = []
    const { row, column } = node
    const checkUndefined = (neighbour) => {
        if (neighbour !== undefined && neighbour.visited === false){
            neighbours.push(neighbour)
        }
    }
    if (row > 0){
        const neighbour = grid[row - 1][column]
        checkUndefined(neighbour)
    }
    if (column < grid[0].length - 1){
        const neighbour = grid[row][column + 1]
        checkUndefined(neighbour)
    }
    if (row < grid.length - 1){
        const neighbour = grid[row + 1][column]
        checkUndefined(neighbour)
    }
    if (column > 0) {
        const neighbour = grid[row][column - 1]
        checkUndefined(neighbour)
    }
    // console.log(neighbours)
    return neighbours.filter((a) => !a.visited)
}

