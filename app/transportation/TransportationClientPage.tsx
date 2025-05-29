"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, Users, Clock, Plus, DollarSign } from "lucide-react"
import { Footer } from "@/components/footer"
import { useCart } from "@/hooks/use-cart"

interface Vehicle {
  id: string
  name: string
  nameAr: string
  type: "airport" | "city"
  capacity: number
  price: number
  currency: "USD" | "RUB"
  priceRange?: string
  description: string
  descriptionAr: string
  image: string
  features: string[]
  featuresAr: string[]
}

export default function TransportationClientPage() {
  const [serviceType, setServiceType] = useState<"airport" | "city">("airport")
  const [passengers, setPassengers] = useState(2)
  const [selectedVehicles, setSelectedVehicles] = useState<{ [key: string]: number }>({})
  const { addItem } = useCart()

  const vehicles: Vehicle[] = [
    // Airport Transfer Services
    {
      id: "airport-business",
      name: "Business Car",
      nameAr: "سيارة بزنس",
      type: "airport",
      capacity: 3,
      price: 100,
      currency: "USD",
      description: "Comfortable business class vehicle for airport transfers",
      descriptionAr: "سيارة بزنس مريحة للنقل من وإلى المطار",
      image: "https://friendscarrental.com/frontend/image/mercedes-c-class-2025-1739449631622.jpg",
      features: ["Air Conditioning", "Leather Seats", "WiFi", "Professional Driver"],
      featuresAr: ["تكييف هواء", "مقاعد جلدية", "واي فاي", "سائق محترف"],
    },
    {
      id: "airport-van-110",
      name: "Van (Economy)",
      nameAr: "فان (اقتصادي)",
      type: "airport",
      capacity: 7,
      price: 110,
      currency: "USD",
      description: "Spacious van for families and groups",
      descriptionAr: "فان واسع للعائلات والمجموعات",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIYuJomxltzvi-aleDZiE0ObYBWiWeZ6SnzA&s",
      features: ["7 Seats", "Large Luggage Space", "Air Conditioning", "Professional Driver"],
      featuresAr: ["7 مقاعد", "مساحة أمتعة كبيرة", "تكييف هواء", "سائق محترف"],
    },
    {
      id: "airport-van-120",
      name: "Van (Premium)",
      nameAr: "فان (مميز)",
      type: "airport",
      capacity: 7,
      price: 120,
      currency: "USD",
      description: "Premium van with enhanced comfort",
      descriptionAr: "فان مميز مع راحة محسنة",
      image: "https://limousinenassar.com/wp-content/uploads/2023/03/1200x900n-1.webp",
      features: ["7 Seats", "Premium Interior", "Extra Luggage Space", "Professional Driver"],
      featuresAr: ["7 مقاعد", "تصميم داخلي مميز", "مساحة أمتعة إضافية", "سائق محترف"],
    },
    {
      id: "airport-bus",
      name: "Large Bus",
      nameAr: "باص كبير",
      type: "airport",
      capacity: 20,
      price: 200,
      currency: "USD",
      description: "Large bus for big groups and events",
      descriptionAr: "باص كبير للمجموعات الكبيرة والفعاليات",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtlWpA2uydLP14XY87IxW65l_v0sRz36H5Eg&s",
      features: ["20+ Seats", "Air Conditioning", "Large Luggage Compartment", "Professional Driver"],
      featuresAr: ["20+ مقعد", "تكييف هواء", "مقصورة أمتعة كبيرة", "سائق محترف"],
    },

    // City Transportation (7 hours/day)
    {
      id: "city-small-regular",
      name: "Small Regular Car",
      nameAr: "سيارة صغيرة عادية",
      type: "city",
      capacity: 4,
      price: 12000,
      currency: "RUB",
      description: "Economical small car for city tours (7 hours)",
      descriptionAr: "سيارة صغيرة اقتصادية لجولات المدينة (7 ساعات)",
      image: "/placeholder.svg?height=200&width=300",
      features: ["4 Seats", "Fuel Efficient", "Air Conditioning", "7 Hours Service"],
      featuresAr: ["4 مقاعد", "موفرة للوقود", "تكييف هواء", "خدمة 7 ساعات"],
    },
    {
      id: "city-small-business",
      name: "Small Business Car",
      nameAr: "سيارة صغيرة بزنس",
      type: "city",
      capacity: 4,
      price: 13600,
      currency: "RUB",
      description: "Business class small car for comfortable city tours (7 hours)",
      descriptionAr: "سيارة صغيرة بزنس للجولات المريحة في المدينة (7 ساعات)",
      image: "/placeholder.svg?height=200&width=300",
      features: ["4 Seats", "Business Class", "Leather Interior", "7 Hours Service"],
      featuresAr: ["4 مقاعد", "درجة بزنس", "تصميم داخلي جلدي", "خدمة 7 ساعات"],
    },
    {
      id: "city-mercedes-van",
      name: "Mercedes Van",
      nameAr: "فان مرسيدس",
      type: "city",
      capacity: 7,
      price: 14800,
      currency: "RUB",
      description: "Luxury Mercedes van for premium city tours (7 hours)",
      descriptionAr: "فان مرسيدس فاخر لجولات المدينة المميزة (7 ساعات)",
      image: "/placeholder.svg?height=200&width=300",
      features: ["7 Seats", "Mercedes Brand", "Luxury Interior", "7 Hours Service"],
      featuresAr: ["7 مقاعد", "ماركة مرسيدس", "تصميم داخلي فاخر", "خدمة 7 ساعات"],
    },
    {
      id: "city-bus-17600",
      name: "Large Bus (Standard)",
      nameAr: "باص كبير (عادي)",
      type: "city",
      capacity: 20,
      price: 17600,
      currency: "RUB",
      description: "Standard large bus for group city tours (7 hours)",
      descriptionAr: "باص كبير عادي لجولات المجموعات في المدينة (7 ساعات)",
      image: "/placeholder.svg?height=200&width=300",
      features: ["20+ Seats", "Standard Comfort", "Air Conditioning", "7 Hours Service"],
      featuresAr: ["20+ مقعد", "راحة عادية", "تكييف هواء", "خدمة 7 ساعات"],
    },
    {
      id: "city-bus-20000",
      name: "Large Bus (Premium)",
      nameAr: "باص كبير (مميز)",
      type: "city",
      capacity: 25,
      price: 20000,
      currency: "RUB",
      description: "Premium large bus for luxury group city tours (7 hours)",
      descriptionAr: "باص كبير مميز لجولات المجموعات الفاخرة في المدينة (7 ساعات)",
      image: "/placeholder.svg?height=200&width=300",
      features: ["25+ Seats", "Premium Comfort", "Entertainment System", "7 Hours Service"],
      featuresAr: ["25+ مقعد", "راحة مميزة", "نظام ترفيه", "خدمة 7 ساعات"],
    },
  ]

  const getRecommendedVehicles = () => {
    return vehicles
      .filter((vehicle) => vehicle.type === serviceType && vehicle.capacity >= passengers)
      .sort((a, b) => a.capacity - b.capacity)
  }

  const handleVehicleSelect = (vehicle: Vehicle) => {
    const currentQuantity = selectedVehicles[vehicle.id] || 0
    const newQuantity = currentQuantity + 1

    setSelectedVehicles((prev) => ({
      ...prev,
      [vehicle.id]: newQuantity,
    }))

    // Add to cart
    addItem({
      type: "activity",
      id: vehicle.id,
      name: vehicle.nameAr,
      city: serviceType === "airport" ? "نقل المطار" : "جولات المدينة",
      image: vehicle.image,
      price: vehicle.price,
      currency: vehicle.currency,
      serviceType,
      passengers,
      quantity: 1,
      category: "مواصلات",
    })

    // Show success toast
    if (typeof window !== "undefined" && (window as any).showToast) {
      ; (window as any).showToast({
        type: "success",
        title: "تم إضافة المواصلات!",
        message: `تم إضافة "${vehicle.nameAr}" إلى سلة الحجز`,
        duration: 3000,
      })
    }
  }

  const formatPrice = (price: number, currency: string) => {
    if (currency === "USD") {
      return `$${price}`
    }
    return `${price.toLocaleString()} ₽`
  }

  const getServiceTitle = () => {
    return serviceType === "airport" ? "استقبال أو توديع" : "داخل المدينة (اليوم = 7 ساعات)"
  }

  const getServiceDescription = () => {
    return serviceType === "airport"
      ? "خدمات النقل من وإلى المطار مع سائق محترف"
      : "جولات داخل المدينة لمدة 7 ساعات يومياً مع سائق محترف"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-rtl py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 flex items-center justify-center">
            <Car className="w-8 h-8 ml-3" />
            المواصلات
          </h1>
          <p className="text-lg text-gray-600">اختر نوع المواصلات المناسب لعدد المسافرين</p>
        </div>

        {/* Service Type and Passenger Selection */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">تفاصيل الخدمة</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نوع الخدمة</label>
              <Select value={serviceType} onValueChange={(value: "airport" | "city") => setServiceType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الخدمة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="airport">استقبال أو توديع</SelectItem>
                  <SelectItem value="city">جولات داخل المدينة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">عدد المسافرين</label>
              <Input
                type="number"
                min="1"
                max="50"
                value={passengers}
                onChange={(e) => setPassengers(Number.parseInt(e.target.value) || 1)}
                className="w-full"
              />
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">{getServiceTitle()}</h3>
            <p className="text-blue-700">{getServiceDescription()}</p>
          </div>
        </div>

        {/* Vehicle Recommendations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
            <Users className="w-6 h-6 ml-2" />
            المركبات المناسبة لـ {passengers} مسافر
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getRecommendedVehicles().map((vehicle) => {
              const quantity = selectedVehicles[vehicle.id] || 0
              const isSelected = quantity > 0

              return (
                <Card
                  key={vehicle.id}
                  className={`card-hover transition-all duration-300 ${isSelected ? "ring-2 ring-blue-500 shadow-lg" : ""
                    } ${vehicle.capacity === passengers ? "border-green-500 border-2" : ""}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-blue-900">{vehicle.nameAr}</CardTitle>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 ml-1" />
                        <span>{vehicle.capacity}</span>
                      </div>
                    </div>
                    {vehicle.capacity === passengers && (
                      <div className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full w-fit">
                        مناسب تماماً
                      </div>
                    )}
                  </CardHeader>

                  <CardContent>
                    <img
                      src={vehicle.image || "/placeholder.svg"}
                      alt={vehicle.nameAr}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />

                    <p className="text-gray-700 text-sm mb-4">{vehicle.descriptionAr}</p>

                    <div className="space-y-2 mb-4">
                      <h4 className="font-semibold text-gray-800 text-sm">المميزات:</h4>
                      <div className="grid grid-cols-1 gap-1">
                        {vehicle.featuresAr.slice(0, 3).map((feature, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-600">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full ml-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-green-600 ml-1" />
                        <span className="text-xl font-bold text-green-600">
                          {formatPrice(vehicle.price, vehicle.currency)}
                        </span>
                      </div>
                      {serviceType === "city" && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 ml-1" />
                          <span>7 ساعات</span>
                        </div>
                      )}
                    </div>

                    {!isSelected ? (
                      <Button onClick={() => handleVehicleSelect(vehicle)} className="btn-primary w-full">
                        <Plus className="w-4 h-4 ml-2" />
                        اختر هذه المركبة
                      </Button>
                    ) : (
                      <div className="bg-blue-50 p-3 rounded-lg text-center">
                        <span className="text-blue-800 font-semibold">تم الاختيار</span>
                        {quantity > 1 && <div className="text-sm text-blue-600 mt-1">الكمية: {quantity}</div>}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {getRecommendedVehicles().length === 0 && (
            <div className="text-center py-12">
              <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد مركبات متاحة</h3>
              <p className="text-gray-500">يرجى تعديل عدد المسافرين أو نوع الخدمة</p>
            </div>
          )}
        </div>

        {/* Service Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">معلومات الخدمة</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">استقبال أو توديع:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                  سيارة بزنس: $100
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                  فان: $110 - $120
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                  باص كبير: $200
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">داخل المدينة (7 ساعات):</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                  سيارة صغيرة عادية: 12,000 ₽
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                  سيارة صغيرة بزنس: 13,600 ₽
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                  فان مرسيدس: 14,800 ₽
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                  باص كبير: 17,600 - 20,000 ₽
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">ملاحظات مهمة:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• جميع الأسعار تشمل السائق المحترف</li>
              <li>• خدمة المدينة تشمل 7 ساعات يومياً</li>
              <li>• يمكن تعديل المسار حسب الطلب</li>
              <li>• جميع المركبات مكيفة ومريحة</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
