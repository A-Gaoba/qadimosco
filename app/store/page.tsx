"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, MessageCircle, Plus, Minus, Calendar, Users, Baby, Hotel, MapPin, User } from "lucide-react"
import { Footer } from "@/components/footer"
import { useCart } from "@/hooks/use-cart"

export default function StorePage() {
  const { items: cart, removeItem, updateItemQuantity } = useCart()
  const [formData, setFormData] = useState({
    fullName: "",
    adults: 2,
    children: 0,
    childrenAges: "",
    breakfast: false,
  })
  const [notes, setNotes] = useState("")

  // Get hotel booking data if exists
  const hotelItem = cart.find((item) => item.type === "hotel")
  const hotelBookingData = hotelItem?.bookingData

  const handleRemoveFromCart = (index: number) => {
    const itemName = cart[index]?.name || cart[index]?.nameAr || "العنصر"
    removeItem(index)

    // Show info toast
    if (typeof window !== "undefined" && (window as any).showToast) {
      ; (window as any).showToast({
        type: "info",
        title: "تم حذف العنصر",
        message: `تم حذف "${itemName}" من سلة الحجز`,
        duration: 3000,
      })
    }
  }

  const handleQuantityUpdate = (index: number, newQuantity: number) => {
    updateItemQuantity(index, newQuantity)

    if (newQuantity === 0) {
      const itemName = cart[index]?.name || cart[index]?.nameAr || "العنصر"
      if (typeof window !== "undefined" && (window as any).showToast) {
        ; (window as any).showToast({
          type: "info",
          title: "تم حذف العنصر",
          message: `تم حذف "${itemName}" من سلة الحجز`,
          duration: 3000,
        })
      }
    }
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      if (item.type === "activity" && item.price) {
        return total + item.price * (item.quantity || 1)
      }
      return total
    }, 0)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    const months = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ]

    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    return `${day} ${month} ${year}`
  }

  const sendToWhatsApp = () => {
    // Check if name is provided
    if (!formData.fullName.trim()) {
      // Show error toast
      if (typeof window !== "undefined" && (window as any).showToast) {
        ; (window as any).showToast({
          type: "error",
          title: "خطأ في البيانات",
          message: "يرجى إدخال الاسم الكامل قبل إرسال الطلب",
          duration: 4000,
        })
      }
      return
    }

    let message = `🌟 طلب حجز جديد من قديموسكو 🌟\n\n`

    // Add customer name first
    message += `👤 الاسم: ${formData.fullName}\n\n`

    // Add hotel booking information if available
    if (hotelBookingData) {
      message += `📅 معلومات الحجز:\n`
      message += `📍 تاريخ الوصول: ${formatDate(hotelBookingData.checkIn)}\n`
      message += `📍 تاريخ المغادرة: ${formatDate(hotelBookingData.checkOut)}\n`
      message += `🏠 عدد الغرف: ${hotelBookingData.rooms}\n`
      message += `👥 عدد البالغين: ${hotelBookingData.adults}\n`

      if (hotelBookingData.hasChildren && hotelBookingData.children > 0) {
        message += `👶 عدد الأطفال: ${hotelBookingData.children}\n`
        if (hotelBookingData.childrenAges) {
          message += `🎂 أعمار الأطفال: ${hotelBookingData.childrenAges}\n`
        }
      }

      message += `🍽️ الإفطار: ${hotelBookingData.breakfast ? "مطلوب" : "غير مطلوب"}\n\n`
    }

    message += `👥 عدد البالغين: ${formData.adults}\n`
    message += `👶 عدد الأطفال: ${formData.children}\n`

    if (formData.children > 0 && formData.childrenAges) {
      message += `🎂 أعمار الأطفال: ${formData.childrenAges}\n`
    }

    message += `🍽️ الإفطار: ${formData.breakfast ? "مطلوب" : "غير مطلوب"}\n\n`

    if (cart.length > 0) {
      message += `📋 تفاصيل الحجز:\n\n`

      const hotels = cart.filter((item) => item.type === "hotel")
      const activities = cart.filter((item) => item.type === "activity")

      if (hotels.length > 0) {
        message += `🏨 الفنادق:\n`
        hotels.forEach((hotel, index) => {
          message += `${index + 1}. ${hotel.nameAr || hotel.name} - ${hotel.cityAr || hotel.city}\n`
        })
        message += `\n`
      }

      if (activities.length > 0) {
        message += `🎯 الأنشطة:\n`
        activities.forEach((activity, index) => {
          const quantity = activity.quantity || 1
          const quantityText = quantity > 1 ? ` (${quantity} تذاكر)` : ""
          message += `${index + 1}. ${activity.name} - ${activity.city}${quantityText}\n`
          if (activity.price && activity.price > 0) {
            const totalPrice = activity.price * quantity
            message += `   السعر: ${totalPrice.toLocaleString()} ₽\n`
          }
        })

        const totalPrice = getTotalPrice()
        if (totalPrice > 0) {
          message += `\n💰 إجمالي سعر الأنشطة: ${totalPrice.toLocaleString()} ₽\n`
        }
        message += `\n`
      }
    }

    if (notes) {
      message += `📝 ملاحظات إضافية:\n${notes}\n\n`
    }

    message += `شكراً لاختياركم قديموسكو! 🇷🇺✈️`

    const whatsappNumber = "79177714832"
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    // Show success toast
    if (typeof window !== "undefined" && (window as any).showToast) {
      ; (window as any).showToast({
        type: "success",
        title: "تم إرسال الطلب!",
        message: "سيتم توجيهك إلى واتساب لإكمال الحجز",
        duration: 3000,
      })
    }

    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-rtl py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 text-center">سلة الحجز</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Cart Items */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">العناصر المحددة</h2>

            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">لا توجد عناصر في السلة</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center flex-1">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.nameAr || item.name}
                        className="w-16 h-16 object-cover rounded ml-4"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-blue-900">{item.nameAr || item.name}</h3>
                        <p className="text-sm text-gray-600">{item.cityAr || item.city}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {item.type === "hotel" ? "فندق" : "نشاط"}
                          </span>
                          {item.type === "activity" && item.quantity && item.quantity > 1 && (
                            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              {item.quantity} تذاكر
                            </span>
                          )}
                        </div>
                        {item.type === "activity" && item.price && item.price > 0 && (
                          <p className="text-sm text-green-600 font-semibold mt-1">
                            {item.quantity && item.quantity > 1
                              ? `${item.price.toLocaleString()} ₽ × ${item.quantity} = ${(item.price * item.quantity).toLocaleString()} ₽`
                              : `${item.price.toLocaleString()} ₽`}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.type === "activity" && (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityUpdate(index, (item.quantity || 1) - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-semibold min-w-[2rem] text-center">{item.quantity || 1}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityUpdate(index, (item.quantity || 1) + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                      <Button variant="outline" size="icon" onClick={() => handleRemoveFromCart(index)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Total Price Display */}
                {getTotalPrice() > 0 && (
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-700">إجمالي الأنشطة:</span>
                      <span className="text-xl font-bold text-green-600">{getTotalPrice().toLocaleString()} ₽</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Booking Summary and Notes */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                <User className="w-5 h-5 ml-2" />
                معلومات العميل
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الاسم الكامل <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="أدخل اسمك الكامل"
                    className={`w-full ${!formData.fullName.trim() ? "border-red-300 focus:border-red-500" : ""}`}
                  />
                  {!formData.fullName.trim() && (
                    <p className="text-red-500 text-sm mt-1">الاسم الكامل مطلوب لإرسال الطلب</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">عدد البالغين</label>
                    <Input
                      type="number"
                      min="1"
                      value={formData.adults}
                      onChange={(e) => setFormData({ ...formData, adults: Number.parseInt(e.target.value) || 1 })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">عدد الأطفال</label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.children}
                      onChange={(e) => setFormData({ ...formData, children: Number.parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                {formData.children > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">أعمار الأطفال</label>
                    <Input
                      value={formData.childrenAges}
                      onChange={(e) => setFormData({ ...formData, childrenAges: e.target.value })}
                      placeholder="مثال: 3, 6, 10"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Hotel Booking Information Display */}
            {hotelBookingData && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                  <Hotel className="w-5 h-5 ml-2" />
                  معلومات الحجز
                </h2>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600 ml-2" />
                      <div>
                        <p className="text-sm text-gray-600">تاريخ الوصول</p>
                        <p className="font-semibold text-blue-900">{formatDate(hotelBookingData.checkIn)}</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600 ml-2" />
                      <div>
                        <p className="text-sm text-gray-600">تاريخ المغادرة</p>
                        <p className="font-semibold text-blue-900">{formatDate(hotelBookingData.checkOut)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-green-600 ml-2" />
                      <div>
                        <p className="text-sm text-gray-600">الغرف</p>
                        <p className="font-semibold text-green-900">{hotelBookingData.rooms}</p>
                      </div>
                    </div>

                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <Users className="w-5 h-5 text-green-600 ml-2" />
                      <div>
                        <p className="text-sm text-gray-600">البالغين</p>
                        <p className="font-semibold text-green-900">{hotelBookingData.adults}</p>
                      </div>
                    </div>

                    {hotelBookingData.hasChildren && hotelBookingData.children > 0 && (
                      <div className="flex items-center p-3 bg-green-50 rounded-lg">
                        <Baby className="w-5 h-5 text-green-600 ml-2" />
                        <div>
                          <p className="text-sm text-gray-600">الأطفال</p>
                          <p className="font-semibold text-green-900">{hotelBookingData.children}</p>
                          {hotelBookingData.childrenAges && (
                            <p className="text-xs text-gray-500">الأعمار: {hotelBookingData.childrenAges}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">الإفطار:</span>
                    <span
                      className={`font-semibold ${hotelBookingData.breakfast ? "text-green-600" : "text-gray-600"}`}
                    >
                      {hotelBookingData.breakfast ? "مطلوب" : "غير مطلوب"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Notes Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">ملاحظات إضافية</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">أي طلبات خاصة أو ملاحظات...</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="مثال: نريد غرف متجاورة، نريد إطلالة على البحر، لدينا حساسية من الطعام..."
                  rows={4}
                />
              </div>

              <Button
                onClick={sendToWhatsApp}
                className={`w-full text-lg py-3 mt-4 ${!formData.fullName.trim() ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400" : "btn-primary"
                  }`}
                disabled={!formData.fullName.trim()}
              >
                <MessageCircle className="w-5 h-5 ml-2" />
                {!formData.fullName.trim() ? "أدخل اسمك أولاً" : "أرسل إلى واتساب"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
