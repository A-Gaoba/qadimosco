"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Star, Plus, MapPin, Calendar, Users, Baby } from "lucide-react"
import { Footer } from "@/components/footer"
import { useCart } from "@/hooks/use-cart"

// Add this before the component
const hotelsStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "فنادق روسيا - قديموسكو",
  description: "قائمة بأفضل الفنادق في روسيا",
  numberOfItems: 12,
  itemListElement: [
    {
      "@type": "Hotel",
      name: "فندق ريتز كارلتون موسكو",
      address: {
        "@type": "PostalAddress",
        addressLocality: "موسكو",
        addressCountry: "روسيا",
      },
      starRating: {
        "@type": "Rating",
        ratingValue: "5",
      },
      priceRange: "$$$$$",
    },
    // Add more hotels...
  ],
}

interface Hotel {
  id: string
  name: string
  nameAr: string
  stars: number
  distance_from_center_km: number
  description: string
  descriptionAr: string
  city: string
  cityAr: string
  type: "hotel" | "cottage"
  image: string
  amenities: string[]
  amenitiesAr: string[]
}

interface BookingData {
  checkIn: string
  checkOut: string
  rooms: number
  adults: number
  hasChildren: boolean
  children: number
  childrenAges: string
  breakfast: boolean
}

export default function HotelsClientPage() {
  const [filters, setFilters] = useState({
    city: "",
    type: "",
  })

  const [bookingData, setBookingData] = useState<BookingData>({
    checkIn: "",
    checkOut: "",
    rooms: 1,
    adults: 2,
    hasChildren: false,
    children: 0,
    childrenAges: "",
    breakfast: false,
  })

  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)
  const [showReplaceModal, setShowReplaceModal] = useState(false)
  const [pendingHotel, setPendingHotel] = useState<Hotel | null>(null)
  const { items: cart, addItem, removeItem } = useCart()

  // Check if there's already a hotel in the cart
  const existingHotel = cart.find((item) => item.type === "hotel")

  // Comprehensive hotel data with Arabic translations
  const hotelsData: Hotel[] = [
    // Moscow Hotels
    {
      id: "moscow-1",
      name: "The Ritz-Carlton, Moscow",
      nameAr: "فندق ريتز كارلتون موسكو",
      stars: 5,
      distance_from_center_km: 0,
      description: "Luxurious hotel with rooftop views of the Kremlin, spa, and fine dining.",
      descriptionAr: "فندق فاخر مع إطلالات على الكرملين من السطح، سبا، ومطاعم راقية",
      city: "Moscow",
      cityAr: "موسكو",
      type: "hotel",
      image: "/placeholder.svg?height=300&width=400",
      amenities: ["Spa", "Fine Dining", "Rooftop Bar", "Fitness Center"],
      amenitiesAr: ["سبا", "مطاعم راقية", "بار على السطح", "مركز لياقة بدنية"],
    },
    {
      id: "moscow-2",
      name: "Hotel Baltschug Kempinski Moscow",
      nameAr: "فندق بالتشوغ كيمبينسكي موسكو",
      stars: 5,
      distance_from_center_km: 1,
      description: "Historic hotel with views of the Kremlin and classic European decor.",
      descriptionAr: "فندق تاريخي مع إطلالات على الكرملين وديكور أوروبي كلاسيكي",
      city: "Moscow",
      cityAr: "موسكو",
      type: "hotel",
      image: "/placeholder.svg?height=300&width=400",
      amenities: ["Historic Architecture", "Kremlin Views", "Luxury Rooms", "Business Center"],
      amenitiesAr: ["عمارة تاريخية", "إطلالات الكرملين", "غرف فاخرة", "مركز أعمال"],
    },
    {
      id: "moscow-3",
      name: "Four Seasons Hotel Moscow",
      nameAr: "فندق فور سيزونز موسكو",
      stars: 5,
      distance_from_center_km: 0.2,
      description: "Ultra-luxury hotel rebuilt in the style of Hotel Moskva with spa and pool.",
      descriptionAr: "فندق فائق الفخامة مُعاد بناؤه بأسلوب فندق موسكفا مع سبا ومسبح",
      city: "Moscow",
      cityAr: "موسكو",
      type: "hotel",
      image: "/placeholder.svg?height=300&width=400",
      amenities: ["Pool", "Spa", "Ultra-Luxury", "Historic Style"],
      amenitiesAr: ["مسبح", "سبا", "فخامة عالية", "طراز تاريخي"],
    },
    {
      id: "moscow-4",
      name: "National Hotel Moscow",
      nameAr: "الفندق الوطني موسكو",
      stars: 5,
      distance_from_center_km: 0.3,
      description: "Historic hotel with antique furnishings and Kremlin views.",
      descriptionAr: "فندق تاريخي مع أثاث عتيق وإطلالات على الكرملين",
      city: "Moscow",
      cityAr: "موسكو",
      type: "hotel",
      image: "/placeholder.svg?height=300&width=400",
      amenities: ["Antique Furnishings", "Historic", "Kremlin Views", "Classic Luxury"],
      amenitiesAr: ["أثاث عتيق", "تاريخي", "إطلالات الكرملين", "فخامة كلاسيكية"],
    },
    {
      id: "moscow-5",
      name: "Marriott Moscow Grand Hotel",
      nameAr: "فندق ماريوت موسكو الكبير",
      stars: 5,
      distance_from_center_km: 2,
      description: "Spacious hotel with a pool and business facilities on Tverskaya.",
      descriptionAr: "فندق واسع مع مسبح ومرافق أعمال في شارع تفيرسكايا",
      city: "Moscow",
      cityAr: "موسكو",
      type: "hotel",
      image: "/placeholder.svg?height=300&width=400",
      amenities: ["Pool", "Business Facilities", "Spacious Rooms", "Central Location"],
      amenitiesAr: ["مسبح", "مرافق أعمال", "غرف واسعة", "موقع مركزي"],
    },
    {
      id: "moscow-cottage-1",
      name: "Pine River Hotel & Cottages",
      nameAr: "فندق وأكواخ نهر الصنوبر",
      stars: 4,
      distance_from_center_km: 25,
      description: "Cottage-style accommodation in a forested area near Moscow with spa and relaxation.",
      descriptionAr: "إقامة على طراز الأكواخ في منطقة غابات قرب موسكو مع سبا واسترخاء",
      city: "Moscow",
      cityAr: "موسكو",
      type: "cottage",
      image: "/placeholder.svg?height=300&width=400",
      amenities: ["Forest Location", "Spa", "Cottages", "Nature"],
      amenitiesAr: ["موقع في الغابة", "سبا", "أكواخ", "طبيعة"],
    },

    // St. Petersburg Hotels
    {
      id: "spb-1",
      name: "Belmond Grand Hotel Europe",
      nameAr: "فندق بلموند جراند أوروبا",
      stars: 5,
      distance_from_center_km: 0.5,
      description: "Historic luxury hotel near Nevsky Prospect and the Hermitage.",
      descriptionAr: "فندق فاخر تاريخي قرب شارع نيفسكي ومتحف الهرمتاج",
      city: "St. Petersburg",
      cityAr: "سان بطرسبرغ",
      type: "hotel",
      image: "/placeholder.svg?height=300&width=400",
      amenities: ["Historic Luxury", "Nevsky Prospect", "Near Hermitage", "Classic Elegance"],
      amenitiesAr: ["فخامة تاريخية", "شارع نيفسكي", "قرب الهرمتاج", "أناقة كلاسيكية"],
    },
    {
      id: "spb-2",
      name: "Four Seasons Hotel Lion Palace",
      nameAr: "فندق فور سيزونز قصر الأسد",
      stars: 5,
      distance_from_center_km: 0.7,
      description: "Palatial hotel next to St. Isaac's Cathedral with refined service.",
      descriptionAr: "فندق قصري بجانب كاتدرائية القديس إسحاق مع خدمة راقية",
      city: "St. Petersburg",
      cityAr: "سان بطرسبرغ",
      type: "hotel",
      image: "/placeholder.svg?height=300&width=400",
      amenities: ["Palatial Design", "Cathedral Views", "Refined Service", "Luxury"],
      amenitiesAr: ["تصميم قصري", "إطلالات الكاتدرائية", "خدمة راقية", "فخامة"],
    },
    {
      id: "spb-3",
      name: "W St. Petersburg",
      nameAr: "فندق دبليو سان بطرسبرغ",
      stars: 5,
      distance_from_center_km: 0.8,
      description: "Trendy luxury hotel with rooftop bar and modern design.",
      descriptionAr: "فندق فاخر عصري مع بار على السطح وتصميم حديث",
      city: "St. Petersburg",
      cityAr: "سان بطرسبرغ",
      type: "hotel",
      image: "/placeholder.svg?height=300&width=400",
      amenities: ["Rooftop Bar", "Modern Design", "Trendy", "Luxury"],
      amenitiesAr: ["بار على السطح", "تصميم حديث", "عصري", "فخامة"],
    },
    {
      id: "spb-cottage-1",
      name: "Lahta Plaza Country Club",
      nameAr: "نادي لاهتا بلازا الريفي",
      stars: 4,
      distance_from_center_km: 30,
      description: "Exclusive cottages near the Gulf of Finland, offering peace and nature.",
      descriptionAr: "أكواخ حصرية قرب خليج فنلندا، توفر السلام والطبيعة",
      city: "St. Petersburg",
      cityAr: "سان بطرسبرغ",
      type: "cottage",
      image: "/placeholder.svg?height=300&width=400",
      amenities: ["Gulf Views", "Exclusive", "Nature", "Peace"],
      amenitiesAr: ["إطلالات الخليج", "حصري", "طبيعة", "هدوء"],
    },

    // Sochi Hotels
    {
      id: "sochi-1",
      name: "Rodina Grand Hotel & SPA",
      nameAr: "فندق رودينا الكبير والسبا",
      stars: 5,
      distance_from_center_km: 2,
      description: "Luxurious retreat with subtropical gardens and a private beach.",
      descriptionAr: "منتجع فاخر مع حدائق استوائية وشاطئ خاص",
      city: "Sochi",
      cityAr: "سوتشي",
      type: "hotel",
      image: "/placeholder.svg?height=300&width=400",
      amenities: ["Private Beach", "Subtropical Gardens", "Spa", "Luxury Retreat"],
      amenitiesAr: ["شاطئ خاص", "حدائق استوائية", "سبا", "منتجع فاخر"],
    },
    {
      id: "sochi-2",
      name: "Hyatt Regency Sochi",
      nameAr: "فندق حياة ريجنسي سوتشي",
      stars: 5,
      distance_from_center_km: 1,
      description: "Modern seaside hotel with pool, spa, and great views.",
      descriptionAr: "فندق ساحلي حديث مع مسبح وسبا وإطلالات رائعة",
      city: "Sochi",
      cityAr: "سوتشي",
      type: "hotel",
      image: "/placeholder.svg?height=300&width=400",
      amenities: ["Seaside", "Pool", "Spa", "Great Views"],
      amenitiesAr: ["ساحلي", "مسبح", "سبا", "إطلالات رائعة"],
    },
    {
      id: "sochi-3",
      name: "Swissôtel Resort Sochi Kamelia",
      nameAr: "منتجع سويس أوتيل سوتشي كاميليا",
      stars: 5,
      distance_from_center_km: 2.5,
      description: "Beachfront resort with elegant rooms and subtropical park.",
      descriptionAr: "منتجع على الشاطئ مع غرف أنيقة وحديقة استوائية",
      city: "Sochi",
      cityAr: "سوتشي",
      type: "hotel",
      image: "/placeholder.svg?height=300&width=400",
      amenities: ["Beachfront", "Elegant Rooms", "Subtropical Park", "Resort"],
      amenitiesAr: ["على الشاطئ", "غرف أنيقة", "حديقة استوائية", "منتجع"],
    },
    {
      id: "sochi-cottage-1",
      name: "Polyana 1389 Hotel & Spa",
      nameAr: "فندق وسبا بوليانا 1389",
      stars: 5,
      distance_from_center_km: 50,
      description: "Chalet-style cottages in Krasnaya Polyana, ideal for mountain and ski getaways.",
      descriptionAr: "أكواخ على طراز الشاليه في كراسنايا بوليانا، مثالية للإجازات الجبلية والتزلج",
      city: "Sochi",
      cityAr: "سوتشي",
      type: "cottage",
      image: "/placeholder.svg?height=300&width=400",
      amenities: ["Chalet Style", "Mountain Location", "Ski Resort", "Spa"],
      amenitiesAr: ["طراز الشاليه", "موقع جبلي", "منتجع تزلج", "سبا"],
    },
  ]

  const getDistanceText = (distance: number, city: string) => {
    if (distance === 0) {
      if (city === "Moscow") return "في قلب الساحة الحمراء"
      if (city === "St. Petersburg") return "في قلب المدينة التاريخية"
      if (city === "Sochi") return "في قلب المدينة"
    }

    const landmark = city === "Moscow" ? "الساحة الحمراء" : city === "St. Petersburg" ? "شارع نيفسكي" : "مركز سوتشي"

    return `يبعد ${distance} كم عن ${landmark}`
  }

  const filteredHotels = hotelsData.filter((hotel) => {
    const cityMatch =
      !filters.city ||
      (filters.city === "moscow" && hotel.city === "Moscow") ||
      (filters.city === "petersburg" && hotel.city === "St. Petersburg") ||
      (filters.city === "sochi" && hotel.city === "Sochi")

    const typeMatch =
      !filters.type ||
      (filters.type === "hotel" && hotel.type === "hotel") ||
      (filters.type === "cottage" && hotel.type === "cottage")

    return cityMatch && typeMatch
  })

  const groupedHotels = {
    Moscow: filteredHotels.filter((h) => h.city === "Moscow"),
    "St. Petersburg": filteredHotels.filter((h) => h.city === "St. Petersburg"),
    Sochi: filteredHotels.filter((h) => h.city === "Sochi"),
  }

  const isBookingDataComplete = () => {
    return bookingData.checkIn && bookingData.checkOut && bookingData.adults > 0
  }

  const handleHotelSelect = (hotel: Hotel) => {
    if (!isBookingDataComplete()) {
      // Show error toast
      if (typeof window !== "undefined" && (window as any).showToast) {
        ;(window as any).showToast({
          type: "error",
          title: "بيانات ناقصة",
          message: "يرجى إكمال بيانات الحجز أولاً (التواريخ وعدد المسافرين)",
          duration: 4000,
        })
      }
      return
    }

    if (existingHotel) {
      setPendingHotel(hotel)
      setShowReplaceModal(true)
    } else {
      addHotelToCart(hotel)
    }
  }

  const addHotelToCart = (hotel: Hotel) => {
    const hotelWithBookingData = {
      type: "hotel" as const,
      ...hotel,
      bookingData: { ...bookingData },
    }

    addItem(hotelWithBookingData)

    // Show success toast
    if (typeof window !== "undefined" && (window as any).showToast) {
      ;(window as any).showToast({
        type: "success",
        title: "تم إضافة الفندق!",
        message: `تم إضافة "${hotel.nameAr}" إلى سلة الحجز بنجاح`,
        duration: 4000,
      })
    }
  }

  const handleReplaceHotel = () => {
    if (pendingHotel && existingHotel) {
      // Find and remove existing hotel
      const existingHotelIndex = cart.findIndex((item) => item.type === "hotel")
      if (existingHotelIndex !== -1) {
        removeItem(existingHotelIndex)
      }

      // Add new hotel
      addHotelToCart(pendingHotel)

      setShowReplaceModal(false)
      setPendingHotel(null)

      // Show info toast
      if (typeof window !== "undefined" && (window as any).showToast) {
        ;(window as any).showToast({
          type: "info",
          title: "تم استبدال الفندق",
          message: `تم استبدال "${existingHotel.nameAr || existingHotel.name}" بـ "${pendingHotel.nameAr}"`,
          duration: 4000,
        })
      }
    }
  }

  const handleKeepExisting = () => {
    setShowReplaceModal(false)
    setPendingHotel(null)
  }

  const HotelCard = ({ hotel }: { hotel: Hotel }) => {
    const isSelected = existingHotel?.id === hotel.id
    const canSelect = isBookingDataComplete()

    return (
      <div
        className={`bg-white rounded-lg shadow-md overflow-hidden card-hover ${isSelected ? "ring-2 ring-blue-500" : ""}`}
      >
        <img src={hotel.image || "/placeholder.svg"} alt={hotel.nameAr} className="w-full h-48 object-cover" />
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-blue-900">{hotel.nameAr}</h3>
            <div className="flex">
              {[...Array(hotel.stars)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-gold-500 fill-current" />
              ))}
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-600 mb-2">
            <MapPin className="w-4 h-4 ml-1" />
            <span>{getDistanceText(hotel.distance_from_center_km, hotel.city)}</span>
          </div>

          <div className="flex items-center mb-3">
            <span
              className={`inline-block text-xs px-2 py-1 rounded-full ${
                hotel.type === "hotel" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
              }`}
            >
              {hotel.type === "hotel" ? "فندق" : "كوخ ريفي"}
            </span>
            {isSelected && (
              <span className="inline-block text-xs px-2 py-1 rounded-full bg-blue-500 text-white mr-2">محدد</span>
            )}
          </div>

          <p className="text-gray-700 mb-4 text-sm">{hotel.descriptionAr}</p>

          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1" onClick={() => setSelectedHotel(hotel)}>
                  عرض التفاصيل
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-blue-900">{hotel.nameAr}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <img
                    src={hotel.image || "/placeholder.svg"}
                    alt={hotel.nameAr}
                    className="w-full h-64 object-cover rounded-lg"
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {[...Array(hotel.stars)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-gold-500 fill-current" />
                      ))}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        hotel.type === "hotel" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                      }`}
                    >
                      {hotel.type === "hotel" ? "فندق" : "كوخ ريفي"}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 ml-2" />
                    <span className="font-medium">{getDistanceText(hotel.distance_from_center_km, hotel.city)}</span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">الوصف</h4>
                    <p className="text-gray-700">{hotel.descriptionAr}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">المرافق والخدمات</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {hotel.amenitiesAr.map((amenity, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleHotelSelect(hotel)}
                    className={`w-full ${canSelect ? "btn-primary" : "bg-gray-400 cursor-not-allowed"}`}
                    disabled={!canSelect}
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    {isSelected ? "محدد بالفعل" : canSelect ? "اختر هذا الفندق" : "أكمل بيانات الحجز أولاً"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              onClick={() => handleHotelSelect(hotel)}
              className={`${canSelect ? "btn-primary" : "bg-gray-400 cursor-not-allowed"}`}
              disabled={!canSelect}
            >
              <Plus className="w-4 h-4 ml-2" />
              {isSelected ? "محدد" : "اختر"}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelsStructuredData) }} />
      <div className="container-rtl py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8 text-center">الفنادق والإقامة</h1>

        {/* Booking Information Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 ml-2" />
            معلومات الحجز
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الوصول *</label>
              <Input
                type="date"
                value={bookingData.checkIn}
                onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ المغادرة *</label>
              <Input
                type="date"
                value={bookingData.checkOut}
                onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">عدد الغرف</label>
              <Input
                type="number"
                min="1"
                value={bookingData.rooms}
                onChange={(e) => setBookingData({ ...bookingData, rooms: Number.parseInt(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">عدد البالغين *</label>
              <Input
                type="number"
                min="1"
                value={bookingData.adults}
                onChange={(e) => setBookingData({ ...bookingData, adults: Number.parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="hasChildren"
                checked={bookingData.hasChildren}
                onCheckedChange={(checked) =>
                  setBookingData({
                    ...bookingData,
                    hasChildren: checked as boolean,
                    children: checked ? bookingData.children : 0,
                    childrenAges: checked ? bookingData.childrenAges : "",
                  })
                }
              />
              <label htmlFor="hasChildren" className="text-sm font-medium text-gray-700 flex items-center">
                <Baby className="w-4 h-4 ml-1" />
                يوجد أطفال
              </label>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="breakfast"
                checked={bookingData.breakfast}
                onCheckedChange={(checked) => setBookingData({ ...bookingData, breakfast: checked as boolean })}
              />
              <label htmlFor="breakfast" className="text-sm font-medium text-gray-700">
                يشمل الإفطار
              </label>
            </div>
          </div>

          {bookingData.hasChildren && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">عدد الأطفال</label>
                <Input
                  type="number"
                  min="0"
                  value={bookingData.children}
                  onChange={(e) => setBookingData({ ...bookingData, children: Number.parseInt(e.target.value) })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">أعمار الأطفال</label>
                <Input
                  value={bookingData.childrenAges}
                  onChange={(e) => setBookingData({ ...bookingData, childrenAges: e.target.value })}
                  placeholder="مثال: 5، 8، 12"
                />
              </div>
            </div>
          )}

          {!isBookingDataComplete() && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm flex items-center">
                <Users className="w-4 h-4 ml-2" />
                يرجى إكمال بيانات الحجز لتتمكن من اختيار الفندق
              </p>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">خيارات التصفية</h2>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">نوع السكن</label>
              <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="نوع الإقامة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel">فندق</SelectItem>
                  <SelectItem value="cottage">كوخ ريفي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Hotels by City */}
        {Object.entries(groupedHotels).map(([city, hotels]) => {
          if (hotels.length === 0) return null

          const cityNameAr = city === "Moscow" ? "موسكو" : city === "St. Petersburg" ? "سان بطرسبرغ" : "سوتشي"

          const hotelsList = hotels.filter((h) => h.type === "hotel")
          const cottagesList = hotels.filter((h) => h.type === "cottage")

          return (
            <div key={city} className="mb-12">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">فنادق في {cityNameAr}</h2>

              {hotelsList.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {hotelsList.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                  ))}
                </div>
              )}

              {cottagesList.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">الأكواخ الريفية في {cityNameAr}</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cottagesList.map((cottage) => (
                      <HotelCard key={cottage.id} hotel={cottage} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )
        })}

        {/* Replace Hotel Modal */}
        <Dialog open={showReplaceModal} onOpenChange={setShowReplaceModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-blue-900">استبدال الفندق</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-gray-700">لديك فندق محدد بالفعل في سلة الحجز. هل تريد استبداله بالفندق الجديد؟</p>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">الفندق الحالي:</h4>
                <p className="text-gray-600">{existingHotel?.nameAr || existingHotel?.name}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">الفندق الجديد:</h4>
                <p className="text-blue-600">{pendingHotel?.nameAr}</p>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleReplaceHotel} className="btn-primary flex-1">
                  استبدال الفندق
                </Button>
                <Button onClick={handleKeepExisting} variant="outline" className="flex-1">
                  الاحتفاظ بالحالي
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </div>
  )
}
