"use client"

import { SectionObserver } from "@/components/section-observer"
import { Plane, MapPin, Hotel, Users, Shield, CreditCard, Clock, Award, Headphones, Globe } from "lucide-react"

export function ServicesSection() {
  const services = [
    {
      icon: MapPin,
      title: "جولات سياحية مميزة",
      description:
        "استكشف أجمل معالم روسيا مع مرشدين سياحيين محترفين يتحدثون العربية ويقدمون شرحاً وافياً لكل المواقع التاريخية والثقافية",
      features: ["مرشدين عرب", "جولات يومية", "مواقع تاريخية"],
      colorTheme: "primary",
      iconBg: "bg-sky-500",
      bgGradient: "from-sky-50 to-sky-100",
    },
    {
      icon: Plane,
      title: "حجز تذاكر الطيران",
      description:
        "نقدم خدمات حجز تذاكر الطيران بأفضل الأسعار على جميع شركات الطيران العالمية مع أفضلية اختيار الوقت والمسار",
      features: ["أفضل الأسعار", "مرونة في التواريخ", "جميع الخطوط"],
      colorTheme: "secondary",
      iconBg: "bg-sunset-500",
      bgGradient: "from-sunset-50 to-sunset-100",
    },
    {
      icon: Hotel,
      title: "حجوزات الفنادق المميزة",
      description: "نحن نوفر حجوزات في أفضل الفنادق بأسعار متنافسة مقارنة بالمواقع الأخرى مع ضمان أسعارنا الأفضل",
      features: ["فنادق 5 نجوم", "أسعار مضمونة", "إلغاء مجاني"],
      colorTheme: "accent",
      iconBg: "bg-coral-500",
      bgGradient: "from-coral-50 to-coral-100",
    },
    {
      icon: Shield,
      title: "خدمة عملاء متميزة",
      description: "فريق خدمة العملاء لدينا متاح على مدار الساعة لمساعدتك في أي استفسار أو طارئ خلال رحلتك",
      features: ["دعم 24/7", "استجابة فورية", "حلول سريعة"],
      colorTheme: "primary",
      iconBg: "bg-sky-600",
      bgGradient: "from-sky-50 to-sky-100",
    },
    {
      icon: CreditCard,
      title: "طرق دفع آمنة ومتعددة",
      description: "نوفر وسائل دفع متعددة وآمنة تناسب جميع العملاء بما في ذلك البطاقات الائتمانية والتحويلات البنكية",
      features: ["دفع آمن", "طرق متعددة", "حماية كاملة"],
      colorTheme: "secondary",
      iconBg: "bg-sunset-600",
      bgGradient: "from-sunset-50 to-sunset-100",
    },
    {
      icon: Users,
      title: "الاستقبال والتوديع VIP",
      description: "نضمن استقبالكم وتوديعكم بأعلى مستوى من الاحترافية والراحة مع خدمات VIP في المطارات",
      features: ["استقبال VIP", "نقل مريح", "خدمة شخصية"],
      colorTheme: "accent",
      iconBg: "bg-coral-600",
      bgGradient: "from-coral-50 to-coral-100",
    },
  ]

  const certifications = [
    { icon: Award, text: "معتمد من وزارة السياحة الروسية", color: "text-sky-600" },
    { icon: Globe, text: "عضو في اتحاد وكالات السفر العالمي", color: "text-sunset-600" },
    { icon: Shield, text: "مؤمن ضد جميع المخاطر", color: "text-coral-600" },
    { icon: Clock, text: "خبرة أكثر من 10 سنوات", color: "text-sky-600" },
  ]

  return (
    <section className="py-24 bg-secondary-section relative overflow-hidden">
      {/* Background Elements with 60-30-10 Colors */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-coral-500 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-sunset-500 rounded-full blur-3xl -translate-x-32 -translate-y-32"></div>
      </div>

      <div className="container-rtl relative">
        <SectionObserver>
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-sunset-100 to-sunset-200 rounded-full px-6 py-3 mb-6 border border-sunset-300/50">
              <Award className="w-5 h-5 text-sunset-600 ml-2" />
              <span className="text-sunset-800 font-semibold">خدمات سياحية متكاملة</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient mb-6 md:mb-8 leading-tight">
              خدماتنا المتميزة
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-sunset-700 max-w-4xl mx-auto leading-relaxed px-4">
              نقدم مجموعة شاملة من الخدمات السياحية المتخصصة لضمان رحلة مريحة وممتعة لا تُنسى
            </p>
          </div>
        </SectionObserver>

        {/* Services Grid with 60-30-10 Color System */}
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12 md:mb-16">
          {services.map((service, index) => (
            <SectionObserver key={index}>
              <div
                className={`group relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 card-hover border-2 overflow-hidden ${
                  service.colorTheme === "primary"
                    ? "border-sky-200 hover:border-sky-300"
                    : service.colorTheme === "secondary"
                      ? "border-sunset-200 hover:border-sunset-300"
                      : "border-coral-200 hover:border-coral-300"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                ></div>

                {/* Icon */}
                <div
                  className={`relative w-20 h-20 ${service.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg service-icon`}
                >
                  <service.icon className="w-10 h-10 text-white" />
                  <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-center transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center justify-center">
                      <div
                        className={`w-2 h-2 rounded-full ml-2 ${
                          service.colorTheme === "primary"
                            ? "bg-sky-500"
                            : service.colorTheme === "secondary"
                              ? "bg-sunset-500"
                              : "bg-coral-500"
                        }`}
                      ></div>
                      <span className="text-sm text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Hover Effect */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                    service.colorTheme === "primary"
                      ? "bg-gradient-to-r from-sky-500 to-sky-600"
                      : service.colorTheme === "secondary"
                        ? "bg-gradient-to-r from-sunset-500 to-sunset-600"
                        : "bg-gradient-to-r from-coral-500 to-coral-600"
                  }`}
                ></div>
              </div>
            </SectionObserver>
          ))}
        </div>

        {/* Certifications with 60-30-10 Colors */}
        <SectionObserver>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-sky-200">
            <h3 className="text-2xl font-bold text-center text-sky-800 mb-8">اعتمادات وشهادات الجودة</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center justify-center text-center group">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 ${
                        index % 3 === 0
                          ? "bg-gradient-to-br from-sky-500 to-sky-600"
                          : index % 3 === 1
                            ? "bg-gradient-to-br from-sunset-500 to-sunset-600"
                            : "bg-gradient-to-br from-coral-500 to-coral-600"
                      }`}
                    >
                      <cert.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-sm font-medium text-center ${cert.color}`}>{cert.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionObserver>

        {/* Bottom CTA with 60-30-10 Colors and Working WhatsApp */}
        <SectionObserver>
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-sky-600 via-sunset-600 to-coral-600 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-8 w-16 h-16 bg-white rounded-full animate-float"></div>
                <div
                  className="absolute bottom-4 left-8 w-12 h-12 bg-white rounded-full animate-float"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4">مستعد لبدء رحلتك؟</h3>
                <p className="text-lg sm:text-xl mb-4 md:mb-6 opacity-90">
                  تواصل معنا الآن واحصل على استشارة مجانية لتخطيط رحلتك المثالية
                </p>
                <div className="flex flex-col gap-4 justify-center">
                  <button
                    onClick={() => {
                      const message = encodeURIComponent(
                        "مرحباً! أريد الحصول على استشارة مجانية لتخطيط رحلتي إلى روسيا 🇷🇺✈️",
                      )
                      window.open(`https://wa.me/79174828474?text=${message}`, "_blank")
                    }}
                    className="bg-white text-sky-600 px-6 sm:px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
                  >
                    <Headphones className="w-5 h-5 inline ml-2" />
                    تواصل معنا الآن
                  </button>
                  <button
                    onClick={() => {
                      const message = encodeURIComponent(
                        "مرحباً! أريد الحصول على عرض سعر مفصل لرحلة إلى روسيا. يرجى إرسال التفاصيل والأسعار 💰📋",
                      )
                      window.open(`https://wa.me/79174828474?text=${message}`, "_blank")
                    }}
                    className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/30 transition-all duration-300"
                  >
                    احصل على عرض سعر
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
