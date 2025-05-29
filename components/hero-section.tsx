"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronDown, Plane, Calendar, Star, Camera } from "lucide-react"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1513326738677-b964603b136d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "اكتشف جمال روسيا",
      subtitle: "مع قاضي موسكو",
      description: "رحلات سياحية استثنائية إلى موسكو وسان بطرسبرغ وسوتشي مع خدمات عربية متكاملة",
      highlight: "أكثر من 5000 مسافر سعيد",
    },
    {
      image:
        "https://ainalarab.com/wp-content/uploads/2024/03/e3d7ccea-6e3e-4998-9b90-1dd09db2921c.jpeg",
      title: "موسكو الساحرة",
      subtitle: "تنتظرك",
      description: "استكشف الكرملين والساحة الحمراء مع مرشدين يتحدثون العربية",
      highlight: "جولات يومية باللغة العربية",
    },
    {
      image:
        "https://www.ambassadorcruiseline.com/_astro/1200x675_Z1KLv8g.webp",
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
    return () => clearInterval(interval)
  }, [slides.length])

  const scrollToNext = () => {
    const nextSection = document.getElementById("about-section")
    nextSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Slides with Real Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1500 ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${slide.image}')`,
            }}
          />
          {/* Enhanced Overlay with 60-30-10 Colors */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-900/70 via-sunset-900/50 to-coral-900/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>
      ))}

      {/* Animated Particles - Responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 sm:w-2 sm:h-2 bg-white/20 rounded-full animate-float ${i >= 10 ? "hidden sm:block" : ""
              }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Russian Flag Accent with 60-30-10 Colors */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-white via-sky-500 to-coral-500 opacity-90 shadow-lg"></div>

      {/* Main Content with Enhanced Typography - Mobile Responsive */}
      <div className="relative z-10 text-center text-white container-rtl px-4 sm:px-6">
        <div
          className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Enhanced Badge - Mobile Responsive */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-xl rounded-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 mb-4 sm:mb-6 md:mb-8 animate-fade-in-up border border-white/20 shadow-2xl">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-sunset-300 fill-current ml-2 sm:ml-3" />
            <span className="text-sm sm:text-base md:text-lg font-semibold tracking-wide">
              {slides[currentSlide].highlight}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-coral-500/20 rounded-full"></div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black mb-4 sm:mb-6 md:mb-8 lg:mb-12 leading-tight tracking-tight">
            <span
              className="block animate-fade-in-up drop-shadow-2xl text-glow-primary font-arabic"
              style={{ animationDelay: "0.2s" }}
            >
              {slides[currentSlide].title}
            </span>
            <span
              className="block text-sunset-300 animate-fade-in-up drop-shadow-2xl text-glow-secondary font-arabic"
              style={{ animationDelay: "0.4s" }}
            >
              {slides[currentSlide].subtitle}
            </span>
          </h1>

          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto animate-fade-in-up drop-shadow-lg font-light leading-relaxed px-2 sm:px-4"
            style={{ animationDelay: "0.6s" }}
          >
            {slides[currentSlide].description}
          </p>

          {/* Enhanced CTA Buttons - Mobile Responsive */}
          <div
            className="flex flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8 justify-center items-center animate-fade-in-up px-2 sm:px-4"
            style={{ animationDelay: "0.8s" }}
          >
            <Link href="/hotels" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-gradient-to-r from-coral-500 via-coral-600 to-coral-700 hover:from-coral-600 hover:via-coral-700 hover:to-coral-800 text-white text-sm sm:text-base md:text-lg lg:text-xl px-6 sm:px-8 md:px-12 lg:px-16 py-3 sm:py-4 md:py-6 lg:py-8 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl hover:shadow-coral-500/50 transition-all duration-300 transform hover:scale-105 animate-coral-pulse group border-2 border-coral-400/50 backdrop-blur-sm w-full sm:w-auto min-h-[44px]"
              >
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 ml-2 sm:ml-3 md:ml-4 group-hover:rotate-12 transition-transform duration-300" />
                ابدأ رحلتك الآن
                <Plane className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 mr-2 sm:mr-3 md:mr-4 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>
            <Link href="/activities" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-xl border-2 sm:border-3 border-white/40 text-white hover:bg-white/20 hover:border-white/60 text-sm sm:text-base md:text-lg lg:text-xl px-6 sm:px-8 md:px-12 lg:px-16 py-3 sm:py-4 md:py-6 lg:py-8 rounded-xl sm:rounded-2xl md:rounded-3xl transition-all duration-300 transform hover:scale-105 group shadow-2xl w-full sm:w-auto min-h-[44px]"
              >
                <Camera className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 ml-2 sm:ml-3 md:ml-4 group-hover:rotate-12 transition-transform duration-300" />
                استكشف الأنشطة
              </Button>
            </Link>
          </div>

          {/* Enhanced Trust Indicators - Mobile Responsive */}
          <div
            className="mt-6 sm:mt-8 md:mt-12 lg:mt-16 flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-10 animate-fade-in-up px-2 sm:px-4"
            style={{ animationDelay: "1s" }}
          >
            <div className="flex items-center bg-sky-500/20 backdrop-blur-xl rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 border border-sky-300/30 shadow-xl">
              <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-coral-400 rounded-full ml-2 sm:ml-3 animate-pulse shadow-lg"></div>
              <span className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold">خدمة 24/7</span>
            </div>
            <div className="flex items-center bg-sunset-500/20 backdrop-blur-xl rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 border border-sunset-300/30 shadow-xl">
              <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-coral-400 rounded-full ml-2 sm:ml-3 animate-pulse shadow-lg"></div>
              <span className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold">ضمان أفضل الأسعار</span>
            </div>
            <div className="flex items-center bg-coral-500/20 backdrop-blur-xl rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 border border-coral-300/30 shadow-xl">
              <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-sky-400 rounded-full ml-2 sm:ml-3 animate-pulse shadow-lg"></div>
              <span className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold">إلغاء مجاني</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Slide Indicators - Mobile Responsive */}
      <div className="absolute bottom-24 sm:bottom-32 md:bottom-40 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 md:space-x-4 space-x-reverse">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`relative transition-all duration-500 touch-manipulation ${index === currentSlide
              ? "w-8 sm:w-12 md:w-16 h-3 sm:h-4 md:h-5 bg-coral-500 rounded-full scale-110 sm:scale-125 shadow-2xl"
              : "w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 bg-white/50 hover:bg-white/70 rounded-full hover:scale-110"
              }`}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 bg-coral-500 rounded-full animate-pulse shadow-coral-500/50 shadow-lg"></div>
            )}
          </button>
        ))}
      </div>

      {/* Enhanced Scroll Indicator - Mobile Responsive */}
      {/* <button
        onClick={scrollToNext}
        className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 group touch-manipulation"
      >
        <div className="flex flex-col items-center text-white animate-bounce hover:text-coral-400 transition-colors duration-300">
          <span className="text-sm sm:text-base md:text-lg mb-2 sm:mb-3 opacity-90 group-hover:opacity-100 font-semibold">
            اكتشف المزيد
          </span>
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-2 sm:border-3 border-white/50 rounded-full flex items-center justify-center group-hover:border-coral-400 transition-all duration-300 backdrop-blur-sm bg-white/10 shadow-xl min-h-[44px] min-w-[44px]">
            <ChevronDown
              size={16}
              className="sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-y-1 transition-transform duration-300"
            />
          </div>
        </div>
      </button> */}
    </section>
  )
}
