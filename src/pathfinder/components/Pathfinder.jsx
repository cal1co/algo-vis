import { useState, useEffect } from 'react'
import '../style/pathfinder.css'
import { dijkstra, findShortestPathNodes } from '../algorithms/dijkstra'
import { astar } from '../algorithms/a-star'
import { depthFirstSearch } from '../algorithms/depthFirstSearch'


function Pathfinder() {

    const [nodes, setNodes] = useState(Array)
    const [start, setStart] = useState({
        row:10,
        col:7
    })
    const [target, setTarget] = useState({
        row:10,
        col:27
    })
    const [rowLength, setRowLength] = useState(21)
    const [colLength, setColLength] = useState(35)
    const [dragging, setDragging] = useState(false)

    useEffect(() => {
        setStart({row:10, col:7})
        setTarget({row:10, col:27})
        initGrid()
    },[setNodes])

    const initGrid = () => {
        const nodesArr = []
        for (let row = 0; row < rowLength; row++){
            const currRow = []
            for (let col = 0; col < colLength; col++){
                const currNode = createNode(row, col)
                currRow.push(currNode)
            }
            nodesArr.push(currRow)
        }
        setNodes(nodesArr)
        return nodesArr
        // console.log(nodesArr)
    }
    const createNode = (row, column) => {
        return {
            row,
            column,
            startNode: row === start.row && column === start.col,
            finishNode: row === target.row && column === target.col,
            visited:false,
            prevNode:null,
            distance: Infinity,
            hDistance:null,
            fScore:Infinity,
            wall:false,
        }
    }
    const renderBoard = (inputNodes=nodes) => {
        console.log('rendering board', inputNodes === nodes)
        return inputNodes.map((row, rowIdx) => {
            return <div className="nodeRow" id={`${rowIdx}`} key={`${rowIdx}`}>{row.map((col, colIdx) => {
                return <div onMouseDown={() => drawWall(rowIdx, colIdx)} onMouseOver={(() => drawWallDrag(rowIdx, colIdx))} onMouseUp={() => stopWallDraw()}
                    className={
                        `node unvisited
                         ${(colIdx === start.col) && (rowIdx === start.row) ? 'start' 
                         : (colIdx === target.col) && (rowIdx === target.row) ? 'target' : ''}`
                        } 
                        id={`r${rowIdx}-c${colIdx}`} key={`col${colIdx} row${rowIdx}`}></div>
            })}</div>
        })
    }
    const drawWall = (row, col) => {
        // console.log("WALL BUILT ON", row, col)
        const node = document.getElementById(`r${row}-c${col}`)
        const [...nodeClassArr] = node.classList
        if (!(nodeClassArr.includes("start") || nodeClassArr.includes("target"))){
            if (nodeClassArr.includes("wall")){
                node.className = `node unvisited`
                nodes[row][col].wall = false
            } else {
                node.className = `node unvisited wall`
                nodes[row][col].wall = true
            }
        }
        if (!dragging){
            setDragging(true)
        }
    }

    const drawWallDrag = (row, col) => {
        if (dragging){
            drawWall(row, col)
        }
    }
    const stopWallDraw = () => {
        setDragging(false)
    }

    const animateNodes = (visitedNodes, shortestPathNodes) => {
        for (let i = 0; i <= visitedNodes.length; i++){
            if (i === visitedNodes.length){
                setTimeout(() => {
                    animateShortestPath(shortestPathNodes)
                }, 10 * i)
                return 
            }
            setTimeout(() => {
                const node = visitedNodes[i];
                // console.log(node.row, node.column)
                document.getElementById(`r${node.row}-c${node.column}`).className = `node visited`
            }, 10 * i)
        }
    }

    const animateShortestPath = (shortestPathNodes) => {
        for (let i = 0; i < shortestPathNodes.length; i++){
            setTimeout(() => {
                const node = shortestPathNodes[i]
                document.getElementById(`r${node.row}-c${node.column}`).className = `node short-path`
            }, 30 * i)
        }
    }

    const showDijkstras = () => {
        console.log("DIJKSTRAS HERE")
        const startNode = nodes[start.row][start.col]
        const targetNode = nodes[target.row][target.col]
        const visitedNodes = dijkstra(nodes, startNode, targetNode)
        const shortestPathNodes = findShortestPathNodes(targetNode)
        animateNodes(visitedNodes, shortestPathNodes)
    }
    const showAStar = () => {
        console.log("A* HERE")
        const startNode = nodes[start.row][start.col]
        const targetNode = nodes[target.row][target.col]
        const visitedNodes = astar(nodes, startNode, targetNode)
        const shortestPathNodes = findShortestPathNodes(targetNode)
        animateNodes(visitedNodes, shortestPathNodes)
    }

    const showDFS = () => {
        console.log('DFS HERE')
        const startNode = nodes[start.row][start.col]
        const targetNode = nodes[target.row][target.col]
        const visitedNodes = depthFirstSearch(nodes, startNode, targetNode)
        const shortestPathNodes = findShortestPathNodes(targetNode)
        animateNodes(visitedNodes, shortestPathNodes)
    }

    const clearBoard = () => {
        initGrid()
        for (let row = 0; row < rowLength; row++){
            for (let column = 0; column < colLength; column++){
                if (row === start.row && column == start.col){
                    document.getElementById(`r${row}-c${column}`).className = `node start unvisited`
                    continue;
                }
                if (row === target.row && column == target.col){
                    document.getElementById(`r${row}-c${column}`).className = `node target unvisited`
                    continue;
                }
                document.getElementById(`r${row}-c${column}`).className = `node unvisited`
            }
        }
    }

    return (
        <div className="pathfinder">
            <div className="pathfinder-nav">
                <button className="dijkstra" onClick={showDijkstras}>Dijkstras</button>
                <button className="dijkstra" onClick={showAStar}>A*</button>
                <button className="dijkstra" onClick={showDFS}>DFS</button>
                <button onClick={clearBoard}>Clear</button>
            </div>
            <div className="pathfind-board">
                {renderBoard()}
            </div>
        </div>
    )

}

export default Pathfinder