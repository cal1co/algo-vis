// 1. node 
// 2. find nodes neighbours
// 3. choose in clockwise, add neighbours to stack 
// 4. repeat 
// 5. if no neighbours, go down stack


/**
 * let unvisitedNodes ...
 * while(unvisitedNodes.length > 0){
 * let node = unvisitedNodes.shift()
 * if (node.finish){
 * return true} else {
 * unvisitedNodes.unshift(...node.children)
 * }
 * }
 */

export const depthFirstSearch = (nodes, start, finish) => {
    const visitedNodes = []
    const stack = []
    stack.push(start)
    console.log(stack)
    
    while (stack.length >  0){
        const node = stack.shift()
        // console.log("STACK:",stack)
        // console.log("NODE:", node)
        if(node === undefined){
            return visitedNodes
        }
        if (node.wall){
            continue;
        }
        // if (node.distance === Infinity){
        //     return visitedNodes
        // }
        if (node === undefined){
            return visitedNodes
        }
        node.visited = true;
        visitedNodes.push(node)
        if (node === finish){
            return visitedNodes
        }
        const neighbours = getUnvisitedNeighbours(node, nodes)
        // console.log(neighbours)
        let sortedNeighbours = sortNeighbours(neighbours)
        // stack.unshift(...sortedNeighbours)
        console.log(neighbours)
        stack.unshift(...neighbours)
        updateNeighbours(node, nodes)

    }
}

const sortNeighbours = (neighbours) => {
    const sorted = neighbours.sort((a, b) => {
        const difference = a.row - b.row 
        switch (difference) {
            case 0: 
                return b.column - a.column 
            default:
                return difference
        }
    })
    return sorted
}

 const updateNeighbours = (node, grid) => {
    const neighbours = getUnvisitedNeighbours(node, grid)
    for (const neighbour of neighbours){
        neighbour.prevNode = node
    }
}

const getUnvisitedNeighbours = (node, grid) => {
    const neighbours = []
    const { row, column } = node
    const checkUndefined = (neighbour) => {
        if (neighbour !== undefined){
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
