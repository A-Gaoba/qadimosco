"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState("/")
  const { itemCount } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "الرئيسية" },
    { href: "/hotels", label: "الفنادق" },
    { href: "/activities", label: "الأنشطة" },
    { href: "/transportation", label: "المواصلات" },
    { href: "/store", label: "سلة الحجز" },
  ]

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white shadow-md"
      }`}
    >
      <div className="russian-accent"></div>
      <div className="container-rtl">
        <div className="flex justify-between items-center h-16">
          {/* Enhanced Logo with 60-30-10 Colors */}
          <Link
            href="/"
            className="flex items-center space-x-3 space-x-reverse group"
            onClick={() => setActiveLink("/")}
          >
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-500 via-sunset-500 to-coral-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
                <span className="text-white font-bold text-2xl drop-shadow-lg">ق</span>
                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              {/* Russian flag accent with 60-30-10 colors */}
              <div className="absolute -bottom-1 -right-1 w-6 h-4 rounded-sm overflow-hidden shadow-md">
                <div className="h-full bg-gradient-to-r from-white via-sky-500 to-coral-500"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-sky-600 via-sunset-600 to-coral-600 bg-clip-text text-transparent">
                قديموسكو
              </span>
              <span className="text-xs sm:text-sm text-sky-600 font-medium">اكتشف روسيا معنا</span>
            </div>
          </Link>

          {/* Desktop Navigation with 60-30-10 Colors */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative font-medium transition-all duration-300 animated-underline text-sm md:text-base ${
                  activeLink === item.href ? "text-sky-600" : "text-sky-700 hover:text-sky-600"
                }`}
                onClick={() => setActiveLink(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Enhanced Cart Icon with Dynamic Counter - Desktop */}
          <Link href="/store" className="hidden md:flex">
            <Button
              variant="outline"
              size="icon"
              className="relative group hover:bg-gradient-to-r hover:from-sky-50 hover:to-sunset-50 hover:border-sky-400 transition-all duration-300 border-2 border-sky-300"
            >
              <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300 text-sky-600" />
              {itemCount > 0 && (
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-coral-500 to-coral-600 text-white text-xs rounded-full flex items-center justify-center animate-coral-pulse shadow-lg font-bold">
                  {itemCount > 99 ? "99+" : itemCount}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-sunset-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </Link>

          {/* Mobile Cart and Menu */}
          <div className="md:hidden flex items-center gap-3">
            <Link href="/store">
              <Button
                variant="outline"
                size="icon"
                className="relative group hover:bg-gradient-to-r hover:from-sky-50 hover:to-sunset-50 hover:border-sky-400 transition-all duration-300 border-2 border-sky-300 min-h-[44px] min-w-[44px]"
              >
                <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300 text-sky-600" />
                {itemCount > 0 && (
                  <div className="absolute -top-2 -left-2 w-5 h-5 bg-gradient-to-r from-coral-500 to-coral-600 text-white text-xs rounded-full flex items-center justify-center animate-coral-pulse shadow-lg font-bold">
                    {itemCount > 9 ? "9+" : itemCount}
                  </div>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-sky-50 transition-colors duration-300 min-h-[44px] min-w-[44px]"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 transition-all duration-300 text-sky-600 ${isOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"}`}
                />
                <X
                  className={`absolute inset-0 transition-all duration-300 text-sky-600 ${isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"}`}
                />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation with 60-30-10 Colors */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 border-t border-sky-100">
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sky-700 hover:text-sky-600 font-medium px-4 py-3 rounded-lg hover:bg-sky-50 transition-all duration-300 transform text-sm md:text-base ${
                    isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => {
                    setIsOpen(false)
                    setActiveLink(item.href)
                  }}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Cart Button - Prominent with Dynamic Counter */}
              <Link
                href="/store"
                className={`relative flex items-center justify-center bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white font-bold px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg mx-4 mt-2 ${
                  isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
                onClick={() => setIsOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 ml-2" />
                <span>سلة الحجز</span>
                {itemCount > 0 && (
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-white text-coral-600 text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                    {itemCount > 99 ? "99+" : itemCount}
                  </div>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
