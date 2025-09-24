import { useEffect, useState } from 'react'

export default function News() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    fetch('/api/news')
      .then(r => r.json())
      .then(data => { if (!ignore) { setNews(data); setLoading(false) } })
      .catch(() => setLoading(false))
    return () => { ignore = true }
  }, [])

  if (loading) return <p>Loading news...</p>

  return (
    <div>
      <h2>News</h2>
      {news.map(n => (
        <article className="card" key={n._id}>
          <h3>{n.title}</h3>
          <p>{new Date(n.date).toLocaleString()}</p>
          {n.imageUrl && <img src={n.imageUrl} alt="" style={{ maxWidth: '100%', borderRadius: 8 }} />}
          <p>{n.content}</p>
        </article>
      ))}
    </div>
  )
}

