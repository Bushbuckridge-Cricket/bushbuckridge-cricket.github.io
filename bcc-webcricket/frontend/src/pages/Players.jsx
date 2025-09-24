import { useEffect, useState } from 'react'

export default function Players() {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    fetch('/api/players')
      .then(r => r.json())
      .then(data => { if (!ignore) { setPlayers(data); setLoading(false) } })
      .catch(() => setLoading(false))
    return () => { ignore = true }
  }, [])

  if (loading) return <p>Loading players...</p>

  return (
    <div>
      <h2>Players</h2>
      <div className="row">
        {players.map(p => (
          <div className="card" key={p._id}>
            <h3>{p.name}</h3>
            <p><b>Team:</b> {p.team}</p>
            <p><b>Role:</b> {p.role}</p>
            {p.stats && (
              <p><b>Stats:</b> {p.stats.matches} M | {p.stats.runs} R | {p.stats.wickets} W</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

