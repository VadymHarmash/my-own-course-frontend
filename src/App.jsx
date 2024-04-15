import { BrowserRouter } from 'react-router-dom'
import './App.scss'
import Header from './components/Header'
import Main from './components/Main'

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Main />
      </BrowserRouter>
    </div>
  )
}