import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Sort from './sort/components/Sort'
import Pathfinder from './pathfinder/components/Pathfinder'

function Routers() {
    return (
        <Routes>
            <Route path='/' element={<Pathfinder />} />
            <Route path='/sort' element={<Sort/>} />
        </Routes>
    )
}

export default Routers