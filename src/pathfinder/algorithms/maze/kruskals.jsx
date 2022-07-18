export const kruskals = (nodes) => {
    const wallNodes = []
    const unvisitedNodes = fetchNodes(nodes)
    const blankNodes = []
    const sets = []
    durstenfeldShuffle(unvisitedNodes)
    for (let i = 0; i < unvisitedNodes.length; i++){
        const currNode = unvisitedNodes[i]
        if (currNode.row % 2 === 1 || currNode.column % 2 === 1){
            wallNodes.push(currNode)
        } else {
            const newSet = new Set()
            sets.push(newSet.add(currNode))
            blankNodes.push(currNode)
        }
    }
    while (sets.length > 1){
        const node = blankNodes.shift() 
        const edge = getRandomNeighbour(node, nodes)
        let nodeSet;
        let edgeIdx;
        let edgeSet; 
        sets.forEach((set, idx) => {
            if (set.has(node)){
                nodeSet = set
            }
            if (set.has(edge[1])){
                edgeIdx = idx
                edgeSet = set
            }
        })
        if (!nodeSet.has(edge[1])){
            if (edgeSet.size > 1){
                edgeSet.forEach((e) => {
                    nodeSet.add(e)
                })
            } else {
                nodeSet.add(...edgeSet)
            }
            sets.splice(edgeIdx, 1)
            const wallIdx = wallNodes.indexOf(edge[0])
            wallNodes.splice(wallIdx, 1)
        }
        blankNodes.push(node)
    }
    return wallNodes
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
// Durstenfeld in-place version of fisher-yates shuffle
const durstenfeldShuffle = (nodes) => {
    for (let i = nodes.length -1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1))
        const temp = nodes[i]
        nodes[i] = nodes[j]
        nodes[j] = temp;
    }
}

const getRandomNeighbour = (node, grid) => {
    const choice = Math.floor(Math.random() * 4)
    const { row, column } = node
    let neighbours = []
    switch (choice) {
        case 0: 
            if (row > 1){
                neighbours.push(grid[row - 1][column])
                neighbours.push(grid[row - 2][column])
            }
            break;
        case 1:
            if (row < grid.length - 2){
                neighbours.push(grid[row + 1][column])
                neighbours.push(grid[row + 2][column])
            }
            break;
        case 2:
            if (column > 1) {
                neighbours.push(grid[row][column - 1])
                neighbours.push(grid[row][column - 2])
            }
            break;
        case 3:
            if (column < grid[0].length - 2){
                neighbours.push(grid[row][column + 1])
                neighbours.push(grid[row][column + 2])
            }
            break;
    }
    if (neighbours == undefined || neighbours.length < 2){
        neighbours = getRandomNeighbour(node, grid)
    } 
    return neighbours
}
