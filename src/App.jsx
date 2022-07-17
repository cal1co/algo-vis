import { useState, useEffect } from 'react'
import './App.css'
import Pathfinder from './pathfinder/components/Pathfinder'

// Colour reference: https://huemint.com/brand-intersection/#palette=e61c27-2ea3d4-f9fafa-f5b511
// #e61c27 + #2ea3d4 + #f5b511 + #287DEB

function App() {
  const [pathfinder, setPathfinder] = useState(true)
  const [sort, setSort] = useState(false)
  const [game, setGame] = useState(false)

  return (
    <div className="App">
      <div className="pathfinder" style={{display: pathfinder ? 'contents' : 'none'}}>
        <Pathfinder/>
      </div>
      <div className="sort" style={{display: sort ? 'contents' : 'none'}}>
        sort
      </div>
      <div className="game" style={{display: game ? 'contents' : 'none'}}>
        game
      </div>
    </div>
  )
}

export default App