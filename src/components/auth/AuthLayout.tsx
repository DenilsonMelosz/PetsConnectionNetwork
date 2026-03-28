import logo from "../../assets/Logo_PCN.png"

interface AuthLayoutProps {
  children: React.ReactNode
  sidebarTitle?: string
  sidebarDescription?: string
  logoSrc?: string
}

export function AuthLayout({
  children,
  sidebarTitle = "Pets Connection Network",
  sidebarDescription = "A maior rede social de adoção responsável do Brasil",
  logoSrc = logo,
}: AuthLayoutProps) {
  return (
    <div className="min-h-dvh bg-linear-to-br from-stone-50 via-orange-50 to-orange-100 overflow-x-hidden">
      <div className="flex min-h-dvh items-center justify-center p-2 sm:p-4">
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 items-stretch">
            {/* Form Section */}
            <div className="order-2 xl:order-1 flex items-center justify-center">
              {children}
            </div>

            {/* Image Section - Only visible on xl screens */}
            <div className="hidden xl:flex items-center justify-center">
              <div className="bg-linear-to-br from-orange-100 to-blue-100 rounded-2xl p-8 w-full h-full flex flex-col items-center justify-center text-center shadow-lg">
                <img
                  src={logoSrc}
                  alt="Pets Connection Network"
                  className="h-24 w-24 lg:h-32 lg:w-32 mb-6"
                />
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {sidebarTitle}
                </h2>
                <p className="text-base lg:text-lg text-gray-700 mb-8 max-w-sm leading-relaxed">
                  {sidebarDescription}
                </p>
                <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-orange-600">4mil+</div>
                    <div className="text-sm text-gray-600">Pets Salvos</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-blue-600">500+</div>
                    <div className="text-sm text-gray-600">ONGs Parceiras</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
