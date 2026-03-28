import { Card, CardContent } from "../ui/card"
import logo from "../../assets/Logo_PCN.png"

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
  logoSrc = logo 
}: AuthCardProps) {
  return (
    <Card className="w-full max-w-sm mx-auto bg-white shadow-2xl border-0 rounded-xl overflow-hidden">
      <CardContent className="p-4 sm:p-5">
        <div className="text-center mb-3">
          {showLogo && (
            <div className="flex items-center justify-center mb-2">
              <img
                src={logoSrc}
                alt="Pets Connection Network"
                className="h-10 w-10 sm:h-12 sm:w-12"
              />
            </div>
          )}
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{title}</h1>
          <p className="text-gray-600 text-xs sm:text-sm">{subtitle}</p>
        </div>
        {children}
      </CardContent>
    </Card>
  )
}
