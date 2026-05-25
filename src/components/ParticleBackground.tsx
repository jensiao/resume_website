import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vy: number
  size: number
  opacity: number
  speed: number
  life: number
  maxLife: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -999, y: -999 })
  const animRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    const spawnParticle = (): Particle => {
      const baseY = mouseRef.current.y !== -999 ? mouseRef.current.y + (Math.random() - 0.5) * 300 : Math.random() * h
      return {
        x: -30,
        y: Math.max(0, Math.min(h, baseY)),
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2.2 + 0.6,
        opacity: Math.random() * 0.55 + 0.2,
        speed: Math.random() * 1.2 + 0.6,
        life: 0,
        maxLife: Math.random() * 300 + 200,
      }
    }

    // Initialize with particles spread across the screen
    const initCount = 100
    particlesRef.current = Array.from({ length: initCount }, () => {
      const p = spawnParticle()
      p.x = Math.random() * w // spread across screen initially
      p.life = Math.random() * p.maxLife
      return p
    })

    const loop = () => {
      ctx.clearRect(0, 0, w, h)
      const particles = particlesRef.current
      const mouse = mouseRef.current

      // Spawn new particles continuously
      const spawnRate = 2
      for (let s = 0; s < spawnRate; s++) {
        particles.push(spawnParticle())
      }

      // Update & draw
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++

        if (p.life > p.maxLife) {
          particles.splice(i, 1)
          continue
        }

        // Move left to right, with slight vertical drift
        p.x += p.speed
        p.y += p.vy

        // Gentle pull toward mouse Y position
        if (mouse.y !== -999) {
          const dy = mouse.y - p.y
          p.vy += dy * 0.00015
          p.vy *= 0.995
        }

        // Remove if off screen
        if (p.x > w + 30 || p.y < -30 || p.y > h + 30) {
          particles.splice(i, 1)
          continue
        }

        // Fade in/out based on life
        const lifeRatio = p.life / p.maxLife
        const fade = lifeRatio < 0.1 ? lifeRatio / 0.1 : lifeRatio > 0.8 ? (1 - lifeRatio) / 0.2 : 1
        const alpha = p.opacity * fade

        // Core particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(210, 80%, 65%, ${alpha})`
        ctx.fill()

        // Trail / beam effect - elongated glow behind the particle
        const trailLen = p.speed * 18
        const gradient = ctx.createLinearGradient(p.x, p.y, p.x - trailLen, p.y)
        gradient.addColorStop(0, `hsla(210, 80%, 65%, ${alpha * 0.7})`)
        gradient.addColorStop(0.5, `hsla(210, 70%, 55%, ${alpha * 0.25})`)
        gradient.addColorStop(1, 'transparent')

        ctx.beginPath()
        ctx.ellipse(p.x - trailLen / 2, p.y, trailLen / 2 + p.size, p.size * 1.8, 0, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Outer glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(210, 80%, 60%, ${alpha * 0.08})`
        ctx.fill()
      }

      // Limit total particles
      while (particles.length > 200) {
        particles.shift()
      }

      animRef.current = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.75 }}
    />
  )
}
