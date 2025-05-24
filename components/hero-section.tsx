"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronDown, Plane, Calendar, Star, Camera } from "lucide-react"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [particleCount, setParticleCount] = useState(0)

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "اكتشف جمال روسيا",
      subtitle: "مع قاضي موسكو",
      description: "رحلات سياحية استثنائية إلى موسكو وسان بطرسبرغ وسوتشي مع خدمات عربية متكاملة",
      highlight: "أكثر من 5000 مسافر سعيد",
    },
    {
      image: "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "موسكو الساحرة",
      subtitle: "تنتظرك",
      description: "استكشف الكرملين والساحة الحمراء مع مرشدين يتحدثون العربية",
      highlight: "جولات يومية باللغة العربية",
    },
    {
      image: "https://images.unsplash.com/photo-1571406252267-79d4ac2a7c51?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "سان بطرسبرغ",
      subtitle: "مدينة القياصرة",
      description: "اكتشف قصور الهرمتاج وجمال العمارة الروسية الكلاسيكية",
      highlight: "قصور تاريخية مذهلة",
    },
  ]

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)

    if (typeof window !== "undefined") {
      setParticleCount(window.innerWidth < 768 ? 10 : 20)
    }

    return () => clearInterval(interval)
  }, [slides.length])

  const scrollToNext = () => {
    const nextSection = document.getElementById("about-section")
    nextSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1500 ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-sky-900/70 via-sunset-900/50 to-coral-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      ))}

      {/* Particle Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: particleCount }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Flag Accent */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-white via-sky-500 to-coral-500 opacity-90 shadow-lg" />

      {/* Main Content */}
      {/* ... (rest of your existing content remains unchanged) ... */}

      {/* Slide Indicators */}
      <div className="absolute bottom-24 sm:bottom-32 md:bottom-40 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 md:space-x-4 space-x-reverse">
        {slides.map((_, index) => (
          <Button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-500 border-2 ${index === currentSlide
                ? "bg-white border-white shadow-md scale-110"
                : "bg-white/30 border-white/40"
              }`}
          />
        ))}
      </div>

      {/* Scroll Down Button */}
      <Button
        onClick={scrollToNext}
        className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white"
      >
        <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8" />
      </Button>
    </section>
  )
}
