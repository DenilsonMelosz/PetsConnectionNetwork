"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  MapPin,
  Building2,
  Phone,
  FileText,
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react"
import logo from "@/assets/Logo_PCN.png"


type UserType = "user" | "ong"

interface FormData {
  // Campos comuns
  name: string
  email: string
  password: string
  phone: string
  cep: string
  state: string
  city: string

  // Campos específicos de ONG
  cnpj?: string
  responsibleName?: string
  responsibleCpf?: string
  address?: string
  addressNumber?: string
  complement?: string
  description?: string
  verificationCode?: string
}

const brazilianStates = [
  { uf: "AC", name: "Acre" },
  { uf: "AL", name: "Alagoas" },
  { uf: "AP", name: "Amapá" },
  { uf: "AM", name: "Amazonas" },
  { uf: "BA", name: "Bahia" },
  { uf: "CE", name: "Ceará" },
  { uf: "DF", name: "Distrito Federal" },
  { uf: "ES", name: "Espírito Santo" },
  { uf: "GO", name: "Goiás" },
  { uf: "MA", name: "Maranhão" },
  { uf: "MT", name: "Mato Grosso" },
  { uf: "MS", name: "Mato Grosso do Sul" },
  { uf: "MG", name: "Minas Gerais" },
  { uf: "PA", name: "Pará" },
  { uf: "PB", name: "Paraíba" },
  { uf: "PR", name: "Paraná" },
  { uf: "PE", name: "Pernambuco" },
  { uf: "PI", name: "Piauí" },
  { uf: "RJ", name: "Rio de Janeiro" },
  { uf: "RN", name: "Rio Grande do Norte" },
  { uf: "RS", name: "Rio Grande do Sul" },
  { uf: "RO", name: "Rondônia" },
  { uf: "RR", name: "Roraima" },
  { uf: "SC", name: "Santa Catarina" },
  { uf: "SP", name: "São Paulo" },
  { uf: "SE", name: "Sergipe" },
  { uf: "TO", name: "Tocantins" },
]

export function RegisterForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [userType, setUserType] = useState<UserType>("user")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    cep: "",
    state: "",
    city: "",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [cities, setCities] = useState<string[]>([])
  const [loadingCities, setLoadingCities] = useState(false)

  useEffect(() => {
    if (formData.state) {
      fetchCitiesByState(formData.state)
    } else {
      setCities([])
      setFormData((prev) => ({ ...prev, city: "" }))
    }
  }, [formData.state])

  const fetchCitiesByState = async (stateUf: string) => {
    setLoadingCities(true)
    try {
      const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateUf}/municipios`)
      const data = await response.json()
      const cityNames = data.map((city: any) => city.nome).sort()
      setCities(cityNames)
    } catch (error) {
      console.error("Erro ao buscar cidades:", error)
      setCities([])
    } finally {
      setLoadingCities(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const applyPhoneMask = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3")
  }

  const applyCpfMask = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4")
  }

  const applyCnpjMask = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, "$1.$2.$3/$4-$5")
  }

  const applyCepMask = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return numbers.replace(/(\d{5})(\d{0,3})/, "$1-$2")
  }

  const fetchAddressByCep = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, "")
    if (cleanCep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
        const data = await response.json()
        if (!data.erro) {
          setFormData((prev) => ({
            ...prev,
            state: data.uf,
            city: data.localidade,
            address: data.logradouro,
          }))
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error)
      }
    }
  }

  const validateCnpj = (cnpj: string) => {
    const numbers = cnpj.replace(/\D/g, "")
    return numbers.length === 14
  }

  const validateStep1 = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.name) newErrors.name = "Nome é obrigatório"
    if (!formData.email) {
      newErrors.email = "Email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória"
    } else if (formData.password.length < 8) {
      newErrors.password = "Senha deve ter pelo menos 8 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.phone) newErrors.phone = "Telefone é obrigatório"
    if (!formData.state) newErrors.state = "Estado é obrigatório"
    if (!formData.city) newErrors.city = "Cidade é obrigatória"

    if (userType === "ong") {
      if (!formData.cnpj) {
        newErrors.cnpj = "CNPJ é obrigatório"
      } else if (!validateCnpj(formData.cnpj)) {
        newErrors.cnpj = "CNPJ inválido"
      }
      if (!formData.responsibleName) newErrors.responsibleName = "Nome do responsável é obrigatório"
      if (!formData.responsibleCpf) newErrors.responsibleCpf = "CPF do responsável é obrigatório"
      if (!formData.cep) newErrors.cep = "CEP é obrigatório"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()

    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2)
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3)
        console.log("Código de verificação enviado para:", formData.email)
      }
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.verificationCode || formData.verificationCode.length !== 6) {
      setErrors({ verificationCode: "Código deve ter 6 dígitos" })
      return
    }

    console.log("Cadastro finalizado:", { userType, formData })
    // Aqui você redirecionaria para a tela de sucesso ou login
  }

  const handleGoogleSignup = () => {
    console.log("Cadastro com Google iniciado")
  }

  return (
    <Card className="w-full max-w-sm mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-xl overflow-hidden">
      <CardHeader className="text-center pb-3 pt-4 px-3 sm:px-6">
        <div className="flex items-center justify-center mb-2 sm:mb-3">
          <img src={logo} alt="Pets Connection Network Logo" className="w-12 h-12 sm:w-16 sm:h-16" />
        </div>

        <div className="flex items-center justify-center mb-3 sm:mb-4">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${currentStep >= 1 ? "bg-orange-500" : "bg-gray-300"}`} />
            <div className={`w-8 h-0.5 ${currentStep >= 2 ? "bg-orange-500" : "bg-gray-300"}`} />
            <div className={`w-2 h-2 rounded-full ${currentStep >= 2 ? "bg-orange-500" : "bg-gray-300"}`} />
            <div className={`w-8 h-0.5 ${currentStep >= 3 ? "bg-orange-500" : "bg-gray-300"}`} />
            <div className={`w-2 h-2 rounded-full ${currentStep >= 3 ? "bg-orange-500" : "bg-gray-300"}`} />
          </div>
        </div>

        <h1 className="text-lg sm:text-xl font-bold text-orange-600">
          {currentStep === 1 && "Criar Conta"}
          {currentStep === 2 && "Informações Complementares"}
          {currentStep === 3 && "Verificação"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          {currentStep === 1 && "Suas informações básicas"}
          {currentStep === 2 && "Complete seu cadastro"}
          {currentStep === 3 && "Confirme seu e-mail"}
        </p>
      </CardHeader>

      <CardContent className="px-3 sm:px-6 pb-4 sm:pb-6">
        {currentStep === 1 && (
          <form onSubmit={handleNextStep} className="space-y-3 sm:space-y-4">
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={() => setUserType("user")}
                className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  userType === "user" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Usuário
              </button>
              <button
                type="button"
                onClick={() => setUserType("ong")}
                className={`flex-1 py-2 px-3 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  userType === "ong" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                ONG
              </button>
            </div>

            <div className="space-y-2 sm:space-y-3">
              {/* Name */}
              <div className="space-y-1">
                <div className="relative">
                  {userType === "ong" ? (
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  ) : (
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  )}
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`pl-10 h-9 sm:h-10 text-sm border-gray-300 focus:border-orange-500 focus:ring-orange-500 ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    placeholder={userType === "ong" ? "Nome da ONG *" : "Nome completo *"}
                    required
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-10 h-9 sm:h-10 text-sm border-gray-300 focus:border-orange-500 focus:ring-orange-500 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    placeholder="E-mail *"
                    required
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`pl-10 pr-10 h-9 sm:h-10 text-sm border-gray-300 focus:border-orange-500 focus:ring-orange-500 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    placeholder="Senha (mín. 8 caracteres) *"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs ml-1">{errors.password}</p>}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-10 sm:h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg text-sm mt-4 sm:mt-6"
            >
              Próximo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-gray-500">ou</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full h-10 sm:h-11 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg text-sm border border-gray-300 flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
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

            <div className="text-center mt-3 sm:mt-4">
              <span className="text-xs sm:text-sm text-gray-600">Já tem uma conta? </span>
              <a
                href="/login"
                className="text-xs sm:text-sm text-orange-500 hover:text-orange-600 transition-colors duration-200 font-semibold hover:underline decoration-orange-500"
              >
                Faça login
              </a>
            </div>
          </form>
        )}

        {currentStep === 2 && (
          <form onSubmit={handleNextStep} className="space-y-3 sm:space-y-4">
            <div className="space-y-2 sm:space-y-3">
              {/* Phone */}
              <div className="space-y-1">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", applyPhoneMask(e.target.value))}
                    maxLength={15}
                    className={`pl-10 h-9 sm:h-10 text-sm border-gray-300 focus:border-orange-500 focus:ring-orange-500 ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                    placeholder="Telefone/WhatsApp *"
                    required
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs ml-1">{errors.phone}</p>}
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                  <select
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className={`w-full pl-10 h-9 sm:h-10 text-sm border border-gray-300 rounded-md focus:border-orange-500 focus:ring-orange-500 bg-white ${
                      errors.state ? "border-red-500" : ""
                    }`}
                    required
                  >
                    <option value="">Selecione o estado *</option>
                    {brazilianStates.map((state) => (
                      <option key={state.uf} value={state.uf}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.state && <p className="text-red-500 text-xs ml-1">{errors.state}</p>}
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
                  <select
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className={`w-full pl-10 h-9 sm:h-10 text-sm border border-gray-300 rounded-md focus:border-orange-500 focus:ring-orange-500 bg-white ${
                      errors.city ? "border-red-500" : ""
                    } ${!formData.state || loadingCities ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={!formData.state || loadingCities}
                    required
                  >
                    <option value="">
                      {loadingCities
                        ? "Carregando cidades..."
                        : formData.state
                          ? "Selecione a cidade *"
                          : "Selecione o estado primeiro"}
                    </option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.city && <p className="text-red-500 text-xs ml-1">{errors.city}</p>}
              </div>

              {/* ONG specific fields */}
              {userType === "ong" && (
                <>
                  {/* CNPJ */}
                  <div className="space-y-1">
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="text"
                        value={formData.cnpj || ""}
                        onChange={(e) => handleInputChange("cnpj", applyCnpjMask(e.target.value))}
                        maxLength={18}
                        className={`pl-10 h-9 sm:h-10 text-sm border-gray-300 focus:border-orange-500 focus:ring-orange-500 ${
                          errors.cnpj ? "border-red-500" : ""
                        }`}
                        placeholder="CNPJ *"
                        required
                      />
                    </div>
                    {errors.cnpj && <p className="text-red-500 text-xs ml-1">{errors.cnpj}</p>}
                  </div>

                  {/* CEP */}
                  <div className="space-y-1">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="text"
                        value={formData.cep}
                        onChange={(e) => {
                          const maskedValue = applyCepMask(e.target.value)
                          handleInputChange("cep", maskedValue)
                          fetchAddressByCep(maskedValue)
                        }}
                        maxLength={9}
                        className={`pl-10 h-9 sm:h-10 text-sm border-gray-300 focus:border-orange-500 focus:ring-orange-500 ${
                          errors.cep ? "border-red-500" : ""
                        }`}
                        placeholder="CEP *"
                        required
                      />
                    </div>
                    {errors.cep && <p className="text-red-500 text-xs ml-1">{errors.cep}</p>}
                  </div>

                  {/* Responsible Name */}
                  <div className="space-y-1">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="text"
                        value={formData.responsibleName || ""}
                        onChange={(e) => handleInputChange("responsibleName", e.target.value)}
                        className={`pl-10 h-9 sm:h-10 text-sm border-gray-300 focus:border-orange-500 focus:ring-orange-500 ${
                          errors.responsibleName ? "border-red-500" : ""
                        }`}
                        placeholder="Nome do responsável legal *"
                        required
                      />
                    </div>
                    {errors.responsibleName && <p className="text-red-500 text-xs ml-1">{errors.responsibleName}</p>}
                  </div>

                  {/* Responsible CPF */}
                  <div className="space-y-1">
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="text"
                        value={formData.responsibleCpf || ""}
                        onChange={(e) => handleInputChange("responsibleCpf", applyCpfMask(e.target.value))}
                        maxLength={14}
                        className={`pl-10 h-9 sm:h-10 text-sm border-gray-300 focus:border-orange-500 focus:ring-orange-500 ${
                          errors.responsibleCpf ? "border-red-500" : ""
                        }`}
                        placeholder="CPF do responsável *"
                        required
                      />
                    </div>
                    {errors.responsibleCpf && <p className="text-red-500 text-xs ml-1">{errors.responsibleCpf}</p>}
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                onClick={handlePreviousStep}
                className="flex-1 h-10 sm:h-11 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 sm:h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg text-sm"
              >
                Próximo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        )}

        {currentStep === 3 && (
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-8 h-8 text-orange-500" />
              </div>
              <p className="text-sm text-gray-600 mb-2">Enviamos um código de verificação para:</p>
              <p className="text-sm font-semibold text-gray-800">{formData.email}</p>
            </div>

            <div className="space-y-1">
              <Input
                type="text"
                value={formData.verificationCode || ""}
                onChange={(e) => handleInputChange("verificationCode", e.target.value)}
                className={`h-12 text-center text-lg font-mono tracking-widest border-gray-300 focus:border-orange-500 focus:ring-orange-500 ${
                  errors.verificationCode ? "border-red-500" : ""
                }`}
                placeholder="000000"
                maxLength={6}
                required
              />
              {errors.verificationCode && <p className="text-red-500 text-xs text-center">{errors.verificationCode}</p>}
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                onClick={handlePreviousStep}
                className="flex-1 h-10 sm:h-11 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 sm:h-11 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg text-sm"
              >
                <Check className="w-4 h-4 mr-2" />
                Finalizar
              </Button>
            </div>

            <div className="text-center">
              <button
                type="button"
                className="text-xs text-orange-500 hover:text-orange-600 transition-colors duration-200 hover:underline"
                onClick={() => {
                  console.log("Código reenviado para:", formData.email)
                }}
              >
                Não recebeu o código? Reenviar
              </button>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Ao finalizar, você concorda com nossos{" "}
                <a href="#" className="text-orange-500 hover:text-orange-600 font-medium">
                  Termos de Uso
                </a>{" "}
                e{" "}
                <a href="#" className="text-orange-500 hover:text-orange-600 font-medium">
                  Política de Privacidade
                </a>
              </p>
            </div>
          </form>
        )}

        <div className="text-center mt-4 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-400">© 2025 Pets Connection Network</p>
        </div>
      </CardContent>
    </Card>
  )
}
