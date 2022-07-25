import { useState } from 'react'
import './App.css'

import Pathfinder from './pathfinder/components/Pathfinder'
import Sort from './sort/components/Sort'
import { HashRouter as Router, Link } from 'react-router-dom'
import Routers from './routes'

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
      <Router>
        <div className="route-links">
          <Link to='/'>Pathfind</Link>
          <Link to='/sort'>Sort</Link>
        </div>
        
        <Routers/>
      </Router>
    </div>
  )
}

export default App