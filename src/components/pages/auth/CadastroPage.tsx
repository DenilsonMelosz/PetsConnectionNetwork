"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Mail, Lock, Eye, EyeOff, Camera, ArrowLeft, ArrowRight, Check } from "lucide-react"
import { z } from "zod"
import { Link } from "react-router-dom"
import logo from "@/assets/logo.png"

const tutorSchema = z.object({
  fullName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(12, "Senha deve ter pelo menos 12 caracteres"),
})

const petSchema = z.object({
  petSpecies: z.string().min(1, "Espécie do pet é obrigatória"),
  petBreed: z.string().min(1, "Raça do pet é obrigatória"),
  petAge: z.string().min(1, "Idade do pet é obrigatória"),
  isPedigree: z.boolean(),
  petPurpose: z.string().min(1, "Finalidade é obrigatória"),
})

const verificationSchema = z.object({
  code: z.string().length(6, "Código deve ter 6 dígitos"),
})

export default function CadastroPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    petSpecies: "",
    petBreed: "",
    petAge: "",
    isPedigree: false,
    petPurpose: "",
    verificationCode: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: checked }))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, petPhoto: file }))
      const reader = new FileReader()
      reader.onload = (e) => setPhotoPreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault()

    if (currentStep === 1) {
      try {
        tutorSchema.parse(formData)
        setErrors({})
        setCurrentStep(2)
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldErrors: Record<string, string> = {}
          error.errors.forEach((err) => {
            if (err.path[0]) fieldErrors[err.path[0] as string] = err.message
          })
          setErrors(fieldErrors)
        }
      }
    } else if (currentStep === 2) {
      try {
        petSchema.parse(formData)
        setErrors({})
        setCurrentStep(3)
        console.log("Código de verificação enviado para:", formData.email)
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldErrors: Record<string, string> = {}
          error.errors.forEach((err) => {
            if (err.path[0]) fieldErrors[err.path[0] as string] = err.message
          })
          setErrors(fieldErrors)
        }
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      verificationSchema.parse({ code: formData.verificationCode })
      setErrors({})
      console.log("Cadastro finalizado:", formData)
      // Aqui você redirecionaria para a tela de sucesso ou login
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0] as string] = err.message
        })
        setErrors(fieldErrors)
      }
    }
  }

  const handleGoogleSignup = () => {
    console.log("Cadastro com Google iniciado")
    // Aqui você implementaria a integração com Google OAuth
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-sm sm:max-w-md mx-auto">
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center pb-3 sm:pb-4 pt-4 sm:pt-6 px-3 sm:px-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center mb-3 sm:mb-4 text-pink-500 hover:text-pink-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="text-xs sm:text-sm">Voltar ao login</span>
            </Link>

            <div className="flex items-center justify-center mb-2 sm:mb-3">
              <div className="relative">
                 <img
                  src={logo}
                  alt="Pets Connection Network Logo"
                  className="w-12 h-12 sm:w-16 sm:h-16"
                />
              </div>
            </div>

            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${currentStep >= 1 ? "bg-pink-500" : "bg-gray-300"}`} />
                <div className={`w-8 h-0.5 ${currentStep >= 2 ? "bg-pink-500" : "bg-gray-300"}`} />
                <div className={`w-2 h-2 rounded-full ${currentStep >= 2 ? "bg-pink-500" : "bg-gray-300"}`} />
                <div className={`w-8 h-0.5 ${currentStep >= 3 ? "bg-pink-500" : "bg-gray-300"}`} />
                <div className={`w-2 h-2 rounded-full ${currentStep >= 3 ? "bg-pink-500" : "bg-gray-300"}`} />
              </div>
            </div>

            <h1 className="text-lg sm:text-xl font-bold text-pink-600">
              {currentStep === 1 && "Criar Conta"}
              {currentStep === 2 && "Informações do Pet"}
              {currentStep === 3 && "Verificação"}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">
              {currentStep === 1 && "Suas informações básicas"}
              {currentStep === 2 && "Conte-nos sobre seu pet"}
              {currentStep === 3 && "Confirme seu e-mail"}
            </p>
          </CardHeader>

          <CardContent className="px-3 sm:px-6 pb-4 sm:pb-6">
            {currentStep === 1 && (
              <form onSubmit={handleNextStep} className="space-y-3 sm:space-y-4">
                <div className="space-y-2 sm:space-y-3">
                  <div className="space-y-1">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className={`pl-10 h-9 sm:h-10 text-sm border-gray-300 focus:border-pink-500 focus:ring-pink-500 ${
                          errors.fullName ? "border-red-500" : ""
                        }`}
                        placeholder="Nome completo *"
                        required
                      />
                    </div>
                    {errors.fullName && <p className="text-red-500 text-xs ml-1">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-1">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`pl-10 h-9 sm:h-10 text-sm border-gray-300 focus:border-pink-500 focus:ring-pink-500 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                        placeholder="E-mail *"
                        required
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email}</p>}
                  </div>

                  <div className="space-y-1">
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        className={`pl-10 pr-10 h-9 sm:h-10 text-sm border-gray-300 focus:border-pink-500 focus:ring-pink-500 ${
                          errors.password ? "border-red-500" : ""
                        }`}
                        placeholder="Senha (mín. 12 caracteres) *"
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
                  className="w-full h-10 sm:h-11 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg text-sm mt-4 sm:mt-6"
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
              </form>
            )}

            {currentStep === 2 && (
              <form onSubmit={handleNextStep} className="space-y-3 sm:space-y-4">
                <div className="space-y-2 sm:space-y-3">
                  <div className="space-y-1">
                    <Select onValueChange={(value) => handleInputChange("petSpecies", value)}>
                      <SelectTrigger
                        className={`h-9 sm:h-10 text-sm border-gray-300 focus:border-pink-500 focus:ring-pink-500 ${
                          errors.petSpecies ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Espécie do pet *" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cao">Cão</SelectItem>
                        <SelectItem value="gato">Gato</SelectItem>
                        <SelectItem value="peixe">Peixe</SelectItem>
                        <SelectItem value="hamster">Hamster</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.petSpecies && <p className="text-red-500 text-xs ml-1">{errors.petSpecies}</p>}
                  </div>

                  <div className="space-y-1">
                    <Input
                      type="text"
                      value={formData.petBreed}
                      onChange={(e) => handleInputChange("petBreed", e.target.value)}
                      className={`h-9 sm:h-10 text-sm border-gray-300 focus:border-pink-500 focus:ring-pink-500 ${
                        errors.petBreed ? "border-red-500" : ""
                      }`}
                      placeholder="Raça do pet *"
                      required
                    />
                    {errors.petBreed && <p className="text-red-500 text-xs ml-1">{errors.petBreed}</p>}
                  </div>

                  <div className="space-y-1">
                    <Input
                      type="text"
                      value={formData.petAge}
                      onChange={(e) => handleInputChange("petAge", e.target.value)}
                      className={`h-9 sm:h-10 text-sm border-gray-300 focus:border-pink-500 focus:ring-pink-500 ${
                        errors.petAge ? "border-red-500" : ""
                      }`}
                      placeholder="Idade do pet (ex: 2 anos, 6 meses) *"
                      required
                    />
                    {errors.petAge && <p className="text-red-500 text-xs ml-1">{errors.petAge}</p>}
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="pedigree"
                      checked={formData.isPedigree}
                      onChange={(e) => handleCheckboxChange("isPedigree", e.target.checked)}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                    />
                    <label htmlFor="pedigree" className="text-sm text-gray-700">
                      Pet com pedigree
                    </label>
                  </div>

                  <div className="space-y-1">
                    <Select onValueChange={(value) => handleInputChange("petPurpose", value)}>
                      <SelectTrigger
                        className={`h-9 sm:h-10 text-sm border-gray-300 focus:border-pink-500 focus:ring-pink-500 ${
                          errors.petPurpose ? "border-red-500" : ""
                        }`}
                      >
                        <SelectValue placeholder="Finalidade *" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="proprio">Pet próprio</SelectItem>
                        <SelectItem value="adocao">Para adoção</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.petPurpose && <p className="text-red-500 text-xs ml-1">{errors.petPurpose}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs sm:text-sm text-gray-600">Foto do pet (opcional)</label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-pink-400 transition-colors">
                        {photoPreview ? (
                          <img
                            src={photoPreview || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                        )}
                        <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                      </label>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">
                          Adicione uma foto fofa do seu pet para personalizar o perfil
                        </p>
                      </div>
                    </div>
                  </div>
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
                    className="flex-1 h-10 sm:h-11 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg text-sm"
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
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-8 h-8 text-pink-500" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Enviamos um código de verificação para:</p>
                  <p className="text-sm font-semibold text-gray-800">{formData.email}</p>
                </div>

                <div className="space-y-1">
                  <Input
                    type="text"
                    value={formData.verificationCode}
                    onChange={(e) => handleInputChange("verificationCode", e.target.value)}
                    className={`h-12 text-center text-lg font-mono tracking-widest border-gray-300 focus:border-pink-500 focus:ring-pink-500 ${
                      errors.code ? "border-red-500" : ""
                    }`}
                    placeholder="000000"
                    maxLength={6}
                    required
                  />
                  {errors.code && <p className="text-red-500 text-xs text-center">{errors.code}</p>}
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
                    className="text-xs text-pink-500 hover:text-pink-600 transition-colors duration-200 hover:underline"
                    onClick={() => {
                      console.log("Código reenviado para:", formData.email)
                    }}
                  >
                    Não recebeu o código? Reenviar
                  </button>
                </div>
              </form>
            )}

            {currentStep === 1 && (
              <div className="text-center mt-3 sm:mt-4">
                <span className="text-xs sm:text-sm text-gray-600">Já tem uma conta? </span>
                <Link
                  to="/"
                  className="text-xs sm:text-sm text-pink-500 hover:text-pink-600 transition-colors duration-200 font-semibold hover:underline decoration-pink-500"
                >
                  Faça login
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-4 sm:mt-6 pb-4">
          <p className="text-xs text-gray-400">© 2025 Pets Connection Network</p>
        </div>
      </div>
    </div>
  )
}
