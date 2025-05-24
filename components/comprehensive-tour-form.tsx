"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, MapPin, Plus, Minus, Send } from "lucide-react"

interface CityStay {
  city: string
  nights: number
  accommodationType: "hotel" | "cottage" | "both"
  notes: string
}

interface TourFormData {
  fullName: string
  fromDate: string
  toDate: string
  totalDays: number
  adults: number
  children: number
  childrenAges: string
  cityStays: CityStay[]
  specialRequests: string
  budget: string
  includedServices: {
    breakfast: boolean
    transportation: boolean
    guide: boolean
    activities: boolean
  }
}

export function ComprehensiveTourForm() {
  const [formData, setFormData] = useState<TourFormData>({
    fullName: "",
    fromDate: "",
    toDate: "",
    totalDays: 0,
    adults: 4,
    children: 3,
    childrenAges: "3, 6, 10",
    cityStays: [
      { city: "موسكو", nights: 3, accommodationType: "hotel", notes: "" },
      { city: "سوتشي", nights: 3, accommodationType: "hotel", notes: "" },
      { city: "سان بطرسبرغ", nights: 2, accommodationType: "hotel", notes: "" },
    ],
    specialRequests: "",
    budget: "",
    includedServices: {
      breakfast: true,
      transportation: true,
      guide: true,
      activities: false,
    },
  })

  // Calculate total days when dates change
  const calculateDays = (from: string, to: string) => {
    if (from && to) {
      const fromDate = new Date(from)
      const toDate = new Date(to)
      const diffTime = Math.abs(toDate.getTime() - fromDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    }
    return 0
  }

  const handleDateChange = (field: "fromDate" | "toDate", value: string) => {
    const newFormData = { ...formData, [field]: value }
    if (field === "fromDate" || field === "toDate") {
      newFormData.totalDays = calculateDays(
        field === "fromDate" ? value : formData.fromDate,
        field === "toDate" ? value : formData.toDate,
      )
    }
    setFormData(newFormData)
  }

  const updateCityStay = (index: number, field: keyof CityStay, value: string | number) => {
    const newCityStays = [...formData.cityStays]
    newCityStays[index] = { ...newCityStays[index], [field]: value }
    setFormData({ ...formData, cityStays: newCityStays })
  }

  const addCityStay = () => {
    setFormData({
      ...formData,
      cityStays: [...formData.cityStays, { city: "", nights: 1, accommodationType: "hotel", notes: "" }],
    })
  }

  const removeCityStay = (index: number) => {
    if (formData.cityStays.length > 1) {
      const newCityStays = formData.cityStays.filter((_, i) => i !== index)
      setFormData({ ...formData, cityStays: newCityStays })
    }
  }

  const getTotalNights = () => {
    return formData.cityStays.reduce((total, stay) => total + stay.nights, 0)
  }

  const sendToWhatsApp = () => {
    if (!formData.fullName || !formData.fromDate || !formData.toDate) {
      // Show error toast
      if (typeof window !== "undefined" && (window as any).showToast) {
        ;(window as any).showToast({
          type: "error",
          title: "بيانات ناقصة",
          message: "يرجى إكمال البيانات المطلوبة (الاسم والتواريخ)",
          duration: 4000,
        })
      }
      return
    }

    let message = `🌟 طلب جولة شاملة لجميع المدن الروسية - قديموسكو 🌟\n\n`
    message += `👤 الاسم: ${formData.fullName}\n`
    message += `📅 من: ${formData.fromDate}\n`
    message += `📅 إلى: ${formData.toDate}\n`
    message += `🗓️ إجمالي الأيام: ${formData.totalDays} يوم\n`
    message += `👥 عدد البالغين: ${formData.adults}\n`
    message += `👶 عدد الأطفال: ${formData.children}\n`

    if (formData.children > 0 && formData.childrenAges) {
      message += `🎂 أعمار الأطفال: ${formData.childrenAges}\n`
    }

    message += `\n🏨 تفاصيل الإقامة:\n`
    formData.cityStays.forEach((stay, index) => {
      if (stay.city) {
        message += `${index + 1}. ${stay.city}: ${stay.nights} ليلة/ليالي`
        message += ` - ${stay.accommodationType === "hotel" ? "فندق" : stay.accommodationType === "cottage" ? "كوخ" : "فندق وكوخ"}`
        if (stay.notes) {
          message += ` (${stay.notes})`
        }
        message += `\n`
      }
    })

    message += `\n📊 إجمالي الليالي: ${getTotalNights()} ليلة\n`

    if (formData.budget) {
      message += `💰 الميزانية المتوقعة: ${formData.budget}\n`
    }

    message += `\n✅ الخدمات المطلوبة:\n`
    if (formData.includedServices.breakfast) message += `• الإفطار\n`
    if (formData.includedServices.transportation) message += `• المواصلات\n`
    if (formData.includedServices.guide) message += `• مرشد سياحي عربي\n`
    if (formData.includedServices.activities) message += `• الأنشطة السياحية\n`

    if (formData.specialRequests) {
      message += `\n📝 طلبات خاصة:\n${formData.specialRequests}\n`
    }

    message += `\nشكراً لاختياركم قديموسكو لجولتكم الشاملة في روسيا! 🇷🇺✈️`

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
    <div className="space-y-6 max-h-[70vh] overflow-y-auto p-2">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-sky-800 flex items-center">
            <Users className="w-5 h-5 ml-2" />
            المعلومات الشخصية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>

      {/* Travel Dates */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-sky-800 flex items-center">
            <Calendar className="w-5 h-5 ml-2" />
            تواريخ السفر
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الوصول *</label>
              <Input
                type="date"
                value={formData.fromDate}
                onChange={(e) => handleDateChange("fromDate", e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ المغادرة *</label>
              <Input type="date" value={formData.toDate} onChange={(e) => handleDateChange("toDate", e.target.value)} />
            </div>
          </div>

          {formData.totalDays > 0 && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-semibold">إجمالي الأيام: {formData.totalDays} يوم</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* City Stays */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-sky-800 flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 ml-2" />
              تفاصيل الإقامة في المدن
            </div>
            <Button onClick={addCityStay} size="sm" variant="outline">
              <Plus className="w-4 h-4 ml-1" />
              إضافة مدينة
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.cityStays.map((stay, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-gray-800">المدينة {index + 1}</h4>
                {formData.cityStays.length > 1 && (
                  <Button onClick={() => removeCityStay(index)} size="sm" variant="outline">
                    <Minus className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المدينة</label>
                  <Select value={stay.city} onValueChange={(value) => updateCityStay(index, "city", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المدينة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="موسكو">موسكو</SelectItem>
                      <SelectItem value="سان بطرسبرغ">سان بطرسبرغ</SelectItem>
                      <SelectItem value="سوتشي">سوتشي</SelectItem>
                      <SelectItem value="كازان">كازان</SelectItem>
                      <SelectItem value="نيجني نوفغورود">نيجني نوفغورود</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">عدد الليالي</label>
                  <Input
                    type="number"
                    min="1"
                    value={stay.nights}
                    onChange={(e) => updateCityStay(index, "nights", Number.parseInt(e.target.value) || 1)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نوع الإقامة</label>
                  <Select
                    value={stay.accommodationType}
                    onValueChange={(value) => updateCityStay(index, "accommodationType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hotel">فندق</SelectItem>
                      <SelectItem value="cottage">كوخ</SelectItem>
                      <SelectItem value="both">فندق وكوخ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ملاحظات خاصة</label>
                <Input
                  value={stay.notes}
                  onChange={(e) => updateCityStay(index, "notes", e.target.value)}
                  placeholder="مثال: فندق 5 نجوم، قريب من المركز..."
                />
              </div>
            </div>
          ))}

          <div className="p-3 bg-green-50 rounded-lg">
            <p className="text-green-800 font-semibold">إجمالي الليالي: {getTotalNights()} ليلة</p>
          </div>
        </CardContent>
      </Card>

      {/* Services and Budget */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-sky-800">الخدمات والميزانية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الميزانية المتوقعة (اختياري)</label>
            <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الميزانية المتوقعة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="أقل من 100,000 ₽">أقل من 100,000 ₽</SelectItem>
                <SelectItem value="100,000 - 200,000 ₽">100,000 - 200,000 ₽</SelectItem>
                <SelectItem value="200,000 - 300,000 ₽">200,000 - 300,000 ₽</SelectItem>
                <SelectItem value="300,000 - 500,000 ₽">300,000 - 500,000 ₽</SelectItem>
                <SelectItem value="أكثر من 500,000 ₽">أكثر من 500,000 ₽</SelectItem>
                <SelectItem value="مفتوحة">مفتوحة</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">الخدمات المطلوبة</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="breakfast"
                  checked={formData.includedServices.breakfast}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      includedServices: { ...formData.includedServices, breakfast: checked as boolean },
                    })
                  }
                />
                <label htmlFor="breakfast" className="text-sm font-medium text-gray-700">
                  الإفطار
                </label>
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="transportation"
                  checked={formData.includedServices.transportation}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      includedServices: { ...formData.includedServices, transportation: checked as boolean },
                    })
                  }
                />
                <label htmlFor="transportation" className="text-sm font-medium text-gray-700">
                  المواصلات
                </label>
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="guide"
                  checked={formData.includedServices.guide}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      includedServices: { ...formData.includedServices, guide: checked as boolean },
                    })
                  }
                />
                <label htmlFor="guide" className="text-sm font-medium text-gray-700">
                  مرشد سياحي عربي
                </label>
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="activities"
                  checked={formData.includedServices.activities}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      includedServices: { ...formData.includedServices, activities: checked as boolean },
                    })
                  }
                />
                <label htmlFor="activities" className="text-sm font-medium text-gray-700">
                  الأنشطة السياحية
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Special Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-sky-800">طلبات خاصة</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            placeholder="مثال: نحن 7 أشخاص، 4 بالغين و3 أطفال (3، 6، 10). نريد 3 ليالي في موسكو، 3 في سوتشي والباقي في فنادق موسكو وكوخ لليلة واحدة..."
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={sendToWhatsApp}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg w-full max-w-md"
        >
          <Send className="w-5 h-5 ml-2" />
          إرسال الطلب عبر واتساب
        </Button>
      </div>
    </div>
  )
}
