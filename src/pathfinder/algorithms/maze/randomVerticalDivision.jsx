export const randomVerticalDivision = (nodes) => {
    const unvisitedNodes = fetchNodes(nodes)

    const cutWalls = []
    for (let i = 0; i < unvisitedNodes.length; i++){
        const currNode = unvisitedNodes[i]
        if (currNode.column % 2 === 1){
            cutWalls.push(currNode)
        }
    }
    sortWallsCol(cutWalls)
    const wallGaps = []
    for (let i = 0; i < (cutWalls.length / nodes.length); i++ ){
        const num = Math.floor(Math.random() * (nodes.length - 1)) + 1
        const idx = (num + (i * nodes.length) - 1)
        wallGaps.push(cutWalls[idx])
    }
    wallGaps.forEach((gap) => {
        const idx = cutWalls.indexOf(gap)
        cutWalls.splice(idx, 1)
    })
    return cutWalls
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
const sortWallsCol = (cols) => {
    cols.sort((a, b) => a.column - b.column)
}