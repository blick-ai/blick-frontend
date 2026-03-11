import React from 'react'

function App() {
  const systemName = "BLICK"
  const status = "Online"

  return (
    <div style={{ 
      fontFamily: 'sans-serif', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      backgroundColor: '#f4f7f6',
      color: '#2d3436'
    }}>
      <header style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', margin: '0' }}>🌾 {systemName}</h1>
        <p style={{ fontSize: '1.2rem', color: '#636e72' }}>
          Dashboard de Monitoramento de Pragas
        </p>
      </header>

      <main style={{
        marginTop: '2rem',
        padding: '2rem',
        borderRadius: '12px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h2>Status do Ecossistema</h2>
        <div style={{
          display: 'inline-block',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          backgroundColor: '#55efc4',
          color: '#00b894',
          fontWeight: 'bold'
        }}>
          {status}
        </div>
        <p style={{ marginTop: '1rem' }}>
          Aguardando conexão com os sensores IoT...
        </p>
      </main>

      <footer style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#b2bec3' }}>
        &copy; 2026 BLICK - Inteligência Artificial na Agricultura
      </footer>
    </div>
  )
}

export default App