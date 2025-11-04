"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Shield, CheckCircle, ArrowLeft, Play as Paw, Home, Globe  } from "lucide-react"
import logo from "@/assets/Logo_PCN.png"
import dogVideo from "@/assets/dogcute.mp4"
import familiafeliz from "@/assets/familiafeliz.png"
import onglogo from "@/assets/onglogo.png"




const SaibaMais: React.FC = () => {
  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img src={logo} alt="Pets Connection Network" className="h-10 w-10 sm:h-12 sm:w-12" />
              <span className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight whitespace-nowrap">
                Pets Connection Network 
              </span>
            </div>
            <Button
              variant="outline"
              onClick={handleGoBack}
              className="flex items-center space-x-2 bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 text-lg"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Apresentação do Projeto */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
              Pets Connection <span className="text-orange-500">Network </span>
            </h1>
            <p className="text-2xl text-orange-600 font-semibold max-w-4xl mx-auto">
              A maior rede social Pets do Brasil
            </p>
             <h2 className="text-2x1 sm:text-2xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
              Aqui, pets, tutores e ONGs se conectam <span className="text-orange-500">em uma só comunidade</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Uma plataforma completa onde o amor pelos animais une pessoas e transforma vidas:
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <Card className="bg-linear-to-br from-orange-50 to-blue-50 rounded-2xl sm:rounded-3xl overflow-hidden border-0 shadow-2xl">
              <CardContent className="p-0">
                <video className="w-full h-64 sm:h-80 lg:h-96 object-cover" autoPlay loop muted playsInline>
                  <source
                    src={dogVideo}
                    type="video/mp4"
                  />
                  <img
                    src="/happy-pets-playing-together-dogs-cats-birds-in-a-b.png"
                    alt="Pets felizes brincando juntos"
                    className="w-full h-full object-cover"
                  />
                </video>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Missão e Propósito */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
            Nossa <span className="text-orange-500">Missão</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            Nossa missão é aproximar pessoas e animais, criando uma rede social única onde tutores compartilham momentos
            especiais e ONGs encontram famílias amorosas para adoção responsável. Acreditamos que cada pet merece um lar
            cheio de amor e cada família merece a alegria de um companheiro fiel.
          </p>
        </div>
      </section>

      {/* O que oferecemos */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              O que <span className="text-orange-500">Oferecemos?</span>
            </h2>
            <p className="text-xl text-gray-600">Uma plataforma completa para a comunidade pet</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white rounded-3xl border-0 shadow-lg p-8 hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="bg-blue-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                  <Paw className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">🐾 Rede Social de Pets</h3>
                <p className="text-gray-600 leading-relaxed">
                  Perfis personalizados para seus pets, compartilhamento de fotos adoráveis, histórias emocionantes e
                  momentos especiais da vida dos seus companheiros.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-3xl border-0 shadow-lg p-8 hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="bg-green-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                  <Home className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">🏡 Adoção Responsável</h3>
                <p className="text-gray-600 leading-relaxed">
                  Conexão direta com ONGs verificadas, processo transparente de adoção e acompanhamento para garantir o
                  bem-estar dos pets.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-3xl border-0 shadow-lg p-8 hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="bg-orange-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">✅ ONGs Verificadas</h3>
                <p className="text-gray-600 leading-relaxed">
                  Transparência total e segurança na adoção. Todas as ONGs passam por rigoroso processo de verificação e
                  acompanhamento contínuo.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-3xl border-0 shadow-lg p-8 hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="bg-red-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">📲 Comunidade Ativa</h3>
                <p className="text-gray-600 leading-relaxed">
                  Interação constante entre tutores, troca de experiências valiosas, dicas de cuidados e uma rede de
                  apoio sempre presente.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impacto Social */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                Nosso <span className="text-green-600">Impacto Social</span>
              </h2>

              <Card className="bg-linear-to-br from-green-50 to-green-100 rounded-3xl border-0 p-8">
                <CardContent className="p-0 text-center">
                  <div className="text-5xl font-bold text-green-700 mb-2">4.000+</div>
                  <div className="text-xl text-green-600 font-semibold">Pets já encontraram um lar</div>
                  <p className="text-green-600 mt-2">com ajuda de ONGs parceiras</p>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Processo de Adoção Responsável</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 rounded-xl p-2 mt-1">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-600">
                        <strong>Avaliação criteriosa:</strong> Verificamos se a família está preparada para receber o
                        pet
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 rounded-xl p-2 mt-1">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-600">
                        <strong>Acompanhamento pós-adoção:</strong> Suporte contínuo para garantir o bem-estar do pet
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 rounded-xl p-2 mt-1">
                      <CheckCircle className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-gray-600">
                        <strong>Educação responsável:</strong> Orientações sobre cuidados, saúde e bem-estar animal
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="bg-linear-to-br from-green-100 to-blue-100 rounded-3xl border-0 overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={familiafeliz}
                    alt="Pets felizes com suas famílias adotivas"
                    className="w-full h-96 object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Parcerias e Credibilidade */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Parcerias e <span className="text-blue-600">Credibilidade</span>
            </h2>
            <p className="text-xl text-gray-600">Apoio institucional que garante nossa confiabilidade</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Card className="bg-white rounded-3xl border-0 shadow-lg p-8">
                <CardContent className="p-0">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-green-100 rounded-2xl w-16 h-16 flex items-center justify-center">
                      <Globe className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Apoio ao Sinpatinhas</h3>
                      <p className="text-gray-600">Ministério do Meio Ambiente</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    Apoiamos o Sistema Nacional de Cadastro de Animais Domésticos (Sinpatinhas), iniciativa oficial que
                    dá identidade e visibilidade aos pets brasileiros.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-linear-to-br from-blue-50 to-blue-100 rounded-3xl border-0 p-8">
                <CardContent className="p-0 text-center">
                  <div className="text-4xl font-bold text-blue-700 mb-2">500+</div>
                  <div className="text-xl text-blue-600 font-semibold">ONGs Parceiras Verificadas</div>
                  <p className="text-blue-600 mt-2">em todo o Brasil</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Logos das ONGs Parceiras</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card
                    key={i}
                    className="bg-white rounded-2xl border-0 shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-0 text-center">
                      <img src={onglogo} alt={`Logo ONG Parceira ${i}`} className="w-full h-16 object-contain" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Perguntas <span className="text-orange-500">Frequentes</span>
            </h2>
            <p className="text-xl text-gray-600">Tire suas dúvidas sobre a plataforma</p>
          </div>

          <div className="space-y-6">
            <Card className="bg-stone-50 rounded-2xl border-0 p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Como funciona o processo de adoção?</h3>
                <p className="text-gray-600 leading-relaxed">
                  O processo é simples e seguro: você se cadastra, navega pelos pets disponíveis, entra em contato com a
                  ONG responsável e segue o processo de adoção responsável com acompanhamento completo.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-stone-50 rounded-2xl border-0 p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold text-gray-900 mb-3">As ONGs são realmente verificadas?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Sim! Todas as ONGs passam por um rigoroso processo de verificação que inclui documentação, visitas
                  técnicas e acompanhamento contínuo para garantir a segurança e qualidade dos pets.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-stone-50 rounded-2xl border-0 p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Posso usar a plataforma apenas como rede social?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Claro! A plataforma funciona como uma rede social completa onde você pode criar perfis para seus pets,
                  compartilhar fotos, interagir com outros tutores e participar da comunidade pet.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-stone-50 rounded-2xl border-0 p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Há algum custo para usar a plataforma?</h3>
                <p className="text-gray-600 leading-relaxed">
                  A plataforma é gratuita para tutores e famílias interessadas em adoção. Para ONGs, oferecemos planos
                  acessíveis que ajudam a manter a qualidade e segurança do serviço.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-stone-50 rounded-2xl border-0 p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Como posso me tornar uma ONG parceira?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Entre em contato conosco através do email suporte.petsconnection.network@gmail.com. Nossa equipe irá
                  orientar sobre o processo de verificação e cadastro para ONGs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-stone-50 rounded-2xl border-0 p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Quando a plataforma estará disponível?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Estamos em fase de pré-lançamento! Cadastre-se em nossa newsletter para ser um dos primeiros a saber
                  quando a plataforma estiver disponível e receber acesso antecipado.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">Faça Parte Desta Comunidade</h2>
          <p className="text-xl text-orange-100 mb-12 leading-relaxed">
            Junte-se a milhares de tutores e ONGs que já fazem a diferença na vida dos pets
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/cadastro">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-full font-semibold"
              >
                Quero Participar
              </Button>
            </a>
            <a href="/">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 rounded-full border-white text-white hover:bg-white/10 bg-transparent"
              >
                Voltar ao Início
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SaibaMais
