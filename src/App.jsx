import { useState, useEffect } from "react";
import heroImg from "./assets/200.gif";
import gif1 from "./assets/catworking.gif";
import gif2 from "./assets/punch.gif";
import gif3 from "./assets/djcat.gif";
import Assignment2 from "./Assignment2";
import Assignment1 from "./Assignment1";
import "./App.css";

function App() {
  const assignments = [
    {
      id: 1,
      title: "Assignment 1: Onboarding",
      short:
        "Create a website to maintain all assignments completed, read The Book of Shaders and I Want To Talk About Web GPU",
      image: heroImg,
    },
    {
      id: 2,
      title: "Assignment 2: Shader Live Coding",
      short:
        "A 1 minute animation using the Schwartz environment. Click here for all details on the assignment!",
      image: gif3,
    },
    {
      id: 3,
      title: "Assignment 3: TBD",
      short: "tbddddd",
      image: heroImg,
    },
    {
      id: 4,
      title: "Assignment 4: TBD",
      short: "tbddddd",
      image: heroImg,
    },
  ];
  // simple hash router
  const [route, setRoute] = useState({ page: "home", id: null });

  useEffect(() => {
    function parseHash() {
      const h = window.location.hash || "#";
      const parts = h.replace(/^#/, "").split("/").filter(Boolean);
      if (parts[0] === "assignments" && parts[1]) {
        setRoute({ page: "assignment", id: Number(parts[1]) });
      } else {
        setRoute({ page: "home", id: null });
      }
    }
    parseHash();
    window.addEventListener("hashchange", parseHash);
    return () => window.removeEventListener("hashchange", parseHash);
  }, []);

  if (route.page === "assignment") {
    if (route.id === 2) {
      return <Assignment2 />;
    }
    if (route.id === 1) {
      return <Assignment1 />;
    }
    // fallback simple assignment page
    const a = assignments.find((x) => x.id === route.id);
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
          <div
            style={{ maxWidth: 900, margin: "40px auto", padding: "0 20px" }}
          >
            <h1>{a ? a.title : "Assignment"}</h1>
            <p style={{ color: "var(--muted)" }}>
              {a ? a.short : "No details."}
            </p>
          </div>
        </main>
      </div>
    );
  }

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
              Hi! My name is Amanda Longo and this is my website for all of my
              completed assignments in CS4300! This course is instructed by
              Charlie Roberts it explores digital simulations and strategies for
              interactive representation. I am a Junior CS major with a Media
              Art Minor who really enjoys Front End Development and UI design. I
              am a big perfectionist when it comes to visuals so I will always
              be looking up how to make things look better :)
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
                <article
                  key={a.id}
                  className="card"
                  onClick={() => {
                    window.location.hash = `#/assignments/${a.id}`;
                  }}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      window.location.hash = `#/assignments/${a.id}`;
                    }
                  }}
                >
                  <a
                    className="card-link"
                    href={`#/assignments/${a.id}`}
                    onFocus={() => {
                      window.location.hash = `#/assignments/${a.id}`;
                    }}
                    aria-label={`Open ${a.title}`}
                  >
                    <div className="card-content">
                      <h4>{a.title}</h4>
                      <p className="card-desc">{a.short}</p>
                    </div>
                  </a>
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
  );
}

export default App;
