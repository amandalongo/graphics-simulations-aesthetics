import React from "react";
import heroImg from "./assets/200.gif";

export default function Assignment2() {
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
        <div style={{ maxWidth: 1200, margin: "10px auto", padding: "0 10px" }}>
          <h1>Assignment 2: Shader Live Coding</h1>
          <div
            style={{
              marginTop: 60,
              display: "flex",
              gap: 48,
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexWrap: "nowrap",
              overflowX: "auto",
            }}
          >
            <iframe
              title="Assignment 2 preview"
              src="https://drive.google.com/file/d/14sUnepQe5YNzl8a-A-CaxPslfUUG7cBL/preview"
              style={{
                flex: "1 1 700px",
                minWidth: 480,
                height: 550,
                border: 0,
              }}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            <div
              style={{
                flex: "0 0 520px",
                minWidth: 360,
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <pre
                  style={{
                    color: "var(--muted)",
                    fontSize: 13,
                    margin: 0,
                    padding: 12,
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: 6,
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', 'Courier New', monospace",
                    maxHeight: 520,
                    overflowY: "auto",
                    whiteSpace: "pre",
                    textAlign: "left",
                    width: "100%",
                  }}
                >{`@fragment
fn fs(@builtin(position) pos: vec4f) -> @location(0) vec4f {
  let uv = uvN(pos.xy);
  let t = seconds();
  let cycle = t % 60.0;
  let p = uv - vec2f(0.5);
  let dist = sqrt(dot(p, p));
  let pulse = 0.5 + 0.5 * sin(t * 2.0);

  let dotRadius = 0.04 + pulse * 0.03;
  let centerDot = smoothstep(dotRadius + 0.005, dotRadius, dist);
  let ring = smoothstep(0.008, 0.002, abs(dist - (0.1 + pulse * 0.15)));
  let spokeRing = smoothstep(0.35, 0.3, dist) * smoothstep(0.05, 0.1, dist);
  let radialLines = step(0.97, abs(sin(atan2(p.y, p.x) * 6.0 + t * 1.5))) * spokeRing;
  let shimmer = 0.5 + 0.5 * dot(normalize(p), vec2f(cos(t * 0.4), sin(t * 0.4)));
  let outerRing = smoothstep(0.005, 0.0, abs(dist - (0.3 + 0.05 * sin(t * 3.0))));
  let phaseBlend = clamp((cycle % 20.0) / 20.0, 0.0, 1.0);

  let c = cos(t / 10.0); let s = sin(t / 10.0);
  let feedbackUV = (vec2f(c * p.x - s * p.y, s * p.x + c * p.y)) * 0.993 + vec2f(0.5);
  var out = lastframe(feedbackUV) * 0.95;

  if (cycle < 20.0) {
    let base = vec4f(centerDot * 0.05, centerDot * 0.15 + ring * 0.1, centerDot * 0.25 + ring * 0.2, 0.0);
    out += mix(base, base + vec4f(shimmer * 0.04, shimmer * 0.06, shimmer * 0.08, 0.0), phaseBlend);
    out += vec4f(0.0, outerRing * 0.08 * phaseBlend, outerRing * 0.15 * phaseBlend, 0.0);
  } else if (cycle < 40.0) {
    let base = vec4f(
      centerDot * 0.12 + radialLines * 0.15 * phaseBlend,
      centerDot * 0.10 + ring * 0.08,
      centerDot * 0.15 + ring * 0.12 + radialLines * 0.1 * phaseBlend, 0.0);
    out += mix(base, base + vec4f(shimmer * 0.05 * phaseBlend, 0.0, shimmer * 0.04 * phaseBlend, 0.0), phaseBlend);
    out += vec4f(outerRing * 0.1 * phaseBlend, outerRing * 0.05, 0.0, 0.0);
  } else {
    let sharpPulse = pow(pulse, 2.5);
    let gp = fract(uv * (8.0 + floor(cycle / 20.0) * 4.0)) - vec2f(0.5);
    let gridDot = smoothstep(0.1 + 0.1 * sin(t * 1.5 + uv.x * 6.28 + uv.y * 6.28),
                             0.08 + 0.1 * sin(t * 1.5 + uv.x * 6.28 + uv.y * 6.28), length(gp));
    let combined = max(centerDot, ring);
    out += vec4f(combined * 0.15 + gridDot * 0.12 * phaseBlend,
                 combined * 0.08 + gridDot * 0.10 * phaseBlend,
                 combined * 0.10 + gridDot * 0.14 * phaseBlend + radialLines * 0.08, 0.0);
    out += vec4f(sharpPulse * 0.06 * phaseBlend, 0.0, sharpPulse * 0.04, 0.0);
    out += vec4f(outerRing * 0.12 * phaseBlend, outerRing * 0.08 * phaseBlend, outerRing * 0.05, 0.0);
  }

  let vignette = 1.0 - smoothstep(0.4, 0.8, dist);
  out = clamp(vec4f(out.rgb * vignette, 1.0), vec4f(0.0), vec4f(1.0));
  out.a = 1.0;
  return out;
}
  `}</pre>
              </div>
            </div>
          </div>
          <p
            style={{
              color: "var(--muted)",
              marginTop: 20,
              fontWeight: 600,
              fontSize: 24,
            }}
          >
            Project Responses
          </p>
          <div
            style={{
              flex: "0 0 200px",
              minWidth: 160,
              display: "flex",
              alignItems: "start",
              justifyContent: "center",
              marginTop: 20,
            }}
          >
            <p
              style={{
                color: "var(--muted)",
                fontSize: 14,
                textAlign: "start",
                marginRight: 10,
              }}
            >
              <b>Technical:</b> I decided to go with composed (no interaction)
              by relying on the the frame uniform. This animation runs through
              three phases. The first was a pulsing circle and an expanding
              ring, both made by a sin-based pulse and shaped with smoothstep to
              keep the edges clean. The second phase uses radial spokes computed
              using atan2 and sin, masked to an annular region using two
              smoothstep calls working against each other. The third phase has a
              grid of dots built with fract, where the scale shifts between
              phases using floor. Running through all three is a lastframe
              feedback loop that accumulates previous frames with a slight
              rotation and decay each pass, which is what gives everything that
              trailing effect. The transitions between phases are handled by a
              phaseBlend variable derived from cycle % 20.0, so instead of
              snapping between sections it crossfades smoothly. The one thing I
              struggled with was the 60-second cycle. After looking into how it
              was supposed to work, the phases were cycling way faster than they
              should have been and the timing just wasn't adding up to 60
              seconds like intended. Given the time constraint of the
              assignment, I decided to use this as a design choice rather than
              an error.
            </p>
            <p
              style={{
                color: "var(--muted)",
                fontSize: 14,
                textAlign: "start",
              }}
            >
              <b>Aesthetic:</b> The goal of this animation was to start with a
              basic shape, a circle since we had learned it during the second
              class, and then I wanted to create something “interstellar” so
              some sort of planet or galaxy vibe. I wanted it to start off more
              cold colors (which is why I chose the blue and green) and then
              when the animation got a little more complex, add in those warmer
              colors (pinks/reds) to show speed and add more liveliness to it.
              the rings were supposed to represent galaxy/saturn and then the
              dots, lines and spinning mixed in with the pulsing lines are
              supposed to represent moving through space. I really liked how
              much emphasis the pulse added to the overall vision. I wanted to
              use music to add the final touch because I feel like sound really
              adds emotion and emphasis on visuals, like all of the examples we
              watched in class. I like techno and edm style music and this one
              song/beat I used really matched the movements of the visual.
            </p>
          </div>
          <p
            style={{
              color: "var(--muted)",
              fontSize: 14,
              textAlign: "start",
              marginTop: 20,
            }}
          >
            <b>Classmate Feedback:</b> "I feel like when I watch it I get a big
            planet vibe like I feel like the center is a planet and it maybe has
            rings and then as you see the light spirals coming out of it I feel
            like it gives a big star or galaxy vibe that’s what my brain goes to
            at first, but it’s very kind of like this idea of trying to pull you
            in or like the pulse makes it feel very mesmerizing in a way so it’s
            like very astral. I think it is a really good word to describe it."
            I feel as though this feedback and intial thoughts were spot on to
            the vibe I was going for. I feel like the piece really does have
            that interstellar vibe and I was glad to see that my vision was
            shown in my peers' interpretations. I like the word "astral" that
            was used to describe it, I think it really captures the essence of
            the animation along with interstellar. It might even be a better
            word to describe it! Reflecting on this I also noticed from the
            feeback that the light spirals stood out to give the animation that
            galaxy vibe.
          </p>
          <p
            style={{
              color: "var(--muted)",
              fontSize: 14,
              textAlign: "start",
              marginTop: 20,
            }}
          >
            <b>Note:</b> I used ChatGPT to help understand the concept of cycles and how to implement the 60 second looping into this animation, I think that with this assistance I tended to get a little more confused, especially when I was realizing that the cycling wasn't working as I expected (the cycles were less than 20-60 seconds) so this concept is something I want to learn a little more on my own! Next time, I think I would want to try more real time coding or just pasting in different fragments of code to create that animation. 
          </p>
        </div>
      </main>
    </div>
  );
}
