"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SectionObserver } from "@/components/section-observer"
import { MessageCircle, ArrowLeft, Star, Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      clientName: "أحمد محمد",
      location: "الرياض، السعودية",
      whatsappImage:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      date: "15 نوفمبر 2024",
      trip: "رحلة موسكو - 5 أيام",
      preview: "موسكو في الربيع جميلة جداً! الحدائق والطقس كان رائع. تنظيم ممتاز من قاضي موسكو.",
      rating: 5,
    },
    {
      id: 2,
      clientName: "فاطمة الزهراء",
      location: "دبي، الإمارات",
      whatsappImage:
        "https://images.unsplash.com/photo-1571406252267-79d4ac2a7c51?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      date: "8 أكتوبر 2024",
      trip: "رحلة سان بطرسبرغ - 7 أيام",
      preview: "تجربة لا تُنسى في سان بطرسبرغ. التنظيم كان مثالي والفنادق فاخرة. شكراً قاضي موسكو!",
      rating: 5,
    },
    {
      id: 3,
      clientName: "محمد العلي",
      location: "الكويت",
      whatsappImage:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      date: "22 سبتمبر 2024",
      trip: "رحلة عائلية سوتشي - 10 أيام",
      preview: "صيف رائع في سوتشي! الطقس كان مثالي والأنشطة متنوعة. فريق قاضي موسكو محترف جداً.",
      rating: 5,
    },
  ]

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-green-900/80 to-teal-900/90"></div>
      </div>

      {/* Floating WhatsApp Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          >
            <MessageCircle className="w-6 h-6 text-green-300/30" />
          </div>
        ))}
      </div>

      <div className="container-rtl relative z-10">
        <SectionObserver>
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-green-500/20 backdrop-blur-xl rounded-full px-8 py-4 mb-8 border border-green-300/30 shadow-2xl">
              <MessageCircle className="w-8 h-8 text-green-300 ml-4 animate-pulse" />
              <span className="text-white text-xl font-bold">آراء عملائنا الحقيقية</span>
              <Quote className="w-6 h-6 text-green-300 mr-4" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 md:mb-8 drop-shadow-2xl">
              آراء عملائنا
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed px-4">
              اكتشف ما يقوله عملاؤنا عن تجاربهم الرائعة معنا من خلال رسائل الواتساب الحقيقية
            </p>
          </div>
        </SectionObserver>

        <div className="grid gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3 mb-12 md:mb-16">
          {testimonials.map((testimonial, index) => (
            <SectionObserver key={testimonial.id}>
              <div className="group relative" style={{ animationDelay: `${index * 200}ms` }}>
                {/* Glowing Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 scale-105"></div>

                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden group-hover:scale-105 transition-all duration-700 border border-white/50">
                  {/* Enhanced WhatsApp Header */}
                  <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer"></div>
                    <div className="relative flex items-center">
                      <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center ml-4 shadow-xl">
                        <MessageCircle className="w-8 h-8 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="font-bold text-base md:text-lg">{testimonial.clientName}</h4>
                        <p className="text-green-100 text-xs md:text-sm">{testimonial.location}</p>
                        <div className="flex mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-300 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Screenshot Container */}
                  <div className="relative h-96 overflow-hidden">
                    <img
                      src={testimonial.whatsappImage || "/placeholder.svg"}
                      alt={`رسالة واتساب من ${testimonial.clientName}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />

                    {/* Enhanced Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                    {/* Floating Quote Icon */}
                    <div className="absolute top-4 right-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Quote className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Enhanced Message Preview */}
                    <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/50">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span className="font-semibold">{testimonial.trip}</span>
                        <span>{testimonial.date}</span>
                      </div>
                      <p className="text-gray-700 font-medium leading-relaxed">{testimonial.preview}</p>
                    </div>
                  </div>

                  {/* Enhanced Card Footer */}
                  <div className="p-6 bg-gradient-to-r from-gray-50 to-green-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-green-600">
                        <div className="w-3 h-3 bg-green-500 rounded-full ml-2 animate-pulse shadow-lg"></div>
                        <span className="text-sm font-bold">رسالة واتساب حقيقية</span>
                      </div>
                      <div className="text-xs text-gray-500 font-semibold">{testimonial.date}</div>
                    </div>
                  </div>
                </div>
              </div>
            </SectionObserver>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <SectionObserver>
          <div className="text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20 max-w-4xl mx-auto">
                <MessageCircle className="w-16 h-16 text-green-300 mx-auto mb-8 animate-bounce" />
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
                  شاهد المزيد من آراء عملائنا
                </h3>
                <p className="text-white/90 mb-8 md:mb-10 text-lg sm:text-xl leading-relaxed px-4">
                  اطلع على جميع رسائل الواتساب والتقييمات الحقيقية من عملائنا السعداء
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/testimonials">
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-green-500/50 group">
                      <ArrowLeft className="w-6 h-6 mr-3 group-hover:translate-x-2 transition-transform duration-300" />
                      عرض جميع الآراء
                    </Button>
                  </Link>
                  <button
                    onClick={() => {
                      const message = encodeURIComponent(
                        "مرحباً! أريد الاستفسار عن تجارب العملاء ومشاركة آرائهم حول رحلاتهم إلى روسيا 🇷🇺⭐",
                      )
                      window.open(`https://wa.me/79177714832?text=${message}`, "_blank")
                    }}
                    className="bg-white/20 backdrop-blur-sm border-2 border-white/40 text-white hover:bg-white/30 px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 group"
                  >
                    <MessageCircle className="w-6 h-6 inline ml-3 group-hover:scale-110 transition-transform duration-300" />
                    تواصل معنا
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SectionObserver>
      </div>
    </section>
  )
}
