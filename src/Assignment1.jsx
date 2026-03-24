import heroImg from './assets/200.gif'

export default function Assignment1() {
  return (
    <div className="site-root scrollable">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">Amanda Longo</div>
          <div className="email">
            <a href="#">Home</a>
          </div>
        </div>
      </header>

      <main className="site-main">
        <div style={{ maxWidth: 900, margin: '10px auto', padding: '0 10px' }}>
          <h1>Assignment 1: Onboarding</h1>
          <p style={{ color: 'var(--muted)' }}>
            Create a website to maintain all assignments completed, read The Book of Shaders and I Want To Talk About Web GPU.
          </p>

        </div>
      </main>
    </div>
  )
}
