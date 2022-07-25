import { useState, useEffect } from 'react'
import '../style/pathfinder.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

import { dijkstra, findShortestPathNodes } from '../algorithms/pathfinding/dijkstra'
import { astar } from '../algorithms/pathfinding/a-star'
import { depthFirstSearch } from '../algorithms/pathfinding/depthFirstSearch'
import { breadthFirstSearch } from '../algorithms/pathfinding/breadthFirstSearch'

import { kruskals } from '../algorithms/maze/kruskals'
import { randomVerticalDivision } from '../algorithms/maze/randomVerticalDivision'
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
    const [showStats, setShowStats] = useState(false)
    const [stepLength, setStepLength] = useState(0)
    const [pathLength, setPathLength] = useState(0)
    const [algoName, setAlgoName] = useState('')
    const [showPathfind, setShowPathfind] = useState(0)
    const [showWallDrop, setShowWallDrop] = useState(0)
    const [clearing, setClearing] = useState(false)
    const [animate, setAnimate] = useState(false)
    const [timeouts, setTimeouts] = useState([])

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
        setStepLength(0)
        setPathLength(0)
        for (let i = 0; i <= visitedNodes.length; i++){
            if (i === visitedNodes.length){
                const pathTimer = setTimeout(() => {
                    animateShortestPath(shortestPathNodes, visitedNodes)
                }, 10 * i)
                timeouts.push(pathTimer)
                return 
            }
            const nodeAnimate = setTimeout(() => {
                const node = visitedNodes[i];
                const nodeHTMLElem = document.getElementById(`r${node.row}-c${node.column}`)
                nodeHTMLElem.className = `node visited`
                if (node.startNode){
                    nodeHTMLElem.className = `node start`
                }
                setStepLength(i)
            }, 10 * i)  
            timeouts.push(nodeAnimate)
        }
    }
    const animateShortestPath = (shortestPathNodes, visitedNodes) => {
        for (let i = 0; i < shortestPathNodes.length; i++){
            const pathAnimate = setTimeout(() => {
                const node = shortestPathNodes[i]
                document.getElementById(`r${node.row}-c${node.column}`).className = `node short-path`
                setPathLength(i)
                if (i === shortestPathNodes.length - 1){
                    console.log("SEARCHED NODES: ", visitedNodes.length, "PATH LENGTH: ", shortestPathNodes.length)
                }
            }, 30 * i)
            timeouts.push(pathAnimate)
        }
    }

    // Pathfinding
    const showDijkstras = () => {
        console.log("DIJKSTRAS HERE")
        setShowStats(true)
        setAlgoName("Dijkstra's Algorithm")
        const startNode = nodes[start.row][start.col]
        const targetNode = nodes[target.row][target.col]
        const visitedNodes = dijkstra(nodes, startNode, targetNode)
        const shortestPathNodes = findShortestPathNodes(targetNode)
        animateNodes(visitedNodes, shortestPathNodes)
        setShowPathfind(false)
    }
    const showAStar = () => {
        console.log("A* HERE")
        setShowStats(true)
        setAlgoName("A*")
        const startNode = nodes[start.row][start.col]
        const targetNode = nodes[target.row][target.col]
        const visitedNodes = astar(nodes, startNode, targetNode)
        const shortestPathNodes = findShortestPathNodes(targetNode)
        animateNodes(visitedNodes, shortestPathNodes)
        setShowPathfind(false)
    }
    const showBFS = () => {
        console.log("BFS HERE")
        setShowStats(true)
        setAlgoName("Breadth First Search (BFS)")
        const startNode = nodes[start.row][start.col]
        const targetNode = nodes[target.row][target.col]
        const visitedNodes = breadthFirstSearch(nodes, startNode, targetNode)
        const shortedPathNodes = findShortestPathNodes(targetNode)
        animateNodes(visitedNodes, shortedPathNodes)
        setShowPathfind(false)
    }
    const showDFS = () => {
        console.log('DFS HERE')
        setShowStats(true)
        setAlgoName("Depth First Search (DFS)")
        const startNode = nodes[start.row][start.col]
        const targetNode = nodes[target.row][target.col]
        const visitedNodes = depthFirstSearch(nodes, startNode, targetNode)
        const shortestPathNodes = findShortestPathNodes(targetNode)
        animateNodes(visitedNodes, shortestPathNodes)
        setShowPathfind(false)
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
        const wallPath = kruskals(nodes)
        animateWalls(wallPath)
        setShowWallDrop(false)
    }
    const showRandomVerticalDivision = () => {
        const randomPath = randomVerticalDivision(nodes)
        animateWalls(randomPath)
        setShowWallDrop(false)
    }
    const showRandom = () => {
        const randomPath = randomWalls(nodes)
        animateWalls(randomPath)
        setShowWallDrop(false)
    }

    // Clear
    const clearBoard = () => {
        while (timeouts.length){
            window.clearTimeout(timeouts.shift())
        }
        initGrid()
        setShowStats(false)
        clearTimeout(animate)
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
        while (timeouts.length){
            window.clearTimeout(timeouts.shift())
        }
        setShowStats(false)
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
            <div className="vis-title">
                <h1 className="algo-type">Algo-Vis: Pathfinding Algorithm Visualiser</h1> 
            </div>
            <div className="pathfinder-nav">
                <div className="pathfind-dropdown">
                    <div className="pathfind-btn algo-gen" onClick={ () => setShowPathfind((showPathfind * -1) + 1)} style={{}}> Algorithms <FontAwesomeIcon icon={faAngleDown}/></div>  {/** 0 is false and 1 is true. 0 * -1 is 0 + 1 = 1. 1 * -1 is -1 + 1 = 0 */}
                    <div className="pathfind-content" style={{display: showPathfind ? 'contents' : 'none'}}>
                        <div className="dijkstra algo-gen" onClick={showDijkstras}>Dijkstras</div>
                        <div className="A* algo-gen" onClick={showAStar}>A*</div>
                        <div className="BFS algo-gen" onClick={showBFS}>BFS</div>
                        <div className="DFS algo-gen" onClick={showDFS}>DFS</div>
                    </div>
                </div>
                <div className="pathfind-dropbown">
                    <div className="pathfind-btn wall-gen" onClick={() => setShowWallDrop((showWallDrop * -1) + 1)}>
                        Wall Generation <FontAwesomeIcon icon={faAngleDown}/>
                    </div> 
                    <div className="pathfind-content" style={{display: showWallDrop ? 'contents' : 'none'}}>
                        <div className="Kruskals wall-gen" onClick={showKruskals}>Kruskals</div>
                        <div className="RandomVerticalDivision wall-gen" onClick={showRandomVerticalDivision}>Random Vertical Division</div>
                        <div className="Random wall-gen" onClick={showRandom}>Random</div>
                    </div>

                </div>
                <div className="pathfind-btn clear-all" onClick={clearBoard}>Clear All</div>
                <div className="pathfind-btn clear-solution" onClick={clearSolution}>Clear Solution</div>
            </div>
            <div className="pathfind-board" onMouseLeave={() => setDragging(false)}>
                <div className="algo-prompt algo-stats" style={{display: showStats ? 'none' : 'flex'}}><p>Select an algorithm</p></div>
                <div className="algo-stats" style={{display: showStats ? 'flex' : 'none'}}> {algoName} searched <p className="step-stat">{stepLength}</p> nodes and drew a shortest path with length <p className="step-stat">{pathLength}</p></div>
                {renderBoard()}
            </div>
        </div>
    )

}

export default Pathfinder