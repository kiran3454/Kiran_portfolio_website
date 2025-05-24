"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface AnimatedTextProps {
  children: ReactNode
  className?: string
  delay?: number
  type?: "fade" | "slide" | "glow" | "typewriter"
}

export function AnimatedText({ children, className = "", delay = 0, type = "fade" }: AnimatedTextProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              switch (type) {
                case "glow":
                  entry.target.classList.add("animate-text-glow")
                  break
                case "slide":
                  entry.target.classList.add("animate-fade-in-up")
                  break
                case "typewriter":
                  entry.target.classList.add("animate-typewriter")
                  break
                default:
                  entry.target.classList.add("animate-fade-in-down")
              }
            }, delay)
          }
        })
      },
      {
        threshold: 0.5,
      },
    )

    observer.observe(element)

    return () => observer.unobserve(element)
  }, [delay, type])

  return (
    <div ref={elementRef} className={`opacity-0 ${className}`}>
      {children}
    </div>
  )
}
