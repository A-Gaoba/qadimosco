"use client"
import { SectionObserver } from "@/components/section-observer"
import { Sparkles, ArrowLeft, MessageCircle, Calculator } from "lucide-react"

export function CTASection() {
  const handleWhatsAppContact = () => {
    const message = encodeURIComponent("مرحباً! أريد حجز رحلة إلى روسيا مع قاضي موسكو. يرجى مساعدتي في التخطيط 🇷🇺✈️")
    window.open(`https://wa.me/79177714832?text=${message}`, "_blank")
  }

  const handleQuoteRequest = () => {
    const message = encodeURIComponent(
      "مرحباً! أريد الحصول على عرض سعر شامل لرحلة إلى روسيا. يرجى إرسال التفاصيل والأسعار المتاحة 💰📋",
    )
    window.open(`https://wa.me/79177714832?text=${message}`, "_blank")
  }

  return (
    <section className="py-20 bg-gradient-to-r from-sky-600 via-sky-700 to-midnight-800 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div
          className="absolute top-10 right-20 w-32 h-32 bg-white/5 rounded-full animate-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-32 left-32 w-24 h-24 bg-sunset-400/10 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 right-40 w-20 h-20 bg-white/5 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-32 left-20 w-28 h-28 bg-coral-400/10 rounded-full animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="container-rtl text-center relative z-10">
        <SectionObserver>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-coral-400 ml-3 animate-pulse" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">سافر براحة واطمئنان</h2>
              <Sparkles className="w-8 h-8 text-coral-400 mr-3 animate-pulse" />
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-sunset-400 mb-4 md:mb-6">مع قاضي موسكو</h3>

            <p className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed opacity-90 px-4">
              احجز رحلتك الآن واستمتع بتجربة سياحية لا تُنسى في أجمل المدن الروسية مع خدمات عربية متكاملة
            </p>

            <div className="flex flex-col gap-4 md:gap-6 justify-center items-center">
              <button
                onClick={handleWhatsAppContact}
                className="bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white font-bold px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg rounded-xl shadow-2xl hover:shadow-coral-500/25 transition-all duration-300 transform hover:scale-105 animate-coral-pulse group w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
                تواصل معنا الآن
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <button
                onClick={handleQuoteRequest}
                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 px-10 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 group"
              >
                <Calculator className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform duration-300" />
                احصل على عرض سعر
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 md:mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 opacity-80">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-coral-400 rounded-full ml-2 animate-pulse"></div>
                <span className="text-sm">خدمة 24/7</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-sunset-400 rounded-full ml-2 animate-pulse"></div>
                <span className="text-sm">ضمان أفضل الأسعار</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-sky-400 rounded-full ml-2 animate-pulse"></div>
                <span className="text-sm">إلغاء مجاني</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-coral-400 rounded-full ml-2 animate-pulse"></div>
                <span className="text-sm">واتساب: +79177714832</span>
              </div>
            </div>
          </div>
        </SectionObserver>
      </div>
    </section>
  )
}
