"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Minus, MapPin, Clock, ShoppingCart } from "lucide-react"
import { Footer } from "@/components/footer"
import { useCart } from "@/hooks/use-cart"

interface Activity {
  id: number
  name: string
  city: string
  category: string
  duration: string
  price: number
  image: string
  description: string
}

interface SelectedActivity extends Activity {
  quantity: number
}

export default function ActivitiesClientPage() {
  const [filters, setFilters] = useState({
    city: "",
    category: "",
  })

  const [selectedActivities, setSelectedActivities] = useState<{ [key: number]: number }>({})
  const { addItem } = useCart()

  const activities: Activity[] = [
    // أنشطة طبيعية ومغامرات
    {
      id: 1,
      name: "ركوب الخيل",
      city: "سوتشي",
      category: "طبيعة",
      duration: "ساعتان",
      price: 4400,
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/25/1e/6d/caption.jpg?w=900&h=500&s=1",
      description: "تجربة ركوب خيل ممتعة في الطبيعة الخلابة",
    },
    {
      id: 2,
      name: "الدراجات العملاقة",
      city: "سوتشي",
      category: "مغامرات",
      duration: "3 ساعات",
      price: 10000,
      image: "https://avatars.mds.yandex.net/get-altay/11401274/2a0000018bf1ef41a8c9c4f90e71aaab5f38/XXXL",
      description: "مغامرة مثيرة بالدراجات العملاقة في المسارات الجبلية",
    },
    {
      id: 3,
      name: "الدراجات الصغيرة",
      city: "سوتشي",
      category: "طبيعة",
      duration: "ساعة واحدة",
      price: 8500,
      image: "https://yacota-moto.com/upload/iblock/df1/31.jpg",
      description: "لمدة ساعة كاملة في الغابة في مكان واحد",
    },
    {
      id: 5,
      name: "التصوير واللعب مع الهاسكي",
      city: "سوتشي",
      category: "عائلية",
      duration: "ساعة واحدة",
      price: 5000,
      image: "https://img.youm7.com/ArticleImgs/2020/12/30/43546-%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8-%D8%A7%D9%84%D9%83%D9%84%D8%A7%D8%A8-%D8%A7%D9%84%D9%87%D8%A7%D8%B3%D9%83%D9%89-%D8%B9%D9%84%D9%89-%D8%A7%D9%84%D8%A5%D9%86%D9%82%D8%A7%D8%B0-(5).jpg",
      description: "التصوير واللعب مع الهاسكي والتجول لمدة ساعة وشرب الشاي وتناول البسكويت وركوب عربة الهاسكي",
    },
    {
      id: 6,
      name: "ركوب عربة الهاسكي فقط",
      city: "سوتشي",
      category: "مغامرات",
      duration: "30 دقيقة",
      price: 3500,
      image: "https://ainrussia.com/wp-content/uploads/2024/02/625d1fc0-2823-46ff-b381-104b7294abf6-1.jpeg",
      description: "تجربة ركوب عربة الهاسكي التقليدية",
    },
    {
      id: 7,
      name: "الزِبلاين على النهر",
      city: "سوتشي",
      category: "مغامرات",
      duration: "ساعة واحدة",
      price: 4500,
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/cd/c5/73/aj-hackett-international.jpg?w=1100&h=-1&s=1",
      description: "مغامرة الزبلاين المثيرة فوق النهر",
    },
    {
      id: 8,
      name: "التلفريك ذهاب وعودة",
      city: "سوتشي",
      category: "طبيعة",
      duration: "45 دقيقة",
      price: 1500,
      image: "https://russiatoursgate.com/wp-content/uploads/2025/01/Moscow-cable-car-tour-optimized.jpg",
      description: "رحلة بالتلفريك مع إطلالات خلابة على الجبال",
    },

    // أنشطة مائية
    {
      id: 9,
      name: "عرض الدلافين",
      city: "سوتشي",
      category: "عائلية",
      duration: "ساعة واحدة",
      price: 2900,
      image: "https://russiatoursgate.com/wp-content/uploads/2025/01/Moscow-Dolphin-Show-optimized.jpg",
      description: "عرض مذهل للدلافين المدربة",
    },
    {
      id: 10,
      name: "أكواريوم",
      city: "سوتشي",
      category: "عائلية",
      duration: "ساعتان",
      price: 2500,
      image: "https://www.urtrips.com/wp-content/uploads/2022/09/moskvarium-aquarium-moscow_6.jpg",
      description: "استكشاف عالم البحار في أكواريوم رائع",
    },

    // أنشطة ثقافية
    {
      id: 11,
      name: "السيرك الروسي",
      city: "موسكو",
      category: "ثقافية",
      duration: "ساعتان",
      price: 2500,
      image: "https://ivisitrussia.com/119-large_default/the-russian-circus-tour.jpg",
      description: "عرض السيرك الروسي التقليدي الشهير",
    },
    {
      id: 12,
      name: "جولة الكروز النهرية",
      city: "سان بطرسبرغ",
      category: "ثقافية",
      duration: "3 ساعات",
      price: 3500,
      image: "https://avatars.mds.yandex.net/get-altay/14333651/2a000001946e1c1421532b643c7a5573c17b/XXXL",
      description: "جولة بحرية ساحرة في أنهار سان بطرسبرغ",
    },
    {
      id: 13,
      name: "أوبرا",
      city: "سان بطرسبرغ",
      category: "ثقافية",
      duration: "3 ساعات",
      price: 0,
      image: "https://novayaopera.ru/upload/images/theatre.png",
      description: "عرض أوبرا كلاسيكي (حسب التوفر)",
    },
    {
      id: 14,
      name: "باليه",
      city: "سان بطرسبرغ",
      category: "ثقافية",
      duration: "ساعتان ونصف",
      price: 0,
      image: "https://platinumlist.net/guide/wp-content/uploads/2024/03/601-Swan-Lake-Act-3-Natalia-Kleymyonova-Daniil-Orlov-jpg-scaled-1-1536x928-1.jpg",
      description: "عرض باليه روسي تقليدي (حسب التوفر)",
    },

    // مغامرات جوية
    {
      id: 15,
      name: "جولة بالهليكوبتر",
      city: "موسكو",
      category: "مغامرات",
      duration: "20 دقيقة",
      price: 26000,
      image: "https://russiatoursgate.com/wp-content/uploads/2025/01/Moscow-Helicopter-Tour-optimized.jpg",
      description: "جولة جوية مذهلة بالهليكوبتر لمدة 20 دقيقة",
    },
    {
      id: 16,
      name: "رحلة بالمنطاد",
      city: "سوتشي",
      category: "مغامرات",
      duration: "ساعة واحدة",
      price: 9900,
      image: "https://russiatoursgate.com/wp-content/uploads/2025/01/Balloon-Tour-in-Moscow-optimized.jpg",
      description: "رحلة رومانسية بالمنطاد لمدة ساعة كاملة",
    },

    // أنشطة مميزة
    {
      id: 17,
      name: "دريفت سيارات حقيقية",
      city: "موسكو",
      category: "مغامرات",
      duration: "ساعة واحدة",
      price: 24000,
      image: "https://res.cloudinary.com/tourhq/image/upload/fl_progressive,f_auto,h_507,w_900,g_auto,c_fill,q_auto/ntpm7qizqbmwkqkmrk0y",
      description: "تجربة دريفت مثيرة بسيارات حقيقية",
    },
    {
      id: 18,
      name: "التصوير مع النمر",
      city: "موسكو",
      category: "مميزة",
      duration: "30 دقيقة",
      price: 50000,
      image: "https://ainalarab.com/wp-content/uploads/2024/03/%D9%81%D8%B9%D8%A7%D9%84%D9%8A%D8%A9-%D8%A7%D9%84%D8%AA%D8%B5%D9%88%D9%8A%D8%B1-%D9%85%D8%B9-%D8%A7%D9%84%D9%86%D9%85%D8%B1-%D8%A7%D9%84%D8%B1%D9%88%D8%B3%D9%8A.jpeg",
      description: "جلسة تصوير فريدة مع النمر",
    },
    {
      id: 19,
      name: "فعالية الدب مع المواصلات مع المصور",
      city: "موسكو",
      category: "مميزة",
      duration: "ساعة واحدة",
      price: 70000,
      image: "./activity/dub.jpeg",
      description: "التصوير مع الدب في ملابس تراثية روسية وشرب الشاي وتناول البسكويت",
    },
    {
      id: 20,
      name: "المعسكر الحربي",
      city: "موسكو",
      category: "مغامرات",
      duration: "ساعتان ونصف",
      price: 16000,
      image: "https://avatars.mds.yandex.net/get-altay/6487610/2a00000183a804caa27106eee1a17e90d0d1/XXXL",
      description: "تجربة المعسكر الحربي لمدة ساعتين ونصف",
    },

    // أنشطة عائلية
    {
      id: 21,
      name: "حديقة الحيوان",
      city: "موسكو",
      category: "عائلية",
      duration: "3 ساعات",
      price: 2000,
      image: "https://russiatoursgate.com/wp-content/uploads/2024/11/%D8%AD%D8%AF%D9%8A%D9%82%D8%A9-%D8%AD%D9%8A%D9%88%D8%A7%D9%86-%D9%85%D9%88%D8%B3%D9%83%D9%88-optimized.jpg",
      description: "زيارة ممتعة لحديقة الحيوان مع العائلة",
    },
    {
      id: 22,
      name: "دريم لاند",
      city: "موسكو",
      category: "عائلية",
      duration: "يوم كامل",
      price: 3500,
      image: "https://lh3.googleusercontent.com/p/AF1QipPnAC2YpVuFOm-QHaDoNBqG-7-Bp1k-HAqhAJgF=s1360-w1360-h1020-rw",
      description: "مدينة ألعاب شاملة الألعاب",
    },
    {
      id: 24,
      name: "بانوراما 360 طابق",
      city: "موسكو",
      category: "ثقافية",
      duration: "ساعة واحدة",
      price: 3500,
      image: "./activity/panoramas.jpeg",
      description: "إطلالة بانورامية 360 درجة على موسكو",
    },
    {
      id: 25,
      name: "زيارة حديقة الغزلان الريفية",
      city: "سوتشي",
      category: "عائلية",
      duration: "ساعتان",
      price: 4000,
      image: "./activity/qazal.jpeg",
      description: "زيارة حديقة الغزلان الريفية وإطعامها",
    },
    {
      id: 26,
      name: "الزحليقة",
      city: "سوتشي",
      category: "عائلية",
      duration: "30 دقيقة",
      price: 600,
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/cf/7f/af/maisi-flitzer-sommer.jpg?w=1200&h=1200&s=1",
      description: "متعة الزحليقة للأطفال والكبار",
    },
  ]

  const filteredActivities = activities.filter((activity) => {
    const cityMatch =
      !filters.city ||
      (filters.city === "moscow" && activity.city === "موسكو") ||
      (filters.city === "petersburg" && activity.city === "سان بطرسبرغ") ||
      (filters.city === "sochi" && activity.city === "سوتشي")

    const categoryMatch =
      !filters.category ||
      (filters.category === "cultural" && activity.category === "ثقافية") ||
      (filters.category === "family" && activity.category === "عائلية") ||
      (filters.category === "nature" && activity.category === "طبيعة") ||
      (filters.category === "adventures" && activity.category === "مغامرات") ||
      (filters.category === "premium" && activity.category === "مميزة")

    return cityMatch && categoryMatch
  })

  const handleActivitySelect = (activity: Activity) => {
    const currentQuantity = selectedActivities[activity.id] || 0
    const newQuantity = currentQuantity + 1

    setSelectedActivities((prev) => ({
      ...prev,
      [activity.id]: newQuantity,
    }))

    // Add single quantity to cart
    addItem({ type: "activity", ...activity, quantity: 1 })

    // Show success toast
    if (typeof window !== "undefined" && (window as any).showToast) {
      ; (window as any).showToast({
        type: "success",
        title: "تم إضافة النشاط!",
        message: `تم إضافة "${activity.name}" إلى سلة الحجز`,
        duration: 3000,
      })
    }
  }

  const handleQuantityChange = (activity: Activity, change: number) => {
    const currentQuantity = selectedActivities[activity.id] || 0
    const newQuantity = Math.max(0, currentQuantity + change)

    if (newQuantity === 0) {
      const { [activity.id]: removed, ...rest } = selectedActivities
      setSelectedActivities(rest)
    } else {
      setSelectedActivities((prev) => ({
        ...prev,
        [activity.id]: newQuantity,
      }))
    }

    // Add or remove from cart
    if (change > 0) {
      addItem({ type: "activity", ...activity, quantity: 1 })
    }
    // Note: For removing, we'll handle this in the store page
  }

  const getTotalPrice = () => {
    return Object.entries(selectedActivities).reduce((total, [activityId, quantity]) => {
      const activity = activities.find((a) => a.id === Number.parseInt(activityId))
      return total + (activity ? activity.price * quantity : 0)
    }, 0)
  }

  const getTotalItems = () => {
    return Object.values(selectedActivities).reduce((total, quantity) => total + quantity, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-rtl py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 text-center">الأنشطة والجولات السياحية</h1>

        {/* Filters */}
        {/* <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">تصفية النتائج</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">المدينة</label>
              <Select value={filters.city} onValueChange={(value) => setFilters({ ...filters, city: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المدينة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="moscow">موسكو</SelectItem>
                  <SelectItem value="petersburg">سان بطرسبرغ</SelectItem>
                  <SelectItem value="sochi">سوتشي</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
              <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الفئة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cultural">ثقافية</SelectItem>
                  <SelectItem value="family">عائلية</SelectItem>
                  <SelectItem value="nature">طبيعة</SelectItem>
                  <SelectItem value="adventures">مغامرات</SelectItem>
                  <SelectItem value="premium">مميزة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div> */}

        {/* Selected Activities Summary */}
        {getTotalItems() > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg shadow-md mb-8 border-2 border-green-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-green-800 mb-2">الأنشطة المحددة</h3>
                <p className="text-green-700">
                  <span className="font-semibold">{getTotalItems()}</span> نشاط محدد
                </p>
                <p className="text-2xl font-bold text-green-800 mt-2">المجموع: {getTotalPrice().toLocaleString()} ₽</p>
              </div>
              <Button
                onClick={() => { }}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg"
              >
                <ShoppingCart className="w-5 h-5 ml-2" />
                أضف الكل للسلة
              </Button>
            </div>
          </div>
        )}

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => {
            const quantity = selectedActivities[activity.id] || 0
            const isSelected = quantity > 0

            return (
              <div
                key={activity.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden card-hover transition-all duration-300 ${isSelected ? "ring-2 ring-blue-500 shadow-lg" : ""
                  }`}
              >
                <img
                  src={activity.image || "/placeholder.svg"}
                  alt={activity.name}
                  className="w-full h-60 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">{activity.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    {/* <MapPin className="w-4 h-4 ml-1" /> */}
                    {/* <span className="ml-3">{activity.city}</span> */}
                    <Clock className="w-4 h-4 mr-3 ml-1" />
                    <span>{activity.duration}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {activity.category}
                    </span>
                    {activity.price > 0 ? (
                      <span className="text-lg font-bold text-green-600">{activity.price.toLocaleString()} ₽</span>
                    ) : (
                      <span className="text-sm text-gray-500">حسب التوفر</span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-4 text-sm">{activity.description}</p>

                  {/* Selection Controls */}
                  {!isSelected ? (
                    <Button
                      onClick={() => handleActivitySelect(activity)}
                      className="btn-primary w-full"
                      disabled={activity.price === 0}
                    >
                      <Plus className="w-4 h-4 ml-2" />
                      {activity.price === 0 ? "حسب التوفر" : "اختر النشاط"}
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                        <span className="text-blue-800 font-semibold">محدد</span>
                        <div className="flex items-center gap-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuantityChange(activity, -1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="font-bold text-lg min-w-[2rem] text-center">{quantity}</span>
                          <Button
                            size="sm"
                            onClick={() => handleQuantityChange(activity, 1)}
                            className="w-8 h-8 p-0 bg-blue-600 hover:bg-blue-700"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {quantity > 1 && (
                        <div className="text-center">
                          <span className="text-sm text-gray-600">المجموع: </span>
                          <span className="font-bold text-green-600">
                            {(activity.price * quantity).toLocaleString()} ₽
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}
