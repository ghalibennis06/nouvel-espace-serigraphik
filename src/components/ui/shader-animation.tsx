'use client'
import { useEffect, useRef, useState } from 'react'

interface ShaderAnimationProps {
  /** Overlay opacity — 0 = fully transparent, 1 = opaque */
  overlayOpacity?: number
  /** CSS color for the overlay (light or dark) */
  overlayColor?: string
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

// ─── WebGL helpers (typed) ────────────────────────────────────────────────────

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

// ─── Fragment shader — NES warm palette ──────────────────────────────────────
// Palette shifted toward orange/amber (#F26316 ≈ vec3(0.95, 0.39, 0.09))
// Flowing layers inspired by: shadertoy.com/view/mtyGWy

const VERTEX_SRC = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const FRAGMENT_SRC = `
  precision mediump float;

  uniform vec2  u_resolution;
  uniform float u_time;
  uniform vec2  u_mouse;

  /* NES brand palette — warm orange / amber */
  vec3 palette(float t) {
    vec3 a = vec3(0.50, 0.38, 0.25);
    vec3 b = vec3(0.50, 0.38, 0.18);
    vec3 c = vec3(1.00, 0.90, 0.80);
    vec3 d = vec3(0.55, 0.20, 0.02);
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    vec2 uv  = gl_FragCoord.xy / u_resolution.xy;
    vec2 uv0 = uv;
    uv = uv * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;

    float d   = length(uv);
    vec3  col = vec3(0.0);

    for (float i = 0.0; i < 4.0; i++) {
      uv = fract(uv * 1.5) - 0.5;

      d = length(uv) * exp(-length(uv0));

      vec3 color = palette(length(uv0) + i * 0.4 + u_time * 0.008);

      d = sin(d * 4.0 + u_time * 0.9) / 36.0;
      d = pow(0.005 / abs(d), 1.4);

      /* Mouse ripple */
      vec2 mDelta = u_mouse - uv0;
      float mDist = length(mDelta);
      d *= 1.0 + sin(mDist * 10.0 - u_time * 1.8) * 0.08;

      col += color * d;
    }

    /* Subtle wave */
    float wave = sin(uv0.x * 3.0 + u_time * 0.7) * 0.008;
    col += vec3(wave * 1.2, wave * 0.6, wave * 0.1);

    /* Gradient overlay — deep orange → warm amber */
    vec3 g1 = vec3(0.92, 0.32, 0.04);
    vec3 g2 = vec3(0.96, 0.62, 0.08);
    vec3 grad = mix(g1, g2, uv0.y + sin(u_time * 0.5) * 0.15);
    col = mix(col, grad, 0.28);

    gl_FragColor = vec4(col, 1.0);
  }
`

// ─── Component ───────────────────────────────────────────────────────────────

export default function ShaderAnimation({
  overlayOpacity = 0.82,
  overlayColor = 'rgba(255,255,255,1)',
  className = '',
  style,
  children,
}: ShaderAnimationProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const animRef      = useRef<number | null>(null)
  const mouseRef     = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) return

    const vs = createShader(gl, gl.VERTEX_SHADER,  VERTEX_SRC)
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC)
    if (!vs || !fs) return

    const program = gl.createProgram()!
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
      return
    }

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const posLoc  = gl.getAttribLocation(program, 'a_position')
    const resLoc  = gl.getUniformLocation(program, 'u_resolution')
    const timeLoc = gl.getUniformLocation(program, 'u_time')
    const mouLoc  = gl.getUniformLocation(program, 'u_mouse')

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth
      mouseRef.current.y = 1 - e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMouse)

    const start = performance.now()
    setReady(true)

    const render = () => {
      const t = (performance.now() - start) * 0.001

      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.enableVertexAttribArray(posLoc)
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

      gl.uniform2f(resLoc, canvas.width, canvas.height)
      gl.uniform1f(timeLoc, t)
      gl.uniform2f(mouLoc, mouseRef.current.x, mouseRef.current.y)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      animRef.current = requestAnimationFrame(render)
    }
    render()

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <div className={className} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      {/* WebGL canvas — fills parent */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          display: 'block',
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.8s ease',
        }}
      />

      {/* White overlay — makes content readable */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: overlayColor,
          opacity: overlayOpacity,
          pointerEvents: 'none',
        }}
      />

      {/* Content on top */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}
