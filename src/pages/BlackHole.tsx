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
const float G = 6.67430e-11;
const float c = 299792458.0;
const float M_SUN = 1.989e30;

uniform float uMass;
uniform float uDiskIntensity;
uniform float uGlowIntensity;
uniform float uStarBrightness;
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uCameraPosition;
uniform vec3 uCameraLookAt;
uniform vec3 uCameraUp;
uniform bool uShowStars;

float schwarzschildRadius() {
  return 2.0 * G * (uMass * M_SUN) / (c * c);
}

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

vec3 starField(vec3 direction) {
  if (!uShowStars) return vec3(0.0);
  vec2 uv = vec2(
    0.5 + atan(direction.z, direction.x) / (2.0 * PI),
    0.5 + asin(clamp(direction.y, -1.0, 1.0)) / PI
  );
  float stars = 0.0;
  stars += pow(noise(uv * 500.0), 15.0) * 2.0;
  stars += pow(noise(uv * 200.0 + 10.0), 12.0) * 2.5;
  stars += pow(noise(uv * 100.0 + 20.0), 10.0) * 3.0;
  stars += pow(noise(uv * 50.0 + 30.0), 8.0) * 3.5;
  stars *= 0.9 + 0.1 * sin(uTime * 0.5 + noise(uv * 100.0) * 10.0);
  vec3 starColor = mix(vec3(0.8, 0.9, 1.0), vec3(1.0, 0.9, 0.7), noise(uv * 50.0));
  if (noise(uv * 70.0) > 0.97) {
    starColor = mix(starColor, vec3(1.0, 0.5, 0.5), 0.8);
  }
  stars *= uStarBrightness;
  return stars * starColor;
}

vec3 diskGlow(vec3 position, float intensity) {
  float rs = schwarzschildRadius();
  float r = length(position);
  float diskProximity = exp(-abs(position.y) / (2.0 * rs));
  float innerRadius = 3.0 * rs;
  float outerRadius = 15.0 * rs;
  float radialFactor = 0.0;
  if (r > innerRadius && r < outerRadius) {
    float x = (r - innerRadius) / (outerRadius - innerRadius);
    radialFactor = (1.0 - x) * exp(-x * 2.0);
  }
  float glowFactor = diskProximity * radialFactor * intensity;
  // Warm orange/gold glow
  vec3 glowColor = mix(vec3(1.0, 0.4, 0.05), vec3(1.0, 0.85, 0.4), exp(-r / (8.0 * rs)));
  return glowColor * glowFactor * uGlowIntensity;
}

vec4 accretionDiskColor(vec3 position, vec3 velocity) {
  float r = length(position);
  float rs = schwarzschildRadius();
  float innerDiskRadius = 3.0 * rs;
  float outerDiskRadius = 20.0 * rs;
  float diskFactor = 0.0;
  if (r > innerDiskRadius && r < outerDiskRadius) {
    float x = (r - innerDiskRadius) / (outerDiskRadius - innerDiskRadius);
    diskFactor = 3.0 * x * (1.0 - x) * (1.0 - x);
  }
  float diskThickness = rs * (0.1 + 0.3 * r / outerDiskRadius);
  if (abs(position.y) > diskThickness) return vec4(0.0);
  float edgeFactor = smoothstep(diskThickness, 0.0, abs(position.y));
  diskFactor *= edgeFactor;

  // Warm color scheme: inner=white-hot, mid=gold/yellow, outer=deep orange/red
  float t_rad = clamp((r - innerDiskRadius) / (outerDiskRadius - innerDiskRadius), 0.0, 1.0);
  vec3 col;
  if (t_rad < 0.2) {
    // Inner: white-hot to bright yellow
    float t = t_rad / 0.2;
    col = mix(vec3(1.0, 1.0, 0.95), vec3(1.0, 0.95, 0.5), t);
  } else if (t_rad < 0.5) {
    // Mid: bright yellow to orange
    float t = (t_rad - 0.2) / 0.3;
    col = mix(vec3(1.0, 0.95, 0.5), vec3(1.0, 0.6, 0.15), t);
  } else {
    // Outer: orange to deep red
    float t = (t_rad - 0.5) / 0.5;
    col = mix(vec3(1.0, 0.6, 0.15), vec3(0.8, 0.2, 0.05), t);
  }

  float angle = atan(position.z, position.x);
  float spiral = sin(angle * 4.0 + 20.0 * log(r/rs) + uTime * 0.5);
  diskFactor *= (0.8 + 0.2 * spiral * spiral);
  float turbulence = noise(vec2(angle * 5.0, r/rs) + uTime * 0.2);
  diskFactor *= (0.8 + 0.4 * turbulence);
  if (turbulence > 0.85) {
    col = mix(col, vec3(1.0, 0.95, 0.8), 0.5);
    diskFactor *= 1.5;
  }
  float redshift = 1.0 / sqrt(max(1.0 - rs/r, 0.001));
  col = col / redshift;
  float orbitalVelocity = sqrt(G * (uMass * M_SUN) / r) / c;
  float beamingDirection = dot(normalize(position), vec3(0.0, 0.0, 1.0));
  float doppler = 1.0 / (1.0 + orbitalVelocity * beamingDirection);
  float beamingFactor = pow(doppler, 4.0);
  diskFactor *= uDiskIntensity * beamingFactor * 1.5;
  return vec4(col, diskFactor);
}

vec3 traceRay(vec3 rayOrigin, vec3 rayDirection) {
  float rs = schwarzschildRadius();
  vec3 col = vec3(0.0);
  float opacity = 0.0;
  vec3 position = rayOrigin;
  vec3 velocity = normalize(rayDirection);
  float dt = 0.5 * rs;
  const int MAX_STEPS = 200;
  float maxDistance = 200.0 * rs;
  float totalDistance = 0.0;
  vec3 totalGlow = vec3(0.0);
  for (int i = 0; i < MAX_STEPS; i++) {
    float r = length(position);
    if (r < rs * 1.01) return mix(totalGlow, vec3(0.0), 0.8);
    vec3 glow = diskGlow(position, 0.015);
    totalGlow += glow * (1.0 - opacity);
    vec4 diskColor = accretionDiskColor(position, velocity);
    if (diskColor.a > 0.01) {
      col = mix(col, diskColor.rgb, diskColor.a * (1.0 - opacity));
      opacity += diskColor.a * (1.0 - opacity);
      if (opacity > 0.95) break;
    }
    vec3 dir = normalize(position);
    float forceMag = 1.5 * rs / (r * r);
    vec3 acc = -dir * forceMag;
    velocity = normalize(velocity + acc * dt);
    position += velocity * dt;
    totalDistance += dt;
    if (totalDistance > maxDistance) {
      vec3 starColor = starField(normalize(velocity));
      col = mix(col, starColor, 1.0 - opacity);
      break;
    }
  }
  return mix(col, col + totalGlow, 0.8);
}

mat3 getCameraMatrix() {
  vec3 zAxis = normalize(uCameraLookAt - uCameraPosition);
  vec3 xAxis = normalize(cross(zAxis, uCameraUp));
  vec3 yAxis = cross(xAxis, zAxis);
  return mat3(xAxis, yAxis, zAxis);
}

void main() {
  vec2 uv = (gl_FragCoord.xy / uResolution.xy) * 2.0 - 1.0;
  uv.x *= uResolution.x / uResolution.y;
  mat3 cameraMatrix = getCameraMatrix();
  float fov = 60.0 * PI / 180.0;
  vec3 rayDirection = normalize(cameraMatrix * vec3(uv, 1.0/tan(fov/2.0)));
  vec3 col = traceRay(uCameraPosition, rayDirection);
  const float a = 2.51;
  const float b = 0.03;
  const float cc = 2.43;
  const float d = 0.59;
  const float e = 0.14;
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

const BlackHole = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [supported, setSupported] = useState(true);
  const [mass, setMass] = useState(1.0);
  const [camDist, setCamDist] = useState(30);
  const [diskIntensity, setDiskIntensity] = useState(1.0);

  const dragRef = useRef({ dragging: false, lastX: 0, lastY: 0, theta: 0.3, phi: 0.8 });

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
    if (!gl) {
      setSupported(false);
      return;
    }

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
      uMass: gl.getUniformLocation(program, "uMass"),
      uDiskIntensity: gl.getUniformLocation(program, "uDiskIntensity"),
      uGlowIntensity: gl.getUniformLocation(program, "uGlowIntensity"),
      uStarBrightness: gl.getUniformLocation(program, "uStarBrightness"),
      uTime: gl.getUniformLocation(program, "uTime"),
      uResolution: gl.getUniformLocation(program, "uResolution"),
      uCameraPosition: gl.getUniformLocation(program, "uCameraPosition"),
      uCameraLookAt: gl.getUniformLocation(program, "uCameraLookAt"),
      uCameraUp: gl.getUniformLocation(program, "uCameraUp"),
      uShowStars: gl.getUniformLocation(program, "uShowStars"),
    };

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "aVertexPosition");

    // Fixed resolution for performance
    const RENDER_SIZE = 275;

    const resize = () => {
      const aspect = canvas.clientWidth / canvas.clientHeight;
      if (aspect >= 1) {
        canvas.width = RENDER_SIZE;
        canvas.height = Math.floor(RENDER_SIZE / aspect);
      } else {
        canvas.height = RENDER_SIZE;
        canvas.width = Math.floor(RENDER_SIZE * aspect);
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);
    resize();

    const G_CONST = 6.6743e-11;
    const C_CONST = 299792458;
    const M_SUN = 1.989e30;

    const startTime = performance.now();

    const render = () => {
      const time = (performance.now() - startTime) / 1000;
      const rs = (2 * G_CONST * mass * M_SUN) / (C_CONST * C_CONST);
      const d = dragRef.current;

      const camX = camDist * rs * Math.sin(d.phi) * Math.cos(d.theta);
      const camY = camDist * rs * Math.cos(d.phi);
      const camZ = camDist * rs * Math.sin(d.phi) * Math.sin(d.theta);

      gl.useProgram(program);
      gl.enableVertexAttribArray(posLoc);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      gl.uniform1f(uniforms.uMass, mass);
      gl.uniform1f(uniforms.uDiskIntensity, diskIntensity);
      gl.uniform1f(uniforms.uGlowIntensity, 1.0);
      gl.uniform1f(uniforms.uStarBrightness, 1.0);
      gl.uniform1f(uniforms.uTime, time);
      gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
      gl.uniform3f(uniforms.uCameraPosition, camX, camY, camZ);
      gl.uniform3f(uniforms.uCameraLookAt, 0, 0, 0);
      gl.uniform3f(uniforms.uCameraUp, 0, 1, 0);
      gl.uniform1i(uniforms.uShowStars, 1);

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
  }, [mass, camDist, diskIntensity]);

  if (!supported) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white/60">
        <div className="text-center space-y-4">
          <p className="text-xl font-serif">WebGL is not available</p>
          <p className="text-sm">This visualization requires a GPU-enabled browser.</p>
          <Link to="/" className="text-xs text-white/40 hover:text-white/70 transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden touch-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none"
        style={{ imageRendering: 'auto' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      />

      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-white/40 hover:text-white/80 text-xs tracking-wide uppercase transition-colors z-10"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-sm rounded-2xl p-5 space-y-4 text-white/80 text-xs z-10 min-w-[220px]">
        <h3 className="text-sm font-serif text-white tracking-wide">Black Hole</h3>
        
        <label className="flex items-center justify-between gap-3">
          <span>Mass</span>
          <input
            type="range" min="1" max="10" step="0.1" value={mass}
            onChange={(e) => setMass(parseFloat(e.target.value))}
            className="w-24 accent-white/60"
          />
          <span className="w-8 text-right">{mass.toFixed(1)}</span>
        </label>

        <label className="flex items-center justify-between gap-3">
          <span>Distance</span>
          <input
            type="range" min="10" max="200" step="1" value={camDist}
            onChange={(e) => setCamDist(parseInt(e.target.value))}
            className="w-24 accent-white/60"
          />
          <span className="w-8 text-right">{camDist}</span>
        </label>

        <label className="flex items-center justify-between gap-3">
          <span>Disk</span>
          <input
            type="range" min="0" max="2" step="0.05" value={diskIntensity}
            onChange={(e) => setDiskIntensity(parseFloat(e.target.value))}
            className="w-24 accent-white/60"
          />
          <span className="w-8 text-right">{diskIntensity.toFixed(1)}</span>
        </label>

        <p className="text-[10px] text-white/30 pt-1">Drag to orbit · Schwarzschild metric</p>
      </div>
    </div>
  );
};

export default BlackHole;
