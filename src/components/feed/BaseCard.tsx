import type { ReactNode } from "react"

interface BaseCardProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  hoverEffect?: boolean
}

export function BaseCard({ 
  children, 
  onClick, 
  className = "",
  hoverEffect = true 
}: BaseCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-2xl border border-gray-200 overflow-hidden
        ${hoverEffect ? "hover:shadow-lg hover:border-gray-300 transition-all duration-200" : ""}
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

// Card Header Component
interface CardHeaderProps {
  children: ReactNode
  className?: string
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return (
    <div className={`px-4 pt-4 ${className}`}>
      {children}
    </div>
  )
}

// Card Body Component
interface CardBodyProps {
  children: ReactNode
  className?: string
}

export function CardBody({ children, className = "" }: CardBodyProps) {
  return (
    <div className={`px-4 py-3 ${className}`}>
      {children}
    </div>
  )
}

// Card Footer Component
interface CardFooterProps {
  children: ReactNode
  className?: string
  withBorder?: boolean
}

export function CardFooter({ children, className = "", withBorder = true }: CardFooterProps) {
  return (
    <div className={`px-4 py-3 ${withBorder ? "border-t border-gray-100" : ""} ${className}`}>
      {children}
    </div>
  )
}

// Badge Component
interface BadgeProps {
  children: ReactNode
  variant?: "default" | "success" | "warning" | "error" | "info" | "orange"
  size?: "sm" | "md"
  className?: string
}

export function Badge({ 
  children, 
  variant = "default", 
  size = "sm",
  className = "" 
}: BadgeProps) {
  const variantClasses = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
    orange: "bg-orange-100 text-orange-700"
  }

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm"
  }

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
    </span>
  )
}
