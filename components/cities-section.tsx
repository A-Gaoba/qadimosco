import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SectionObserver } from "@/components/section-observer"
import { MapPin, Star, Thermometer, Users, Camera, Plane, Calendar, Sparkles } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ComprehensiveTourForm } from "@/components/comprehensive-tour-form"

export function CitiesSection() {
  const cities = [
    {
      name: "موسكو",
      description: "العاصمة الساحرة بقصورها التاريخية والساحة الحمراء الشهيرة",
      image:
        "https://images.unsplash.com/photo-1513326738677-b964603b136d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      href: "/activities?city=moscow",
      highlights: ["الساحة الحمراء", "الكرملين", "مسرح البولشوي"],
      temperature: "15°C",
      rating: 4.9,
      visitors: "2M+",
      attractions: "50+",
      tours: "25+",
      badge: "الأكثر شعبية",
      badgeColor: "bg-coral-500",
      cardTheme: "primary",
    },
    {
      name: "سان بطرسبرغ",
      description: "مدينة القياصرة والثقافة مع أجمل القصور والمتاحف في العالم",
      image:
        "https://images.unsplash.com/photo-1571406252267-79d4ac2a7c51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      href: "/activities?city=petersburg",
      highlights: ["متحف الهرمتاج", "قصر الشتاء", "شارع نيفسكي"],
      temperature: "12°C",
      rating: 4.8,
      visitors: "1.5M+",
      attractions: "40+",
      tours: "20+",
      badge: "تراث عالمي",
      badgeColor: "bg-sunset-500",
      cardTheme: "secondary",
    },
    {
      name: "سوتشي",
      description: "منتجع البحر الأسود الساحر مع الطبيعة الخلابة والأنشطة المتنوعة",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      href: "/activities?city=sochi",
      highlights: ["البحر الأسود", "منتجعات التزلج", "الحدائق الاستوائية"],
      temperature: "22°C",
      rating: 4.7,
      visitors: "800K+",
      attractions: "30+",
      tours: "15+",
      badge: "منتجع صيفي",
      badgeColor: "bg-sky-500",
      cardTheme: "accent",
    },
  ]

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1520637736862-4d197d17c93a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50/95 via-sunset-50/90 to-coral-50/95"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-float ${
              i % 3 === 0 ? "bg-sky-200/30" : i % 3 === 1 ? "bg-sunset-200/30" : "bg-coral-200/30"
            }`}
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container-rtl relative z-10">
        <SectionObserver>
          <div className="text-center mb-24">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-xl rounded-full px-8 py-4 mb-8 border border-sky-200 shadow-2xl">
              <MapPin className="w-6 h-6 text-sky-600 ml-3" />
              <span className="text-sky-800 font-bold text-lg">وجهات سياحية مميزة</span>
              <Sparkles className="w-5 h-5 text-sunset-500 mr-3 animate-pulse" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-gradient mb-8 md:mb-10 leading-tight drop-shadow-lg">
              أهم المدن السياحية
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-sky-700 max-w-4xl mx-auto leading-relaxed font-light px-4">
              اكتشف أجمل ثلاث مدن في روسيا مع تجارب سياحية لا تُنسى وخدمات عربية متكاملة
            </p>
          </div>
        </SectionObserver>

        <div className="grid gap-8 md:gap-10 lg:grid-cols-3 lg:gap-12">
          {cities.map((city, index) => (
            <SectionObserver key={index}>
              <div className="group relative">
                {/* Glowing Background Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${
                    city.cardTheme === "primary"
                      ? "from-sky-400 to-sky-600"
                      : city.cardTheme === "secondary"
                        ? "from-sunset-400 to-sunset-600"
                        : "from-coral-400 to-coral-600"
                  } rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 scale-105`}
                ></div>

                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden group-hover:scale-105 group-hover:shadow-3xl transition-all duration-700 border border-white/50">
                  {/* Badge */}
                  <div
                    className={`absolute top-6 right-6 ${city.badgeColor} text-white px-6 py-3 rounded-full text-sm font-bold z-20 shadow-xl animate-pulse`}
                  >
                    {city.badge}
                  </div>

                  {/* Enhanced Image Container */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={city.image || "/placeholder.svg"}
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000"
                    />

                    {/* Enhanced Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                    {/* Animated Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer"></div>

                    {/* Enhanced Weather & Rating */}
                    <div className="absolute top-6 left-6 flex flex-col gap-3">
                      <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-3 flex items-center shadow-xl border border-white/50">
                        <Thermometer className="w-5 h-5 text-sunset-500 ml-2" />
                        <span className="text-sm font-bold text-gray-800">{city.temperature}</span>
                      </div>
                      <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-3 flex items-center shadow-xl border border-white/50">
                        <Star className="w-5 h-5 text-coral-500 fill-current ml-2" />
                        <span className="text-sm font-bold text-gray-800">{city.rating}</span>
                      </div>
                    </div>

                    {/* Enhanced City Name Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 drop-shadow-2xl">
                        {city.name}
                      </h3>
                    </div>
                  </div>

                  {/* Enhanced Content */}
                  <div className="p-10">
                    <p className="text-sky-700 mb-6 md:mb-8 leading-relaxed text-lg md:text-xl font-medium">
                      {city.description}
                    </p>

                    {/* Enhanced Statistics */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
                      <div className="text-center group/stat">
                        <div className="w-16 h-16 bg-gradient-to-r from-sky-400 to-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl group-hover/stat:scale-110 transition-transform duration-300">
                          <Users className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-2xl font-black text-sky-600">{city.visitors}</div>
                        <div className="text-xs text-sky-500 font-semibold">زائر سنوياً</div>
                      </div>
                      <div className="text-center group/stat">
                        <div className="w-16 h-16 bg-gradient-to-r from-sunset-400 to-sunset-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl group-hover/stat:scale-110 transition-transform duration-300">
                          <Camera className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-2xl font-black text-sunset-600">{city.attractions}</div>
                        <div className="text-xs text-sunset-500 font-semibold">معلم سياحي</div>
                      </div>
                      <div className="text-center group/stat">
                        <div className="w-16 h-16 bg-gradient-to-r from-coral-400 to-coral-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl group-hover/stat:scale-110 transition-transform duration-300">
                          <Calendar className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-2xl font-black text-coral-600">{city.tours}</div>
                        <div className="text-xs text-coral-500 font-semibold">جولة متاحة</div>
                      </div>
                    </div>

                    {/* Enhanced Highlights */}
                    <div className="mb-10">
                      <h4 className="text-lg font-bold text-sky-800 mb-4 flex items-center">
                        <Star className="w-5 h-5 text-coral-500 ml-2" />
                        أهم المعالم:
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {city.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="bg-gradient-to-r from-sky-100 to-sky-200 text-sky-700 text-sm px-4 py-2 rounded-full border-2 border-sky-300 font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="flex gap-4">
                      <Link href={city.href} className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-coral-500/50 group/btn animate-coral-pulse">
                          <Plane className="w-6 h-6 ml-3 group-hover/btn:translate-x-2 transition-transform duration-300" />
                          استكشف الآن
                        </Button>
                      </Link>
                      <Link href="/hotels">
                        <Button
                          variant="outline"
                          className="px-8 py-4 rounded-2xl border-3 border-sky-500 text-sky-600 hover:bg-sky-50 transition-all duration-300 group/btn2 shadow-lg"
                        >
                          <Calendar className="w-6 h-6 group-hover/btn2:rotate-12 transition-transform duration-300" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SectionObserver>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <SectionObserver>
          <div className="text-center mt-24">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sunset-400 to-coral-500 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/50 max-w-3xl mx-auto">
                <Sparkles className="w-12 h-12 text-sunset-500 mx-auto mb-6 animate-bounce" />
                <h3 className="text-3xl font-bold text-sky-800 mb-6">لا تستطيع الاختيار؟</h3>
                <p className="text-sky-600 mb-8 text-xl">احجز جولة شاملة لجميع المدن واستمتع بتجربة روسيا الكاملة</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-sunset-500 to-coral-500 hover:from-sunset-600 hover:to-coral-600 text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
                      جولة شاملة لجميع المدن
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-sky-800 text-center mb-4">
                        جولة شاملة لجميع المدن الروسية
                      </DialogTitle>
                    </DialogHeader>
                    <ComprehensiveTourForm />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </SectionObserver>
      </div>
    </section>
  )
}
