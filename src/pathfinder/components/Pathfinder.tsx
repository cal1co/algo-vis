import { useState, useEffect } from 'react'
import '../style/pathfinder.css'

function Pathfinder() {

    const [nodes, setNodes] = useState(Array)
    const [start, setStart] = useState(Object)
    const [target, setTarget] = useState(Object)

    useEffect(() => {
        const nodesArr = []
        for (let row = 0; row < 21; row++){
            const currRow = []
            for (let col = 0; col < 35; col++){
                currRow.push([])
            }
            nodesArr.push(currRow)
        }
        setNodes(nodesArr)
        console.log(nodesArr)
        setStart({row:10, col:7})
        setTarget({row:10, col:27})
    },[setNodes])

    const renderBoard = () => {
        console.log('rendering board')
        return nodes.map((row:any, rowIdx:Number) => {
            return <div className="nodeRow" id={`${rowIdx}`} key={`${rowIdx}`}>{row.map((col:any, colIdx:any) => {
                return <div className={`node unvisited ${(colIdx === start.col) && (rowIdx === start.row) ? 'start' : (colIdx === target.col) && (rowIdx === target.row) ? 'target' : ''}`} id={`r${rowIdx}-c${colIdx}`} key={`col${colIdx} row${rowIdx}`}></div>
            })}</div>
                
        })
    }

    return (
        <div className="pathfinder">
            <div className="pathfind-board">
                {renderBoard()}
            </div>
        </div>
    )

}

export default Pathfinder