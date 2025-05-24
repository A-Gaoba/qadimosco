import type { Metadata } from "next"
import TransportationClientPage from "./TransportationClientPage"

export const metadata: Metadata = {
  title: "مواصلات روسيا | نقل المطار وجولات المدينة - قديموسكو",
  description:
    "خدمات المواصلات في روسيا مع قديموسكو. نقل من المطار، جولات المدينة، سيارات بزنس، فانات، باصات. سائقين محترفين وأسعار مناسبة.",
  keywords: "مواصلات روسيا, نقل المطار روسيا, سيارة بسائق روسيا, جولات المدينة روسيا, نقل سياحي روسيا, تاكسي روسيا",
  openGraph: {
    title: "مواصلات روسيا - قديموسكو",
    description: "خدمات المواصلات والنقل في روسيا بأفضل الأسعار",
    url: "https://qadimosco.com/transportation",
  },
}

export default function TransportationPage() {
  return <TransportationClientPage />
}
