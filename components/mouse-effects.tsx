"use client"

import { useEffect, useRef, useState } from "react"
import styles from "@/styles/mouse-effects.module.css"

// SimplexNoise implementation directly included to avoid external script loading issues
class SimplexNoise {
  private grad3: number[][]
  private p: number[]
  private perm: number[]
  private simplex: number[][]

  constructor(random = Math.random) {
    this.grad3 = [
      [1, 1, 0],
      [-1, 1, 0],
      [1, -1, 0],
      [-1, -1, 0],
      [1, 0, 1],
      [-1, 0, 1],
      [1, 0, -1],
      [-1, 0, -1],
      [0, 1, 1],
      [0, -1, 1],
      [0, 1, -1],
      [0, -1, -1],
    ]
    this.p = []
    for (let i = 0; i < 256; i++) {
      this.p[i] = Math.floor(random() * 256)
    }

    this.perm = []
    this.simplex = [
      [0, 1, 2, 3],
      [0, 1, 3, 2],
      [0, 0, 0, 0],
      [0, 2, 3, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 2, 3, 0],
      [0, 2, 1, 3],
      [0, 0, 0, 0],
      [0, 3, 1, 2],
      [0, 3, 2, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 3, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 2, 0, 3],
      [0, 0, 0, 0],
      [1, 0, 2, 3],
      [1, 0, 3, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 3, 0, 1],
      [2, 3, 1, 0],
      [1, 3, 0, 2],
      [1, 3, 2, 0],
      [2, 0, 3, 1],
      [0, 0, 0, 0],
      [2, 1, 3, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 0, 1, 3],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [3, 0, 1, 2],
      [3, 0, 2, 1],
      [0, 0, 0, 0],
      [3, 1, 2, 0],
      [2, 1, 0, 3],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [3, 1, 0, 2],
      [0, 0, 0, 0],
      [3, 2, 0, 1],
      [3, 2, 1, 0],
    ]

    // To remove the need for index wrapping, double the permutation table length
    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255]
    }
  }

  private dot(g: number[], x: number, y: number): number {
    return g[0] * x + g[1] * y
  }

  noise2D(xin: number, yin: number): number {
    let n0, n1, n2 // Noise contributions from the three corners
    // Skew the input space to determine which simplex cell we're in
    const F2 = 0.5 * (Math.sqrt(3.0) - 1.0)
    const s = (xin + yin) * F2 // Hairy factor for 2D
    const i = Math.floor(xin + s)
    const j = Math.floor(yin + s)
    const G2 = (3.0 - Math.sqrt(3.0)) / 6.0
    const t = (i + j) * G2
    const X0 = i - t // Unskew the cell origin back to (x,y) space
    const Y0 = j - t
    const x0 = xin - X0 // The x,y distances from the cell origin
    const y0 = yin - Y0

    // For the 2D case, the simplex shape is an equilateral triangle.
    // Determine which simplex we are in.
    let i1, j1 // Offsets for second (middle) corner of simplex in (i,j) coords
    if (x0 > y0) {
      i1 = 1
      j1 = 0
    } // lower triangle, XY order: (0,0)->(1,0)->(1,1)
    else {
      i1 = 0
      j1 = 1
    } // upper triangle, YX order: (0,0)->(0,1)->(1,1)

    // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
    // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
    // c = (3-sqrt(3))/6
    const x1 = x0 - i1 + G2 // Offsets for middle corner in (x,y) unskewed coords
    const y1 = y0 - j1 + G2
    const x2 = x0 - 1.0 + 2.0 * G2 // Offsets for last corner in (x,y) unskewed coords
    const y2 = y0 - 1.0 + 2.0 * G2

    // Work out the hashed gradient indices of the three simplex corners
    const ii = i & 255
    const jj = j & 255
    const gi0 = this.perm[ii + this.perm[jj]] % 12
    const gi1 = this.perm[ii + i1 + this.perm[jj + j1]] % 12
    const gi2 = this.perm[ii + 1 + this.perm[jj + 1]] % 12

    // Calculate the contribution from the three corners
    let t0 = 0.5 - x0 * x0 - y0 * y0
    if (t0 < 0) n0 = 0.0
    else {
      t0 *= t0
      n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0) // (x,y) of grad3 used for 2D gradient
    }

    let t1 = 0.5 - x1 * x1 - y1 * y1
    if (t1 < 0) n1 = 0.0
    else {
      t1 *= t1
      n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1)
    }

    let t2 = 0.5 - x2 * x2 - y2 * y2
    if (t2 < 0) n2 = 0.0
    else {
      t2 *= t2
      n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2)
    }

    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 70.0 * (n0 + n1 + n2)
  }
}

export function MouseEffects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [options] = useState({
    rainbow: false,
    circles: false,
    shadows: true,
    depth: true,
    organicShape: true,
    insetBorders: false,
    noiseFactor: 0.0005,
    maxParticlesPerFrame: 9,
    minParticleSize: 10,
    maxParticleSize: 90,
    zoomFactor: 1 / 5,
  })

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return

    let mouseX: number | null = null
    let mouseY: number | null = null
    let mousePosTimer: ReturnType<typeof setTimeout>
    let animationFrameId: number
    const container = containerRef.current
    const colors = [
      "rgb(0, 190, 255)",
      "rgb(255, 255, 255)",
      "rgb(0, 160, 255)",
      "rgb(20, 184, 166)", // Adding teal color to match the site theme
      "rgb(240, 245, 250)",
      "rgb(230, 60, 0)",
    ]

    const random = (min: number, max: number, round = false) => {
      const value = min + Math.random() * (max - min)
      return round ? Math.round(value) : value
    }

    const color = () => {
      return colors[random(0, colors.length - 1, true)]
    }

    const map = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
      return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
    }

    // Create a new SimplexNoise instance
    const simplex = new SimplexNoise()

    const createParticle = (index: number, x: number, y: number, hue: number, diameter: number) => {
      const particle = document.createElement("div")
      const particleCSS = particle.style
      particle.classList.add(styles.particle)

      const size = options.organicShape ? diameter : options.maxParticleSize
      const diameter_ = Math.max(options.minParticleSize, size) * options.zoomFactor
      const color_ = options.rainbow ? `hsl(${hue}deg, 60%, 70%)` : color()

      particleCSS.width = `${diameter_}vmin`
      particleCSS.height = `${diameter_}vmin`

      if (options.insetBorders) {
        particleCSS.border = `${10 * options.zoomFactor}vmin solid transparent`
        particleCSS.backgroundClip = `border-box`
      }

      if (!options.shadows) particleCSS.setProperty("--shadow-opacity", "0")
      if (!options.depth) particleCSS.setProperty("--depth-opacity", "0")

      particleCSS.backgroundColor = color_
      particleCSS.color = color_
      particleCSS.borderRadius = options.circles ? "50%" : `${random(10, 50)}%`
      particleCSS.left = `${x}px`
      particleCSS.top = `${y}px`

      const shiftX = random(-100, 100) * options.zoomFactor
      const shiftY = random(-100, 100) * options.zoomFactor
      const delay = `${random(10, 40)}ms`

      particleCSS.setProperty("--i", delay)
      particleCSS.setProperty("--shiftX", shiftX + "vmin")
      particleCSS.setProperty("--shiftY", shiftY + "vmin")

      particle.addEventListener("animationend", () => particle.remove())

      return particle
    }

    const drawParticles = (x: number, y: number, hue: number, d: number) => {
      const particleCount = random(1, options.maxParticlesPerFrame, true)
      const particleFragment = new DocumentFragment()

      for (let i = 0; i < particleCount; ++i) particleFragment.appendChild(createParticle(i, x, y, hue, d))

      container.appendChild(particleFragment)
    }

    const render = (time: number) => {
      try {
        // Draw particles if we have mouse coordinates, even if the mouse isn't moving
        if (mouseX !== null && mouseY !== null) {
          const hue = map(mouseX, 0, window.innerWidth, 0, 360)
          const diameter = map(mouseY, 0, window.innerHeight, 0, options.maxParticleSize)

          drawParticles(mouseX, mouseY, hue, diameter)
        }

        // Continue the animation loop
        animationFrameId = requestAnimationFrame(render)
      } catch (error) {
        console.error("Error in render function:", error)
      }
    }

    const clearMousePositions = (duration: number) => {
      if (mousePosTimer) clearTimeout(mousePosTimer)
      mousePosTimer = setTimeout(() => {
        mouseX = null
        mouseY = null
        document.body.style.cursor = "default"
      }, duration)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      document.body.style.cursor = "none"
      clearMousePositions(3000) // Increased from 1000 to 3000ms
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseX = e.touches[0].clientX
        mouseY = e.touches[0].clientY
        clearMousePositions(1000)
      }
    }

    const handleMouseOut = () => clearMousePositions(100)
    const handleTouchEnd = () => clearMousePositions(10)

    // Add a mouseenter event to start showing particles as soon as the mouse enters
    const handleMouseEnter = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      document.body.style.cursor = "none"
      clearMousePositions(3000)
    }

    // Add event listeners
    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("touchmove", handleTouchMove)
    container.addEventListener("mouseout", handleMouseOut)
    container.addEventListener("touchend", handleTouchEnd)

    // Start the animation
    setTimeout(() => {
      animationFrameId = requestAnimationFrame(render)
    }, 400)

    // Update the cleanup to remove the new event listener
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("mouseout", handleMouseOut)
      container.removeEventListener("touchend", handleTouchEnd)
    }
  }, [options])

  return <div className={styles.particles} ref={containerRef}></div>
}
