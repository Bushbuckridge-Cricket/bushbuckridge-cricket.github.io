import { useMemo, useState } from 'react'
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'

function authHeader(username, password) {
  const token = btoa(`${username}:${password}`)
  return { Authorization: `Basic ${token}` }
}

function Login({ onLogin }) {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('1234')
  return (
    <div className="card">
      <h3>Admin Login</h3>
      <label>Username</label>
      <input value={username} onChange={e => setUsername(e.target.value)} />
      <label>Password</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="btn" onClick={() => onLogin({ username, password })}>Login</button>
    </div>
  )
}

function useAdminAuth() {
  const [creds, setCreds] = useState(() => {
    const raw = localStorage.getItem('bcc-admin-creds')
    return raw ? JSON.parse(raw) : null
  })
  const headers = useMemo(() => creds ? authHeader(creds.username, creds.password) : {}, [creds])
  const save = (c) => { setCreds(c); localStorage.setItem('bcc-admin-creds', JSON.stringify(c)) }
  const clear = () => { setCreds(null); localStorage.removeItem('bcc-admin-creds') }
  return { creds, headers, save, clear }
}

function SectionNav() {
  return (
    <nav style={{ marginBottom: 12 }}>
      <NavLink to="players">Manage Players</NavLink>{' | '}
      <NavLink to="fixtures">Manage Fixtures</NavLink>{' | '}
      <NavLink to="results">Manage Results</NavLink>{' | '}
      <NavLink to="news">Manage News</NavLink>
    </nav>
  )
}

function CrudList({ title, endpoint, fields, headers }) {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({})

  const load = () => fetch(endpoint).then(r => r.json()).then(setItems)

  const create = async () => {
    await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(form) })
    setForm({})
    load()
  }

  const update = async (id, data) => {
    await fetch(`${endpoint}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(data) })
    load()
  }

  const remove = async (id) => {
    await fetch(`${endpoint}/${id}`, { method: 'DELETE', headers })
    load()
  }

  useState(load, [])

  return (
    <div>
      <h3>{title}</h3>
      <div className="card">
        {fields.map(f => (
          <div key={f.name}>
            <label>{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea value={form[f.name] || ''} onChange={e => setForm({ ...form, [f.name]: e.target.value })} />
            ) : (
              <input type={f.type || 'text'} value={form[f.name] || ''} onChange={e => setForm({ ...form, [f.name]: e.target.value })} />
            )}
          </div>
        ))}
        <button className="btn" onClick={create}>Add New</button>
      </div>
      {items.map(it => (
        <div className="card" key={it._id}>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(it, null, 2)}</pre>
          <button className="btn" onClick={() => update(it._id, it)}>Save</button>
          <button className="btn secondary" onClick={() => remove(it._id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default function Admin() {
  const { creds, headers, save, clear } = useAdminAuth()
  const navigate = useNavigate()
  return (
    <div>
      <h2>Admin Dashboard</h2>
      {!creds ? (
        <Login onLogin={(c) => { save(c); navigate('players') }} />
      ) : (
        <div>
          <button className="btn secondary" onClick={() => { clear(); navigate('/admin') }}>Logout</button>
          <SectionNav />
          <Routes>
            <Route path="players" element={<CrudList title="Players" endpoint="/api/players" headers={headers} fields={[{ name: 'name', label: 'Name' }, { name: 'team', label: 'Team' }, { name: 'role', label: 'Role' }]} />} />
            <Route path="fixtures" element={<CrudList title="Fixtures" endpoint="/api/fixtures" headers={headers} fields={[{ name: 'title', label: 'Title' }, { name: 'date', label: 'Date', type: 'datetime-local' }, { name: 'venue', label: 'Venue' }]} />} />
            <Route path="results" element={<CrudList title="Results" endpoint="/api/matches" headers={headers} fields={[{ name: 'title', label: 'Title' }, { name: 'date', label: 'Date', type: 'date' }, { name: 'summary', label: 'Summary', type: 'textarea' }]} />} />
            <Route path="news" element={<CrudList title="News" endpoint="/api/news" headers={headers} fields={[{ name: 'title', label: 'Title' }, { name: 'content', label: 'Content', type: 'textarea' }, { name: 'imageUrl', label: 'Image URL' }, { name: 'date', label: 'Date', type: 'datetime-local' }]} />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

