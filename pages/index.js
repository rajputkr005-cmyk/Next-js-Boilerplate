export default function Home() {
  return (
    <main style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(to bottom right, #3b82f6, #8b5cf6)',
      color: 'white',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Welcome!</h1>
      <p style={{ fontSize: '1.5rem' }}>Pages Router is working.</p>
    </main>
  );
}