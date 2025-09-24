import { useEffect, useState } from 'react'

export default function Results() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    fetch('/api/matches')
      .then(r => r.json())
      .then(data => { if (!ignore) { setMatches(data); setLoading(false) } })
      .catch(() => setLoading(false))
    return () => { ignore = true }
  }, [])

  if (loading) return <p>Loading results...</p>

  return (
    <div>
      <h2>Results</h2>
      {matches.map(m => (
        <div className="card" key={m._id}>
          <h3>{m.title}</h3>
          <p>{new Date(m.date).toLocaleDateString()}</p>
          <p>{m.summary}</p>
          {m.players?.length > 0 && (
            <ul>
              {m.players.map((ps, i) => (
                <li key={i}><b>{ps.name}</b>: {ps.runs} runs, {ps.wickets} wickets</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

