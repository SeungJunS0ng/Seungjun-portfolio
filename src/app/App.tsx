import styles from './App.module.css'
import { Link, Route,Routes } from 'react-router-dom'
import About from '../pages/About'
import Skills from '../pages/Skills'
import Projects from '../pages/Projects'
import Blog from '../pages/Blog'
import BlogPost from '../pages/BlogPost'

function App() {
  return (
    <div className={styles.app}>
      <header>
        <h1><li><Link to="/">SeungJun's Portfolio</Link></li></h1>

        <nav>
          <ul className={styles.menus}>
            <li><Link to="/">About</Link></li>
            <li><Link to="/skills">Skills</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/blog">Blog</Link></li>

          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>

    </div>
  )
}

export default App;