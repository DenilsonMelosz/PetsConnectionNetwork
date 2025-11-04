import { RegisterForm } from "@/components/RegisterForm"
import logo from "@/assets/Logo_PCN.png"

export function RegisterPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-stone-50 via-orange-50 to-orange-100">
      <div className="container mx-auto px-2 sm:px-4 py-1 sm:py-2">
        <div className="flex min-h-screen items-center justify-center">
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-1 sm:gap-2 lg:gap-4 items-stretch">
              {/* Register Form Section */}
              <div className="order-2 xl:order-1 flex items-center justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
                <RegisterForm />
              </div>

              {/* Image Section - Only visible on xl screens and larger */}
              <div className="hidden xl:flex items-center justify-center min-h-[500px]">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="bg-linear-to-br from-orange-100 to-blue-100 rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 w-full h-full flex flex-col items-center justify-center text-center shadow-lg">
                    <img
                      src={logo}
                      alt="Pets Connection Network"
                      className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 mb-3 sm:mb-4 lg:mb-6"
                    />
                    <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4 whitespace-nowrap">
                      Pets Connection Network
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-3 sm:mb-4 lg:mb-6 max-w-xs sm:max-w-sm leading-relaxed">
                      Junte-se à maior rede social de adoção responsável do Brasil
                    </p>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 w-full max-w-xs sm:max-w-sm">
                      <div className="bg-white/60 backdrop-blur-sm rounded-lg p-2 sm:p-3 lg:p-4 text-center">
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600">4mil+</div>
                        <div className="text-xs sm:text-sm text-gray-600">Pets Salvos</div>
                      </div>
                      <div className="bg-white/60 backdrop-blur-sm rounded-lg p-2 sm:p-3 lg:p-4 text-center">
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">500+</div>
                        <div className="text-xs sm:text-sm text-gray-600">ONGs Parceiras</div>
                      </div>
                    </div>
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
