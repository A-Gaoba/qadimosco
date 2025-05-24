import { SectionObserver } from "@/components/section-observer"
import { Users, Award, Globe, Heart, Sparkles, TrendingUp } from "lucide-react"

export function AboutSection() {
  const stats = [
    { icon: Users, number: "5000+", label: "عميل سعيد", color: "from-sky-500 to-sky-600", bgColor: "bg-sky-50" },
    {
      icon: Award,
      number: "10+",
      label: "سنوات خبرة",
      color: "from-sunset-500 to-sunset-600",
      bgColor: "bg-sunset-50",
    },
    { icon: Globe, number: "3", label: "مدن روسية", color: "from-coral-500 to-coral-600", bgColor: "bg-coral-50" },
    {
      icon: Heart,
      number: "100%",
      label: "رضا العملاء",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
    },
  ]

  return (
    <section id="about-section" className="py-24 relative overflow-hidden">
      {/* Enhanced Background with Unsplash Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/90 via-sunset-900/80 to-coral-900/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-white/10 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container-rtl relative z-10">
        <SectionObserver>
          <div className="max-w-6xl mx-auto text-center mb-20">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-xl rounded-full px-8 py-4 mb-8 border border-white/20 shadow-2xl">
              <Sparkles className="w-6 h-6 text-sunset-300 ml-3 animate-pulse" />
              <span className="text-white text-lg font-semibold">قصتنا المميزة</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-8 md:mb-10 leading-tight drop-shadow-2xl">
              من نحن؟
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed drop-shadow-lg font-light px-4">
              قديموسكو هي شركة سياحية متخصصة في تقديم خدمات سياحية متكاملة للمسافرين العرب إلى روسيا. نحن نؤمن بأن كل
              مسافر يستحق تجربة استثنائية، لذلك نقدم خدمات باللغة العربية مع مرشدين محليين لضمان راحتكم وسهولة تنقلكم في
              أجمل المدن الروسية.
            </p>
          </div>
        </SectionObserver>

        <SectionObserver>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group relative" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="relative">
                  {/* Glowing Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 scale-110`}
                  ></div>

                  {/* Main Card */}
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500">
                    <div
                      className={`w-24 h-24 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:rotate-12 transition-transform duration-500`}
                    >
                      <stat.icon className="w-12 h-12 text-white drop-shadow-lg" />
                    </div>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2 md:mb-3 drop-shadow-lg">
                      {stat.number}
                    </h3>
                    <p className="text-white/80 font-semibold text-sm sm:text-base lg:text-lg">{stat.label}</p>

                    {/* Animated Border */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full`}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionObserver>

        {/* Mission Statement */}
        <SectionObserver>
          <div className="mt-20 text-center">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl max-w-4xl mx-auto">
              <TrendingUp className="w-12 h-12 md:w-16 md:h-16 text-sunset-300 mx-auto mb-4 md:mb-6 animate-bounce" />
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">مهمتنا</h3>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed px-4">
                جعل رحلتكم إلى روسيا تجربة لا تُنسى مليئة بالذكريات الجميلة والاكتشافات المذهلة
              </p>
            </div>
          </div>
        </SectionObserver>
      </div>
    </section>
  )
}
