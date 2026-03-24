import React from 'react'
import heroImg from './assets/200.gif'

export default function Assignment2() {
  return (
    <div className="site-root">
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
          <h1>Assignment 2: Shader Live Coding</h1>
          <p style={{ color: 'var(--muted)' }}>
            This assignment asks you to create a 1-minute animation in the Schwartz environment.
          </p>

        </div>
      </main>
    </div>
  )
}
