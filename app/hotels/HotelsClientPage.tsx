"use client"

import type React from "react"

import { useState, useRef } from "react"
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

  const [dateErrors, setDateErrors] = useState({
    checkIn: "",
    checkOut: "",
  })

  const checkOutRef = useRef<HTMLInputElement>(null)
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)
  const [showReplaceModal, setShowReplaceModal] = useState(false)
  const [pendingHotel, setPendingHotel] = useState<Hotel | null>(null)
  const { items: cart, addItem, removeItem } = useCart()

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split("T")[0]

  // Calculate tomorrow's date for minimum check-out date
  const getTomorrow = (date: string) => {
    if (!date) return ""
    const nextDay = new Date(date)
    nextDay.setDate(nextDay.getDate() + 1)
    return nextDay.toISOString().split("T")[0]
  }

  // Handle check-in date change
  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckIn = e.target.value

    // Validate check-in date is not in the past
    const selectedDate = new Date(newCheckIn)
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0) // Reset time to start of day for comparison

    if (selectedDate < currentDate) {
      setDateErrors({
        ...dateErrors,
        checkIn: "لا يمكن اختيار تاريخ في الماضي",
      })
      return
    }

    // Clear error if valid
    setDateErrors({
      ...dateErrors,
      checkIn: "",
    })

    // Update check-in date
    const newBookingData = {
      ...bookingData,
      checkIn: newCheckIn,
    }

    // If check-out date exists, validate it's after the new check-in
    if (bookingData.checkOut) {
      const checkOutDate = new Date(bookingData.checkOut)
      if (checkOutDate <= selectedDate) {
        // Reset check-out date if it's now invalid
        newBookingData.checkOut = ""
        setDateErrors({
          ...dateErrors,
          checkOut: "تاريخ المغادرة يجب أن يكون بعد تاريخ الوصول بليلة واحدة على الأقل",
        })
      }
    }

    setBookingData(newBookingData)

    // Auto-focus check-out field after selecting check-in
    if (newCheckIn && checkOutRef.current) {
      setTimeout(() => {
        checkOutRef.current?.focus()
      }, 100)
    }
  }

  // Handle check-out date change
  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckOut = e.target.value

    // Validate check-out is after check-in
    if (bookingData.checkIn && newCheckOut) {
      const checkInDate = new Date(bookingData.checkIn)
      const checkOutDate = new Date(newCheckOut)

      if (checkOutDate <= checkInDate) {
        setDateErrors({
          ...dateErrors,
          checkOut: "تاريخ المغادرة يجب أن يكون بعد تاريخ الوصول بليلة واحدة على الأقل",
        })
        return
      }
    }

    // Clear error if valid
    setDateErrors({
      ...dateErrors,
      checkOut: "",
    })

    // Update check-out date
    setBookingData({
      ...bookingData,
      checkOut: newCheckOut,
    })
  }

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
      image: "https://lh3.googleusercontent.com/p/AF1QipOt_xbd0cHdQ3xtYtUHUMyTO-xIPXEQG59YPBgm=s1360-w1360-h1020-rw",
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
      image: "https://lh3.googleusercontent.com/p/AF1QipO46elPF6VzjaxUpJvkMedmmT4FuFT_Or5qY-U=s1360-w1360-h1020-rw",
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
      image: "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/partner-images/40/58/4964311b49af102b0ed625be97430612ce025aa72a9b8324e2aceed0d13a.jpeg",
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
      image: "https://lh3.googleusercontent.com/proxy/zR3qKCS_YdnxVdwTEeq1m1HHS6sEyBf-4_bUbsyz-zj5A4WZC2vULToJf2Ggdp7AecjD5D6uvuuUErU8lzCbZvYV4LPmjXaslxiMXU_X-niWgOc4Xk5CPyIeD1DA25p_G0vb60Z5AI4t_tEz3YiJbfsBo1Q-7ns=s1360-w1360-h1020-rw",
      amenities: ["Antique Furnishings", "Historic", "Kremlin Views", "Classic Luxury"],
      amenitiesAr: ["أثاث عتيق", "تاريخي", "إطلالات الكرملين", "فخامة كلاسيكية"],
    },
    {
      id: "moscow-5",
      name: "Marriott Moscow Grand Hotel",
      nameAr: "فندق قراند ماريوت  ",
      stars: 5,
      distance_from_center_km: 2,
      description: "Spacious hotel with a pool and business facilities on Tverskaya.",
      descriptionAr: "فندق واسع مع مسبح ومرافق أعمال في شارع تفيرسكايا",
      city: "Moscow",
      cityAr: "موسكو",
      type: "hotel",
      image: "https://lh3.googleusercontent.com/proxy/XjtC9-Izx9S5RrQ5wiwpDDWn-ars9sueqxTEELpoBFxu5EWHJzx84GnIfofoUn9TXGZ24gTikNELz-MZ79VOAOk12NQIssktPt4YjGMnoshei55SCHlI8UfwmLsytBJm4hEK1vJ-725MenpT6IrcMUPZwdH7Bw=s1360-w1360-h1020-rw",
      amenities: ["Pool", "Business Facilities", "Spacious Rooms", "Central Location"],
      amenitiesAr: ["مسبح", "مرافق أعمال", "غرف واسعة", "موقع مركزي"],
    },
    {
      id: "moscow-6",
      name: "Hotel Metropol Moscow",
      nameAr: "فندق متروبول موسكو",
      stars: 5,
      distance_from_center_km: 0.3,
      description: "Historic Art Nouveau hotel near the Bolshoi Theatre and Red Square.",
      descriptionAr: "فندق تاريخي على طراز الفن الجديد بالقرب من مسرح البولشوي والساحة الحمراء",
      city: "Moscow",
      cityAr: "موسكو",
      type: "hotel",
      image: "https://lh3.googleusercontent.com/p/AF1QipN4UcJwvieGJwafjGO47cPugRRYGuXF5buySEd4=s1360-w1360-h1020-rw",
      amenities: ["Historic Architecture", "Art Nouveau", "Central Location", "Luxury"],
      amenitiesAr: ["عمارة تاريخية", "فن جديد", "موقع مركزي", "فخامة"],
    },
    {
      id: "moscow-8",
      name: "Savoy Hotel Moscow",
      nameAr: "فندق سافوي موسكو",
      stars: 5,
      distance_from_center_km: 0.5,
      description: "Elegant hotel with classic interiors, located near the Kremlin.",
      descriptionAr: "فندق أنيق بديكورات كلاسيكية، يقع بالقرب من الكرملين",
      city: "Moscow",
      cityAr: "موسكو",
      type: "hotel",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/02/4d/3b/d4/facade.jpg?w=900&h=500&s=1",
      amenities: ["Classic Interiors", "Historic Building", "Central Location", "Luxury"],
      amenitiesAr: ["ديكورات كلاسيكية", "مبنى تاريخي", "موقع مركزي", "فخامة"],
    },
    {
      id: "moscow-9",
      name: "Lotte Hotel Moscow",
      nameAr: "فندق لوتي موسكو",
      stars: 5,
      distance_from_center_km: 1.5,
      description: "Modern luxury hotel featuring a spa, indoor pool, and fine dining.",
      descriptionAr: "فندق فاخر حديث يضم سبا، مسبح داخلي، ومطاعم راقية",
      city: "Moscow",
      cityAr: "موسكو",
      type: "hotel",
      image: "https://pix10.agoda.net/hotelImages/5079866/0/52b9dc4e7ade6284d4a18fc22811e8bf.jpeg?ce=0&s=414x232",
      amenities: ["Spa", "Indoor Pool", "Fine Dining", "Modern Luxury"],
      amenitiesAr: ["سبا", "مسبح داخلي", "مطاعم راقية", "فخامة حديثة"],
    },
    {
      id: "moscow-10",
      name: "Radisson Collection Hotel, Moscow",
      nameAr: "فندق راديسون كوليكشن موسكو",
      stars: 5,
      distance_from_center_km: 3,
      description: "Iconic hotel with Stalinist architecture, offering river views and luxury amenities.",
      descriptionAr: "فندق أيقوني بطراز ستاليني، يوفر إطلالات على النهر ومرافق فاخرة",
      city: "Moscow",
      cityAr: "موسكو",
      type: "hotel",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/4a/d4/c3/radisson-royal-hotel.jpg?w=1800&h=1000&s=1",
      amenities: ["River Views", "Stalinist Architecture", "Luxury Amenities", "Historic Significance"],
      amenitiesAr: ["إطلالات على النهر", "عمارة ستالينية", "مرافق فاخرة", "أهمية تاريخية"],
    },
    {
      id: "moscow-11",
      name: "Golden Ring Hotel",
      nameAr: "فندق جولدن رينج",
      stars: 5,
      distance_from_center_km: 2,
      description: "Elegant hotel offering panoramic city views and refined accommodations.",
      descriptionAr: "فندق أنيق يوفر إطلالات بانورامية على المدينة وإقامة راقية",
      city: "Moscow",
      cityAr: "موسكو",
      type: "hotel",
      image: "https://lh3.googleusercontent.com/p/AF1QipPxZAt89n_NHQ4Y3xAi0efb2iJWNPllt0orl1QJ=s1360-w1360-h1020-rw",
      amenities: ["Panoramic Views", "Elegant Rooms", "Fine Dining", "Central Location"],
      amenitiesAr: ["إطلالات بانورامية", "غرف أنيقة", "مطاعم راقية", "موقع مركزي"],
    },
    {
      id: "moscow-12",
      name: "Hilton Moscow Leningradskaya",
      nameAr: "فندق هيلتون موسكو لينينغرادسكايا",
      stars: 5,
      distance_from_center_km: 3.5,
      description: "Historic hotel featuring Stalinist architecture and modern amenities.",
      descriptionAr: "فندق تاريخي بطراز ستاليني يضم مرافق حديثة",
      city: "Moscow",
      cityAr: "موسكو",
      type: "hotel",
      image: "https://lh3.googleusercontent.com/p/AF1QipMTpi9vdE71-5Yg7U7WAAhC19iWRxusU7OVJb00=s1360-w1360-h1020-rw",
      amenities: ["Stalinist Architecture", "Modern Amenities", "Historic Significance", "Central Location"],
      amenitiesAr: ["عمارة ستالينية", "مرافق حديثة", "أهمية تاريخية", "موقع مركزي"],
    },
    {
      id: "moscow-13",
      name: "Swissotel Krasnye Holmy Moscow",
      nameAr: "فندق سويس أوتيل كراسنيي هولمي موسكو",
      stars: 5,
      distance_from_center_km: 4,
      description: "Contemporary hotel with panoramic city views, spa, and fine dining.",
      descriptionAr: "فندق عصري بإطلالات بانورامية على المدينة، سبا، ومطاعم راقية",
      city: "Moscow",
      cityAr: "موسكو",
      type: "hotel",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/cd/93/24/swissotel-krasnye-holmy.jpg?w=1400&h=800&s=1",
      amenities: ["Panoramic Views", "Spa", "Fine Dining", "Modern Design"],
      amenitiesAr: ["إطلالات بانورامية", "سبا", "مطاعم راقية", "تصميم حديث"],
    },
    {
      id: "moscow-14",
      name: "Peter 1 Hotel",
      nameAr: "فندق بيتر الأول",
      stars: 5,
      distance_from_center_km: 1,
      description: "Classic hotel offering elegant rooms and proximity to major attractions.",
      descriptionAr: "فندق كلاسيكي يوفر غرفًا أنيقة وقربًا من المعالم الرئيسية",
      city: "Moscow",
      cityAr: "موسكو",
      type: "hotel",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/1e/ac/59/1.jpg?w=1400&h=800&s=1",
      amenities: ["Elegant Rooms", "Central Location", "Classic Design", "Fine Dining"],
      amenitiesAr: ["غرف أنيقة", "موقع مركزي", "تصميم كلاسيكي", "مطاعم راقية"],
    },
    {
      id: "moscow-15",
      name: "StandArt Hotel Moscow",
      nameAr: "فندق ستاند آرت موسكو",
      stars: 5,
      distance_from_center_km: 1.2,
      description: "Design hotel combining modern aesthetics with luxury accommodations.",
      descriptionAr: "فندق تصميم يجمع بين الجماليات الحديثة والإقامة الفاخرة",
      city: "Moscow",
      cityAr: "موسكو",
      type: "hotel",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSta6oWoe4Xah71jq5PCiF5FZaaCeBO5JCrtQ&s",
      amenities: ["Modern Design", "Luxury Rooms", "Artistic Interiors", "Central Location"],
      amenitiesAr: ["تصميم حديث", "غرف فاخرة", "ديكورات فنية", "موقع مركزي"],
    },
    {
      id: "moscow-16",
      name: "Ararat Park Hyatt Moscow",
      nameAr: "فندق أرارات بارك حياة موسكو",
      stars: 5,
      distance_from_center_km: 0.5,
      description: "Elegant hotel with contemporary luxury and personalized service near the Bolshoi Theatre.",
      descriptionAr: "فندق أنيق يجمع بين الفخامة العصرية والخدمة الشخصية بالقرب من مسرح البولشوي",
      city: "Moscow",
      cityAr: "موسكو",
      type: "hotel",
      image: "https://pix10.agoda.net/hotelImages/1378374/0/f9819ebd31d422c941b04af5ae44502f.jpg?ca=7&ce=1&s=414x232",
      amenities: ["Luxury Rooms", "Spa", "Central Location", "Fine Dining"],
      amenitiesAr: ["غرف فاخرة", "سبا", "موقع مركزي", "مطاعم راقية"],
    },
    {
      id: "moscow-17",
      name: "InterContinental Moscow Tverskaya",
      nameAr: "فندق إنتركونتيننتال موسكو تفيرسكايا",
      stars: 5,
      distance_from_center_km: 1,
      description: "Upscale hotel on Tverskaya Street offering luxurious rooms and premium amenities.",
      descriptionAr: "فندق راقٍ في شارع تفيرسكايا يوفر غرفًا فاخرة ومرافق متميزة",
      city: "Moscow",
      cityAr: "موسكو",
      type: "hotel",
      image: "https://lh3.googleusercontent.com/p/AF1QipO-Ys3wcNjpA_YKd8Zyg2uFrSCKsW0ZTSDW8LdV=s1360-w1360-h1020-rw",
      amenities: ["Luxury Rooms", "Spa", "Conference Facilities", "Fine Dining"],
      amenitiesAr: ["غرف فاخرة", "سبا", "قاعات مؤتمرات", "مطاعم راقية"],
    },
    {
      id: "moscow-18",
      name: "The St. Regis Moscow Nikolskaya",
      nameAr: "فندق سانت ريجيس موسكو نيكولسكايا",
      stars: 5,
      distance_from_center_km: 0.6,
      description: "Prestigious luxury hotel offering timeless elegance, personalized service, and views of the Kremlin.",
      descriptionAr: "فندق فاخر راقٍ يقدم أناقة خالدة وخدمة شخصية وإطلالات على الكرملين",
      city: "Moscow",
      cityAr: "موسكو",
      type: "hotel",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/db/2d/0a/aussenansicht.jpg?w=500&h=400&s=1",
      amenities: ["Butler Service", "Spa", "Luxury Rooms", "Central Location"],
      amenitiesAr: ["خدمة خادم شخصي", "سبا", "غرف فاخرة", "موقع مركزي"],
    },

    {
      id: "moscow-19",
      name: "Moscow Marriott Royal Aurora Hotel",
      nameAr: "فندق ماريوت رويال أورورا موسكو",
      stars: 5,
      distance_from_center_km: 0.7,
      description: "Luxury hotel with personalized butler service, located near the Kremlin and shopping areas.",
      descriptionAr: "فندق فاخر بخدمة الخادم الشخصي، يقع بالقرب من الكرملين ومناطق التسوق",
      city: "Moscow",
      cityAr: "موسكو",
      type: "hotel",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlFMChNd4e86VkyCWTsLDz8Jlk60QIvdmEaA&s",
      amenities: ["Butler Service", "Spa", "Luxury Rooms", "Central Location"],
      amenitiesAr: ["خدمة خادم شخصي", "سبا", "غرف فاخرة", "موقع مركزي"],
    },

    {
      id: "moscow-cottage-1",
      name: "Pine River Hotel & Cottages",
      nameAr: "فندق وأكواخ  Pine River",
      stars: 4,
      distance_from_center_km: 25,
      description: "Cottage-style accommodation in a forested area near Moscow with spa and relaxation.",
      descriptionAr: "إقامة على طراز الأكواخ في منطقة غابات قرب موسكو مع سبا واسترخاء",
      city: "Moscow",
      cityAr: "موسكو",
      type: "cottage",
      image: "https://static.tildacdn.com/tild3739-3132-4633-b631-396539323434/0003_1-2.jpg",
      amenities: ["Forest Location", "Spa", "Cottages", "Nature"],
      amenitiesAr: ["موقع في الغابة", "سبا", "أكواخ", "طبيعة"],
    },

    // St. Petersburg Hotels
    {
      id: "spb-1",
      name: "Cosmos Selection Saint-Petersburg Nevsky Royal Hotel",
      nameAr: "فندق كوزموس سيليكشن سانت بطرسبرغ نيفسكي رويال",
      stars: 5,
      distance_from_center_km: 1.0,
      description: "Elegant hotel on Nevsky Prospect offering refined accommodations and personalized service.",
      descriptionAr: "فندق أنيق على شارع نيفسكي يقدم إقامة راقية وخدمة مخصصة",
      city: "St. Petersburg",
      cityAr: "سان بطرسبرغ",
      type: "hotel",
      image: "https://selectionnevsky.cosmosgroup.ru/files/hotels/36_1740995961.webp",
      amenities: ["Nevsky Location", "Fine Dining", "Elegant Interiors", "Personalized Service"],
      amenitiesAr: ["موقع على نيفسكي", "مطاعم فاخرة", "ديكورات أنيقة", "خدمة مخصصة"],
    }
    ,
    {
      id: "spb-2",
      name: "Corinthia St. Petersburg",
      nameAr: "فندق كورينثيا سانت بطرسبرغ",
      stars: 5,
      distance_from_center_km: 1,
      description: "Elegant five-star hotel on Nevsky Prospect with luxurious rooms and fine dining.",
      descriptionAr: "فندق فاخر من فئة خمس نجوم على جادة نيفسكي بغرف أنيقة ومطاعم راقية",
      city: "St. Petersburg",
      cityAr: "سان بطرسبرغ",
      type: "hotel",
      image: "https://lh3.googleusercontent.com/p/AF1QipO2OMcOjEVtviyoz5TWmwguBaGe3rWrNbvNFsor=s680-w680-h510-rw",
      amenities: ["Fine Dining", "Elegant Rooms", "Fitness Center", "Central Location"],
      amenitiesAr: ["مطاعم راقية", "غرف أنيقة", "مركز لياقة بدنية", "موقع مركزي"],
    },
    {
      id: "spb-3",
      name: "Four Seasons Hotel Lion Palace St. Petersburg",
      nameAr: "فندق فور سيزونز ليون بالاس سانت بطرسبرغ",
      stars: 5,
      distance_from_center_km: 0.6,
      description: "Opulent 19th-century palace hotel offering luxurious accommodations and top-tier service.",
      descriptionAr: "فندق فاخر في قصر من القرن التاسع عشر يقدم إقامة راقية وخدمة عالية المستوى",
      city: "St. Petersburg",
      cityAr: "سان بطرسبرغ",
      type: "hotel",
      image: "https://lh3.googleusercontent.com/p/AF1QipMKBtVyMA-vwFBv1rdoHztCrLV5jfaAbhTr9XWZ=s680-w680-h510-rw",
      amenities: ["Historic Building", "Spa", "Fine Dining", "Central Location"],
      amenitiesAr: ["مبنى تاريخي", "سبا", "مطاعم راقية", "موقع مركزي"],
    },

    // Sochi Hotels
    {
      id: "sochi-rosa-1",
      name: "Radisson Hotel Rosa Khutor",
      nameAr: "فندق راديسون روزا خوتور",
      stars: 4,
      distance_from_center_km: 50,
      description: "Upscale hotel with mountain views and modern amenities in Rosa Khutor.",
      descriptionAr: "فندق راقٍ بإطلالات جبلية ومرافق حديثة في روزا خوتور",
      city: "Sochi",
      cityAr: "سوتشي",
      type: "hotel",
      image: "./hotels/RosaKhutor.jpeg",
      amenities: ["Mountain Views", "Modern Amenities", "Restaurant", "Fitness Center"],
      amenitiesAr: ["إطلالات جبلية", "مرافق حديثة", "مطعم", "مركز لياقة"],
    },
    {
      id: "sochi-rosa-2",
      name: "Park Inn by Radisson Rosa Khutor",
      nameAr: "فندق بارك إن باي راديسون روزا خوتور",
      stars: 4,
      distance_from_center_km: 50,
      description: "Comfortable hotel near ski lifts, ideal for active holidays in the mountains.",
      descriptionAr: "فندق مريح بالقرب من مصاعد التزلج، مثالي للعطلات النشطة في الجبال",
      city: "Sochi",
      cityAr: "سوتشي",
      type: "hotel",
      image: "./hotels/ParkInn.jpeg",
      amenities: ["Near Ski Lifts", "Comfortable Rooms", "Fitness Center", "Mountain Access"],
      amenitiesAr: ["بالقرب من مصاعد التزلج", "غرف مريحة", "مركز لياقة", "وصول للجبال"],
    },
    {
      id: "sochi-rosa-3",
      name: "Golden Tulip Rosa Khutor",
      nameAr: "فندق جولدن تيوليب روزا خوتور",
      stars: 4,
      distance_from_center_km: 50,
      description: "Elegant riverside hotel with direct access to outdoor activities.",
      descriptionAr: "فندق أنيق بجانب النهر مع وصول مباشر للأنشطة الخارجية",
      city: "Sochi",
      cityAr: "سوتشي",
      type: "hotel",
      image: "./hotels/Golden.webp",
      amenities: ["River View", "Elegant Style", "Outdoor Access", "Restaurant"],
      amenitiesAr: ["إطلالة على النهر", "تصميم أنيق", "وصول للنشاطات", "مطعم"],
    },
    {
      id: "sochi-rosa-4",
      name: "Tulip Inn Rosa Khutor",
      nameAr: "فندق تيوليب إن روزا خوتور",
      stars: 3,
      distance_from_center_km: 50,
      description: "Affordable and cozy hotel in the heart of Rosa Khutor.",
      descriptionAr: "فندق مريح وبأسعار معقولة في قلب روزا خوتور",
      city: "Sochi",
      cityAr: "سوتشي",
      type: "hotel",
      image: "./hotels/Tulip.webp",
      amenities: ["Budget Friendly", "Central Location", "Comfortable Stay", "Wi-Fi"],
      amenitiesAr: ["سعر مناسب", "موقع مركزي", "إقامة مريحة", "واي فاي"],
    }

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
    return (
      bookingData.checkIn &&
      bookingData.checkOut &&
      bookingData.adults > 0 &&
      !dateErrors.checkIn &&
      !dateErrors.checkOut
    )
  }

  const handleHotelSelect = (hotel: Hotel) => {
    if (!isBookingDataComplete()) {
      // Show error toast
      if (typeof window !== "undefined" && (window as any).showToast) {
        ; (window as any).showToast({
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
      ; (window as any).showToast({
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
        ; (window as any).showToast({
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
              className={`inline-block text-xs px-2 py-1 rounded-full ${hotel.type === "hotel" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
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
                      className={`px-3 py-1 rounded-full text-sm ${hotel.type === "hotel" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
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
                onChange={handleCheckInChange}
                min={today}
                className={`w-full ${dateErrors.checkIn ? "border-red-300 focus:border-red-500" : ""}`}
              />
              {dateErrors.checkIn && <p className="text-red-500 text-sm mt-1">{dateErrors.checkIn}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ المغادرة *</label>
              <Input
                ref={checkOutRef}
                type="date"
                value={bookingData.checkOut}
                onChange={handleCheckOutChange}
                min={bookingData.checkIn ? getTomorrow(bookingData.checkIn) : today}
                className={`w-full ${dateErrors.checkOut ? "border-red-300 focus:border-red-500" : ""}`}
              />
              {dateErrors.checkOut && <p className="text-red-500 text-sm mt-1">{dateErrors.checkOut}</p>}
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
