interface CheckboxFieldProps {
  id: string
  checked: boolean
  onChange: (checked: boolean) => void
  error?: string
  children: React.ReactNode
}

export function CheckboxField({ id, checked, onChange, error, children }: CheckboxFieldProps) {
  return (
    <div className="space-y-1">
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className={`mt-0.5 rounded border-gray-300 text-orange-500 focus:ring-orange-500 w-4 h-4 ${
            error ? "border-red-500" : ""
          }`}
        />
        <span className="text-xs sm:text-sm text-gray-600 leading-tight">{children}</span>
      </label>
      {error && <p className="text-red-500 text-xs ml-6">{error}</p>}
    </div>
  )
}
