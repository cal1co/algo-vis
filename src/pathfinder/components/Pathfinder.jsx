import { useState, useEffect } from 'react'
import '../style/pathfinder.css'

import { dijkstra, findShortestPathNodes } from '../algorithms/pathfinding/dijkstra'
import { astar } from '../algorithms/pathfinding/a-star'
import { depthFirstSearch } from '../algorithms/pathfinding/depthFirstSearch'
import { breadthFirstSearch } from '../algorithms/pathfinding/breadthFirstSearch'

import { kruskals } from '../algorithms/maze/kruskals'
import { randomWalls } from '../algorithms/maze/randomWalls'

function Pathfinder() {

    const [nodes, setNodes] = useState(Array)
    const [start, setStart] = useState({
        row:10,
        col:6
    })
    const [target, setTarget] = useState({
        row:10,
        col:28
    })
    const [rowLength, setRowLength] = useState(21)
    const [colLength, setColLength] = useState(35)
    const [dragging, setDragging] = useState(false)

    useEffect(() => {
        setStart({row:10, col:6})
        setTarget({row:10, col:28})
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
        // console.log('rendering board', inputNodes === nodes)
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
                const nodeHTMLElem = document.getElementById(`r${node.row}-c${node.column}`)
                nodeHTMLElem.className = `node visited`
                if (node.startNode){
                    console.log(node)
                    console.log("THIS IS START")
                    nodeHTMLElem.className = `node start`
                }

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

    // Pathfinding
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
        console.log(visitedNodes)
        const shortestPathNodes = findShortestPathNodes(targetNode)
        animateNodes(visitedNodes, shortestPathNodes)
    }
    const showBFS = () => {
        console.log("BFS HERE")
        const startNode = nodes[start.row][start.col]
        const targetNode = nodes[target.row][target.col]
        const visitedNodes = breadthFirstSearch(nodes, startNode, targetNode)
        const shortedPathNodes = findShortestPathNodes(targetNode)
        animateNodes(visitedNodes, shortedPathNodes)
    }
    const showDFS = () => {
        console.log('DFS HERE')
        const startNode = nodes[start.row][start.col]
        const targetNode = nodes[target.row][target.col]
        const visitedNodes = depthFirstSearch(nodes, startNode, targetNode)
        const shortestPathNodes = findShortestPathNodes(targetNode)
        animateNodes(visitedNodes, shortestPathNodes)
    }

    // Walls
    const animateWalls = (visitedNodes) => {
        for (let i = 0; i < visitedNodes.length; i++){
            setTimeout(() => {
                const node = visitedNodes[i];
                nodes[node.row][node.column].wall = true
                document.getElementById(`r${node.row}-c${node.column}`).className = `node unvisited wall`
            }, 4 * i)
        }
    }
    const showKruskals = () => {
        // clearBoard()
        const wallPath = kruskals(nodes)
        animateWalls(wallPath)
    }
    const showRandom = () => {
        const randomPath = randomWalls(nodes)
        animateWalls(randomPath)
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
    const clearSolution = () => {
        nodes.forEach((nodeRow) => {
            nodeRow.forEach((node) => {
                node.visited = false
                node.prevNode = null
                node.distance = Infinity
                node.hDistance = null
                node.fScore = Infinity
                const currNode = document.getElementById(`r${node.row}-c${node.column}`)
                currNode.className = `node unvisited`
                if (node.finishNode){
                    currNode.className = `node unvisited target`
                }
                if (node.startNode){
                    currNode.className = `node unvisited start`
                }
                if (node.wall){
                    currNode.className = `node unvisited wall`
                }

            })
        })
    }

    return (
        <div className="pathfinder">
            <div className="pathfinder-nav">
                <button className="dijkstra" onClick={showDijkstras}>Dijkstras</button>
                <button className="A*" onClick={showAStar}>A*</button>
                <button className="BFS" onClick={showBFS}>BFS</button>
                <button className="DFS" onClick={showDFS}>DFS</button>
                <button onClick={clearBoard}>Clear</button>
                <button onClick={clearSolution}>Clear Solution</button>
                <button className="Kruskals" onClick={showKruskals}>Kruskals</button>
                <button className="Random" onClick={showRandom}>Random</button>

            </div>
            <div className="pathfind-board">
                {renderBoard()}
            </div>
        </div>
    )

}

export default Pathfinder