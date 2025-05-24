"use client"

import { useEffect, useState } from "react"
import { Plane } from "lucide-react"

interface AnimatedPlaneProps {
  trigger?: boolean
  className?: string
  size?: number
}

export function AnimatedPlane({ trigger = false, className = "", size = 24 }: AnimatedPlaneProps) {
  const [isFlying, setIsFlying] = useState(false)

  useEffect(() => {
    if (trigger) {
      setIsFlying(true)
      const timer = setTimeout(() => setIsFlying(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [trigger])

  return (
    <div className={`relative ${className}`}>
      <Plane
        size={size}
        className={`text-sky-500 transition-all duration-300 ${
          isFlying ? "animate-plane-fly" : "animate-float"
        } ${trigger ? "text-gold-500" : ""}`}
      />
    </div>
  )
}
