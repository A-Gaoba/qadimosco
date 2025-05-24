"use client"

import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"

export function Footer() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("مرحباً! أريد الاستفسار عن خدماتكم السياحية في روسيا 🇷🇺")
    window.open(`https://wa.me/79174828474?text=${message}`, "_blank")
  }

  return (
    <footer className="bg-sky-900 text-white py-12">
      <div className="container-rtl">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-sunset-300">قاضي موسكو</h3>
            <p className="text-sky-200 mb-4">شركتكم المتخصصة في السياحة إلى روسيا مع خدمات عربية متكاملة</p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-sunset-300">تواصل معنا</h3>
            <div className="space-y-3">
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center hover:text-coral-300 transition-colors duration-300 group w-full text-right"
              >
                <MessageCircle className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
                <span>واتساب: +79174828474</span>
              </button>
              <div className="flex items-center">
                <Phone className="w-5 h-5 ml-2" />
                <span>+79174828474</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 ml-2" />
                <span>info@qadimosco.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 ml-2" />
                <span>موسكو، روسيا</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-sunset-300">روابط سريعة</h3>
            <div className="space-y-2">
              <div>
                <a href="/" className="text-sky-200 hover:text-white transition-colors duration-300">
                  الرئيسية
                </a>
              </div>
              <div>
                <a href="/hotels" className="text-sky-200 hover:text-white transition-colors duration-300">
                  الفنادق
                </a>
              </div>
              <div>
                <a href="/activities" className="text-sky-200 hover:text-white transition-colors duration-300">
                  الأنشطة
                </a>
              </div>
              <div>
                <a href="/store" className="text-sky-200 hover:text-white transition-colors duration-300">
                  سلة الحجز
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-sky-800 mt-8 pt-8 text-center">
          <p className="text-sky-200">© 2024 قاضي موسكو. جميع الحقوق محفوظة.</p>
          <p className="text-sky-300 mt-2 text-sm">
            للتواصل السريع عبر واتساب:
            <button
              onClick={handleWhatsAppClick}
              className="text-coral-300 hover:text-coral-200 font-semibold mr-2 transition-colors duration-300"
            >
              +79174828474
            </button>
          </p>
        </div>
      </div>
    </footer>
  )
}
