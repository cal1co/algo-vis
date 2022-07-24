import { useState } from 'react'
import './App.css'

import Pathfinder from './pathfinder/components/Pathfinder'
import Sort from './sort/components/Sort'
import { HashRouter as Router, Link, useLocation} from 'react-router-dom'
import Routers from './routes'

function App() {
  const [pathfinder, setPathfinder] = useState(true)
  const [sort, setSort] = useState(false)
  const [game, setGame] = useState(false)
  // const location = useLocation()
  console.log(location)
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
        
        <Link to='/'>Pathfind</Link>
        <Link to='/sort'>Sort</Link>
        
        <Routers/>
      </Router>
    </div>
  )
}

export default App