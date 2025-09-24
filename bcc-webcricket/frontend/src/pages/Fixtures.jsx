import { useEffect, useState } from 'react'

export default function Fixtures() {
  const [fixtures, setFixtures] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    fetch('/api/fixtures')
      .then(r => r.json())
      .then(data => { if (!ignore) { setFixtures(data); setLoading(false) } })
      .catch(() => setLoading(false))
    return () => { ignore = true }
  }, [])

  if (loading) return <p>Loading fixtures...</p>

  return (
    <div>
      <h2>Fixtures</h2>
      {fixtures.map(f => (
        <div className="card" key={f._id}>
          <h3>{f.title}</h3>
          <p>{new Date(f.date).toLocaleString()}</p>
          <p>{f.venue}</p>
        </div>
      ))}
    </div>
  )
}

