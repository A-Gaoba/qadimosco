"use client"

import { Compass } from "lucide-react"

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        <Compass className="w-8 h-8 text-sky-500 animate-spin" />
        <div
          className="absolute inset-0 w-8 h-8 border-2 border-gold-300 border-t-transparent rounded-full animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        ></div>
      </div>
      <span className="mr-3 text-sky-700 font-medium">جاري التحميل...</span>
    </div>
  )
}
