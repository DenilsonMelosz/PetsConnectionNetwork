import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { Mail, User } from "lucide-react"
import { AuthCard } from "./AuthCard"
import { AuthFooter } from "./AuthFooter"
import { FormInput } from "./FormInput"
import { PasswordInput } from "./PasswordInput"
import { GoogleButton } from "./GoogleButton"
import { Divider } from "./Divider"
import { CheckboxField } from "./CheckboxField"

interface FormErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  acceptTerms?: string
  acceptPrivacy?: string
}

export function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptPrivacy, setAcceptPrivacy] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string): { isValid: boolean; message?: string } => {
    if (password.length < 8) {
      return { isValid: false, message: "Mínimo 8 caracteres" }
    }
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, message: "Inclua uma letra maiúscula" }
    }
    if (!/[a-z]/.test(password)) {
      return { isValid: false, message: "Inclua uma letra minúscula" }
    }
    if (!/[0-9]/.test(password)) {
      return { isValid: false, message: "Inclua um número" }
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return { isValid: false, message: "Inclua um caractere especial" }
    }
    return { isValid: true }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!name.trim()) {
      newErrors.name = "Nome é obrigatório"
    } else if (name.trim().split(" ").length < 2) {
      newErrors.name = "Digite nome e sobrenome"
    }

    if (!email) {
      newErrors.email = "Email é obrigatório"
    } else if (!validateEmail(email)) {
      newErrors.email = "Email inválido"
    }

    if (!password) {
      newErrors.password = "Senha é obrigatória"
    } else {
      const passwordValidation = validatePassword(password)
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.message
      }
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirme sua senha"
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem"
    }

    if (!acceptTerms) {
      newErrors.acceptTerms = "Aceite os Termos de Uso"
    }

    if (!acceptPrivacy) {
      newErrors.acceptPrivacy = "Aceite a Política de Privacidade"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Cadastro realizado:", { name, email, password, acceptTerms, acceptPrivacy })
    } catch (error) {
      console.error("Erro no cadastro:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = () => {
    console.log("Cadastro com Google")
  }

  const getPasswordStrength = (): { strength: number; label: string; color: string } => {
    if (!password) return { strength: 0, label: "", color: "" }

    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++

    if (strength <= 2) return { strength, label: "Fraca", color: "bg-red-500" }
    if (strength <= 3) return { strength, label: "Média", color: "bg-yellow-500" }
    if (strength <= 4) return { strength, label: "Boa", color: "bg-blue-500" }
    return { strength, label: "Forte", color: "bg-green-500" }
  }

  const passwordStrength = getPasswordStrength()

  return (
    <AuthCard
      title="Crie sua conta"
      subtitle="Junte-se à maior rede de pets do Brasil"
    >
      <form onSubmit={handleSubmit} className="space-y-2">
        <FormInput
          id="name"
          type="text"
          placeholder="Nome completo"
          value={name}
          onChange={setName}
          error={errors.name}
          icon={User}
          label="Nome"
        />

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

        <div className="space-y-1">
          <PasswordInput
            id="password"
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChange={setPassword}
            error={errors.password}
            label="Senha"
          />
          {password && (
            <div className="space-y-0.5">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full ${
                      level <= passwordStrength.strength ? passwordStrength.color : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className={`text-xs ${passwordStrength.color.replace("bg-", "text-")}`}>
                {passwordStrength.label}
              </p>
            </div>
          )}
        </div>

        <PasswordInput
          id="confirmPassword"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChange={setConfirmPassword}
          error={errors.confirmPassword}
          label="Confirmar"
        />

        <div className="space-y-1.5 pt-1">
          <CheckboxField
            id="acceptTerms"
            checked={acceptTerms}
            onChange={setAcceptTerms}
            error={errors.acceptTerms}
          >
            Aceito os{" "}
            <Link
              to="/termos"
              target="_blank"
              className="text-orange-500 hover:text-orange-600 font-medium underline"
            >
              Termos de Uso
            </Link>
          </CheckboxField>

          <CheckboxField
            id="acceptPrivacy"
            checked={acceptPrivacy}
            onChange={setAcceptPrivacy}
            error={errors.acceptPrivacy}
          >
            Aceito a{" "}
            <Link
              to="/politicas"
              target="_blank"
              className="text-orange-500 hover:text-orange-600 font-medium underline"
            >
              Política de Privacidade
            </Link>
          </CheckboxField>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-9 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors text-sm mt-1"
        >
          {isLoading ? "Criando..." : "Criar conta"}
        </Button>
      </form>

      <Divider />

      <GoogleButton onClick={handleGoogleSignup} />

      <div className="mt-3 text-center">
        <p className="text-gray-600 text-xs">
          Já tem conta?{" "}
          <Link to="/feed" className="text-orange-500 hover:text-orange-600 font-medium">
            Faça login
          </Link>
        </p>
      </div>

      <AuthFooter showTerms={false} />
    </AuthCard>
  )
}
