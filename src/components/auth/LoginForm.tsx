"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { AuthCard } from "./AuthCard"
import { AuthFooter } from "./AuthFooter"
import { FormInput } from "./FormInput"
import { PasswordInput } from "./PasswordInput"
import { GoogleButton } from "./GoogleButton"
import { Divider } from "./Divider"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
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
      console.log("Login realizado:", { email, password, rememberMe })
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
    <AuthCard
      title="Bem-vindo de volta!"
      subtitle="Entre na maior rede social de pets do Brasil"
    >
      <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
        <FormInput
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={setEmail}
          error={errors.email}
          icon={Mail}
          label="Email"
        />

        <PasswordInput
          id="password"
          placeholder="Sua senha"
          value={password}
          onChange={setPassword}
          error={errors.password}
          label="Senha"
        />

        <div className="flex items-center justify-between py-1">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
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
        <Divider />

        <div className="mt-2 sm:mt-3">
          <GoogleButton onClick={handleGoogleLogin} />
        </div>
      </div>

      <div className="mt-3 sm:mt-4 text-center">
        <p className="text-gray-600 text-xs">
          Novo por aqui?{" "}
          <a href="/feed" className="text-orange-500 hover:text-orange-600 font-medium">
            Cadastre-se grátis!
          </a>
        </p>
      </div>

      <AuthFooter />
    </AuthCard>
  )
}
