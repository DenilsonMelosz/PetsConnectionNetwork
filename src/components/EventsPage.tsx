import { useState, useRef } from "react"
// import { Link } from "react-router-dom"
import { 
  X, Calendar, Clock, MapPin, Users, ExternalLink, Phone, Share2, Plus, 
  Search,  ArrowRight, Sparkles, Upload
} from "lucide-react"
import Navbar, { type Notification } from "../components/Navbar"
// import { Badge } from "@/components/feed/BaseCard"
import { ImageCarousel } from "../components/feed/ImageCarousel"
import logo from "@/assets/Logo_PCN.png"

// Types
interface EventData {
  id: number
  title: string
  description: string
  images: string[]
  date: string
  time: string
  location: string
  city: string
  type: "adocao" | "veterinario" | "feira" | "workshop" | "outro"
  organizer: string
  attendees?: number
  contact?: string
  link?: string
}

// Mock Notifications
const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "news",
    message: "Novo evento de adocao na sua regiao!",
    time: "Agora",
    read: false,
    avatar: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=100"
  },
  {
    id: 2,
    type: "match",
    message: "Feira de adocao amanha - nao perca!",
    time: "2h atras",
    read: false,
  },
  {
    id: 3,
    type: "like",
    message: "Maria curtiu seu evento 'Mutirao de Castracao'",
    time: "5h atras",
    read: true,
  },
]

// Mock Events Data - Bahia
const mockEvents: EventData[] = [
  {
    id: 1,
    title: "Feira de Adocao - Parque da Cidade",
    description: "Grande feira de adocao com mais de 50 animais esperando um lar. Venha conhecer seu novo melhor amigo! Teremos veterinarios para orientacao, vacinacao gratuita e brindes para os adotantes. Evento pet friendly!",
    images: [
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800",
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800",
    ],
    date: "15/04/2024",
    time: "09:00 - 17:00",
    location: "Parque da Cidade",
    city: "Salvador, BA",
    type: "adocao",
    organizer: "ONG Patinhas Felizes",
    attendees: 234,
    contact: "(71) 99999-0001",
  },
  {
    id: 2,
    title: "Mutirao de Castracao Gratuita",
    description: "Castracao gratuita para caes e gatos. Vagas limitadas, faca sua inscricao antecipadamente pelo site. Necessario jejum de 8 horas. Traga cobertor para o pos-operatorio.",
    images: [
      "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800",
    ],
    date: "20/04/2024",
    time: "08:00 - 16:00",
    location: "Centro de Zoonoses",
    city: "Feira de Santana, BA",
    type: "veterinario",
    organizer: "Prefeitura de Feira de Santana",
    attendees: 156,
    link: "https://castracao.feiradesantana.ba.gov.br",
    contact: "(75) 3333-4444",
  },
  {
    id: 3,
    title: "Workshop de Adestramento Positivo",
    description: "Aprenda tecnicas de adestramento baseadas em reforco positivo. Traga seu pet! Instrutores certificados internacionalmente. Material e certificado inclusos.",
    images: [
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800",
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800",
    ],
    date: "25/04/2024",
    time: "14:00 - 18:00",
    location: "Pet Center Pituba",
    city: "Salvador, BA",
    type: "workshop",
    organizer: "Adestra Mais BA",
    attendees: 45,
    contact: "(71) 98888-7777",
  },
  {
    id: 4,
    title: "Feira Pet Solidaria",
    description: "Venda de produtos pet com renda revertida para ONGs de protecao animal da Bahia. Banho e tosa com precos promocionais. Comes e bebes para tutores!",
    images: [
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800",
    ],
    date: "28/04/2024",
    time: "10:00 - 18:00",
    location: "Shopping Barra",
    city: "Salvador, BA",
    type: "feira",
    organizer: "Associacao Pet Lovers BA",
    attendees: 89,
  },
  {
    id: 5,
    title: "Dia de Vacinacao Antirabica",
    description: "Campanha de vacinacao antirabica gratuita para caes e gatos em todo o estado. Traga a carteira de vacinacao do seu pet. Veterinarios disponiveis para orientacao.",
    images: [
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800",
    ],
    date: "05/05/2024",
    time: "08:00 - 14:00",
    location: "UBS Barra",
    city: "Salvador, BA",
    type: "veterinario",
    organizer: "Secretaria de Saude BA",
    attendees: 320,
  },
  {
    id: 6,
    title: "Encontro de Caes na Praia",
    description: "Passeio coletivo com caes na praia de Stella Maris. Traga agua, saquinhos e guia. Atividades recreativas e socializacao entre os pets!",
    images: [
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800",
    ],
    date: "10/05/2024",
    time: "06:00 - 09:00",
    location: "Praia de Stella Maris",
    city: "Salvador, BA",
    type: "outro",
    organizer: "Grupo Dog Beach SSA",
    attendees: 67,
    contact: "(71) 99999-8888",
  },
  {
    id: 7,
    title: "Encontro de Caes na Praia",
    description: "Passeio coletivo com caes na praia de Stella Maris. Traga agua, saquinhos e guia. Atividades recreativas e socializacao entre os pets!",
    images: [
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800",
    ],
    date: "10/05/2024",
    time: "06:00 - 09:00",
    location: "Praia de Stella Maris",
    city: "Salvador, BA",
    type: "outro",
    organizer: "Grupo Dog Beach SSA",
    attendees: 67,
    contact: "(71) 99999-8888",
  },
]

const typeLabels: Record<EventData["type"], string> = {
  adocao: "Adocao",
  veterinario: "Veterinario",
  feira: "Feira",
  workshop: "Workshop",
  outro: "Outro"
}

const typeColors: Record<EventData["type"], string> = {
  adocao: "bg-emerald-100 text-emerald-700",
  veterinario: "bg-blue-100 text-blue-700",
  feira: "bg-amber-100 text-amber-700",
  workshop: "bg-purple-100 text-purple-700",
  outro: "bg-gray-100 text-gray-700"
}

// Event Card Component
function EventCard({ event, onClick }: { event: EventData; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.images[0]} 
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${typeColors[event.type]}`}>
            {typeLabels[event.type]}
          </span>
        </div>
        
        {/* Date Badge */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">{event.date}</span>
        </div>

        {/* Attendees */}
        {event.attendees && (
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full">
            <Users className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-xs font-semibold text-gray-900">{event.attendees}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {event.title}
        </h3>
        
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
          <span className="truncate">{event.location}, {event.city}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <Clock className="w-4 h-4 text-orange-400 shrink-0" />
          <span>{event.time}</span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-400">Por {event.organizer}</span>
          <span className="flex items-center gap-1 text-orange-500 text-sm font-semibold group-hover:gap-2 transition-all">
            Ver detalhes
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  )
}

// Event Detail Modal
function EventDetailModal({ event, onClose }: { event: EventData; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl">
        {/* Header Image with Carousel */}
        <div className="relative h-64 sm:h-80 shrink-0">
          {event.images.length > 1 ? (
            <ImageCarousel images={event.images} alt={event.title} />
          ) : (
            <img 
              src={event.images[0]} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white text-gray-700 rounded-full flex items-center justify-center transition-colors shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="absolute bottom-4 left-4">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${typeColors[event.type]}`}>
              {typeLabels[event.type]}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{event.title}</h2>
          <p className="text-gray-500 mb-6">Organizado por <span className="text-orange-600 font-medium">{event.organizer}</span></p>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center gap-4 p-4 bg-linear-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <Calendar className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Data</p>
                <p className="font-bold text-gray-900">{event.date}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-linear-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Horario</p>
                <p className="font-bold text-gray-900">{event.time}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-linear-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100 sm:col-span-1">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                <Users className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Interessados</p>
                <p className="font-bold text-gray-900">{event.attendees || 0} pessoas</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Localizacao</p>
              <p className="font-bold text-gray-900">{event.location}</p>
              <p className="text-gray-600">{event.city}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">Sobre o evento</h3>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            {event.contact && (
              <a
                href={`tel:${event.contact}`}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25"
              >
                <Phone className="w-5 h-5" />
                Ligar: {event.contact}
              </a>
            )}
            {event.link && (
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                Site do evento
              </a>
            )}
            <button className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Create Event Modal
function CreateEventModal({ onClose }: { onClose: () => void }) {
  const [images, setImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setImages(prev => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Criar Evento</h2>
            <p className="text-sm text-gray-500">Compartilhe um evento com a comunidade</p>
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fotos do Evento</label>
            <div className="grid grid-cols-3 gap-3">
              {images.map((img, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-orange-300 flex flex-col items-center justify-center gap-2 transition-colors"
                >
                  <Upload className="w-6 h-6 text-gray-400" />
                  <span className="text-xs text-gray-500">Adicionar</span>
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Titulo do Evento</label>
            <input
              type="text"
              placeholder="Ex: Feira de Adocao no Parque"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
            />
          </div>

          {/* Type */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Evento</label>
            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all appearance-none">
              <option value="">Selecione o tipo</option>
              <option value="adocao">Adocao</option>
              <option value="veterinario">Veterinario</option>
              <option value="feira">Feira</option>
              <option value="workshop">Workshop</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Data</label>
              <input
                type="date"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Horario</label>
              <input
                type="text"
                placeholder="09:00 - 17:00"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Local</label>
              <input
                type="text"
                placeholder="Ex: Parque da Cidade"
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
              placeholder="Descreva o evento, o que os participantes podem esperar..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone para contato</label>
              <input
                type="tel"
                placeholder="(71) 99999-0000"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Link externo (opcional)</label>
              <input
                type="url"
                placeholder="https://..."
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
              Publicar Evento
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EventsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  
  // Filters
  const [cityFilter, setCityFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  // Filter events
  const filteredEvents = mockEvents.filter(event => {
    if (typeFilter && event.type !== typeFilter) return false
    if (cityFilter && !event.city.toLowerCase().includes(cityFilter.toLowerCase())) return false
    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

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
                Eventos Pet
              </h1>
              <p className="text-white/90 text-lg max-w-xl">
                Descubra feiras de adocao, campanhas de vacinacao e muito mais na sua regiao
              </p>
            </div>
            
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-orange-600 rounded-2xl font-semibold hover:bg-orange-50 transition-colors shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Criar Evento
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar eventos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl text-gray-900 placeholder-gray-400 focus:ring-4 focus:ring-white/30 transition-all shadow-lg"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="px-4 py-4 bg-white rounded-2xl text-gray-700 font-medium focus:ring-4 focus:ring-white/30 transition-all shadow-lg appearance-none cursor-pointer min-w-[140px]"
              >
                <option value="">Todas cidades</option>
                <option value="Salvador">Salvador</option>
                <option value="Feira de Santana">Feira de Santana</option>
                <option value="Vitoria da Conquista">Vitoria da Conquista</option>
                <option value="Camacari">Camacari</option>
              </select>
              
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-4 bg-white rounded-2xl text-gray-700 font-medium focus:ring-4 focus:ring-white/30 transition-all shadow-lg appearance-none cursor-pointer min-w-[140px]"
              >
                <option value="">Todos tipos</option>
                <option value="adocao">Adocao</option>
                <option value="veterinario">Veterinario</option>
                <option value="feira">Feira</option>
                <option value="workshop">Workshop</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            <span className="font-bold text-gray-900">{filteredEvents.length}</span> eventos encontrados
          </p>
          
          {(cityFilter || typeFilter || searchQuery) && (
            <button
              onClick={() => {
                setCityFilter("")
                setTypeFilter("")
                setSearchQuery("")
              }}
              className="text-orange-500 hover:text-orange-600 text-sm font-medium"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* Featured Event */}
        {filteredEvents.length > 0 && (
          <div 
            onClick={() => setSelectedEvent(filteredEvents[0])}
            className="relative mb-8 rounded-3xl overflow-hidden cursor-pointer group"
          >
            <div className="aspect-[21/9] sm:aspect-[3/1]">
              <img 
                src={filteredEvents[0].images[0]} 
                alt={filteredEvents[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${typeColors[filteredEvents[0].type]}`}>
                  {typeLabels[filteredEvents[0].type]}
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-orange-500 text-white flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Destaque
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{filteredEvents[0].title}</h2>
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {filteredEvents[0].date}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {filteredEvents[0].city}
                </span>
                {filteredEvents[0].attendees && (
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    {filteredEvents[0].attendees} interessados
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.slice(1).map((event) => (
            <EventCard 
              key={event.id}
              event={event}
              onClick={() => setSelectedEvent(event)}
            />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum evento encontrado</h3>
            <p className="text-gray-500 mb-6">Tente ajustar os filtros ou crie um novo evento</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-2xl font-semibold hover:bg-orange-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Criar Evento
            </button>
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedEvent && (
        <EventDetailModal 
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {showCreateModal && (
        <CreateEventModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  )
}
