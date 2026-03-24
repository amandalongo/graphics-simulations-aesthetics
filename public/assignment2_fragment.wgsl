// Assignment 2 fragment shader (WGSL)
// Saved for download

@fragment
fn fs(@builtin(position) pos: vec4f) -> @location(0) vec4f {
  let uv = uvN(pos.xy);
  let t = seconds();
  let cycle = t % 60.0;
  let p = uv - vec2f(0.5, 0.5);
  let dist = sqrt(dot(p, p));
  let angle = atan2(p.y, p.x);
  let n = normalize(p);
  let pulse = 0.5 + 0.5 * sin(t * 2.0);
  let sharpPulse = pow(pulse, 2.5);
  let dotRadius = 0.04 + pulse * 0.03;
  let centerDot = smoothstep(dotRadius + 0.005, dotRadius, dist);
  let ringDist = abs(dist - (0.1 + pulse * 0.15));
  let ring = smoothstep(0.008, 0.002, ringDist);
  let spokes = 6.0;
  let spokeMask = abs(sin(angle * spokes + t * 1.5));
  let spokeRing = smoothstep(0.35, 0.3, dist) * smoothstep(0.05, 0.1, dist);
  let radialLines = step(0.97, spokeMask) * spokeRing;
  let shimmerDir = vec2f(cos(t * 0.4), sin(t * 0.4));
  let shimmer = 0.5 + 0.5 * dot(n, shimmerDir);
  let gridScale = 8.0 + floor(cycle / 20.0) * 4.0;
  let gp = fract(uv * gridScale) - vec2f(0.5);
  let gridDotR = 0.1 + 0.1 * sin(t * 1.5 + uv.x * 6.28 + uv.y * 6.28);
  let gridDot = smoothstep(gridDotR, gridDotR - 0.02, length(gp));
  let outerRing = smoothstep(0.005, 0.0, abs(dist - (0.3 + 0.05 * sin(t * 3.0))));
  let c = cos(t / 10.0);
  let s = sin(t / 10.0);
  let rotP = vec2f(c * p.x - s * p.y, s * p.x + c * p.y);
  let feedbackUV = rotP * 0.993 + vec2f(0.5);
  var out = lastframe(feedbackUV) * 0.95;
  let phaseBlend = clamp((cycle % 20.0) / 20.0, 0.0, 1.0);
  if (cycle < 20.0) {
    let base = vec4f(centerDot * 0.05, centerDot * 0.15 + ring * 0.1, centerDot * 0.25 + ring * 0.2, 0.0);
    let tint = vec4f(shimmer * 0.04, shimmer * 0.06, shimmer * 0.08, 0.0);
    out += mix(base, base + tint, phaseBlend);
    out += vec4f(0.0, outerRing * 0.08 * phaseBlend, outerRing * 0.15 * phaseBlend, 0.0);
  } else if (cycle < 40.0) {
    let base = vec4f(
      centerDot * 0.12 + radialLines * 0.15 * phaseBlend,
      centerDot * 0.10 + ring * 0.08,
      centerDot * 0.15 + ring * 0.12 + radialLines * 0.1 * phaseBlend,
      0.0
    );
    let shimmerLayer = vec4f(shimmer * 0.05 * phaseBlend, 0.0, shimmer * 0.04 * phaseBlend, 0.0);
    out += mix(base, base + shimmerLayer, phaseBlend);
    out += vec4f(outerRing * 0.1 * phaseBlend, outerRing * 0.05, 0.0, 0.0);
  } else {
    let combined = max(centerDot, ring);
    out += vec4f(
      combined * 0.15 + gridDot * 0.12 * phaseBlend,
      combined * 0.08 + gridDot * 0.10 * phaseBlend,
      combined * 0.10 + gridDot * 0.14 * phaseBlend + radialLines * 0.08,
      0.0
    );
    out += vec4f(sharpPulse * 0.06 * phaseBlend, 0.0, sharpPulse * 0.04, 0.0);
    out += vec4f(outerRing * 0.12 * phaseBlend, outerRing * 0.08 * phaseBlend, outerRing * 0.05, 0.0);
  }
  let vignette = 1.0 - smoothstep(0.4, 0.8, dist);
  out = vec4f(out.rgb * vignette, 1.0);
  out = clamp(out, vec4f(0.0), vec4f(1.0));
  out.a = 1.0;
  return out;
}
