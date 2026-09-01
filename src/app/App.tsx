import styles from './App.module.css'
import { Link, Route,Routes } from 'react-router-dom'
import About from '../pages/About'
import Skills from '../pages/Skills'
import Projects from '../pages/Projects'
import Blog from '../pages/Blog'
import BlogPost from '../pages/BlogPost'
import Login from '../pages/Login'
import MyPage from '../pages/MyPage'
import AuthListener from './AuthListener'
import ProtectedRoute from '../shared/ui/ProtectedRoute'
import { useAppSelector } from './hooks'
import { supabase } from '../shared/api/supabase'

function App() {
  const user = useAppSelector(state => state.auth.user)
  const status = useAppSelector(state => state.auth.status)
  return (
    <div className={styles.app}>
      <AuthListener />
      
      <header>
        <h1><Link to="/">SeungJun's Portfolio</Link></h1>

        <nav>
          <ul className={styles.menus}>
            <li><Link to="/">About</Link></li>
            <li><Link to="/skills">Skills</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/blog">Blog</Link></li>

          </ul>
        </nav>
      </header>

      <div>
            {status === 'loading' ? null : user ? (
              <>
                <span>{user.email}</span>
                <button onClick={() => supabase.auth.signOut()}>로그아웃</button>
              </>
            ) : (
              <Link to='/login'>로그인</Link>
            )}
          </div>

      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/mypage'
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
      </Routes>

    </div>
  )
}

export default App;