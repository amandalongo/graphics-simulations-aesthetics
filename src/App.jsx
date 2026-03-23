import { useState } from 'react'
import heroImg from './assets/200.gif'
import gif1 from './assets/catworking.gif'
import gif2 from './assets/punch.gif'
import './App.css'

function App() {
  const assignments = [
    {
      id: 1,
      title: 'Assignment 1: Onboarding',
      short: 'Create a website to maintain all assignments completed, read The Book of Shaders and I Want To Talk About Web GPU',
      image: heroImg,
    },
    {
      id: 2,
      title: 'Assignment 2: Shader Live Coding',
      short: 'A 1 minute animation using the Schwartz environment. Click here for all details on the assignment!',
      image: heroImg,
    },
    {
      id: 3,
      title: 'Assignment 3: TBD',
      short: 'tbddddd',
      image: heroImg,
    },
    {
      id: 4,
      title: 'Assignment 4: TBD',
      short: 'tbddddd',
      image: heroImg,
    },
  ]
  return (
    <div className="site-root">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">Amanda Longo</div>
          <div className="email">
            <a href="mailto:aylongo@wpi.edu">aylongo@wpi.edu</a>
          </div>
        </div>
      </header>

      <main className="site-main">
        <div className="layout">
          <section className="hero-left">
            <h1 className="huge">CS4300</h1>
            <h2 className="sub">Graphics, Simulation and Aesthetics</h2>
            <p className="lead">
              Hi! My name is Amanda Longo and this is my website for all of my completed assignments in CS4300!
              This course is instructed by Charlie Roberts and This course explores digital simulations and strategies for interactive representation.
            </p>
            <div className="hero-gifs" aria-hidden>
              <img src={gif1} alt="animation 1" />
              <img src={gif2} alt="animation 2" />
            </div>
          </section>

          <aside className="sidebar" id="assignments">
            <h3 className="sidebar-title">Assignments</h3>
            <div className="sidebar-list">
              {assignments.map((a) => (
                <article className="card" key={a.id}>
                  <div className="card-content">
                    <h4>{a.title}</h4>
                    <p className="card-desc">{a.short}</p>
                  </div>
                  <div className="card-thumb">
                    <img src={a.image} alt="preview" />
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default App
