

# Heliophysics Solar Wind Simulation — Plan

## What we're building

A full-screen interactive 3D visualization showing solar wind particles streaming from the Sun, encountering Earth's dipole magnetic field, and flowing around the magnetosphere. Same aesthetic and UX pattern as the Black Hole page — WebGL shader, drag-to-orbit camera, slider controls.

## Visual elements

1. **Sun** — glowing sphere on the left side, emitting particles
2. **Earth** — small sphere at the center with a subtle blue glow
3. **Magnetic field lines** — dipole field lines rendered around Earth (closed lines near poles, open lines swept back by solar wind)
4. **Solar wind particles** — animated stream of particles flowing from Sun toward Earth, deflecting around the magnetopause
5. **Bow shock** — visible boundary where the solar wind first decelerates
6. **Magnetotail** — elongated tail on the nightside stretching away from the Sun
7. **Starfield background** — reuse the same noise-based star field from BlackHole.tsx

## Technical approach

### Option A: Pure WebGL fragment shader (like Black Hole)
- Single full-screen quad, everything computed per-pixel in GLSL
- Field lines rendered analytically using a dipole formula: **B = (μ₀/4π) · (3(m·r̂)r̂ − m) / r³**
- Solar wind as animated procedural particles (noise-based density field moving in −x direction)
- Bow shock as an analytical paraboloid boundary
- Pros: consistent with Black Hole page, no extra dependencies
- Cons: particle trails and field lines are harder to make look great in a fragment shader

### Option B: Three.js with @react-three/fiber
- 3D scene with mesh spheres for Sun/Earth
- Particle system (instanced meshes or Points) for solar wind — thousands of particles advected along the combined field
- Field lines as Line/TubeGeometry traced by integrating the dipole + uniform solar wind field
- Pros: easier to get good-looking 3D field lines and particles, interactive camera built-in
- Cons: adds ~200KB dependency, different pattern from Black Hole

### Recommendation: Option A (pure WebGL shader)
Keeps consistency with the Black Hole page. The physics is simpler than black hole raytracing — a dipole field is a closed-form equation, and solar wind can be a scrolling density texture.

## Shader physics (fake but plausible)

- **Dipole field**: `B(r) = B0 * R_E³ / r³ * (2cosθ r̂ + sinθ θ̂)` — standard Earth dipole
- **Solar wind**: uniform flow in −x direction with density modulated by noise for visual texture
- **Magnetopause**: Chapman-Ferraro standoff distance `r_mp ≈ R_E * (B0²/(μ₀ρv²))^(1/6)` — simplified to a parabolic boundary
- **Rendering**: for each pixel, cast a ray, sample the combined field, and color based on field strength, particle density, and proximity to field lines

## UI controls (bottom-left panel, matching Black Hole)

| Slider | Effect |
|--------|--------|
| Solar Wind Speed | Changes flow velocity and magnetopause compression |
| IMF Bz | Switches between northward (closed) and southward (open/reconnection) topology |
| Earth Dipole Strength | Scales the magnetic field, expanding/contracting the magnetosphere |

## Files to create/edit

1. **`src/pages/Heliophysics.tsx`** — new page (~400 lines), same structure as BlackHole.tsx: vertex shader + fragment shader + canvas + controls + drag-to-orbit
2. **`src/App.tsx`** — add route `/interactive-plasma/heliophysics`
3. **`src/pages/InteractivePlasma.tsx`** — update the Heliophysics link to point to the new route

## Rendering strategy

- Render at 0.5–0.75x resolution (like Black Hole) for performance
- Field lines: trace streamlines in the shader by stepping along B-field and accumulating glow when the ray passes near a streamline
- Particles: scrolling 3D noise field masked to the solar wind region, with color gradient (yellow near Sun, blue/cyan near Earth)
- Earth: sphere SDF with blue surface color
- Sun: sphere SDF with bright yellow/orange glow and corona

