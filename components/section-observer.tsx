"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface SectionObserverProps {
  children: ReactNode
  className?: string
  threshold?: number
}

export function SectionObserver({ children, className = "", threshold = 0.1 }: SectionObserverProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible")
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return (
    <div ref={ref} className={`fade-in-section ${className}`}>
      {children}
    </div>
  )
}
