import { useState } from "react"
import { Filter, ChevronDown, X } from "lucide-react"

export interface FilterOption {
  value: string
  label: string
}

export interface FilterConfig {
  id: string
  label: string
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
}

interface FilterBarProps {
  filters: FilterConfig[]
  showFilterButton?: boolean
  onClearAll?: () => void
  className?: string
}

export function FilterBar({ 
  filters, 
  showFilterButton = true,
  onClearAll,
  className = "" 
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false)
  
  const hasActiveFilters = filters.some(f => f.value !== "" && f.value !== "all")

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Toggle Button for Mobile */}
      {showFilterButton && (
        <div className="flex items-center justify-between sm:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filtros
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-orange-500 rounded-full" />
            )}
          </button>
          {hasActiveFilters && onClearAll && (
            <button
              onClick={onClearAll}
              className="text-sm text-orange-500 hover:text-orange-600 font-medium"
            >
              Limpar filtros
            </button>
          )}
        </div>
      )}

      {/* Filters - Always visible on desktop, toggle on mobile */}
      <div className={`${showFilterButton ? (showFilters ? "flex" : "hidden sm:flex") : "flex"} flex-wrap items-center gap-2`}>
        {filters.map((filter) => (
          <div key={filter.id} className="relative">
            <select
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-orange-400 focus:border-transparent cursor-pointer transition-all"
            >
              <option value="">{filter.label}</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        ))}

        {/* Clear All Button - Desktop */}
        {hasActiveFilters && onClearAll && (
          <button
            onClick={onClearAll}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
          >
            <X className="w-4 h-4" />
            Limpar
          </button>
        )}
      </div>
    </div>
  )
}
