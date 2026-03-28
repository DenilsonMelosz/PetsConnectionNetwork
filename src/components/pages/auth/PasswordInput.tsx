"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Lock } from "lucide-react"

interface PasswordInputProps {
  id: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  error?: string
  label?: string
  required?: boolean
}

export function PasswordInput({
  id,
  placeholder,
  value,
  onChange,
  error,
  label,
  required = false,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="text-xs sm:text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`pl-9 pr-9 h-9 sm:h-10 rounded-lg border-2 transition-colors text-sm ${
            error ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-orange-500"
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}
