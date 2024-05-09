import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import Header from './components/Header'
import Main from './components/Main'
import Context from './context/Context'

export default function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Context>
                    <Header />
                    <Main />
                </Context>
            </BrowserRouter>
        </div>
    )
}
