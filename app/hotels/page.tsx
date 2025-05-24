import HotelsClientPage from "./HotelsClientPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "حجز فنادق روسيا | أفضل الفنادق في موسكو وسان بطرسبرغ وسوتشي - قديموسكو",
  description:
    "احجز أفضل الفنادق في روسيا مع قديموسكو. فنادق 5 نجوم في موسكو، سان بطرسبرغ، وسوتشي بأفضل الأسعار. حجز فوري وضمان أفضل سعر.",
  keywords:
    "حجز فنادق روسيا, فنادق موسكو, فنادق سان بطرسبرغ, فنادق سوتشي, حجز فنادق, فنادق 5 نجوم روسيا, أفضل فنادق روسيا",
  openGraph: {
    title: "حجز فنادق روسيا - قديموسكو",
    description: "احجز أفضل الفنادق في روسيا بأفضل الأسعار",
    url: "https://qadimosco.com/hotels",
  },
}

export default function HotelsPage() {
  return <HotelsClientPage />
}
