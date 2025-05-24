"use client"

import { useState, useEffect } from "react"
import { CheckCircle, X, AlertCircle, Info, XCircle } from "lucide-react"

export interface Toast {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message: string
  duration?: number
}

interface ToastProps {
  toast: Toast
  onRemove: (id: string) => void
}

function ToastComponent({ toast, onRemove }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id)
    }, toast.duration || 5000)

    return () => clearTimeout(timer)
  }, [toast.id, toast.duration, onRemove])

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-600" />
      case "error":
        return <XCircle className="w-6 h-6 text-red-600" />
      case "warning":
        return <AlertCircle className="w-6 h-6 text-yellow-600" />
      case "info":
        return <Info className="w-6 h-6 text-blue-600" />
    }
  }

  const getStyles = () => {
    switch (toast.type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800"
      case "error":
        return "bg-red-50 border-red-200 text-red-800"
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800"
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800"
    }
  }

  return (
    <div
      className={`relative flex items-start p-4 rounded-xl border-2 shadow-xl backdrop-blur-sm animate-slide-in-right ${getStyles()}`}
    >
      <div className="flex-shrink-0 ml-3">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold mb-1">{toast.title}</h4>
        <p className="text-sm opacity-90">{toast.message}</p>
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 mr-2 p-1 rounded-lg hover:bg-black/10 transition-colors duration-200"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  // Expose addToast globally
  useEffect(() => {
    ;(window as any).showToast = addToast
  }, [])

  return (
    <div className="fixed top-20 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-50 space-y-3 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastComponent toast={toast} onRemove={removeToast} />
        </div>
      ))}
    </div>
  )
}

// Helper function to show toasts
export const showToast = (toast: Omit<Toast, "id">) => {
  if (typeof window !== "undefined" && (window as any).showToast) {
    ;(window as any).showToast(toast)
  }
}
