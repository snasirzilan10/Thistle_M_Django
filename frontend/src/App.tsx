import { useEffect, useState } from 'react'

function App() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/test/')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error(err))
  }, [])

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'system-ui' }}>
      <h1>Connection Test</h1>
      <p style={{ color: message ? 'green' : 'red' }}>
        {message || 'Connecting to Django backend...'}
      </p>
    </div>
  )
}

export default App