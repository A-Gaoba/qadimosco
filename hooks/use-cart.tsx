"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface CartItem {
  id: string | number
  type: "hotel" | "activity"
  name: string
  nameAr?: string
  city: string
  image?: string
  quantity?: number
  price?: number
  [key: string]: any
}

interface CartContextType {
  items: CartItem[]
  itemCount: number
  addItem: (item: CartItem) => void
  removeItem: (index: number) => void
  updateItemQuantity: (index: number, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage only once on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]")
      setItems(savedCart)
      setIsLoaded(true)
    }
  }, [])

  // Update localStorage whenever items change (but only after initial load)
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, isLoaded])

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      // For hotels, replace existing hotel
      if (item.type === "hotel") {
        const withoutHotels = prev.filter((existingItem) => existingItem.type !== "hotel")
        return [...withoutHotels, item]
      }

      // For activities, check if it already exists and update quantity
      if (item.type === "activity") {
        const existingIndex = prev.findIndex(
          (existingItem) => existingItem.type === "activity" && existingItem.id === item.id,
        )

        if (existingIndex !== -1) {
          // Update existing activity quantity
          const updated = [...prev]
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: (updated[existingIndex].quantity || 1) + (item.quantity || 1),
          }
          return updated
        } else {
          // Add new activity
          return [...prev, { ...item, quantity: item.quantity || 1 }]
        }
      }

      return [...prev, item]
    })
  }

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  const updateItemQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(index)
      return
    }

    setItems((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], quantity }
      return updated
    })
  }

  const clearCart = () => {
    setItems([])
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart")
    }
  }

  // Calculate total item count considering quantities
  const itemCount = items.reduce((total, item) => {
    if (item.type === "activity") {
      return total + (item.quantity || 1)
    }
    return total + 1
  }, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
