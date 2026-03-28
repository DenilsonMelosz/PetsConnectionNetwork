"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import CountdownTimer from "@/components/CountdownTimer"
import { Heart, Users, Shield, CheckCircle, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"
import { z } from "zod"
import logo from "@/assets/Logo_PCN.png"
import gatoacaraciado from "@/assets/gato-acariciado-crianca.png"
import dogadotado from "@/assets/cachorro-feliz-adotado.png"
import veterinarioclinica from "@/assets/veterinarioclinica.png"

const emailSchema = z.object({
  email: z.string().email("Email inválido"),
})

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      emailSchema.parse({ email })
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSubscribed(true)
      setEmail("")
    } catch (error) {
      console.error("Erro na validação:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-18 lg:h-20">
            <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
              <img
                src={logo || "/placeholder.svg"}
                alt="PCN"
                className="h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 shrink-0"
              />
              <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-900 tracking-tight leading-tight whitespace-nowrap">
                Pets Connection Network
              </span>
            </div>
            <nav className="hidden lg:flex space-x-6 xl:space-x-10">
              <a
                href="#como-funciona"
                className="text-gray-600 hover:text-orange-500 font-medium transition-colors text-base xl:text-lg cursor-pointer"
              >
                Como Funciona?
              </a>
              <a
                href="#sinpatinhas"
                className="text-gray-600 hover:text-orange-500 font-medium transition-colors text-base xl:text-lg cursor-pointer"
              >
                Sinpatinhas
              </a>
              <a
                href="#contato"
                className="text-gray-600 hover:text-orange-500 font-medium transition-colors text-base xl:text-lg cursor-pointer"
              >
                Contato
              </a>
              <a
                href="#sobre"
                className="text-gray-600 hover:text-orange-500 font-medium transition-colors text-base xl:text-lg cursor-pointer"
              >
                Sobre
              </a>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="hidden sm:inline-flex bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50 px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 text-sm md:text-base lg:text-lg cursor-pointer"
                >
                  Entrar
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 text-sm md:text-base lg:text-lg font-semibold rounded-full cursor-pointer">
                  Cadastrar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 md:space-y-7 lg:space-y-8">
              <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
                  Pets Connection
                  <br />
                  <span className="text-orange-500">Network</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-xl text-gray-600 max-w-lg leading-relaxed">
                  A maior rede social Pets, Maior Rede de Adoção do Brasil. Conectamos ONGs verificadas com famílias que
                  desejam adotar pets.
                </p>
              </div>

              <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 lg:p-8">
                <div className="text-center">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                    Pré-lançamento em:
                  </h2>
                  <CountdownTimer targetDate="2026-10-01T12:00:00" />
                </div>
              </Card>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/cadastro" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold cursor-pointer"
                  >
                    Quero Participar
                  </Button>
                </Link>
                <Link to="/saibamais" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent cursor-pointer"
                  >
                    Saiba Mais
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px]">
                <div className="space-y-3 sm:space-y-4">
                  <Card className="bg-orange-100 rounded-2xl sm:rounded-3xl overflow-hidden h-36 sm:h-44 md:h-48 border-0">
                    <CardContent className="p-0 h-full">
                      <img
                        src={dogadotado || "/placeholder.svg"}
                        alt="Cachorro feliz"
                        className="w-full h-full object-cover"
                      />
                    </CardContent>
                  </Card>
                  <Card className="bg-green-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 h-24 sm:h-28 md:h-32 border-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-green-700">4mil+</div>
                      <div className="text-sm sm:text-base text-green-600 font-medium">Pets Salvos</div>
                    </div>
                  </Card>
                </div>
                <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
                  <Card className="bg-blue-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6 h-24 sm:h-28 md:h-32 border-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-blue-700">500+</div>
                      <div className="text-sm sm:text-base text-blue-600 font-medium">ONGs Parceiras</div>
                    </div>
                  </Card>
                  <Card className="bg-yellow-100 rounded-2xl sm:rounded-3xl overflow-hidden h-44 sm:h-52 md:h-56 border-0">
                    <CardContent className="p-0 h-full">
                      <img
                        src={gatoacaraciado || "/placeholder.svg"}
                        alt="Gato sendo acariciado"
                        className="w-full h-full object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="sobre" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 tracking-tight">
              Por que escolher o
              <br />
              <span className="text-orange-500">Pets Connection Network?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-7 lg:gap-8">
            <Card className="bg-white rounded-2xl sm:rounded-3xl border-0 shadow-lg p-5 sm:p-6 md:p-7 lg:p-8 hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="bg-blue-100 rounded-xl sm:rounded-2xl w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                  <Shield className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">
                  ONGs Verificadas
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Todas as ONGs passam por processo rigoroso de verificação para garantir a segurança e qualidade dos
                  pets.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl sm:rounded-3xl border-0 shadow-lg p-5 sm:p-6 md:p-7 lg:p-8 hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="bg-red-100 rounded-xl sm:rounded-2xl w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                  <Heart className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-red-500" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">
                  Adoção Responsável
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Promovemos a adoção consciente com processo educativo e acompanhamento pós-adoção.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-2xl sm:rounded-3xl border-0 shadow-lg p-5 sm:p-6 md:p-7 lg:p-8 hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-1">
              <CardContent className="p-0">
                <div className="bg-green-100 rounded-xl sm:rounded-2xl w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                  <Users className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-600" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">
                  Comunidade Ativa
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Rede social completa para compartilhar experiências, dicas e criar conexões duradouras.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section
  id="como-funciona"
  className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white"
>
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 tracking-tight">
        Como Funciona?
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-gray-600">
        Um processo simples, seguro e cheio de amor em 4 etapas:
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-7 lg:gap-8">
      {/* Etapa 1 */}
      <Card className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl sm:rounded-3xl border-0 p-5 sm:p-6 md:p-7 lg:p-8 text-center">
        <CardContent className="p-0">
          <div className="bg-blue-500 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6">
            <span className="text-xl sm:text-2xl font-bold text-white">1</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
            Cadastre-se
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            Crie seu perfil como <strong>ONG</strong> ou <strong>usuário</strong> e faça parte da nossa rede pet.
          </p>
        </CardContent>
      </Card>

      {/* Etapa 2 */}
      <Card className="bg-linear-to-br from-green-50 to-green-100 rounded-2xl sm:rounded-3xl border-0 p-5 sm:p-6 md:p-7 lg:p-8 text-center">
        <CardContent className="p-0">
          <div className="bg-green-500 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6">
            <span className="text-xl sm:text-2xl font-bold text-white">2</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
            Encontre ou Divulgue
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            Explore pets para <strong>adoção</strong>, cadastre animais <strong>desaparecidos</strong> ou ajude a divulgar <strong>pets encontrados</strong>.
          </p>
        </CardContent>
      </Card>

      {/* Etapa 3 */}
      <Card className="bg-linear-to-br from-yellow-50 to-yellow-100 rounded-2xl sm:rounded-3xl border-0 p-5 sm:p-6 md:p-7 lg:p-8 text-center">
        <CardContent className="p-0">
          <div className="bg-yellow-500 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6">
            <span className="text-xl sm:text-2xl font-bold text-white">3</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
            Solicite o Contato
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            Converse diretamente com a <strong>ONG responsável</strong> ou com quem <strong>encontrou seu pet</strong>.
          </p>
        </CardContent>
      </Card>

      {/* Etapa 4 */}
      <Card className="bg-linear-to-br from-orange-50 to-orange-100 rounded-2xl sm:rounded-3xl border-0 p-5 sm:p-6 md:p-7 lg:p-8 text-center">
        <CardContent className="p-0">
          <div className="bg-orange-500 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-4 sm:mb-5 md:mb-6">
            <span className="text-xl sm:text-2xl font-bold text-white">4</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
            Adote com Amor ou Reencontre seu Amigo
          </h3>
          <p className="text-sm sm:text-base text-gray-600">
            Finalize o processo e celebre um <strong>novo vínculo de amor</strong>.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</section>

      <section id="sinpatinhas" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
            <div className="space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 md:mb-6 tracking-tight">
                  Apoio ao
                  <br />
                  <span className="text-green-600">Sinpatinhas</span>
                </h2>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Apoiamos o Sistema Nacional de Cadastro de Animais Domésticos (Sinpatinhas), iniciativa do Ministério
                  do Meio Ambiente que dá identidade e visibilidade aos pets.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                <Card className="bg-white rounded-xl sm:rounded-2xl border-0 shadow-sm p-4 sm:p-5 md:p-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="bg-green-100 rounded-lg sm:rounded-xl p-2 shrink-0">
                      <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Identificação Nacional</h4>
                      <p className="text-gray-600 text-sm sm:text-base">Cada pet recebe um RG nacional único</p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-white rounded-xl sm:rounded-2xl border-0 shadow-sm p-4 sm:p-5 md:p-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="bg-blue-100 rounded-lg sm:rounded-xl p-2 shrink-0">
                      <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Controle de Saúde</h4>
                      <p className="text-gray-600 text-sm sm:text-base">Histórico completo de vacinas e tratamentos</p>
                    </div>
                  </div>
                </Card>

                <Card className="bg-white rounded-xl sm:rounded-2xl border-0 shadow-sm p-4 sm:p-5 md:p-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="bg-orange-100 rounded-lg sm:rounded-xl p-2 shrink-0">
                      <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Localização Rápida</h4>
                      <p className="text-gray-600 text-sm sm:text-base">Sistema de busca para pets perdidos</p>
                    </div>
                  </div>
                </Card>
              </div>

              <a href="https://sinpatinhas.mma.gov.br/login" target="_blank" rel="noopener noreferrer">
                <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-base sm:text-lg font-semibold rounded-full mt-3 sm:mt-4 md:mt-5 cursor-pointer">
                  Cadastre-se no Sinpatinhas
                </Button>
              </a>
            </div>

            <div className="relative">
              <Card className="bg-linear-to-br from-green-100 to-blue-100 rounded-2xl sm:rounded-3xl border-0 overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={veterinarioclinica || "/placeholder.svg"}
                    alt="Veterinário cuidando de pets"
                    className="w-full h-64 sm:h-80 md:h-96 object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-5 md:mb-6 tracking-tight">
            Seja o Primeiro a Saber
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-orange-100 mb-8 sm:mb-10 md:mb-12 leading-relaxed">
            Receba atualizações exclusivas sobre o lançamento e novidades da plataforma
          </p>

          {!isSubscribed ? (
            <Card className="bg-white/10 backdrop-blur-sm border-0 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 max-w-md mx-auto">
              <form onSubmit={handleNewsletterSubmit} className="space-y-3 sm:space-y-4">
                <Input
                  type="email"
                  placeholder="Seu melhor email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 rounded-xl sm:rounded-2xl py-3 sm:py-4 text-base sm:text-lg"
                  required
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-orange-600 hover:bg-gray-100 rounded-xl sm:rounded-2xl py-3 sm:py-4 text-base sm:text-lg font-semibold cursor-pointer"
                >
                  {isLoading ? "Enviando..." : "Quero Receber"}
                </Button>
              </form>
            </Card>
          ) : (
            <Card className="bg-green-500/20 backdrop-blur-sm border-green-400/30 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 lg:p-8 max-w-md mx-auto">
              <div className="text-white">
                <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4" />
                <p className="text-base sm:text-lg">Obrigado! Você receberá nossas atualizações em breve.</p>
              </div>
            </Card>
          )}
        </div>
      </section>

      <footer id="contato" className="bg-gray-900 text-white py-12 sm:py-16 md:py-18 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
            <div className="col-span-1 sm:col-span-2">
              <div className="flex items-center space-x-3 mb-5 sm:mb-6">
                <img
                  src={logo || "/placeholder.svg"}
                  alt="Pets Connection Network"
                  className="h-10 w-10 sm:h-12 sm:w-12"
                />
                <span className="text-xl sm:text-2xl font-bold">Pets Connection Network</span>
              </div>
              <p className="text-gray-400 mb-6 sm:mb-8 max-w-md text-base sm:text-lg leading-relaxed">
                A maior rede social de adoção responsável do Brasil. Conectando ONGs verificadas com famílias que
                desejam adotar pets.
              </p>
              <div className="flex space-x-4 sm:space-x-6">
                <div className="bg-gray-800 rounded-full p-2.5 sm:p-3 hover:bg-gray-700 transition-colors cursor-pointer">
                  <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="bg-gray-800 rounded-full p-2.5 sm:p-3 hover:bg-gray-700 transition-colors cursor-pointer">
                  <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="bg-gray-800 rounded-full p-2.5 sm:p-3 hover:bg-gray-700 transition-colors cursor-pointer">
                  <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Links Úteis</h3>
              <ul className="space-y-3 sm:space-y-4">
                <li>
                  <Link
                    to="/termos"
                    className="text-gray-400 hover:text-white transition-colors text-base sm:text-lg cursor-pointer"
                  >
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link
                    to="/politicas"
                    className="text-gray-400 hover:text-white transition-colors text-base sm:text-lg cursor-pointer"
                  >
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <a
                    href="#sobre"
                    className="text-gray-400 hover:text-white transition-colors text-base sm:text-lg cursor-pointer"
                  >
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a
                    href="#como-funciona"
                    className="text-gray-400 hover:text-white transition-colors text-base sm:text-lg cursor-pointer"
                  >
                    Como Funciona
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Contato</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-800 rounded-lg p-2 shrink-0">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <span className="text-gray-400 text-sm sm:text-base break-all">
                    suporte.petsconnection.network@gmail.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-800 rounded-lg p-2 shrink-0">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <span className="text-gray-400 text-sm sm:text-base">(71) 9999-9999</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-800 rounded-lg p-2 shrink-0">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  </div>
                  <span className="text-gray-400 text-sm sm:text-base">Brasil</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 sm:mt-12 md:mt-14 lg:mt-16 pt-6 sm:pt-7 md:pt-8 text-center">
            <p className="text-gray-400 text-sm sm:text-base md:text-lg">
              © 2025 Pets Connection Network. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
