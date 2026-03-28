import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { 
  X, MapPin, Phone, Star, MessageCircle, Clock, Briefcase, Plus, 
  Search, ArrowRight, Sparkles, Check, Upload, Heart, Shield
} from "lucide-react"
import Navbar, { type Notification } from "../components/Navbar"
import { Badge } from "../components/feed/BaseCard"
import logo from "@/assets/Logo_PCN.png"

// Types
interface ServiceData {
  id: number
  name: string
  type: "passeador" | "adestrador" | "banho_tosa" | "veterinario" | "pet_sitter" | "outro"
  description: string
  location: string
  city: string
  contact: string
  whatsapp?: string
  rating?: number
  reviewsCount?: number
  price?: string
  image?: string
  verified: boolean
  featured?: boolean
}

// Mock Notifications
const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "news",
    message: "Novo servico de passeador na sua regiao!",
    time: "Agora",
    read: false,
    avatar: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=100"
  },
  {
    id: 2,
    type: "like",
    message: "Seu servico recebeu uma avaliacao 5 estrelas!",
    time: "3h atras",
    read: true,
  },
]

// Mock Services Data - Bahia
const mockServices: ServiceData[] = [
  {
    id: 1,
    name: "Dog Walker Salvador",
    type: "passeador",
    description: "Passeios diarios com seu pet nas praias e parques de Salvador. Atendemos Barra, Ondina, Rio Vermelho e arredores. Fotos e videos durante o passeio! Grupos pequenos de no maximo 3 caes.",
    location: "Barra",
    city: "Salvador, BA",
    contact: "(71) 99999-1111",
    whatsapp: "5571999991111",
    rating: 4.9,
    reviewsCount: 127,
    price: "R$ 35/passeio",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400",
    verified: true,
    featured: true,
  },
  {
    id: 2,
    name: "Adestramento Positivo BA",
    type: "adestrador",
    description: "Adestramento com tecnicas de reforco positivo. Sessoes individuais ou em grupo. Atendimento a domicilio em toda Salvador. Instrutores certificados internacionalmente.",
    location: "Pituba",
    city: "Salvador, BA",
    contact: "(71) 98888-2222",
    whatsapp: "5571988882222",
    rating: 4.8,
    reviewsCount: 89,
    price: "R$ 120/sessao",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
    verified: true,
  },
  {
    id: 3,
    name: "Pet Beauty Salon Bahia",
    type: "banho_tosa",
    description: "Banho, tosa e hidratacao para seu pet. Produtos premium e ambiente climatizado. Buscamos e entregamos na sua casa! Especializados em racas pequenas e gatos.",
    location: "Caminho das Arvores",
    city: "Salvador, BA",
    contact: "(71) 97777-3333",
    whatsapp: "5571977773333",
    rating: 4.7,
    reviewsCount: 203,
    price: "A partir de R$ 60",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400",
    verified: false,
  },
  {
    id: 4,
    name: "Veterinaria 24h Animal Care",
    type: "veterinario",
    description: "Atendimento veterinario 24 horas. Emergencias, consultas, cirurgias e internacao. Equipe especializada e equipamentos modernos. UTI veterinaria disponivel.",
    location: "Itaigara",
    city: "Salvador, BA",
    contact: "(71) 3333-4444",
    whatsapp: "5571933334444",
    rating: 4.9,
    reviewsCount: 456,
    price: "Consulta R$ 150",
    image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=400",
    verified: true,
    featured: true,
  },
  {
    id: 5,
    name: "Pet Sitter de Confianca",
    type: "pet_sitter",
    description: "Cuidamos do seu pet enquanto voce viaja. Hospedagem em ambiente familiar com muito carinho e atencao. Piscina para caes e area verde!",
    location: "Vilas do Atlantico",
    city: "Lauro de Freitas, BA",
    contact: "(71) 96666-5555",
    whatsapp: "5571966665555",
    rating: 5.0,
    reviewsCount: 78,
    price: "R$ 80/dia",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400",
    verified: true,
  },
  {
    id: 6,
    name: "Passeador Rio Vermelho",
    type: "passeador",
    description: "Passeios com grupos pequenos de no maximo 3 caes. Atendimento personalizado e horarios flexiveis. Especializados em caes de grande porte.",
    location: "Rio Vermelho",
    city: "Salvador, BA",
    contact: "(71) 95555-6666",
    whatsapp: "5571955556666",
    rating: 4.6,
    reviewsCount: 52,
    price: "R$ 40/passeio",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400",
    verified: false,
  },
  {
    id: 7,
    name: "Clinica Vet Feira de Santana",
    type: "veterinario",
    description: "Clinica veterinaria completa em Feira de Santana. Consultas, exames, cirurgias e farmacia pet. Equipe experiente e atenciosa.",
    location: "Centro",
    city: "Feira de Santana, BA",
    contact: "(75) 3224-5678",
    whatsapp: "5575932245678",
    rating: 4.7,
    reviewsCount: 189,
    price: "Consulta R$ 100",
    image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=400",
    verified: true,
  },
  {
    id: 8,
    name: "Tosa e Banho Patinhas",
    type: "banho_tosa",
    description: "Servico de banho e tosa com muito carinho. Atendemos caes e gatos de todos os portes. Produtos hipoalergenicos disponiveis.",
    location: "Stella Maris",
    city: "Salvador, BA",
    contact: "(71) 98765-4321",
    whatsapp: "5571987654321",
    rating: 4.5,
    reviewsCount: 67,
    price: "A partir de R$ 50",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400",
    verified: false,
  },
]

const typeLabels: Record<ServiceData["type"], string> = {
  passeador: "Passeador",
  adestrador: "Adestrador",
  banho_tosa: "Banho e Tosa",
  veterinario: "Veterinario",
  pet_sitter: "Pet Sitter",
  outro: "Outro"
}

const typeColors: Record<ServiceData["type"], string> = {
  passeador: "bg-emerald-100 text-emerald-700",
  adestrador: "bg-blue-100 text-blue-700",
  banho_tosa: "bg-pink-100 text-pink-700",
  veterinario: "bg-red-100 text-red-700",
  pet_sitter: "bg-purple-100 text-purple-700",
  outro: "bg-gray-100 text-gray-700"
}

const typeIcons: Record<ServiceData["type"], string> = {
  passeador: "🚶",
  adestrador: "🎓",
  banho_tosa: "🛁",
  veterinario: "🏥",
  pet_sitter: "🏠",
  outro: "📦"
}

// Service Card Component
function ServiceCard({ service, onClick }: { service: ServiceData; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        {service.image && (
          <div className="relative w-full sm:w-48 h-48 sm:h-auto shrink-0">
            <img 
              src={service.image} 
              alt={service.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {service.featured && (
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Destaque
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${typeColors[service.type]}`}>
                {typeIcons[service.type]} {typeLabels[service.type]}
              </span>
              {service.verified && (
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Verificado
                </span>
              )}
            </div>
            
            {service.rating && (
              <div className="flex items-center gap-1 shrink-0">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-gray-900">{service.rating}</span>
                <span className="text-gray-400 text-sm">({service.reviewsCount})</span>
              </div>
            )}
          </div>

          <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-orange-600 transition-colors">
            {service.name}
          </h3>
          
          <p className="text-gray-500 text-sm mb-3 line-clamp-2">{service.description}</p>

          <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
            <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
            <span>{service.location}, {service.city}</span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {service.price && (
              <span className="font-bold text-orange-600">{service.price}</span>
            )}
            <span className="flex items-center gap-1 text-orange-500 text-sm font-semibold group-hover:gap-2 transition-all ml-auto">
              Ver detalhes
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Service Detail Modal
function ServiceDetailModal({ service, onClose }: { service: ServiceData; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="relative shrink-0">
          {service.image && (
            <div className="h-56 sm:h-64">
              <img 
                src={service.image} 
                alt={service.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white text-gray-700 rounded-full flex items-center justify-center transition-colors shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>
          
          {service.featured && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 bg-orange-500 text-white text-sm font-semibold rounded-full flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Destaque
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${typeColors[service.type]}`}>
              {typeIcons[service.type]} {typeLabels[service.type]}
            </span>
            {service.verified && (
              <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                Verificado
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{service.name}</h2>
          
          {/* Rating */}
          {service.rating && (
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(service.rating!) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-200'}`} 
                  />
                ))}
              </div>
              <span className="font-bold text-gray-900 text-lg">{service.rating}</span>
              <span className="text-gray-500">({service.reviewsCount} avaliacoes)</span>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-4 p-4 bg-linear-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <MapPin className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Localizacao</p>
                <p className="font-bold text-gray-900">{service.location}</p>
                <p className="text-sm text-gray-600">{service.city}</p>
              </div>
            </div>

            {service.price && (
              <div className="flex items-center gap-4 p-4 bg-linear-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Briefcase className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Preco</p>
                  <p className="font-bold text-orange-600 text-lg">{service.price}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">Sobre o servico</h3>
            <p className="text-gray-600 leading-relaxed">{service.description}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            {service.whatsapp && (
              <a
                href={`https://wa.me/${service.whatsapp}?text=Ola! Vi seu servico no Pets Connection Network e gostaria de mais informacoes.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-linear-to-r from-green-500 to-green-600 text-white rounded-2xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/25"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            )}
            {service.contact && (
              <a
                href={`tel:${service.contact}`}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25"
              >
                <Phone className="w-5 h-5" />
                Ligar
              </a>
            )}
            <button className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Create Service Modal
function CreateServiceModal({ onClose }: { onClose: () => void }) {
  const [image, setImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(URL.createObjectURL(file))
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Cadastrar Servico</h2>
            <p className="text-sm text-gray-500">Ofereca seus servicos para a comunidade pet</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Foto do Servico</label>
            {image ? (
              <div className="relative w-full h-48 rounded-2xl overflow-hidden">
                <img src={image} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => setImage(null)}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-48 rounded-2xl border-2 border-dashed border-gray-200 hover:border-orange-300 flex flex-col items-center justify-center gap-3 transition-colors"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6 text-orange-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-700">Clique para adicionar uma foto</p>
                  <p className="text-xs text-gray-400">PNG, JPG ate 5MB</p>
                </div>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nome do Servico</label>
            <input
              type="text"
              placeholder="Ex: Dog Walker Premium"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Type */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Servico</label>
            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all appearance-none">
              <option value="">Selecione o tipo</option>
              <option value="passeador">Passeador</option>
              <option value="adestrador">Adestrador</option>
              <option value="banho_tosa">Banho e Tosa</option>
              <option value="veterinario">Veterinario</option>
              <option value="pet_sitter">Pet Sitter</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Bairro</label>
              <input
                type="text"
                placeholder="Ex: Barra"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Cidade</label>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all appearance-none">
                <option value="">Selecione</option>
                <option value="salvador">Salvador, BA</option>
                <option value="feira">Feira de Santana, BA</option>
                <option value="vitoria">Vitoria da Conquista, BA</option>
                <option value="camacari">Camacari, BA</option>
                <option value="itabuna">Itabuna, BA</option>
                <option value="lauro">Lauro de Freitas, BA</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Descricao</label>
            <textarea
              rows={4}
              placeholder="Descreva seu servico, diferenciais, experiencia..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Preco</label>
            <input
              type="text"
              placeholder="Ex: R$ 50/sessao ou A partir de R$ 30"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
              <input
                type="tel"
                placeholder="(71) 99999-0000"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp</label>
              <input
                type="tel"
                placeholder="(71) 99999-0000"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button className="flex-1 px-6 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25">
              Cadastrar Servico
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  
  // Filters
  const [typeFilter, setTypeFilter] = useState("")
  const [locationFilter, setLocationFilter] = useState("")

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  // Filter services
  const filteredServices = mockServices.filter(service => {
    if (typeFilter && service.type !== typeFilter) return false
    if (locationFilter && !service.location.toLowerCase().includes(locationFilter.toLowerCase())) return false
    if (searchQuery && !service.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  // Get featured services
  const featuredServices = filteredServices.filter(s => s.featured)
  const regularServices = filteredServices.filter(s => !s.featured)

  // Service type stats
  const serviceStats = [
    { type: "passeador" as const, count: mockServices.filter(s => s.type === "passeador").length, icon: "🚶" },
    { type: "adestrador" as const, count: mockServices.filter(s => s.type === "adestrador").length, icon: "🎓" },
    { type: "banho_tosa" as const, count: mockServices.filter(s => s.type === "banho_tosa").length, icon: "🛁" },
    { type: "veterinario" as const, count: mockServices.filter(s => s.type === "veterinario").length, icon: "🏥" },
    { type: "pet_sitter" as const, count: mockServices.filter(s => s.type === "pet_sitter").length, icon: "🏠" },
  ]

  return (
    <div className="min-h-dvh bg-linear-to-b from-orange-50/50 to-white">
      <Navbar 
        logo={logo}
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
      />

      {/* Hero Section */}
      <div className="bg-linear-to-br from-orange-500 via-orange-400 to-amber-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-white/80" />
                <span className="text-white/80 text-sm font-medium">Bahia</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
                Servicos Pet
              </h1>
              <p className="text-white/90 text-lg max-w-xl">
                Encontre os melhores profissionais para cuidar do seu pet na sua regiao
              </p>
            </div>
            
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-orange-600 rounded-2xl font-semibold hover:bg-orange-50 transition-colors shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Cadastrar Servico
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar servicos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl text-gray-900 placeholder-gray-400 focus:ring-4 focus:ring-white/30 transition-all shadow-lg"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-4 bg-white rounded-2xl text-gray-700 font-medium focus:ring-4 focus:ring-white/30 transition-all shadow-lg appearance-none cursor-pointer min-w-[160px]"
              >
                <option value="">Todos servicos</option>
                <option value="passeador">Passeador</option>
                <option value="adestrador">Adestrador</option>
                <option value="banho_tosa">Banho e Tosa</option>
                <option value="veterinario">Veterinario</option>
                <option value="pet_sitter">Pet Sitter</option>
              </select>
              
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-4 py-4 bg-white rounded-2xl text-gray-700 font-medium focus:ring-4 focus:ring-white/30 transition-all shadow-lg appearance-none cursor-pointer min-w-[140px]"
              >
                <option value="">Todos bairros</option>
                <option value="Barra">Barra</option>
                <option value="Pituba">Pituba</option>
                <option value="Rio Vermelho">Rio Vermelho</option>
                <option value="Itaigara">Itaigara</option>
                <option value="Caminho das Arvores">Caminho das Arvores</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="mt-6 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {serviceStats.map((stat) => (
              <button
                key={stat.type}
                onClick={() => setTypeFilter(typeFilter === stat.type ? "" : stat.type)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium whitespace-nowrap transition-all ${
                  typeFilter === stat.type
                    ? "bg-white text-orange-600 shadow-lg"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                <span className="text-lg">{stat.icon}</span>
                <span>{typeLabels[stat.type]}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  typeFilter === stat.type ? "bg-orange-100 text-orange-600" : "bg-white/30 text-white"
                }`}>
                  {stat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            <span className="font-bold text-gray-900">{filteredServices.length}</span> servicos encontrados
          </p>
          
          {(typeFilter || locationFilter || searchQuery) && (
            <button
              onClick={() => {
                setTypeFilter("")
                setLocationFilter("")
                setSearchQuery("")
              }}
              className="text-orange-500 hover:text-orange-600 text-sm font-medium"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* Featured Services */}
        {featuredServices.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-500" />
              Servicos em Destaque
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredServices.map((service) => (
                <ServiceCard 
                  key={service.id}
                  service={service}
                  onClick={() => setSelectedService(service)}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Services */}
        <div>
          {featuredServices.length > 0 && regularServices.length > 0 && (
            <h2 className="text-xl font-bold text-gray-900 mb-4">Todos os Servicos</h2>
          )}
          <div className="space-y-4">
            {regularServices.map((service) => (
              <ServiceCard 
                key={service.id}
                service={service}
                onClick={() => setSelectedService(service)}
              />
            ))}
          </div>
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-10 h-10 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum servico encontrado</h3>
            <p className="text-gray-500 mb-6">Tente ajustar os filtros ou cadastre um novo servico</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-2xl font-semibold hover:bg-orange-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Cadastrar Servico
            </button>
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedService && (
        <ServiceDetailModal 
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}

      {showCreateModal && (
        <CreateServiceModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  )
}
