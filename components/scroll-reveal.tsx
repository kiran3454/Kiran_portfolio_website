"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right" | "scale"
  delay?: number
  className?: string
}

export function ScrollReveal({ children, direction = "up", delay = 0, className = "" }: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("revealed")
            }, delay)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    observer.observe(element)

    return () => observer.unobserve(element)
  }, [delay])

  const getRevealClass = () => {
    switch (direction) {
      case "left":
        return "scroll-reveal-left"
      case "right":
        return "scroll-reveal-right"
      case "scale":
        return "scroll-reveal-scale"
      default:
        return "scroll-reveal"
    }
  }

  return (
    <div ref={elementRef} className={`${getRevealClass()} ${className}`}>
      {children}
    </div>
  )
}
