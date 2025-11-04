import { Card, CardContent, CardHeader } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { ArrowLeft, Heart, Shield } from "lucide-react"
import { Link } from "react-router-dom"

export default function PoliticasPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-pink-100 via-purple-50 to-cyan-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="text-pink-600 hover:text-pink-700 hover:bg-pink-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Login
            </Button>
          </Link>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <Heart className="w-10 h-10 text-pink-500 fill-pink-500" />
                <Shield className="w-5 h-5 text-cyan-500 absolute -top-1 -right-1" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-pink-600">Política de Privacidade</h1>
            <p className="text-gray-600 text-sm">Pets Connection Network</p>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">1. Informações que Coletamos</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium text-gray-800">Informações Pessoais:</h3>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Nome, email e informações de contato</li>
                      <li>Fotos de perfil e informações sobre seus pets</li>
                      <li>Conteúdo que você compartilha na plataforma</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Informações Técnicas:</h3>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Endereço IP e informações do dispositivo</li>
                      <li>Dados de navegação e uso da plataforma</li>
                      <li>Cookies e tecnologias similares</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">2. Como Usamos suas Informações</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Fornecer e melhorar nossos serviços</li>
                  <li>Personalizar sua experiência na plataforma</li>
                  <li>Comunicar atualizações e novidades</li>
                  <li>Garantir a segurança da plataforma</li>
                  <li>Cumprir obrigações legais</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">3. Compartilhamento de Dados</h2>
                <p>
                  Não vendemos suas informações pessoais. Podemos compartilhar dados apenas nas seguintes situações:
                </p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Com seu consentimento explícito</li>
                  <li>Para cumprir obrigações legais</li>
                  <li>Com prestadores de serviços confiáveis</li>
                  <li>Para proteger direitos e segurança</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">4. Segurança dos Dados</h2>
                <p>
                  Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra
                  acesso não autorizado, alteração, divulgação ou destruição. Isso inclui criptografia, controles de
                  acesso e monitoramento regular.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">5. Seus Direitos</h2>
                <p>Você tem o direito de:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li>Acessar suas informações pessoais</li>
                  <li>Corrigir dados incorretos ou incompletos</li>
                  <li>Solicitar a exclusão de seus dados</li>
                  <li>Portabilidade dos dados</li>
                  <li>Retirar o consentimento a qualquer momento</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">6. Cookies e Tecnologias Similares</h2>
                <p>
                  Usamos cookies para melhorar sua experiência, analisar o uso da plataforma e personalizar conteúdo.
                  Você pode gerenciar suas preferências de cookies nas configurações do seu navegador.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">7. Retenção de Dados</h2>
                <p>
                  Mantemos suas informações apenas pelo tempo necessário para cumprir os propósitos descritos nesta
                  política ou conforme exigido por lei. Dados inativos são excluídos periodicamente.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">8. Contato</h2>
                <p>Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:</p>
                <div className="mt-3 p-4 bg-pink-50 rounded-lg">
                  <p>
                    <strong>Email:</strong> <span className="text-pink-600">privacidade@petsconnection.com</span>
                  </p>
                  <p>
                    <strong>Encarregado de Dados:</strong> <span className="text-pink-600">dpo@petsconnection.com</span>
                  </p>
                </div>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-500">Última atualização: Janeiro de 2025</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
