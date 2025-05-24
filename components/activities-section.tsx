import { Camera, Mountain, Building, Waves } from "lucide-react"

export function ActivitiesSection() {
  const activities = [
    {
      icon: Building,
      title: "جولة الساحة الحمراء",
      description: "اكتشف قلب موسكو التاريخي مع مرشد عربي",
    },
    {
      icon: Waves,
      title: "رحلات بحرية في سوتشي",
      description: "استمتع بجمال البحر الأسود والطبيعة الساحرة",
    },
    {
      icon: Mountain,
      title: "رياضات شتوية",
      description: "تزلج وأنشطة شتوية مثيرة في أجمل المنتجعات",
    },
    {
      icon: Camera,
      title: "جولات المتاحف",
      description: "اكتشف كنوز الفن والثقافة الروسية",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container-rtl">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-12">الأنشطة والفعاليات</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {activities.map((activity, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <activity.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">{activity.title}</h3>
              <p className="text-gray-700">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
