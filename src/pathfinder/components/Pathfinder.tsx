import { useState, useEffect } from 'react'
import '../style/pathfinder.css'

function Pathfinder() {

    const [nodes, setNodes] = useState(Array)

    useEffect(() => {
        const nodesArr = []
        for (let row = 0; row < 15; row++){
            const currRow = []
            for (let col = 0; col < 35; col++){
                currRow.push([])
            }
            nodesArr.push(currRow)
        }
        setNodes(nodesArr)
        console.log(nodesArr)
    },[setNodes])

    const renderBoard = () => {
        console.log('rendering board')
        return nodes.map((row:any, rowIdx:Number) => {
            return <div className="nodeRow" id={`${rowIdx}`} key={`${rowIdx}`}>{row.map((col:any, colIdx:any) => {
                return <div className="node" id={`col${colIdx} row${rowIdx}`} key={`col${colIdx} row${rowIdx}`}></div>
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