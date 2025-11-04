import { Card, CardContent, CardHeader } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { ArrowLeft, Heart } from "lucide-react"
import { Link } from "react-router-dom"

export default function TermosPage() {
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
              <Heart className="w-10 h-10 text-pink-500 fill-pink-500" />
            </div>
            <h1 className="text-2xl font-bold text-pink-600">Termos de Uso</h1>
            <p className="text-gray-600 text-sm">Pets Connection Network</p>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">1. Aceitação dos Termos</h2>
                <p>
                  Ao acessar e usar o Pets Connection, você concorda em cumprir e estar vinculado a estes Termos de Uso.
                  Se você não concordar com qualquer parte destes termos, não deve usar nosso serviço.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">2. Descrição do Serviço</h2>
                <p>
                  O Pets Connection é uma rede social dedicada a conectar donos de pets, compartilhar experiências,
                  fotos e informações sobre cuidados com animais de estimação. Nosso objetivo é criar uma comunidade
                  segura e acolhedora para todos os amantes de pets.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">3. Responsabilidades do Usuário</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Fornecer informações verdadeiras e atualizadas durante o cadastro</li>
                  <li>Manter a confidencialidade de sua senha e conta</li>
                  <li>Não compartilhar conteúdo ofensivo, ilegal ou inadequado</li>
                  <li>Respeitar outros usuários e seus pets</li>
                  <li>Não usar o serviço para fins comerciais sem autorização</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">4. Conteúdo do Usuário</h2>
                <p>
                  Você mantém os direitos sobre o conteúdo que publica, mas concede ao Pets Connection uma licença para
                  usar, exibir e distribuir esse conteúdo na plataforma. Você é responsável por todo o conteúdo que
                  compartilha.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">5. Privacidade e Dados</h2>
                <p>
                  Respeitamos sua privacidade e protegemos seus dados pessoais conforme descrito em nossa Política de
                  Privacidade. Coletamos apenas as informações necessárias para fornecer nossos serviços.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">6. Modificações dos Termos</h2>
                <p>
                  Reservamos o direito de modificar estes termos a qualquer momento. As alterações serão comunicadas
                  através da plataforma e entrarão em vigor imediatamente após a publicação.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">7. Contato</h2>
                <p>
                  Para dúvidas sobre estes termos, entre em contato conosco através do email:
                  <span className="text-pink-600 font-medium"> suporte@petsconnection.com</span>
                </p>
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
