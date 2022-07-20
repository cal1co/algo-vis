import { useState, useEffect } from 'react'
import './App.css'

import Pathfinder from './pathfinder/components/Pathfinder'
import Sort from './sort/components/Sort'

function App() {
  const [pathfinder, setPathfinder] = useState(true)
  const [sort, setSort] = useState(false)
  const [game, setGame] = useState(false)

  const switchToPathfinder = () => {
    setPathfinder(true)
    setSort(false)
  }

  const switchToSort = () => {
    setSort(true)
    setPathfinder(false)
  }

  return (
    <div className="App">
      <button onClick={switchToPathfinder}>Pathfind</button>
      <button onClick={switchToSort}>Sort</button>
      <div className="pathfinder" style={{display: pathfinder ? 'contents' : 'none'}}>
        <div className="vis-title">
          <p>Algo-Vis: Pathfinding Algorithm Visualiser</p> 
          </div>
        <Pathfinder/>
      </div>
      <div className="sort" style={{display: sort ? 'contents' : 'none'}}>
        <div className="vis-title">
            <p>Algo-Vis: Sorting Algorithm Visualiser</p> 
            </div>
          <Sort/>
        </div>
      <div className="game" style={{display: game ? 'contents' : 'none'}}>
        game
      </div>
    </div>
  )
}

export default App