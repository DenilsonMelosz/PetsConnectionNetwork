import { Card, CardContent } from "@/components/ui/card"

interface AuthCardProps {
  children: React.ReactNode
  title: string
  subtitle: string
  showLogo?: boolean
  logoSrc?: string
}

export function AuthCard({ 
  children, 
  title, 
  subtitle, 
  showLogo = true,
  logoSrc = "/Logo_PCN.png" 
}: AuthCardProps) {
  return (
    <Card className="w-full max-w-sm mx-auto bg-white shadow-2xl border-0 rounded-xl lg:rounded-2xl overflow-hidden">
      <CardContent className="p-3 sm:p-4 lg:p-6">
        <div className="text-center mb-3 sm:mb-4">
          {showLogo && (
            <div className="flex items-center justify-center mb-2 sm:mb-3">
              <img
                src={logoSrc}
                alt="Pets Connection Network"
                className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14"
              />
            </div>
          )}
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1">{title}</h1>
          <p className="text-gray-600 text-xs sm:text-sm">{subtitle}</p>
        </div>
        {children}
      </CardContent>
    </Card>
  )
}
