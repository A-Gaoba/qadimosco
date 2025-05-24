import type { Metadata } from "next"
import ActivitiesClientPage from "./ActivitiesClientPage"

export const metadata: Metadata = {
  title: "أنشطة سياحية في روسيا | جولات موسكو وسان بطرسبرغ وسوتشي - قديموسكو",
  description:
    "اكتشف أفضل الأنشطة السياحية في روسيا مع قديموسكو. جولات ثقافية، مغامرات، أنشطة عائلية في موسكو وسان بطرسبرغ وسوتشي. احجز الآن!",
  keywords:
    "أنشطة سياحية روسيا, جولات موسكو, أنشطة سان بطرسبرغ, أنشطة سوتشي, السيرك الروسي, جولات ثقافية روسيا, مغامرات روسيا",
  openGraph: {
    title: "أنشطة سياحية في روسيا - قديموسكو",
    description: "اكتشف أفضل الأنشطة والجولات السياحية في روسيا",
    url: "https://qadimosco.com/activities",
  },
}

export default function ActivitiesPage() {
  return <ActivitiesClientPage />
}
