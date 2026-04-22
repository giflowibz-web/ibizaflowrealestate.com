export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0f1e',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
          Ibiza Flow
        </div>
        <div style={{ fontSize: 16, color: '#4a6a8a', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Real Estate
        </div>
      </div>
    </main>
  )
}
