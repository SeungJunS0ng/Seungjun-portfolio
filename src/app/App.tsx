import styles from './App.module.css'
import { Route,Routes } from 'react-router-dom'
import About from '../pages/About'

function App() {
  return (
    <div className={styles.app}>
      <header>
        <h1>SeungJun's Portfolio</h1>
      </header>

      <Routes>
        <Route path="/" element={<About />} />
      </Routes>

    </div>
  )
}

export default App;