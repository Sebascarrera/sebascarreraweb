import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import asicsLogo     from '../../../assets/asics/asics-logo.png'
import cieloImg      from '../../../assets/asics/cielo.png'
import edificiosImg  from '../../../assets/asics/edificios.png'
import carreteraImg  from '../../../assets/asics/carretera.png'
import run1        from '../../../assets/asics/run-1.png'
import run2        from '../../../assets/asics/run-2.png'
import run3        from '../../../assets/asics/run-3.png'
import run4        from '../../../assets/asics/run-4.png'
import run5        from '../../../assets/asics/run-5.png'
import run6        from '../../../assets/asics/run-6.png'
import shoe1       from '../../../assets/asics/shoe1.png'
import shoe2       from '../../../assets/asics/shoe2.png'
import shoe3       from '../../../assets/asics/shoe3.png'
import shoe4       from '../../../assets/asics/shoe4.png'
import shoe5       from '../../../assets/asics/shoe5.png'
import shoe6       from '../../../assets/asics/shoe6.png'
import './asics-runner.css'

const GAME_DURATION   = 25
const PLAYER_WIDTH    = 72
const PLAYER_HEIGHT   = 118
const ITEM_SIZE       = 58
const PLAYER_Y_OFFSET = 124
const RUN_FRAMES      = [run1, run2, run3, run4, run5, run6]

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

const ITEM_TYPES = [
  { key: 'shoe1', src: shoe1, points: 10, speedRange: [0.19, 0.24], scale: 1,    weight: 3 },
  { key: 'shoe2', src: shoe2, points: 20, speedRange: [0.22, 0.28], scale: 1.02, weight: 2 },
  { key: 'shoe3', src: shoe3, points: 20, speedRange: [0.22, 0.29], scale: 1,    weight: 2 },
  { key: 'shoe4', src: shoe4, points: 10, speedRange: [0.2,  0.25], scale: 1,    weight: 3 },
  { key: 'shoe5', src: shoe5, points: 50, speedRange: [0.25, 0.31], scale: 1.04, weight: 1 },
  { key: 'shoe6', src: shoe6, points: 50, speedRange: [0.26, 0.32], scale: 1.04, weight: 1 },
]

function randomBetween(min, max) { return min + Math.random() * (max - min) }

function pickWeightedType() {
  const pool = ITEM_TYPES.flatMap((t) => Array.from({ length: t.weight }, () => t))
  return pool[Math.floor(Math.random() * pool.length)]
}

function createItem(seed) {
  const type = pickWeightedType()
  return {
    id:       `${type.key}-${seed}-${Math.random().toString(36).slice(2, 7)}`,
    type,
    x:        randomBetween(0.1, 0.9),
    y:        -0.16,
    rotation: randomBetween(-14, 14),
    speed:    randomBetween(type.speedRange[0], type.speedRange[1]),
  }
}

function createGoldenItem(seed) {
  return {
    id:       `golden-${seed}-${Math.random().toString(36).slice(2, 7)}`,
    type:     { key: 'golden', src: shoe5, points: 100, scale: 1.3 },
    x:        randomBetween(0.15, 0.85),
    y:        -0.16,
    rotation: randomBetween(-14, 14),
    speed:    randomBetween(0.28, 0.32),
    golden:   true,
  }
}

function isColliding(item, playerX, boardRect) {
  const itemX    = item.x * boardRect.width
  const itemY    = item.y * boardRect.height
  const playerPx = playerX * boardRect.width
  const playerPy = boardRect.height - PLAYER_Y_OFFSET
  const dx = Math.abs(itemX - playerPx)
  const dy = Math.abs(itemY - playerPy)
  return dx < ITEM_SIZE * 0.5 + PLAYER_WIDTH * 0.2 && dy < ITEM_SIZE * 0.4 + PLAYER_HEIGHT * 0.18
}

async function requestMotionPermission() {
  if (typeof window === 'undefined' || !window.DeviceOrientationEvent) return 'unsupported'
  const ev = window.DeviceOrientationEvent
  if (typeof ev.requestPermission === 'function') {
    try {
      const r = await ev.requestPermission()
      return r === 'granted' ? 'granted' : 'denied'
    } catch { return 'denied' }
  }
  return 'granted'
}

export default function AsicsRunnerPlay() {
  const navigate = useNavigate()

  const boardRef           = useRef(null)
  const skyCanvasRef       = useRef(null)
  const sunCanvasRef       = useRef(null)
  const dustCanvasRef      = useRef(null)
  const confettiCanvasRef  = useRef(null)
  const screenRef          = useRef('countdown')
  const rafRef             = useRef(0)
  const itemSeedRef        = useRef(0)
  const playerXRef         = useRef(0.5)
  const controlAxisRef     = useRef(0)
  const pointerTargetRef   = useRef(null)
  const elapsedRef         = useRef(0)
  const spawnRef           = useRef(0)
  const facingRef          = useRef(1)
  const pointerDownRef     = useRef(false)
  const burstsRef          = useRef([])
  const comboRef           = useRef(0)
  const goldenSpawnedRef   = useRef(false)
  const goldenSpawnTimeRef = useRef(randomBetween(8, 18))
  const lastCatchTimeRef   = useRef(0)

  const [screen,    setScreen]    = useState('countdown')
  const [countdown, setCountdown] = useState(3)
  const [combo,     setCombo]     = useState(0)
  const [playerX,   setPlayerX]   = useState(0.5)
  const [items,     setItems]     = useState([])
  const [score,     setScore]     = useState(0)
  const [timeLeft,  setTimeLeft]  = useState(GAME_DURATION)
  const [elapsed,   setElapsed]   = useState(0)
  const [facing,    setFacing]    = useState(1)
  const [lastCatch, setLastCatch] = useState(null)
  const [size,      setSize]      = useState({ width: 390, height: 760 })

  useEffect(() => {
    const update = () => {
      if (!boardRef.current) return
      const r = boardRef.current.getBoundingClientRect()
      setSize({ width: r.width, height: r.height })
    }
    update()
    window.addEventListener('resize', update)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null
    if (ro && boardRef.current) ro.observe(boardRef.current)
    return () => { window.removeEventListener('resize', update); ro?.disconnect() }
  }, [])

  useEffect(() => {
    const onOri = (e) => {
      const g = Number.isFinite(e.gamma) ? e.gamma : 0
      controlAxisRef.current = clamp(g / 27, -1, 1)
    }
    window.addEventListener('deviceorientation', onOri, true)
    return () => window.removeEventListener('deviceorientation', onOri, true)
  }, [])

  useEffect(() => {
    const down = (e) => {
      const k = e.key.toLowerCase()
      if (e.key === 'ArrowLeft'  || k === 'a') controlAxisRef.current = -1
      if (e.key === 'ArrowRight' || k === 'd') controlAxisRef.current =  1
    }
    const up = (e) => {
      if (['arrowleft','arrowright','a','d'].includes(e.key.toLowerCase())) controlAxisRef.current = 0
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup',   up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  }, [])

  useEffect(() => { requestMotionPermission() }, [])

  useEffect(() => { screenRef.current = screen }, [screen])

  /* ── Countdown 3-2-1 ── */
  useEffect(() => {
    if (screen !== 'countdown') return
    let n = 3
    setCountdown(3)
    let t
    const tick = () => {
      n--
      if (n > 0) { setCountdown(n); t = setTimeout(tick, 1000) }
      else { setCountdown(0); t = setTimeout(() => setScreen('playing'), 700) }
    }
    t = setTimeout(tick, 1000)
    return () => clearTimeout(t)
  }, [screen])

  /* ── Sky: clouds ── */
  useEffect(() => {
    const canvas = skyCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    function resize() {
      if (!boardRef.current) return
      const r = boardRef.current.getBoundingClientRect()
      canvas.width  = r.width
      canvas.height = r.height
    }
    resize()
    const ro = new ResizeObserver(resize)
    if (boardRef.current) ro.observe(boardRef.current)

    const rand = (a, b) => a + Math.random() * (b - a)

    const PUFFS = [
      [ 0,      0,     0.50],
      [-0.28,   0.06,  0.32],
      [ 0.24,   0.08,  0.28],
      [-0.06,  -0.30,  0.26],
      [-0.42,   0.10,  0.20],
      [ 0.38,   0.12,  0.19],
    ]

    function drawCloud(cx, cy, cw, alpha) {
      for (const [ox, oy, rf] of PUFFS) {
        const px = cx + ox * cw
        const py = cy + oy * cw
        const r  = rf * cw
        const g  = ctx.createRadialGradient(px, py, 0, px, py, r)
        g.addColorStop(0,    `rgba(255,255,255,${alpha})`)
        g.addColorStop(0.45, `rgba(255,255,255,${(alpha * 0.55).toFixed(3)})`)
        g.addColorStop(1,    'rgba(255,255,255,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(px, py, r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const LAYERS = [
      { speed: 16, alphaRange: [0.14, 0.22], wRange: [0.14, 0.24], yRange: [0.04, 0.55], count: 6 },
      { speed: 32, alphaRange: [0.20, 0.30], wRange: [0.20, 0.36], yRange: [0.08, 0.62], count: 5 },
      { speed: 52, alphaRange: [0.25, 0.38], wRange: [0.30, 0.46], yRange: [0.04, 0.45], count: 3 },
    ]

    const clouds = LAYERS.flatMap((L) =>
      Array.from({ length: L.count }, () => ({
        x:     Math.random(),
        y:     rand(...L.yRange),
        w:     rand(...L.wRange),
        alpha: rand(...L.alphaRange),
        speed: L.speed * rand(0.8, 1.2),
        L,
      }))
    )

    let skyRaf = 0
    let lastTs = performance.now()

    function skyLoop(ts) {
      const dt = Math.min(0.05, (ts - lastTs) / 1000)
      lastTs = ts
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)

      for (const c of clouds) {
        c.x -= (c.speed / W) * dt
        const cw = c.w * W
        const cx = c.x * W
        const cy = c.y * H
        if (cx + cw * 0.6 < 0) {
          c.x     = 1 + rand(0.05, 0.25)
          c.y     = rand(...c.L.yRange)
          c.w     = rand(...c.L.wRange)
          c.alpha = rand(...c.L.alphaRange)
        }
        drawCloud(cx, cy, cw, c.alpha)
      }

      skyRaf = requestAnimationFrame(skyLoop)
    }

    skyRaf = requestAnimationFrame(skyLoop)
    return () => { cancelAnimationFrame(skyRaf); ro.disconnect() }
  }, [])

  /* ── Sunset light rays ── */
  useEffect(() => {
    const canvas = sunCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    function resize() {
      if (!boardRef.current) return
      const r = boardRef.current.getBoundingClientRect()
      canvas.width  = r.width
      canvas.height = r.height
    }
    resize()
    const ro = new ResizeObserver(resize)
    if (boardRef.current) ro.observe(boardRef.current)

    const RAY_COUNT = 9
    const rays = Array.from({ length: RAY_COUNT }, (_, i) => ({
      baseAngle: (i / RAY_COUNT) * Math.PI * 2,
      halfWidth: 0.05 + Math.random() * 0.09,
      baseAlpha: 0.028 + Math.random() * 0.048,
      phase:     Math.random() * Math.PI * 2,
    }))

    let sunRaf = 0
    let lastTs = performance.now()
    let time   = 0

    function sunLoop(ts) {
      const dt = Math.min(0.05, (ts - lastTs) / 1000)
      lastTs = ts
      time  += dt
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)

      // Sun position — upper-right, slightly off screen
      const sx = W * 0.72
      const sy = H * -0.06
      const maxLen = Math.hypot(W, H) * 1.5

      // Slow "sunset breath" pulse
      const gPulse = 0.5 + 0.5 * Math.sin(time * 0.28)
      const rot    = time * 0.008

      // Light rays
      for (const ray of rays) {
        const angle     = ray.baseAngle + rot
        const iPulse    = 0.5 + 0.5 * Math.sin(time * 0.42 + ray.phase)
        const hw        = ray.halfWidth + iPulse * 0.022
        const alpha     = ray.baseAlpha + gPulse * 0.026

        ctx.save()
        ctx.beginPath()
        ctx.moveTo(sx, sy)
        ctx.lineTo(sx + Math.cos(angle - hw) * maxLen, sy + Math.sin(angle - hw) * maxLen)
        ctx.lineTo(sx + Math.cos(angle + hw) * maxLen, sy + Math.sin(angle + hw) * maxLen)
        ctx.closePath()

        const g = ctx.createRadialGradient(sx, sy, W * 0.02, sx, sy, maxLen * 0.88)
        g.addColorStop(0,    `rgba(255,215,80,${alpha.toFixed(3)})`)
        g.addColorStop(0.22, `rgba(255,175,50,${(alpha * 0.72).toFixed(3)})`)
        g.addColorStop(0.58, `rgba(255,140,30,${(alpha * 0.32).toFixed(3)})`)
        g.addColorStop(1,    'rgba(240,100,20,0)')
        ctx.fillStyle = g
        ctx.fill()
        ctx.restore()
      }

      // Warm ambient glow centered on the sun
      const gAlpha = 0.09 + gPulse * 0.07
      const gRad   = W * (0.62 + gPulse * 0.08)
      const amb    = ctx.createRadialGradient(sx, sy, 0, sx, sy, gRad)
      amb.addColorStop(0,    `rgba(255,235,120,${gAlpha.toFixed(3)})`)
      amb.addColorStop(0.32, `rgba(255,185,65,${(gAlpha * 0.58).toFixed(3)})`)
      amb.addColorStop(0.68, `rgba(255,140,35,${(gAlpha * 0.2).toFixed(3)})`)
      amb.addColorStop(1,    'rgba(240,100,20,0)')
      ctx.fillStyle = amb
      ctx.beginPath()
      ctx.arc(sx, sy, gRad, 0, Math.PI * 2)
      ctx.fill()

      sunRaf = requestAnimationFrame(sunLoop)
    }

    sunRaf = requestAnimationFrame(sunLoop)
    return () => { cancelAnimationFrame(sunRaf); ro.disconnect() }
  }, [])

  /* ── Dust particles + speed burst on catch ── */
  useEffect(() => {
    const canvas = dustCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    function resize() {
      if (!boardRef.current) return
      const r = boardRef.current.getBoundingClientRect()
      canvas.width  = r.width
      canvas.height = r.height
    }
    resize()
    const ro = new ResizeObserver(resize)
    if (boardRef.current) ro.observe(boardRef.current)

    const particles = []
    let dustRaf   = 0
    let lastTs    = performance.now()
    let spawnTick = 0

    function dustLoop(ts) {
      const dt = Math.min(0.05, (ts - lastTs) / 1000)
      lastTs = ts
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)

      if (screenRef.current === 'playing') {
        spawnTick += dt
        if (spawnTick > 0.07) {
          spawnTick = 0
          const px = playerXRef.current * W
          const py = H - PLAYER_Y_OFFSET + 14
          for (let i = 0; i < 2; i++) {
            const side = i === 0 ? -1 : 1
            particles.push({
              x:    px + side * (Math.random() * 14 + 6),
              y:    py + Math.random() * 6,
              vx:   side * (Math.random() * 28 + 12),
              vy:   -(Math.random() * 18 + 4),
              life: 1,
              r:    Math.random() * 3.5 + 1.5,
            })
          }
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x    += p.vx * dt
        p.y    += p.vy * dt
        p.vy   += 30 * dt
        p.life -= dt * 2.8
        if (p.life <= 0) { particles.splice(i, 1); continue }

        const alpha = p.life * 0.55
        const r     = p.r * (0.4 + p.life * 0.6)
        const g     = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r)
        g.addColorStop(0, `rgba(200,220,255,${alpha.toFixed(3)})`)
        g.addColorStop(1, 'rgba(200,220,255,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fill()
      }

      /* ── Speed burst on catch ── */
      for (let i = burstsRef.current.length - 1; i >= 0; i--) {
        const b        = burstsRef.current[i]
        const progress = (performance.now() - b.createdAt) / 680
        if (progress >= 1) { burstsRef.current.splice(i, 1); continue }
        const alpha = 1 - progress
        const maxR  = 84
        ctx.save()
        ctx.lineCap = 'round'

        for (const [delay, speed, rgb] of [
          [0,    1.10, '255,255,255'],
          [0.10, 0.85, '227,24,55'],
        ]) {
          const rp = Math.max(0, (progress - delay) / (1 - delay))
          if (rp <= 0 || rp >= 1) continue
          ctx.beginPath()
          ctx.arc(b.x, b.y, rp * maxR * speed, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${rgb},${((1 - rp) * 0.72).toFixed(2)})`
          ctx.lineWidth   = (1 - rp) * 4.5 + 0.8
          ctx.stroke()
        }

        for (const line of b.lines) {
          const innerR = progress * maxR * 0.08
          const outerR = progress * maxR * line.len
          const lx1 = b.x + Math.cos(line.angle) * innerR
          const ly1 = b.y + Math.sin(line.angle) * innerR
          const lx2 = b.x + Math.cos(line.angle) * outerR
          const ly2 = b.y + Math.sin(line.angle) * outerR
          const lGrd = ctx.createLinearGradient(lx1, ly1, lx2, ly2)
          lGrd.addColorStop(0,    `rgba(255,255,255,${alpha.toFixed(2)})`)
          lGrd.addColorStop(0.45, `rgba(255,80,20,${(alpha * 0.9).toFixed(2)})`)
          lGrd.addColorStop(1,    `rgba(227,24,55,${(alpha * 0.65).toFixed(2)})`)
          ctx.beginPath()
          ctx.moveTo(lx1, ly1)
          ctx.lineTo(lx2, ly2)
          ctx.strokeStyle = lGrd
          ctx.lineWidth   = line.thick * (1 - progress) + 0.5
          ctx.stroke()
        }

        for (const line of b.secondary) {
          const sp     = Math.min(1, progress * 1.3)
          const innerR = sp * maxR * 0.18
          const outerR = sp * maxR * line.len
          ctx.beginPath()
          ctx.moveTo(b.x + Math.cos(line.angle) * innerR, b.y + Math.sin(line.angle) * innerR)
          ctx.lineTo(b.x + Math.cos(line.angle) * outerR, b.y + Math.sin(line.angle) * outerR)
          ctx.strokeStyle = `rgba(255,160,40,${(alpha * 0.65).toFixed(2)})`
          ctx.lineWidth   = 1.5 * (1 - progress) + 0.3
          ctx.stroke()
        }

        for (const sp of b.sparkles) {
          const sp2  = Math.min(1, progress * 1.4)
          const sr   = sp2 * maxR * sp.dist
          const sAlp = Math.max(0, (1 - sp2 * 1.2)) * 0.9
          if (sAlp < 0.02) continue
          ctx.beginPath()
          ctx.arc(
            b.x + Math.cos(sp.angle) * sr,
            b.y + Math.sin(sp.angle) * sr,
            sp.size * (1 - sp2 * 0.8),
            0, Math.PI * 2
          )
          ctx.fillStyle = `rgba(255,220,100,${sAlp.toFixed(2)})`
          ctx.fill()
        }

        const flashR = (1 - Math.pow(progress, 0.4)) * 28
        const flashA = Math.max(0, 1 - progress * 3)
        if (flashA > 0) {
          const fGrd = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, flashR)
          fGrd.addColorStop(0,    `rgba(255,255,255,${flashA.toFixed(2)})`)
          fGrd.addColorStop(0.35, `rgba(255,200,100,${(flashA * 0.85).toFixed(2)})`)
          fGrd.addColorStop(0.70, `rgba(255,60,20,${(flashA * 0.55).toFixed(2)})`)
          fGrd.addColorStop(1,    'rgba(227,24,55,0)')
          ctx.fillStyle = fGrd
          ctx.beginPath()
          ctx.arc(b.x, b.y, flashR, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      }

      dustRaf = requestAnimationFrame(dustLoop)
    }

    dustRaf = requestAnimationFrame(dustLoop)
    return () => { cancelAnimationFrame(dustRaf); ro.disconnect() }
  }, [])

  /* ── Confetti at game end ── */
  useEffect(() => {
    if (screen !== 'finished') return
    const canvas = confettiCanvasRef.current
    if (!canvas || !boardRef.current) return
    const ctx = canvas.getContext('2d')
    const r = boardRef.current.getBoundingClientRect()
    canvas.width  = r.width
    canvas.height = r.height

    let particleCount, colors
    if (score < 80) {
      particleCount = 40
      colors = ['rgba(180,180,200,0.9)', 'rgba(150,150,170,0.8)', 'rgba(210,210,230,0.7)']
    } else if (score < 250) {
      particleCount = 90
      colors = ['rgba(0,61,165,0.9)', 'rgba(0,26,94,0.85)', 'rgba(255,255,255,0.9)', 'rgba(0,100,220,0.8)']
    } else {
      particleCount = 140
      colors = ['rgba(255,215,0,0.9)', 'rgba(227,24,55,0.9)', 'rgba(255,255,255,0.95)', 'rgba(255,165,0,0.85)']
    }

    const particles = Array.from({ length: particleCount }, () => ({
      x:        Math.random() * canvas.width,
      y:        -Math.random() * canvas.height * 0.5,
      vx:       (Math.random() - 0.5) * 160,
      vy:       Math.random() * 160 + 40,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 420,
      w:        Math.random() * 10 + 5,
      h:        Math.random() * 6 + 3,
      color:    colors[Math.floor(Math.random() * colors.length)],
      life:     1,
    }))

    let confRaf = 0
    let lastTs  = performance.now()

    function confettiLoop(ts) {
      const dt = Math.min(0.05, (ts - lastTs) / 1000)
      lastTs = ts
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false
      for (const p of particles) {
        p.x        += p.vx * dt
        p.y        += p.vy * dt
        p.vy       += 90 * dt
        p.rotation += p.rotSpeed * dt
        p.life     -= dt * 0.2
        if (p.y >= canvas.height + 20 || p.life <= 0) continue
        alive = true
        ctx.save()
        ctx.globalAlpha = Math.max(0, p.life)
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      }
      if (alive) confRaf = requestAnimationFrame(confettiLoop)
    }

    confRaf = requestAnimationFrame(confettiLoop)
    return () => { cancelAnimationFrame(confRaf); ctx.clearRect(0, 0, canvas.width, canvas.height) }
  }, [screen, score])

  const resetGame = () => {
    cancelAnimationFrame(rafRef.current)
    itemSeedRef.current        = 0
    playerXRef.current         = 0.5
    controlAxisRef.current     = 0
    pointerTargetRef.current   = null
    elapsedRef.current         = 0
    spawnRef.current           = 0
    facingRef.current          = 1
    comboRef.current           = 0
    goldenSpawnedRef.current   = false
    goldenSpawnTimeRef.current = randomBetween(8, 18)
    lastCatchTimeRef.current   = 0
    setFacing(1); setPlayerX(0.5); setItems([]); setScore(0)
    setElapsed(0); setTimeLeft(GAME_DURATION); setLastCatch(null)
    setCombo(0)
  }

  /* ── Main game loop ── */
  useEffect(() => {
    if (screen !== 'playing') { cancelAnimationFrame(rafRef.current); return }
    let lastTs = performance.now()

    const loop = (ts) => {
      const dt = Math.min(0.04, (ts - lastTs) / 1000)
      lastTs = ts

      elapsedRef.current += dt
      spawnRef.current   += dt
      const remaining  = Math.max(0, GAME_DURATION - elapsedRef.current)
      const speedMult  = 1 + (elapsedRef.current / GAME_DURATION) * 0.8

      const prevX = playerXRef.current
      let nextX   = prevX

      if (pointerTargetRef.current !== null) {
        nextX += (pointerTargetRef.current - nextX) * Math.min(1, dt * 11)
      } else {
        nextX += controlAxisRef.current * dt * 0.62
      }
      nextX = clamp(nextX, 0.1, 0.9)

      if (nextX < prevX - 0.0005) { facingRef.current = -1; setFacing(-1) }
      else if (nextX > prevX + 0.0005) { facingRef.current = 1; setFacing(1) }

      playerXRef.current = nextX
      setPlayerX(nextX)
      setElapsed(elapsedRef.current)
      setTimeLeft(Math.ceil(remaining))

      setItems((cur) => {
        let upd = cur.map((it) => ({
          ...it,
          y:        it.y + it.speed * speedMult * dt,
          rotation: it.rotation + dt * 12,
        }))

        // Detect misses — items that fell off screen
        const missed = upd.filter((it) => it.y >= 1.18)
        if (missed.length > 0) {
          comboRef.current = 0
          setCombo(0)
        }

        upd = upd.filter((it) => it.y < 1.18)

        const caught = []
        upd = upd.filter((it) => {
          const hit = isColliding(it, nextX, size)
          if (hit) caught.push(it)
          return !hit
        })

        if (caught.length > 0) {
          comboRef.current += caught.length
          lastCatchTimeRef.current = performance.now() / 1000
          const mult      = comboRef.current >= 6 ? 3 : comboRef.current >= 3 ? 2 : 1
          const baseTotal = caught.reduce((s, it) => s + it.type.points, 0)
          const total     = baseTotal * mult
          setScore((p) => p + total)
          setLastCatch({ id: `${Date.now()}-${Math.random()}`, points: total, mult })
          setCombo(comboRef.current)
        }

        // Spawn golden shoe once in the 8-18 s window
        if (!goldenSpawnedRef.current && elapsedRef.current >= goldenSpawnTimeRef.current) {
          goldenSpawnedRef.current = true
          upd = [...upd, createGoldenItem(itemSeedRef.current++)]
        }

        if (spawnRef.current > randomBetween(0.42, 0.62)) {
          spawnRef.current = 0
          upd = [...upd, createItem(itemSeedRef.current++)]
        }

        return upd
      })

      if (remaining <= 0) { setScreen('finished'); cancelAnimationFrame(rafRef.current); return }
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [screen, size])

  useEffect(() => {
    if (!lastCatch) return
    const t = setTimeout(() => setLastCatch(null), 700)
    return () => clearTimeout(t)
  }, [lastCatch])

  useEffect(() => {
    if (!lastCatch || !boardRef.current) return
    const r = boardRef.current.getBoundingClientRect()
    burstsRef.current.push({
      x:         playerXRef.current * r.width,
      y:         r.height - PLAYER_Y_OFFSET,
      createdAt: performance.now(),
      lines:     Array.from({ length: 10 }, (_, j) => ({
        angle: (j / 10) * Math.PI * 2 + (Math.random() - 0.5) * 0.4,
        len:   0.62 + Math.random() * 0.38,
        thick: 2.5 + Math.random() * 2,
      })),
      secondary: Array.from({ length: 6 }, (_, j) => ({
        angle: ((j + 0.5) / 6) * Math.PI * 2 + (Math.random() - 0.5) * 0.3,
        len:   0.28 + Math.random() * 0.24,
      })),
      sparkles:  Array.from({ length: 8 }, () => ({
        angle: Math.random() * Math.PI * 2,
        dist:  0.65 + Math.random() * 0.35,
        size:  2.5 + Math.random() * 2.5,
      })),
    })
  }, [lastCatch])

  const runnerFrame = RUN_FRAMES[Math.floor(elapsed * 10) % RUN_FRAMES.length]

  const updatePointerTarget = (clientX) => {
    if (!boardRef.current || screen !== 'playing') return
    const rect = boardRef.current.getBoundingClientRect()
    pointerTargetRef.current = clamp((clientX - rect.left) / rect.width, 0.1, 0.9)
  }

  const comboMult = combo >= 6 ? 3 : combo >= 3 ? 2 : 1

  return (
    <main className="ar-page-shell">
      <section className="ar-phone-stage">
        <div
          ref={boardRef}
          className="ar-game-board"
          onPointerDown={(e) => { pointerDownRef.current = true;  updatePointerTarget(e.clientX) }}
          onPointerMove={(e) => { if (pointerDownRef.current) updatePointerTarget(e.clientX) }}
          onPointerUp={() =>   { pointerDownRef.current = false; pointerTargetRef.current = null }}
          onPointerLeave={() => { pointerDownRef.current = false; pointerTargetRef.current = null }}
        >
          <img className="ar-board-background" src={cieloImg} alt="" draggable="false" />
          <canvas ref={skyCanvasRef} className="ar-sky-canvas" />

          <div className="ar-layer-wrap ar-layer-buildings">
            <div className="ar-layer-strip">
              <img src={edificiosImg} alt="" draggable="false" />
              <img src={edificiosImg} alt="" draggable="false" />
            </div>
          </div>

          <div className="ar-layer-wrap ar-layer-foreground">
            <div className="ar-layer-strip">
              <img src={carreteraImg} alt="" draggable="false" />
              <img src={carreteraImg} alt="" draggable="false" />
            </div>
          </div>

          <canvas ref={sunCanvasRef} className="ar-sun-canvas" />
          <div className="ar-board-top-glow" />
          <div className="ar-board-bottom-glow" />

          <div className="ar-road-line" />
          <img className="ar-brand-logo" src={asicsLogo} alt="ASICS" draggable="false" />

          <div className="ar-hud-card ar-hud-left">
            <span className="ar-hud-kicker">puntaje</span>
            <strong>{score}</strong>
            <span className="ar-hud-sub">puntos</span>
          </div>

          <div className={`ar-hud-card ar-hud-right${timeLeft <= 5 && screen === 'playing' ? ' ar-hud--alert' : ''}`}>
            <span className="ar-hud-kicker">tiempo</span>
            <strong>{String(timeLeft).padStart(2, '0')}</strong>
            <span className="ar-hud-sub">seg</span>
          </div>

          <img className="ar-mid-logo" src={asicsLogo} alt="ASICS" draggable="false" />

          {combo >= 3 && screen === 'playing' && (
            <div key={comboMult} className="ar-combo-badge">
              ×{comboMult} COMBO
            </div>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className={`ar-falling-item${item.golden ? ' ar-golden-item' : ''}`}
              style={{
                left:      `${item.x * 100}%`,
                top:       `${item.y * 100}%`,
                width:     `${ITEM_SIZE * item.type.scale}px`,
                height:    `${ITEM_SIZE * item.type.scale}px`,
                transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
              }}
            >
              <img src={item.type.src} alt="tenis" draggable="false" />
            </div>
          ))}

          {lastCatch && (
            <div className="ar-catch-pop" key={lastCatch.id}>
              +{lastCatch.points}
              {lastCatch.mult > 1 && <span className="ar-catch-mult"> ×{lastCatch.mult}</span>}
            </div>
          )}

          <canvas ref={dustCanvasRef} className="ar-dust-canvas" />
          <canvas ref={confettiCanvasRef} className="ar-confetti-canvas" />

          <img
            className="ar-runner-sprite"
            src={runnerFrame}
            alt="Runner"
            draggable="false"
            style={{
              left:      `${playerX * 100}%`,
              width:     `${PLAYER_WIDTH}px`,
              height:    `${PLAYER_HEIGHT}px`,
              transform: `translate(-50%, 0) scaleX(${facing})`,
            }}
          />

          {screen === 'countdown' && (
            <div className="ar-countdown">
              <div key={countdown} className="ar-countdown__num">
                {countdown > 0 ? countdown : '¡YA!'}
              </div>
            </div>
          )}

          {screen === 'finished' && (
            <div className="ar-overlay-card ar-finish-card">
              <span className="ar-overlay-badge">resultado</span>
              <h2>¡Buen trabajo!</h2>
              <p>Este puntaje es para revisión del cliente.</p>
              <div className="ar-final-score">{score} pts</div>
              <div className="ar-button-row">
                <button className="ar-ghost-button" onClick={() => navigate('/asics-runner')}>
                  Volver
                </button>
                <button className="ar-cta-button" onClick={() => { resetGame(); setScreen('countdown') }}>
                  Jugar otra vez
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
