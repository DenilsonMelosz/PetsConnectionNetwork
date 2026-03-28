import { Input } from "@/components/ui/input"
import type { LucideIcon } from "lucide-react"

interface FormInputProps {
  id: string
  type?: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  error?: string
  icon: LucideIcon
  label?: string
  required?: boolean
  maxLength?: number
}

export function FormInput({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  label,
  required = false,
  maxLength,
}: FormInputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="text-xs sm:text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          maxLength={maxLength}
          className={`pl-9 h-9 sm:h-10 rounded-lg border-2 transition-colors text-sm ${
            error ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-orange-500"
          }`}
        />
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}
