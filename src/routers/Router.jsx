import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../components/pages/Home'
import About from '../components/pages/About'
import Statictics from '../components/pages/Statistics'
import Support from '../components/pages/Support'

export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/statistics' element={<Statictics />} />
            <Route path='/support' element={<Support />} />
        </Routes>
    )
}
