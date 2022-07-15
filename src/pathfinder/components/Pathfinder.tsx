import { useState, useEffect } from 'react'
import '../style/pathfinder.css'
import { dijkstra, findShortestPathNodes } from '../algorithms/dijkstra'

function Pathfinder() {

    const [nodes, setNodes] = useState(Array)
    const [start, setStart] = useState(Object)
    const [target, setTarget] = useState(Object)
    

    useEffect(() => {
        setStart({row:10, col:7})
        setTarget({row:10, col:27})
        initGrid()
    },[setNodes])

    const initGrid = () => {
        const nodesArr:Array<Object> = []
        for (let row = 0; row < 21; row++){
            const currRow = []
            for (let col = 0; col < 35; col++){
                const currNode = createNode(row, col)
                currRow.push(currNode)
            }
            nodesArr.push(currRow)
        }
        setNodes(nodesArr)
        // console.log(nodesArr)
    }
    const createNode = (row:Number, column:Number) => {
        return {
            row,
            column,
            startNode: row === start.row && column === start.col,
            finishNode: row === target.row && column === target.col,
            visited:false,
            prevNode:null,
            distance: Infinity,
            wall:false,
        }
    }

    const renderBoard = () => {
        // console.log('rendering board')
        return nodes.map((row:any, rowIdx:Number) => {
            return <div className="nodeRow" id={`${rowIdx}`} key={`${rowIdx}`}>{row.map((col:any, colIdx:any) => {
                return <div className={`node unvisited ${(colIdx === start.col) && (rowIdx === start.row) ? 'start' : (colIdx === target.col) && (rowIdx === target.row) ? 'target' : ''}`} id={`r${rowIdx}-c${colIdx}`} key={`col${colIdx} row${rowIdx}`}></div>
            })}</div>
                
        })
    }


    const animateNodesDijkstra = (visitedNodes:any, shortestPathNodes:any) => {
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
                document.getElementById(`r${node.row}-c${node.column}`)!.className = `node visited`
            }, 10 * i)
        }
    }

    const animateShortestPath = (shortestPathNodes:any) => {
        for (let i = 0; i < shortestPathNodes.length; i++){
            setTimeout(() => {
                const node = shortestPathNodes[i]
                document.getElementById(`r${node.row}-c${node.column}`)!.className = `node short-path`
            }, 50 * i)
        }
    }


    const showDijkstras = () => {
        console.log("DIJKSTRAS HERE")
        // console.log(nodes)
        const startIndex = nodes[start.row][start.col]
        const targetIndex = nodes[target.row][target.col]
        const visitedNodes = dijkstra(nodes, startIndex, targetIndex)
        const shortestPathNodes = findShortestPathNodes(targetIndex)
        animateNodesDijkstra(visitedNodes, shortestPathNodes)
    }

    return (
        <div className="pathfinder">
            <div className="pathfinder-nav">
                <button className="dijkstra" onClick={showDijkstras}>Dijkstras</button>
            </div>
            <div className="pathfind-board">
                {renderBoard()}
            </div>
        </div>
    )

}

export default Pathfinder