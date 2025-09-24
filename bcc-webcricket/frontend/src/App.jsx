import { Routes, Route, NavLink } from 'react-router-dom'
import Players from './pages/Players'
import Fixtures from './pages/Fixtures'
import Results from './pages/Results'
import News from './pages/News'
import Admin from './pages/Admin'

const brandColor = '#0b6b3a' // BCC green

export default function App() {
  return (
    <div className="app">
      <header className="header" style={{ borderBottom: `4px solid ${brandColor}` }}>
        <div className="container">
          <h1 style={{ color: brandColor }}>Bushbuckridge Cricket Club</h1>
          <nav>
            <NavLink to="/results">Results</NavLink>
            <NavLink to="/fixtures">Fixtures</NavLink>
            <NavLink to="/players">Players</NavLink>
            <NavLink to="/news">News</NavLink>
            <NavLink to="/admin">Admin</NavLink>
          </nav>
        </div>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/players" element={<Players />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/results" element={<Results />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="container">© 2025 Bushbuckridge Cricket Club</div>
      </footer>
    </div>
  )
}

