"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Footer } from "@/components/footer"
import { SectionObserver } from "@/components/section-observer"
import { MessageCircle, Search, Filter, Star, Calendar, MapPin } from "lucide-react"

export default function TestimonialsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCity, setFilterCity] = useState("")
  const [filterRating, setFilterRating] = useState("")

  const testimonials = [
    {
      id: 1,
      clientName: "أحمد محمد الأحمد",
      location: "الرياض، السعودية",
      whatsappImage: "/placeholder.svg?height=500&width=350",
      date: "15 نوفمبر 2024",
      trip: "رحلة موسكو - 5 أيام",
      city: "موسكو",
      rating: 5,
      preview: "تجربة رائعة مع ألقاضي موسكو! الخدمة كانت ممتازة والمرشد السياحي تحدث العربية بطلاقة. أنصح بشدة!",
    },
    {
      id: 2,
      clientName: "فاطمة الزهراء",
      location: "دبي، الإمارات",
      whatsappImage: "/placeholder.svg?height=500&width=350",
      date: "8 أكتوبر 2024",
      trip: "رحلة سان بطرسبرغ - 7 أيام",
      city: "سان بطرسبرغ",
      rating: 5,
      preview: "تجربة لا تُنسى في سان بطرسبرغ. التنظيم كان مثالي والفنادق فاخرة. شكراً ألقاضي موسكو!",
    },
    {
      id: 3,
      clientName: "محمد العلي",
      location: "الكويت",
      whatsappImage: "/placeholder.svg?height=500&width=350",
      date: "22 سبتمبر 2024",
      trip: "رحلة عائلية سوتشي - 10 أيام",
      city: "سوتشي",
      rating: 5,
      preview: "قضيت أسبوعاً رائعاً في سوتشي مع العائلة. الأطفال استمتعوا كثيراً والخدمات كانت ممتازة.",
    },
    {
      id: 4,
      clientName: "سارة أحمد",
      location: "جدة، السعودية",
      whatsappImage: "/placeholder.svg?height=500&width=350",
      date: "5 سبتمبر 2024",
      trip: "رحلة شهر العسل - موسكو وسان بطرسبرغ",
      city: "موسكو",
      rating: 5,
      preview: "شهر عسل لا يُنسى! كل التفاصيل كانت مثالية من الاستقبال في المطار حتى التوديع.",
    },
    {
      id: 5,
      clientName: "خالد المطيري",
      location: "الكويت",
      whatsappImage: "/placeholder.svg?height=500&width=350",
      date: "18 أغسطس 2024",
      trip: "رحلة أعمال موسكو - 3 أيام",
      city: "موسكو",
      rating: 4,
      preview: "خدمة احترافية للرحلات التجارية. الترجمة والمواصلات كانت ممتازة.",
    },
    {
      id: 6,
      clientName: "نورا الشمري",
      location: "الرياض، السعودية",
      whatsappImage: "/placeholder.svg?height=500&width=350",
      date: "12 يوليو 2024",
      trip: "رحلة صيفية سوتشي - 8 أيام",
      city: "سوتشي",
      rating: 5,
      preview: "صيف رائع في سوتشي! الطقس كان مثالي والأنشطة متنوعة. فريق ألقاضي موسكو محترف جداً.",
    },
    {
      id: 7,
      clientName: "عبدالله الراشد",
      location: "دبي، الإمارات",
      whatsappImage: "/placeholder.svg?height=500&width=350",
      date: "25 يونيو 2024",
      trip: "جولة ثقافية سان بطرسبرغ - 6 أيام",
      city: "سان بطرسبرغ",
      rating: 5,
      preview: "المتاحف والقصور كانت مذهلة! المرشد كان متمكن ويشرح بالعربية بوضوح.",
    },
    {
      id: 8,
      clientName: "ليلى حسن",
      location: "الدوحة، قطر",
      whatsappImage: "/placeholder.svg?height=500&width=350",
      date: "10 مايو 2024",
      trip: "رحلة الربيع موسكو - 4 أيام",
      city: "موسكو",
      rating: 5,
      preview: "موسكو في الربيع جميلة جداً! الحدائق والطقس كان رائع. تنظيم ممتاز من ألقاضي موسكو.",
    },
    {
      id: 9,
      clientName: "أمل الفارسي",
      location: "مسقط، عمان",
      whatsappImage: "/placeholder.svg?height=500&width=350",
      date: "3 أبريل 2024",
      trip: "رحلة تسوق وسياحة موسكو - 5 أيام",
      city: "موسكو",
      rating: 4,
      preview: "التسوق في موسكو تجربة رائعة! الأسعار معقولة والجودة عالية. شكراً للفريق.",
    },
  ]

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch =
      testimonial.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.preview.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCity = !filterCity || testimonial.city === filterCity
    const matchesRating = !filterRating || testimonial.rating.toString() === filterRating

    return matchesSearch && matchesCity && matchesRating
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="container-rtl py-8">
        {/* Header */}
        <SectionObserver>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <MessageCircle className="w-16 h-16 text-green-600 ml-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-gradient">آراء عملائنا</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              مجموعة شاملة من رسائل الواتساب الحقيقية وتقييمات عملائنا السعداء الذين سافروا معنا إلى روسيا
            </p>
          </div>
        </SectionObserver>

        {/* Filters */}
        <SectionObserver>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl mb-8 border border-green-100">
            <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
              <Filter className="w-5 h-5 ml-2" />
              تصفية الآراء
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="البحث في الآراء..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>

              <Select value={filterCity} onValueChange={setFilterCity}>
                <SelectTrigger>
                  <SelectValue placeholder="تصفية حسب المدينة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="موسكو">موسكو</SelectItem>
                  <SelectItem value="سان بطرسبرغ">سان بطرسبرغ</SelectItem>
                  <SelectItem value="سوتشي">سوتشي</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger>
                  <SelectValue placeholder="تصفية حسب التقييم" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 نجوم</SelectItem>
                  <SelectItem value="4">4 نجوم</SelectItem>
                  <SelectItem value="3">3 نجوم</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(searchTerm || filterCity || filterRating) && (
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  عرض {filteredTestimonials.length} من {testimonials.length} رأي
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("")
                    setFilterCity("")
                    setFilterRating("")
                  }}
                >
                  مسح الفلاتر
                </Button>
              </div>
            )}
          </div>
        </SectionObserver>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((testimonial, index) => (
            <SectionObserver key={testimonial.id}>
              <div
                className="group bg-white rounded-2xl shadow-xl overflow-hidden card-hover border-2 border-green-100 hover:border-green-300 transition-all duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* WhatsApp Header */}
                <div className="bg-green-600 text-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center ml-3">
                        <MessageCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.clientName}</h4>
                        <p className="text-sm text-green-100">{testimonial.location}</p>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-300 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Screenshot */}
                <div className="relative h-96 bg-gray-100 overflow-hidden">
                  <img
                    src={testimonial.whatsappImage || "/placeholder.svg"}
                    alt={`رسالة واتساب من ${testimonial.clientName}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 ml-1" />
                    <span className="ml-3">{testimonial.date}</span>
                    <MapPin className="w-4 h-4 mr-3 ml-1" />
                    <span>{testimonial.city}</span>
                  </div>

                  <h5 className="font-semibold text-green-800 mb-2">{testimonial.trip}</h5>
                  <p className="text-gray-700 text-sm leading-relaxed">{testimonial.preview}</p>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></div>
                        <span className="text-xs font-medium">رسالة واتساب حقيقية</span>
                      </div>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SectionObserver>
          ))}
        </div>

        {/* No Results */}
        {filteredTestimonials.length === 0 && (
          <SectionObserver>
            <div className="text-center py-16">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد نتائج</h3>
              <p className="text-gray-500">جرب تغيير معايير البحث أو الفلاتر</p>
            </div>
          </SectionObserver>
        )}

        {/* Call to Action */}
        <SectionObserver>
          <div className="mt-16 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-100 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-green-800 mb-4">هل تريد أن تكون التالي؟</h3>
              <p className="text-gray-600 mb-6">انضم إلى آلاف العملاء السعداء واحجز رحلتك إلى روسيا اليوم</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                  احجز رحلتك الآن
                </Button>
                <Button
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-xl font-semibold"
                >
                  تواصل معنا
                </Button>
              </div>
            </div>
          </div>
        </SectionObserver>
      </div>
      <Footer />
    </div>
  )
}
