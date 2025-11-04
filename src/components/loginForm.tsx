"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import logo from "@/assets/Logo_PCN.png"


export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email inválido"
    }

    if (!password) {
      newErrors.password = "Senha é obrigatória"
    } else if (password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simular login
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Login realizado:", { email, password })
      // Aqui será feita a integração com sua API de autenticação
    } catch (error) {
      console.error("Erro no login:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    console.log("Login com Google")
    // Aqui será feita a integração com Google OAuth
  }

  return (
    <Card className="w-full max-w-sm mx-auto bg-white shadow-2xl border-0 rounded-xl lg:rounded-2xl overflow-hidden">
      <CardContent className="p-3 sm:p-4 lg:p-6">
        <div className="text-center mb-3 sm:mb-4">
          <div className="flex items-center justify-center mb-2 sm:mb-3">
            <img
              src={logo}
              alt="Pets Connection Network"
              className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14"
            />
          </div>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1">Bem-vindo de volta!</h1>
          <p className="text-gray-600 text-xs sm:text-sm">Entre na maior rede social de pets do Brasil</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
          <div className="space-y-1">
            <label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`pl-9 h-9 sm:h-10 rounded-lg border-2 transition-colors text-sm ${
                  errors.email ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-orange-500"
                }`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-xs sm:text-sm font-medium text-gray-700">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`pl-9 pr-9 h-9 sm:h-10 rounded-lg border-2 transition-colors text-sm ${
                  errors.password ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-orange-500"
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
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between py-1">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 w-3 h-3"
              />
              <span className="ml-2 text-xs text-gray-600">Lembrar de mim</span>
            </label>
            <a href="#" className="text-xs text-orange-500 hover:text-orange-600 font-medium">
              Esqueceu a senha?
            </a>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-9 sm:h-10 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors text-sm"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className="mt-3 sm:mt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white text-gray-500">ou</span>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full mt-2 sm:mt-3 h-9 sm:h-10 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg border-2 border-gray-200 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuar com Google
          </Button>
        </div>

        <div className="mt-3 sm:mt-4 text-center">
          <p className="text-gray-600 text-xs">
            Novo por aqui? {" "}
            <a href="register" className="text-orange-500 hover:text-orange-600 font-medium">
              Cadastre-se grátis!
            </a>
          </p>
        </div>

        <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-200">
          <div className="text-center space-y-1 sm:space-y-2">
            <div className="flex items-center justify-center gap-3 text-xs">
              <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
                Termos de Uso
              </a>
              <span className="text-gray-300">•</span>
              <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">
                Política de Privacidade
              </a>
            </div>
            <p className="text-xs text-gray-400">© 2025 Pets Connection Network</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
