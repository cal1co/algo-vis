export const randomWalls = (nodes) => {
    
    const unvisitedNodes = fetchNodes(nodes)
    durstenfeldShuffle(unvisitedNodes)
    const randomNodes = []
    while (unvisitedNodes.length > 535){
        const node = unvisitedNodes.shift()
        if (node.startNode){
            continue
        }
        if (node.finishNode){
            continue
        }
        randomNodes.push(node)
    }
    console.log(randomNodes)
    return randomNodes
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

const durstenfeldShuffle = (nodes) => {
    for (let i = nodes.length -1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1))
        const temp = nodes[i]
        nodes[i] = nodes[j]
        nodes[j] = temp;
    }
}