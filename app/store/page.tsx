"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, MessageCircle, Plus, Minus } from "lucide-react"
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
    notes: "",
  })

  const handleRemoveFromCart = (index: number) => {
    const itemName = cart[index]?.name || cart[index]?.nameAr || "العنصر"
    removeItem(index)

    // Show info toast
    if (typeof window !== "undefined" && (window as any).showToast) {
      ;(window as any).showToast({
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
        ;(window as any).showToast({
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

  const sendToWhatsApp = () => {
    if (!formData.fullName) {
      // Show error toast
      if (typeof window !== "undefined" && (window as any).showToast) {
        ;(window as any).showToast({
          type: "error",
          title: "خطأ في البيانات",
          message: "يرجى إدخال الاسم الكامل",
          duration: 4000,
        })
      }
      return
    }

    let message = `🌟 طلب حجز جديد من قديموسكو 🌟\n\n`
    message += `👤 الاسم: ${formData.fullName}\n`
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

    if (formData.notes) {
      message += `📝 ملاحظات إضافية:\n${formData.notes}\n\n`
    }

    message += `شكراً لاختياركم قديموسكو! 🇷🇺✈️`

    const whatsappNumber = "79174828474"
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    // Show success toast
    if (typeof window !== "undefined" && (window as any).showToast) {
      ;(window as any).showToast({
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

          {/* Booking Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">معلومات الحجز</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل *</label>
                <Input
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">عدد البالغين</label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.adults}
                    onChange={(e) => setFormData({ ...formData, adults: Number.parseInt(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">عدد الأطفال</label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.children}
                    onChange={(e) => setFormData({ ...formData, children: Number.parseInt(e.target.value) })}
                  />
                </div>
              </div>

              {formData.children > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">أعمار الأطفال</label>
                  <Input
                    value={formData.childrenAges}
                    onChange={(e) => setFormData({ ...formData, childrenAges: e.target.value })}
                    placeholder="مثال: 5، 8، 12"
                  />
                </div>
              )}

              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="breakfast"
                  checked={formData.breakfast}
                  onCheckedChange={(checked) => setFormData({ ...formData, breakfast: checked as boolean })}
                />
                <label htmlFor="breakfast" className="text-sm font-medium text-gray-700">
                  مع الإفطار
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات إضافية</label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="أي طلبات خاصة أو ملاحظات..."
                  rows={4}
                />
              </div>

              <Button onClick={sendToWhatsApp} className="btn-primary w-full text-lg py-3">
                <MessageCircle className="w-5 h-5 ml-2" />
                أرسل إلى واتساب
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
