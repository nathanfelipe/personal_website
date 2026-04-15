import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const VERTEX_SHADER = `
attribute vec4 aVertexPosition;
void main() {
  gl_Position = aVertexPosition;
}
`;

const FRAGMENT_SHADER = `
precision highp float;

const float PI = 3.14159265359;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uCameraPosition;
uniform vec3 uCameraLookAt;
uniform vec3 uCameraUp;
uniform float uSolarWindSpeed;
uniform float uIMFBz;
uniform float uDipoleStrength;

// --- Noise ---
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float cc = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(cc, d, f.x), f.y);
}

float noise3D(vec3 p) {
  float a = noise(p.xy + p.z * 17.0);
  float b = noise(p.yz + p.x * 31.0);
  return (a + b) * 0.5;
}

// --- Star field ---
vec3 starField(vec3 dir) {
  vec2 uv = vec2(
    0.5 + atan(dir.z, dir.x) / (2.0 * PI),
    0.5 + asin(clamp(dir.y, -1.0, 1.0)) / PI
  );
  float stars = 0.0;
  stars += pow(noise(uv * 500.0), 8.0) * 2.0;
  stars += pow(noise(uv * 200.0 + 10.0), 6.0) * 3.0;
  stars += pow(noise(uv * 100.0 + 20.0), 5.0) * 3.5;
  stars *= 0.9 + 0.1 * sin(uTime * 0.5 + noise(uv * 100.0) * 10.0);
  vec3 starColor = mix(vec3(0.8, 0.9, 1.0), vec3(1.0, 0.9, 0.7), noise(uv * 50.0));
  return stars * starColor * 1.5;
}

// --- Sphere SDF ---
float sphereSDF(vec3 p, vec3 center, float radius) {
  return length(p - center) - radius;
}

// --- Dipole magnetic field at position p (Earth at origin) ---
vec3 dipoleField(vec3 p) {
  float r = length(p);
  if (r < 0.01) return vec3(0.0);
  vec3 m = vec3(0.0, uDipoleStrength, 0.0); // dipole moment along Y
  vec3 rhat = p / r;
  float r3 = r * r * r;
  vec3 B = (3.0 * dot(m, rhat) * rhat - m) / r3;
  return B;
}

// --- Magnetopause boundary (parabolic approximation) ---
float magnetopauseDistance(float theta) {
  // Standoff distance scales with dipole strength and inversely with solar wind
  float r_mp = 3.0 * pow(uDipoleStrength / (0.5 + uSolarWindSpeed), 0.333);
  // Parabolic shape: r = r_mp * 2 / (1 + cos(theta))
  float cosTheta = cos(theta);
  if (cosTheta < -0.8) return 100.0; // open tail
  return r_mp * 2.0 / (1.0 + cosTheta);
}

// --- Bow shock boundary ---
float bowShockDistance(float theta) {
  float r_bs = 3.6 * pow(uDipoleStrength / (0.5 + uSolarWindSpeed), 0.333);
  float cosTheta = cos(theta);
  if (cosTheta < -0.7) return 100.0;
  return r_bs * 2.0 / (1.0 + 0.8 * cosTheta);
}

// --- Field line glow: trace streamline proximity ---
float fieldLineGlow(vec3 p) {
  float r = length(p);
  if (r < 0.3 || r > 8.0) return 0.0;
  
  // Trace a few field lines from fixed footpoints
  float glow = 0.0;
  for (int k = 0; k < 8; k++) {
    float phi = float(k) * PI / 4.0;
    // Start from Earth surface at given latitude
    for (int lat = 0; lat < 3; lat++) {
      float colat = 0.3 + float(lat) * 0.15; // colatitude of footpoint
      vec3 foot = 0.35 * vec3(sin(colat)*cos(phi), cos(colat), sin(colat)*sin(phi));
      
      // Trace the field line
      vec3 tp = foot;
      for (int s = 0; s < 40; s++) {
        vec3 B = dipoleField(tp);
        float Bmag = length(B);
        if (Bmag < 0.0001) break;
        tp += normalize(B) * 0.15;
        float dist = length(p - tp);
        glow += 0.003 / (dist * dist + 0.01);
        if (length(tp) > 8.0 || length(tp) < 0.3) break;
      }
      // Trace in opposite direction too
      tp = foot;
      for (int s = 0; s < 40; s++) {
        vec3 B = dipoleField(tp);
        float Bmag = length(B);
        if (Bmag < 0.0001) break;
        tp -= normalize(B) * 0.15;
        float dist = length(p - tp);
        glow += 0.003 / (dist * dist + 0.01);
        if (length(tp) > 8.0 || length(tp) < 0.3) break;
      }
    }
  }
  return clamp(glow, 0.0, 1.0);
}

// --- Solar wind particle density ---
float solarWindDensity(vec3 p) {
  // Solar wind flows in -x direction
  vec3 sunDir = vec3(-1.0, 0.0, 0.0);
  float sunDist = length(p - vec3(-8.0, 0.0, 0.0));
  
  // Angle from sun direction
  vec3 fromSun = normalize(p - vec3(-8.0, 0.0, 0.0));
  float cone = dot(fromSun, -sunDir);
  if (cone < 0.3) return 0.0;
  
  // Magnetopause check: deflect around it
  float theta = acos(clamp(dot(normalize(p), vec3(-1.0, 0.0, 0.0)), -1.0, 1.0));
  float rmp = magnetopauseDistance(theta);
  float r = length(p);
  
  float density = 0.0;
  
  // Upstream solar wind (before magnetopause)
  if (p.x < 0.0 || r > rmp * 0.9) {
    // Flowing particles using scrolling noise
    vec3 flowPos = p + vec3(uTime * uSolarWindSpeed * 2.0, 0.0, 0.0);
    density = noise3D(flowPos * 3.0) * 0.6;
    density += noise3D(flowPos * 7.0) * 0.3;
    density *= smoothstep(0.3, 0.7, cone);
    
    // Density increase near bow shock
    float rbs = bowShockDistance(theta);
    float shockDist = abs(r - rbs);
    if (r < rbs + 0.5 && r > rbs - 0.3) {
      density += 0.4 * exp(-shockDist * shockDist * 10.0);
    }
    
    // Deflection: density wraps around magnetopause
    if (r < rmp * 1.2 && r > rmp * 0.8 && p.x > -2.0) {
      float wrap = exp(-pow(r - rmp, 2.0) * 5.0);
      vec3 wrapFlow = p + vec3(uTime * uSolarWindSpeed, uTime * 0.3, 0.0);
      density += wrap * noise3D(wrapFlow * 4.0) * 0.5;
    }
  }
  
  // Magnetotail: particles in the tail region
  if (p.x > 1.0 && abs(p.y) < 1.5 && abs(p.z) < 1.5) {
    vec3 tailFlow = p + vec3(-uTime * uSolarWindSpeed * 0.5, 0.0, 0.0);
    float tailFade = exp(-p.x * 0.15);
    float tailSheet = exp(-p.y * p.y * 3.0);
    density += noise3D(tailFlow * 2.0) * tailFade * tailSheet * 0.3;
  }
  
  return clamp(density, 0.0, 1.0);
}

// --- Camera matrix ---
mat3 getCameraMatrix() {
  vec3 zAxis = normalize(uCameraLookAt - uCameraPosition);
  vec3 xAxis = normalize(cross(zAxis, uCameraUp));
  vec3 yAxis = cross(xAxis, zAxis);
  return mat3(xAxis, yAxis, zAxis);
}

void main() {
  vec2 uv = (gl_FragCoord.xy / uResolution.xy) * 2.0 - 1.0;
  uv.x *= uResolution.x / uResolution.y;
  
  mat3 camMat = getCameraMatrix();
  float fov = 60.0 * PI / 180.0;
  vec3 rayDir = normalize(camMat * vec3(uv, 1.0 / tan(fov / 2.0)));
  vec3 rayOrigin = uCameraPosition;
  
  vec3 col = vec3(0.0);
  
  // Ray march through the scene
  float t = 0.0;
  float maxT = 40.0;
  float dt = 0.08;
  
  float earthHit = -1.0;
  float sunHit = -1.0;
  vec3 earthCenter = vec3(0.0);
  vec3 sunCenter = vec3(-8.0, 0.0, 0.0);
  float earthRadius = 0.35;
  float sunRadius = 0.8;
  
  // Analytic sphere intersections
  // Earth
  {
    vec3 oc = rayOrigin - earthCenter;
    float b = dot(oc, rayDir);
    float cc = dot(oc, oc) - earthRadius * earthRadius;
    float disc = b * b - cc;
    if (disc > 0.0) earthHit = -b - sqrt(disc);
  }
  // Sun
  {
    vec3 oc = rayOrigin - sunCenter;
    float b = dot(oc, rayDir);
    float cc = dot(oc, oc) - sunRadius * sunRadius;
    float disc = b * b - cc;
    if (disc > 0.0) sunHit = -b - sqrt(disc);
  }
  
  // Accumulate volumetric effects
  vec3 volume = vec3(0.0);
  float volumeAlpha = 0.0;
  
  for (int i = 0; i < 200; i++) {
    vec3 p = rayOrigin + rayDir * t;
    
    // Stop at solid objects
    if (earthHit > 0.0 && t > earthHit) break;
    if (sunHit > 0.0 && t > sunHit) break;
    if (t > maxT) break;
    
    // Solar wind particles
    float swDensity = solarWindDensity(p);
    if (swDensity > 0.01) {
      // Color: yellow near sun, cyan/blue near earth and in magnetosheath
      float sunFactor = exp(-length(p - sunCenter) * 0.3);
      vec3 swColor = mix(vec3(0.2, 0.6, 1.0), vec3(1.0, 0.7, 0.2), sunFactor);
      
      // Bow shock region: brighter, more white
      float theta = acos(clamp(dot(normalize(p), vec3(-1.0, 0.0, 0.0)), -1.0, 1.0));
      float rbs = bowShockDistance(theta);
      float shockGlow = exp(-pow(length(p) - rbs, 2.0) * 8.0);
      swColor = mix(swColor, vec3(0.8, 0.9, 1.0), shockGlow * 0.5);
      
      float alpha = swDensity * 0.04;
      volume += swColor * alpha * (1.0 - volumeAlpha);
      volumeAlpha += alpha * (1.0 - volumeAlpha);
    }
    
    // Field line glow (only near Earth)
    if (length(p) < 8.0 && length(p) > 0.4) {
      float flGlow = fieldLineGlow(p);
      if (flGlow > 0.001) {
        vec3 flColor = mix(vec3(0.3, 0.5, 1.0), vec3(0.5, 0.8, 1.0), flGlow);
        
        // IMF Bz effect: southward makes open field lines glow differently
        if (uIMFBz < 0.0) {
          // Reconnection glow near dayside
          float dayFactor = smoothstep(0.0, -2.0, p.x);
          flColor = mix(flColor, vec3(1.0, 0.4, 0.3), dayFactor * abs(uIMFBz) * 0.3);
        }
        
        float alpha = flGlow * 0.1;
        volume += flColor * alpha * (1.0 - volumeAlpha);
        volumeAlpha += alpha * (1.0 - volumeAlpha);
      }
    }
    
    // Sun corona glow
    float sunDist = length(p - sunCenter);
    if (sunDist < 3.0 && sunDist > sunRadius) {
      float corona = 0.15 / (sunDist - sunRadius + 0.1);
      corona *= (0.8 + 0.2 * noise(vec2(atan(p.y - sunCenter.y, p.z - sunCenter.z) * 3.0, uTime)));
      vec3 coronaColor = mix(vec3(1.0, 0.8, 0.3), vec3(1.0, 0.5, 0.1), (sunDist - sunRadius) / 2.0);
      float alpha = corona * 0.03;
      volume += coronaColor * alpha * (1.0 - volumeAlpha);
      volumeAlpha += alpha * (1.0 - volumeAlpha);
    }
    
    // Earth atmosphere glow
    float earthDist = length(p - earthCenter);
    if (earthDist < 1.0 && earthDist > earthRadius) {
      float atmo = 0.04 / (earthDist - earthRadius + 0.05);
      vec3 atmoColor = vec3(0.3, 0.5, 1.0);
      float alpha = atmo * 0.02;
      volume += atmoColor * alpha * (1.0 - volumeAlpha);
      volumeAlpha += alpha * (1.0 - volumeAlpha);
    }
    
    t += dt;
    if (volumeAlpha > 0.95) break;
  }
  
  col = volume;
  
  // Render Earth
  if (earthHit > 0.0 && (sunHit < 0.0 || earthHit < sunHit)) {
    vec3 hitPos = rayOrigin + rayDir * earthHit;
    vec3 normal = normalize(hitPos - earthCenter);
    vec3 lightDir = normalize(sunCenter - hitPos);
    float diff = max(dot(normal, -lightDir), 0.0) * 0.6 + 0.2;
    
    // Simple Earth coloring
    float lat = asin(normal.y);
    float lon = atan(normal.z, normal.x);
    float land = noise(vec2(lon * 3.0, lat * 3.0));
    vec3 earthCol = mix(vec3(0.05, 0.15, 0.4), vec3(0.1, 0.35, 0.15), smoothstep(0.45, 0.55, land));
    // Ice caps
    if (abs(lat) > 1.2) earthCol = vec3(0.8, 0.85, 0.9);
    
    col = mix(col, earthCol * diff, 1.0 - volumeAlpha * 0.3);
  }
  
  // Render Sun
  if (sunHit > 0.0 && (earthHit < 0.0 || sunHit < earthHit)) {
    vec3 hitPos = rayOrigin + rayDir * sunHit;
    vec3 normal = normalize(hitPos - sunCenter);
    float limb = 1.0 - pow(1.0 - max(dot(normal, -rayDir), 0.0), 0.5);
    vec3 sunCol = mix(vec3(1.0, 0.6, 0.1), vec3(1.0, 0.95, 0.8), limb);
    // Surface detail
    float detail = noise(vec2(atan(normal.z, normal.x) * 5.0 + uTime * 0.1, asin(normal.y) * 5.0));
    sunCol *= 0.9 + 0.1 * detail;
    col = mix(col, sunCol * 1.5, 1.0 - volumeAlpha * 0.2);
  }
  
  // Background stars
  if (volumeAlpha < 0.9 && earthHit < 0.0 && sunHit < 0.0) {
    col += starField(rayDir) * (1.0 - volumeAlpha);
  }
  
  // Tone mapping (ACES-like, same as BlackHole)
  float a = 2.51;
  float b = 0.03;
  float cc = 2.43;
  float d = 0.59;
  float e = 0.14;
  col = (col * (a * col + b)) / (col * (cc * col + d) + e);
  col = pow(col, vec3(0.85));
  
  gl_FragColor = vec4(col, 1.0);
}
`;

function compileShader(gl: WebGLRenderingContext, source: string, type: number): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

const Heliophysics = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [supported, setSupported] = useState(true);
  const [solarWindSpeed, setSolarWindSpeed] = useState(1.0);
  const [imfBz, setImfBz] = useState(0.0);
  const [dipoleStrength, setDipoleStrength] = useState(1.0);

  const dragRef = useRef({ dragging: false, lastX: 0, lastY: 0, theta: 0.0, phi: 1.2 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragRef.current.dragging = true;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current.dragging) return;
    const dx = e.clientX - dragRef.current.lastX;
    const dy = e.clientY - dragRef.current.lastY;
    dragRef.current.theta += dx * 0.005;
    dragRef.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, dragRef.current.phi - dy * 0.005));
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastY = e.clientY;
  }, []);

  const onPointerUp = useCallback(() => {
    dragRef.current.dragging = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) { setSupported(false); return; }

    const vs = compileShader(gl, VERTEX_SHADER, gl.VERTEX_SHADER);
    const fs = compileShader(gl, FRAGMENT_SHADER, gl.FRAGMENT_SHADER);
    if (!vs || !fs) { setSupported(false); return; }

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Link error:", gl.getProgramInfoLog(program));
      setSupported(false);
      return;
    }

    const uniforms = {
      uTime: gl.getUniformLocation(program, "uTime"),
      uResolution: gl.getUniformLocation(program, "uResolution"),
      uCameraPosition: gl.getUniformLocation(program, "uCameraPosition"),
      uCameraLookAt: gl.getUniformLocation(program, "uCameraLookAt"),
      uCameraUp: gl.getUniformLocation(program, "uCameraUp"),
      uSolarWindSpeed: gl.getUniformLocation(program, "uSolarWindSpeed"),
      uIMFBz: gl.getUniformLocation(program, "uIMFBz"),
      uDipoleStrength: gl.getUniformLocation(program, "uDipoleStrength"),
    };

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "aVertexPosition");

    const RENDER_SCALE = 0.5;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(canvas.clientWidth * dpr * RENDER_SCALE);
      canvas.height = Math.floor(canvas.clientHeight * dpr * RENDER_SCALE);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);
    resize();

    const startTime = performance.now();
    const camDist = 12.0;

    const render = () => {
      const time = (performance.now() - startTime) / 1000;
      const d = dragRef.current;

      const camX = camDist * Math.sin(d.phi) * Math.cos(d.theta);
      const camY = camDist * Math.cos(d.phi);
      const camZ = camDist * Math.sin(d.phi) * Math.sin(d.theta);

      gl.useProgram(program);
      gl.enableVertexAttribArray(posLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1f(uniforms.uTime, time);
      gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
      gl.uniform3f(uniforms.uCameraPosition, camX, camY, camZ);
      gl.uniform3f(uniforms.uCameraLookAt, 0, 0, 0);
      gl.uniform3f(uniforms.uCameraUp, 0, 1, 0);
      gl.uniform1f(uniforms.uSolarWindSpeed, solarWindSpeed);
      gl.uniform1f(uniforms.uIMFBz, imfBz);
      gl.uniform1f(uniforms.uDipoleStrength, dipoleStrength);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [solarWindSpeed, imfBz, dipoleStrength]);

  if (!supported) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white/60">
        <div className="text-center space-y-4">
          <p className="text-xl font-serif">WebGL is not available</p>
          <p className="text-sm">This visualization requires a GPU-enabled browser.</p>
          <Link to="/interactive-plasma" className="text-xs text-white/40 hover:text-white/70 transition-colors">
            ← Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      />

      <Link
        to="/interactive-plasma"
        className="absolute top-6 left-6 flex items-center gap-2 text-white/40 hover:text-white/80 text-xs tracking-wide uppercase transition-colors z-10"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-sm rounded-2xl p-5 space-y-4 text-white/80 text-xs z-10 min-w-[220px]">
        <h3 className="text-sm font-serif text-white tracking-wide">Heliophysics</h3>

        <label className="flex items-center justify-between gap-3">
          <span>Wind Speed</span>
          <input
            type="range" min="0.2" max="3" step="0.1" value={solarWindSpeed}
            onChange={(e) => setSolarWindSpeed(parseFloat(e.target.value))}
            className="w-24 accent-white/60"
          />
          <span className="w-8 text-right">{solarWindSpeed.toFixed(1)}</span>
        </label>

        <label className="flex items-center justify-between gap-3">
          <span>IMF Bz</span>
          <input
            type="range" min="-2" max="2" step="0.1" value={imfBz}
            onChange={(e) => setImfBz(parseFloat(e.target.value))}
            className="w-24 accent-white/60"
          />
          <span className="w-8 text-right">{imfBz.toFixed(1)}</span>
        </label>

        <label className="flex items-center justify-between gap-3">
          <span>Dipole</span>
          <input
            type="range" min="0.2" max="3" step="0.1" value={dipoleStrength}
            onChange={(e) => setDipoleStrength(parseFloat(e.target.value))}
            className="w-24 accent-white/60"
          />
          <span className="w-8 text-right">{dipoleStrength.toFixed(1)}</span>
        </label>

        <p className="text-[10px] text-white/30 pt-1">Drag to orbit · Dipole + solar wind</p>
      </div>
    </div>
  );
};

export default Heliophysics;
