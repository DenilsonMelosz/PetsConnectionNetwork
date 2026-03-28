import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  MapPin,
  Filter,
  Heart,
  MessageCircle,
  Plus,
  User,
  Search,
  ChevronDown,
  X,
  Bell,
  Camera,
  Phone,
  AlertCircle,
  CheckCircle,
  Home,
  Navigation,
  Calendar,
  Send,
  Dog,
  Cat,
  Palette,
  Tag,
  Grid3X3,
  LayoutGrid,
  Share2,
  Download,
  Clock,
  PawPrint,
  Wrench,
  Menu,
  LogOut,
  HelpCircle,
  Settings,
} from "lucide-react"

// --- Tipos ---
type PostType = "perdido" | "encontrado" | "adocao"
type PostStatus = "aberto" | "devolvido" | "adotado"
type AnimalSex = "macho" | "femea"
type AnimalSize = "pequeno" | "medio" | "grande"
type AnimalSpecies = "cachorro" | "gato" | "outro"

interface Comment {
  id: number
  author: { name: string; avatar: string }
  message: string
  date: string
}

interface Post {
  id: number
  type: PostType
  status: PostStatus
  image: string
  title: string
  description: string
  location: string
  foundLocation?: string
  foundDate?: string
  likes: number
  comments: number
  isLiked: boolean
  createdAt: string
  updatedAt?: string
  author: { name: string; avatar: string; phone?: string }
  animal: {
    species: AnimalSpecies
    sex: AnimalSex
    size: AnimalSize
    breed: string
    color?: string
    hasCollar?: boolean
    name?: string
  }
  commentsList: Comment[]
}

export interface Notification {
  id: number
  type: "like" | "comment" | "match" | "news"
  message: string
  time: string
  read: boolean
  avatar?: string
}

interface UserProfile {
  isLoggedIn: boolean
  name: string
  avatar: string
  email: string
}

// --- Dados mockados ---
const mockUser: UserProfile = {
  isLoggedIn: true,
  name: "Maria Silva",
  avatar: "https://i.pravatar.cc/40?img=1",
  email: "maria@email.com"
}

const mockPosts: Post[] = [
  {
    id: 1,
    type: "perdido",
    status: "aberto",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
    title: "Rex - Golden Retriever",
    description: "Encontrado na rua na regiao do Centro. Usa coleira azul com plaquinha. Muito docil, parece ter dono. Por favor, ajude a localizar a familia.",
    location: "Salvador, BA",
    foundLocation: "Praca da Se, Centro, Salvador",
    foundDate: "25/03/2026",
    likes: 24,
    comments: 8,
    isLiked: false,
    createdAt: "2h atras",
    updatedAt: "17 horas atras",
    author: { name: "Maria Silva", avatar: "https://i.pravatar.cc/40?img=1", phone: "(71) 99999-1111" },
    animal: {
      species: "cachorro",
      sex: "macho",
      size: "grande",
      breed: "Golden Retriever",
      color: "Dourado",
      hasCollar: true,
      name: "Rex"
    },
    commentsList: [
      { id: 1, author: { name: "Joao Santos", avatar: "https://i.pravatar.cc/40?img=3" }, message: "Vi um cachorro parecido ontem na Praca da Se!", date: "1h atras" },
      { id: 2, author: { name: "Ana Costa", avatar: "https://i.pravatar.cc/40?img=5" }, message: "Vou compartilhar com os vizinhos!", date: "30min atras" },
    ]
  },
  {
    id: 2,
    type: "adocao",
    status: "aberto",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400",
    title: "Xana - Gata Siames",
    description: "Filhote de 3 meses resgatada da rua, vacinada e vermifugada. Esta disponivel para adocao responsavel. Muito carinhosa e brincalhona.",
    location: "Pituba, Salvador - BA",
    foundLocation: "Abrigo Amor Animal, Pituba",
    foundDate: "20/03/2026",
    likes: 56,
    comments: 12,
    isLiked: true,
    createdAt: "5h atras",
    updatedAt: "2 horas atras",
    author: { name: "ONG Patinhas", avatar: "https://i.pravatar.cc/40?img=2" },
    animal: {
      species: "gato",
      sex: "femea",
      size: "pequeno",
      breed: "Siames",
      color: "Creme com pontas escuras",
      hasCollar: false,
      name: "Luna"
    },
    commentsList: [
      { id: 1, author: { name: "Pedro Lima", avatar: "https://i.pravatar.cc/40?img=7" }, message: "Que linda! Tenho interesse em adotar.", date: "4h atras" },
      { id: 2, author: { name: "Carla Reis", avatar: "https://i.pravatar.cc/40?img=8" }, message: "Ela e castrada?", date: "3h atras" },
      { id: 3, author: { name: "ONG Patinhas", avatar: "https://i.pravatar.cc/40?img=2" }, message: "@Carla Reis Sim, ja esta castrada!", date: "2h atras" },
    ]
  },
  {
    id: 3,
    type: "perdido",
    status: "aberto",
    image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400",
    title: "Cachorro sem identificacao",
    description: "Encontrado proximo a praca, sem coleira. Parece bem cuidado e sociavel, provavelmente tem dono que esta procurando. Sendo cuidado temporariamente. Tem uma mancha branca no peito.",
    location: "Barra, Salvador - BA",
    foundLocation: "Praca Nossa Senhora da Luz, Barra",
    foundDate: "24/03/2026",
    likes: 18,
    comments: 5,
    isLiked: false,
    createdAt: "1d atras",
    updatedAt: "5 horas atras",
    author: { name: "Joao Santos", avatar: "https://i.pravatar.cc/40?img=3", phone: "(71) 98888-2222" },
    animal: {
      species: "cachorro",
      sex: "macho",
      size: "medio",
      breed: "Vira-lata",
      color: "Caramelo com mancha branca",
      hasCollar: false
    },
    commentsList: [
      { id: 1, author: { name: "Fernanda Souza", avatar: "https://i.pravatar.cc/40?img=9" }, message: "Moro na Barra, vou ficar atenta!", date: "20h atras" },
    ]
  },
  {
    id: 4,
    type: "adocao",
    status: "aberto",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400",
    title: "Duo - Labrador e Beagle",
    description: "Dois amiguinhos inseparaveis resgatados de abrigo, buscam um lar juntos. Castrados, vacinados e prontos para uma familia amorosa. Sao muito companheiros e brincalhoes.",
    location: "Ondina, Salvador - BA",
    foundLocation: "Abrigo Municipal, Ondina",
    foundDate: "18/03/2026",
    likes: 89,
    comments: 23,
    isLiked: true,
    createdAt: "2d atras",
    updatedAt: "1 dia atras",
    author: { name: "ONG Amor Animal", avatar: "https://i.pravatar.cc/40?img=4" },
    animal: {
      species: "cachorro",
      sex: "macho",
      size: "medio",
      breed: "Labrador / Beagle",
      color: "Caramelo e Tricolor"
    },
    commentsList: [
      { id: 1, author: { name: "Ricardo Alves", avatar: "https://i.pravatar.cc/40?img=10" }, message: "Que dupla linda! Voces entregam em Feira de Santana?", date: "1d atras" },
    ]
  },
  {
    id: 5,
    type: "perdido",
    status: "devolvido",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400",
    title: "Thor - Bulldog Frances",
    description: "RESOLVIDO! Thor foi devolvido ao seu dono. Obrigado a toda a comunidade que compartilhou e ajudou nessa busca incrivel. Ele estava apenas a 2 quarteiroes de casa!",
    location: "Rio Vermelho, Salvador - BA",
    foundLocation: "Largo da Mariquita, Rio Vermelho",
    foundDate: "22/03/2026",
    likes: 145,
    comments: 34,
    isLiked: true,
    createdAt: "3d atras",
    updatedAt: "3 dias atras",
    author: { name: "Ana Costa", avatar: "https://i.pravatar.cc/40?img=5" },
    animal: {
      species: "cachorro",
      sex: "macho",
      size: "pequeno",
      breed: "Bulldog Frances",
      color: "Tigrado",
      hasCollar: true,
      name: "Thor"
    },
    commentsList: [
      { id: 1, author: { name: "Marcos Silva", avatar: "https://i.pravatar.cc/40?img=11" }, message: "Que otima noticia! Fico feliz que encontraram!", date: "3d atras" },
    ]
  },
  {
    id: 6,
    type: "adocao",
    status: "adotado",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400",
    title: "Mia - Gata Persa",
    description: "ADOTADA! A Mia encontrou seu lar definitivo. Agradecemos a todos que se interessaram e a familia que a acolheu com tanto amor. Ela esta muito feliz!",
    location: "Graca, Salvador - BA",
    foundLocation: "Residencia particular, Graca",
    foundDate: "15/03/2026",
    likes: 32,
    comments: 7,
    isLiked: false,
    createdAt: "4d atras",
    updatedAt: "4 dias atras",
    author: { name: "Carlos Mendes", avatar: "https://i.pravatar.cc/40?img=6" },
    animal: {
      species: "gato",
      sex: "femea",
      size: "pequeno",
      breed: "Persa",
      color: "Branco",
      name: "Mia"
    },
    commentsList: [
      { id: 1, author: { name: "Juliana Rocha", avatar: "https://i.pravatar.cc/40?img=12" }, message: "Parabens pela adocao! Mia merece muito amor!", date: "4d atras" },
    ]
  }
]

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "match",
    message: "Possivel correspondencia encontrada! O Rex (perdido no Centro) pode ser o cachorro que voce reportou.",
    time: "5min atras",
    read: false,
    avatar: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=40"
  },
  {
    id: 2,
    type: "like",
    message: "ONG Patinhas e mais 12 pessoas curtiram sua publicacao sobre a Luna.",
    time: "1h atras",
    read: false,
    avatar: "https://i.pravatar.cc/40?img=2"
  },
  {
    id: 3,
    type: "comment",
    message: "Joao Santos comentou: 'Esse e meu bairro! Vou ficar de olho e entro em contato caso veja.'",
    time: "2h atras",
    read: false,
    avatar: "https://i.pravatar.cc/40?img=3"
  },
  {
    id: 4,
    type: "news",
    message: "Novo pet disponivel para adocao proximo a voce em Barra.",
    time: "3h atras",
    read: true,
    avatar: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=40"
  },
  {
    id: 5,
    type: "match",
    message: "Alerta: cachorro parecido com o Thor foi avistado no Rio Vermelho. Verifique a publicacao.",
    time: "5h atras",
    read: true,
    avatar: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=40"
  },
  {
    id: 6,
    type: "comment",
    message: "Ana Costa comentou na publicacao que voce seguiu: 'Thor foi encontrado! Obrigada a todos!'",
    time: "3d atras",
    read: true,
    avatar: "https://i.pravatar.cc/40?img=5"
  }
]

// --- Filtros de categoria estilo Petz (imagens circulares) ---
const petCategoryFilters = [
  {
    id: "todos",
    label: "Todos",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=100&h=100&fit=crop",
    borderColor: "border-orange-400"
  },
  {
    id: "cachorro",
    label: "Cachorros",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100&h=100&fit=crop",
    borderColor: "border-amber-400"
  },
  {
    id: "gato",
    label: "Gatos",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&h=100&fit=crop",
    borderColor: "border-gray-400"
  },
  {
    id: "passaro",
    label: "Passaros",
    image: "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f?w=100&h=100&fit=crop",
    borderColor: "border-green-400"
  },
  {
    id: "outro",
    label: "Outros pets",
    image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=100&h=100&fit=crop",
    borderColor: "border-blue-400"
  },
]

// --- Componente de Notificacoes ---
function NotificationsPanel({
  notifications,
  onMarkAllRead,
  onClose,
  isMobile,
}: {
  notifications: Notification[]
  onMarkAllRead: () => void
  onClose: () => void
  isMobile: boolean
}) {
  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "match":
        return <span className="text-orange-500">!</span>
      case "like":
        return <span className="text-red-500">&#9829;</span>
      case "comment":
        return <span className="text-blue-500">&#128172;</span>
      case "news":
        return <span className="text-green-500">&#9733;</span>
    }
  }

  // Mobile: usar portal/modal fullscreen
  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-white z-9999 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-linear-to-r from-orange-50 to-amber-50">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-orange-500" />
            <h3 className="font-semibold text-gray-900">Notificacoes</h3>
            {unreadCount > 0 && (
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllRead}
                className="text-xs text-orange-500 hover:text-orange-600 font-medium"
              >
                Marcar todas como lidas
              </button>
            )}
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Lista de notificacoes */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Nenhuma notificacao</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    !notification.read ? "bg-orange-50/50" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="relative shrink-0">
                      {notification.avatar ? (
                        <img
                          src={notification.avatar}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <Bell className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center text-xs">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm leading-relaxed ${
                          !notification.read ? "text-gray-900 font-medium" : "text-gray-600"
                        }`}
                      >
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-100 bg-gray-50">
          <button className="w-full text-center text-sm text-orange-500 hover:text-orange-600 font-medium py-2">
            Ver todas as notificacoes
          </button>
        </div>
      </div>
    )
  }

  // Desktop: dropdown normal
  return (
    <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-linear-to-r from-orange-50 to-amber-50">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-orange-500" />
          <h3 className="font-semibold text-gray-900">Notificacoes</h3>
          {unreadCount > 0 && (
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={onMarkAllRead}
            className="text-xs text-orange-500 hover:text-orange-600 font-medium"
          >
            Marcar todas como lidas
          </button>
        )}
      </div>

      {/* Lista de notificacoes */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Nenhuma notificacao</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                  !notification.read ? "bg-orange-50/50" : ""
                }`}
              >
                <div className="flex gap-3">
                  <div className="relative shrink-0">
                    {notification.avatar ? (
                      <img
                        src={notification.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center text-xs">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm leading-relaxed ${
                        !notification.read ? "text-gray-900 font-medium" : "text-gray-600"
                      }`}
                    >
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100 bg-gray-50">
        <button className="w-full text-center text-sm text-orange-500 hover:text-orange-600 font-medium py-2">
          Ver todas as notificacoes
        </button>
      </div>
    </div>
  )
}

// --- Dropdown de Perfil ---
function ProfileDropdown({ user, onClose }: { user: UserProfile; onClose: () => void }) {
  return (
    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
      {/* Header com info do usuario */}
      <div className="p-4 bg-linear-to-r from-orange-50 to-amber-50 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-200"
          />
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="py-2">
        <Link
          to="/perfil"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
        >
          <User className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-700 font-medium">Meu Perfil</span>
        </Link>
        <Link
          to="/configuracoes"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
        >
          <Settings className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-700 font-medium">Configuracoes</span>
        </Link>
        <Link
          to="/ajuda"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
        >
          <HelpCircle className="w-5 h-5 text-gray-500" />
          <span className="text-sm text-gray-700 font-medium">Ajuda</span>
        </Link>
      </div>

      {/* Sair */}
      <div className="border-t border-gray-100">
        <button className="flex items-center gap-3 px-4 py-3 w-full hover:bg-red-50 transition-colors">
          <LogOut className="w-5 h-5 text-red-500" />
          <span className="text-sm text-red-600 font-medium">Sair</span>
        </button>
      </div>
    </div>
  )
}

// --- Navbar Principal com hover emoji ---
interface NavbarProps {
  notifications?: Notification[]
  onMarkAllRead?: () => void
  user?: UserProfile
}

function Navbar({ notifications = [], onMarkAllRead, user = mockUser }: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  const notificationRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  const unreadCount = notifications.filter((n) => !n.read).length

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Detectar mobile
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleMarkAllRead = () => {
    onMarkAllRead?.()
  }

  const navLinks = [
    { to: "/feed", label: "Pets", icon: <PawPrint className="w-4 h-4" />, emoji: "🐾" },
    { to: "/eventos", label: "Eventos", icon: <Calendar className="w-4 h-4" />, emoji: "📅" },
    { to: "/servicos", label: "Servicos", icon: <Wrench className="w-4 h-4" />, emoji: "🔧" },
  ]

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/" || location.pathname === "/feed"
    return location.pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-200">
                <PawPrint className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-gray-900 text-lg">Pet</span>
                <span className="font-bold text-orange-500 text-lg">Connect</span>
              </div>
            </div>
          </Link>

          {/* Navegacao Desktop com hover emoji estilo Petz */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onMouseEnter={() => setHoveredNav(link.to)}
                onMouseLeave={() => setHoveredNav(null)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive(link.to)
                    ? "bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-200"
                    : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                <span className="transition-transform duration-300" style={{
                  transform: hoveredNav === link.to && !isActive(link.to) ? 'scale(1.2)' : 'scale(1)'
                }}>
                  {hoveredNav === link.to && !isActive(link.to) ? (
                    <span className="text-base">{link.emoji}</span>
                  ) : (
                    link.icon
                  )}
                </span>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Barra de busca Desktop */}
          <div className="hidden lg:flex flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar pets..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:bg-white focus:border-orange-300 transition-all"
              />
            </div>
          </div>

          {/* Acoes */}
          <div className="flex items-center gap-2">
            {/* Busca Mobile */}
            <button className="lg:hidden p-2 hover:bg-orange-50 rounded-full transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            {/* Notificacoes */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-orange-50 rounded-full transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-linear-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <NotificationsPanel
                  notifications={notifications}
                  onMarkAllRead={handleMarkAllRead}
                  onClose={() => setShowNotifications(false)}
                  isMobile={isMobile}
                />
              )}
            </div>

            {/* Perfil - Foto quando logado, icone quando nao logado */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="p-1.5 hover:bg-orange-50 rounded-full transition-colors"
              >
                {user.isLoggedIn ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-200"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                )}
              </button>

              {showProfileDropdown && user.isLoggedIn && (
                <ProfileDropdown user={user} onClose={() => setShowProfileDropdown(false)} />
              )}
            </div>

            {/* Menu Mobile */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 hover:bg-orange-50 rounded-full transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {showMobileMenu && (
          <nav className="md:hidden py-3 border-t border-gray-100">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setShowMobileMenu(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? "bg-linear-to-r from-orange-500 to-amber-500 text-white"
                      : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                  }`}
                >
                  <span className="text-lg">{link.emoji}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

// --- Badge de Tipo ---
function TypeBadge({ type, status }: { type: PostType; status: PostStatus }) {
  const typeConfig: Record<PostType, { label: string; cls: string; icon: React.ReactNode }> = {
    perdido: {
      label: "Perdido",
      cls: "bg-linear-to-r from-red-500 to-rose-500 text-white",
      icon: <AlertCircle className="w-3.5 h-3.5" />
    },
    encontrado: {
      label: "Encontrado",
      cls: "bg-linear-to-r from-blue-500 to-cyan-500 text-white",
      icon: <CheckCircle className="w-3.5 h-3.5" />
    },
    adocao: {
      label: "Adocao",
      cls: "bg-linear-to-r from-green-500 to-emerald-500 text-white",
      icon: <Home className="w-3.5 h-3.5" />
    }
  }

  const statusConfig: Record<PostStatus, { label: string; cls: string } | null> = {
    aberto: null,
    devolvido: { label: "Devolvido", cls: "bg-linear-to-r from-emerald-500 to-teal-500 text-white" },
    adotado: { label: "Adotado", cls: "bg-linear-to-r from-purple-500 to-pink-500 text-white" }
  }

  const tc = typeConfig[type]
  const sc = statusConfig[status]

  return (
    <div className="flex flex-wrap gap-1.5">
      <span className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full shadow-sm ${tc.cls}`}>
        {tc.icon} {tc.label}
      </span>
      {sc && (
        <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm ${sc.cls}`}>
          {sc.label}
        </span>
      )}
    </div>
  )
}

// --- Badges de identificacao do animal ---
function AnimalBadges({ animal, compact = false }: { animal: Post["animal"]; compact?: boolean }) {
  const sexLabel = animal.sex === "macho" ? "Macho" : "Femea"
  const sizeLabel = { pequeno: "Pequeno", medio: "Medio", grande: "Grande" }[animal.size]
  
  if (compact) {
    return (
      <div className="flex flex-wrap gap-1">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
          <Dog className="w-3 h-3" />
          {sexLabel}
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
          {sizeLabel}
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
          {animal.breed}
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full border border-blue-200">
        <Dog className="w-3.5 h-3.5" />
        {sexLabel}
      </span>
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full border border-amber-200">
        {sizeLabel}
      </span>
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full border border-purple-200">
        {animal.breed}
      </span>
    </div>
  )
}

// --- PostCard Grid (modo compacto) ---
function PostCardGrid({ post, onLike, onOpenDetail }: { post: Post; onLike: (id: number) => void; onOpenDetail: (post: Post) => void }) {
  const isClosed = post.status === "devolvido" || post.status === "adotado"

  return (
    <div 
      onClick={() => onOpenDetail(post)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${isClosed ? "opacity-70" : ""}`}
        />
        <div className="absolute top-3 left-3">
          <TypeBadge type={post.type} status={post.status} />
        </div>
        {/* Tempo de atualizacao */}
        {post.updatedAt && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full">
            <Clock className="w-3 h-3" />
            Atualizado {post.updatedAt}
          </div>
        )}
        {isClosed && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="bg-white/95 text-gray-800 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
              {post.status === "devolvido" ? "Resolvido" : "Finalizado"}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full object-cover ring-2 ring-orange-100" />
          <span className="text-xs text-gray-600 font-medium">{post.author.name}</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-400">{post.createdAt}</span>
        </div>

        <h3 className="font-bold text-gray-900 mb-1.5 line-clamp-1">{post.title}</h3>
        
        {/* Badges de identificacao do animal */}
        <div className="mb-2">
          <AnimalBadges animal={post.animal} compact />
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">{post.description}</p>

        {/* Local onde esta agora */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
          <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
          <span className="truncate font-medium">{post.foundLocation || post.location}</span>
        </div>

        {/* Data de encontro */}
        {post.foundDate && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
            <Calendar className="w-3.5 h-3.5 text-orange-500 shrink-0" />
            <span>Encontrado em {post.foundDate}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <button
            onClick={(e) => { e.stopPropagation(); onLike(post.id) }}
            className={`flex items-center gap-1.5 text-sm font-semibold transition-all ${post.isLiked ? "text-red-500 scale-110" : "text-gray-400 hover:text-red-400 hover:scale-105"}`}
          >
            <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
            <span>{post.likes}</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onOpenDetail(post) }}
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-blue-500 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// --- PostCard Instagram (modo grande) ---
function PostCardInstagram({ post, onLike, onOpenDetail }: { post: Post; onLike: (id: number) => void; onOpenDetail: (post: Post) => void }) {
  const isClosed = post.status === "devolvido" || post.status === "adotado"

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    const text = `${post.type === "perdido" ? "PET PERDIDO" : post.type === "adocao" ? "PET PARA ADOCAO" : "PET ENCONTRADO"}\n\n${post.title}\n${post.foundLocation || post.location}\n\nAjude compartilhando!`
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  return (
    <div 
      className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onClick={() => onOpenDetail(post)}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-orange-200" />
          <div>
            <p className="font-semibold text-gray-900 text-sm">{post.author.name}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {post.location}
            </p>
          </div>
        </div>
        <TypeBadge type={post.type} status={post.status} />
      </div>

      {/* Imagem grande estilo Instagram */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className={`w-full h-full object-cover ${isClosed ? "opacity-70" : ""}`}
        />
        {/* Tempo de atualizacao */}
        {post.updatedAt && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full">
            <Clock className="w-3.5 h-3.5" />
            Atualizado {post.updatedAt}
          </div>
        )}
        {isClosed && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="bg-white/95 text-gray-800 font-bold px-6 py-3 rounded-full shadow-lg text-sm">
              {post.status === "devolvido" ? "Pet Devolvido ao Dono" : "Pet Adotado"}
            </span>
          </div>
        )}
      </div>

      {/* Conteudo */}
      <div className="p-4 space-y-3">
        {/* Acoes */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={(e) => { e.stopPropagation(); onLike(post.id) }}
              className={`flex items-center gap-1.5 text-base font-semibold transition-all ${post.isLiked ? "text-red-500" : "text-gray-600 hover:text-red-400"}`}
            >
              <Heart className={`w-6 h-6 ${post.isLiked ? "fill-current" : ""}`} />
              <span>{post.likes}</span>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onOpenDetail(post) }}
              className="flex items-center gap-1.5 text-base font-semibold text-gray-600 hover:text-blue-500 transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
              <span>{post.comments}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-base font-semibold text-gray-600 hover:text-green-500 transition-colors"
            >
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Titulo e descricao */}
        <div>
          <h3 className="font-bold text-gray-900 text-lg mb-1">{post.title}</h3>
          <AnimalBadges animal={post.animal} compact />
        </div>

        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">{post.description}</p>

        {/* Informacoes de localizacao e data */}
        <div className="bg-orange-50 rounded-xl p-3 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span className="text-gray-700 font-medium">{post.foundLocation || post.location}</span>
          </div>
          {post.foundDate && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-orange-500" />
              <span className="text-gray-700">Encontrado em <strong>{post.foundDate}</strong></span>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <p className="text-xs text-gray-400">{post.createdAt}</p>
      </div>
    </div>
  )
}

// --- Modal de Detalhe do Post ---
interface PostDetailModalProps {
  post: Post
  onClose: () => void
  onLike: (id: number) => void
}

function PostDetailModal({ post, onClose, onLike }: PostDetailModalProps) {
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>(post.commentsList)
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isClosed = post.status === "devolvido" || post.status === "adotado"

  const handleSendComment = () => {
    if (!newComment.trim()) return
    const comment: Comment = {
      id: comments.length + 1,
      author: { name: "Voce", avatar: "https://i.pravatar.cc/40?img=10" },
      message: newComment,
      date: "agora"
    }
    setComments([...comments, comment])
    setNewComment("")
  }

  const handleShareWhatsApp = () => {
    const typeText = post.type === "perdido" ? "PET PERDIDO" : post.type === "adocao" ? "PET PARA ADOCAO" : "PET ENCONTRADO"
    const text = `${typeText}\n\n${post.title}\nLocal: ${post.foundLocation || post.location}\nData: ${post.foundDate || 'Nao informada'}\n\n${post.description}\n\nContato: ${post.author.phone || 'Ver no app'}\n\nAjude compartilhando!`
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const handleDownloadImage = async () => {
    setIsGeneratingImage(true)
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Configurar canvas
    canvas.width = 800
    canvas.height = 1000

    // Fundo
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Carregar imagem
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = post.image
    
    img.onload = () => {
      // Desenhar imagem
      const imgHeight = 500
      ctx.drawImage(img, 0, 0, canvas.width, imgHeight)

      // Banner de tipo
      const bannerColor = post.type === "perdido" ? "#ef4444" : post.type === "adocao" ? "#22c55e" : "#3b82f6"
      const bannerText = post.type === "perdido" ? "PET PERDIDO" : post.type === "adocao" ? "PARA ADOCAO" : "PET ENCONTRADO"
      
      ctx.fillStyle = bannerColor
      ctx.fillRect(0, imgHeight, canvas.width, 60)
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 28px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(bannerText, canvas.width / 2, imgHeight + 40)

      // Informacoes
      ctx.fillStyle = '#1f2937'
      ctx.textAlign = 'left'
      
      let y = imgHeight + 100
      ctx.font = 'bold 24px Arial'
      ctx.fillText(post.title, 30, y)
      
      y += 40
      ctx.font = '18px Arial'
      ctx.fillStyle = '#6b7280'
      ctx.fillText(`Local: ${post.foundLocation || post.location}`, 30, y)
      
      y += 30
      ctx.fillText(`Data: ${post.foundDate || 'Nao informada'}`, 30, y)
      
      y += 30
      ctx.fillText(`${post.animal.breed} - ${post.animal.sex === 'macho' ? 'Macho' : 'Femea'} - ${post.animal.size}`, 30, y)
      
      if (post.author.phone) {
        y += 40
        ctx.font = 'bold 20px Arial'
        ctx.fillStyle = '#f97316'
        ctx.fillText(`Tel: ${post.author.phone}`, 30, y)
      }

      // Rodape
      ctx.fillStyle = '#f97316'
      ctx.fillRect(0, canvas.height - 60, canvas.width, 60)
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 18px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('PetConnect - Ajudando pets a encontrar seu lar', canvas.width / 2, canvas.height - 25)

      // Download
      const link = document.createElement('a')
      link.download = `pet-${post.type}-${post.id}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      
      setIsGeneratingImage(false)
    }

    img.onerror = () => {
      setIsGeneratingImage(false)
      alert('Erro ao gerar imagem. Tente novamente.')
    }
  }

  const statusConfig: Record<PostStatus, { label: string; cls: string }> = {
    aberto: { label: "Em aberto", cls: "bg-yellow-100 text-yellow-700" },
    devolvido: { label: "Devolvido ao dono", cls: "bg-emerald-100 text-emerald-700" },
    adotado: { label: "Adotado", cls: "bg-purple-100 text-purple-700" }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Canvas oculto para gerar imagem */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3 min-w-0">
            <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-orange-200 shrink-0" />
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 truncate">{post.author.name}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.createdAt}
                {post.updatedAt && <span className="text-orange-500 ml-1">- Atualizado {post.updatedAt}</span>}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {/* Imagem em destaque */}
          <div className="relative aspect-video sm:aspect-16/10 bg-gray-100">
            <img
              src={post.image}
              alt={post.title}
              className={`w-full h-full object-cover ${isClosed ? "opacity-70" : ""}`}
            />
            {isClosed && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <span className="bg-white/90 text-gray-800 font-bold px-4 py-2 rounded-full text-sm">
                  {post.status === "devolvido" ? "Resolvido" : "Finalizado"}
                </span>
              </div>
            )}
          </div>

          <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            {/* Titulo */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{post.title}</h2>

            {/* Informacoes principais */}
            <div className="flex flex-wrap gap-2">
              <TypeBadge type={post.type} status={post.status} />
              <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${statusConfig[post.status].cls}`}>
                {statusConfig[post.status].label}
              </span>
            </div>

            {/* LOCAL E DATA DE ENCONTRO - DESTACADO */}
            <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-200 space-y-3">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                Informacoes de Localizacao
              </h3>
              <div className="grid gap-2">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-gray-500 text-xs">Local atual / Encontro</span>
                    <p className="text-gray-900 font-medium">{post.foundLocation || post.location}</p>
                  </div>
                </div>
                {post.foundDate && (
                  <div className="flex items-start gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-gray-500 text-xs">Data de encontro</span>
                      <p className="text-gray-900 font-medium">{post.foundDate}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-2 text-sm">
                  <Navigation className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-gray-500 text-xs">Regiao</span>
                    <p className="text-gray-900 font-medium">{post.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botoes de compartilhar e baixar */}
            <div className="flex gap-2">
              <button
                onClick={handleShareWhatsApp}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors text-sm"
              >
                <Share2 className="w-4 h-4" />
                Compartilhar no WhatsApp
              </button>
              <button
                onClick={handleDownloadImage}
                disabled={isGeneratingImage}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-sm disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                {isGeneratingImage ? "..." : "Baixar"}
              </button>
            </div>

            {/* IDENTIFICACAO DO ANIMAL */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <PawPrint className="w-5 h-5 text-blue-500" />
                Identificacao do Animal
              </h3>
              
              <div className="mb-4">
                <AnimalBadges animal={post.animal} />
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  {post.animal.species === "cachorro" ? (
                    <Dog className="w-4 h-4 text-gray-500" />
                  ) : post.animal.species === "gato" ? (
                    <Cat className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Tag className="w-4 h-4 text-gray-500" />
                  )}
                  <span className="text-gray-600">
                    <strong>Especie:</strong> {post.animal.species === "cachorro" ? "Cachorro" : post.animal.species === "gato" ? "Gato" : "Outro"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">
                    <strong>Sexo:</strong> {post.animal.sex === "macho" ? "Macho" : "Femea"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">
                    <strong>Porte:</strong> {{ pequeno: "Pequeno", medio: "Medio", grande: "Grande" }[post.animal.size]}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">
                    <strong>Raca:</strong> {post.animal.breed}
                  </span>
                </div>
                {post.animal.color && (
                  <div className="flex items-center gap-2 col-span-2">
                    <Palette className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">
                      <strong>Cor:</strong> {post.animal.color}
                    </span>
                  </div>
                )}
                {post.animal.hasCollar !== undefined && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">
                      <strong>Coleira:</strong> {post.animal.hasCollar ? "Sim" : "Nao"}
                    </span>
                  </div>
                )}
                {post.animal.name && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">
                      <strong>Nome:</strong> {post.animal.name} (atende pelo nome)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Descricao completa */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Descricao</h3>
              <p className="text-gray-700 leading-relaxed">{post.description}</p>
            </div>

            {/* Contato */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">Contato</h3>
              {post.author.phone ? (
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-4 h-4 text-green-500" />
                  <span className="font-medium">{post.author.phone}</span>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Comente abaixo para entrar em contato</p>
              )}
            </div>

            {/* Acoes */}
            {post.status === "aberto" && (
              <div className="flex flex-col sm:flex-row gap-2">
                {post.type === "perdido" && (
                  <button className="flex-1 py-2.5 px-4 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all text-sm shadow-lg shadow-green-200">
                    Sinalizar que sou o dono
                  </button>
                )}
                {post.type === "adocao" && (
                  <button className="flex-1 py-2.5 px-4 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all text-sm shadow-lg shadow-orange-200">
                    Quero adotar
                  </button>
                )}
                <button
                  onClick={() => onLike(post.id)}
                  className={`py-2.5 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 text-sm ${
                    post.isLiked
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
                  {post.likes}
                </button>
              </div>
            )}

            {/* Comentarios */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-gray-500" />
                Comentarios ({comments.length})
              </h3>
              
              <div className="space-y-3 max-h-48 sm:max-h-60 overflow-y-auto">
                {comments.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">Nenhum comentario ainda. Seja o primeiro!</p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <img src={comment.author.avatar} alt={comment.author.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                      <div className="flex-1 bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-gray-900">{comment.author.name}</span>
                          <span className="text-xs text-gray-400">{comment.date}</span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Input de comentario - Fixed at bottom */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex gap-2 sm:gap-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escreva um comentario..."
              className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-100 border-0 rounded-xl text-sm focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all"
              onKeyDown={(e) => e.key === "Enter" && handleSendComment()}
            />
            <button
              onClick={handleSendComment}
              disabled={!newComment.trim()}
              className="px-3 sm:px-4 py-2 sm:py-2.5 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-200"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Modal Criar Publicacao ---
interface CreatePostModalProps {
  onClose: () => void
  onPublish: (post: Omit<Post, "id" | "likes" | "comments" | "isLiked" | "createdAt" | "updatedAt" | "author" | "commentsList">) => void
}

function CreatePostModal({ onClose, onPublish }: CreatePostModalProps) {
  const [type, setType] = useState<PostType | "">("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [foundLocation, setFoundLocation] = useState("")
  const [foundDate, setFoundDate] = useState("")
  const [phone, setPhone] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [locating, setLocating] = useState(false)
  
  // Campos de identificacao do animal
  const [animalSpecies, setAnimalSpecies] = useState<AnimalSpecies>("cachorro")
  const [animalSex, setAnimalSex] = useState<AnimalSex>("macho")
  const [animalSize, setAnimalSize] = useState<AnimalSize>("medio")
  const [animalBreed, setAnimalBreed] = useState("")
  const [animalColor, setAnimalColor] = useState("")
  const [animalName, setAnimalName] = useState("")
  const [hasCollar, setHasCollar] = useState(false)
  
  const fileRef = useRef<HTMLInputElement>(null)

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)
    setErrors(prev => ({ ...prev, image: "" }))
  }

  const handleGPS = () => {
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocation("Salvador, BA (localizacao atual)")
        setLocating(false)
      },
      () => {
        setLocation("Nao foi possivel obter localizacao")
        setLocating(false)
      }
    )
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!imagePreview) errs.image = "A imagem e obrigatoria."
    if (!type) errs.type = "Selecione o tipo da publicacao."
    if (!description.trim()) errs.description = "A descricao e obrigatoria."
    if (!location.trim()) errs.location = "Informe a localizacao."
    if (!animalBreed.trim()) errs.breed = "Informe a raca do animal."
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handlePublish = () => {
    if (!validate()) return
    onPublish({
      type: type as PostType,
      status: "aberto",
      image: imagePreview!,
      title: animalName ? `${animalName} - ${animalBreed}` : `${animalBreed} - ${type === "perdido" ? "Perdido" : type === "encontrado" ? "Encontrado" : "Adocao"}`,
      description,
      location,
      foundLocation: foundLocation || undefined,
      foundDate: foundDate || undefined,
      animal: {
        species: animalSpecies,
        sex: animalSex,
        size: animalSize,
        breed: animalBreed,
        color: animalColor || undefined,
        hasCollar: hasCollar,
        name: animalName || undefined
      }
    })
    onClose()
  }

  const typeOptions: { value: PostType; label: string; desc: string; icon: React.ReactNode; cls: string }[] = [
    {
      value: "perdido",
      label: "Perdido",
      desc: "Animal encontrado na rua, localizando o dono",
      icon: <AlertCircle className="w-5 h-5" />,
      cls: "border-red-300 bg-red-50 text-red-700"
    },
    {
      value: "adocao",
      label: "Adocao",
      desc: "Animal disponivel para adocao responsavel",
      icon: <Home className="w-5 h-5" />,
      cls: "border-green-300 bg-green-50 text-green-700"
    },
    {
      value: "encontrado",
      label: "Encontrado",
      desc: "Animal perdido que foi devolvido ao dono",
      icon: <CheckCircle className="w-5 h-5" />,
      cls: "border-blue-300 bg-blue-50 text-blue-700"
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header do Modal */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between rounded-t-3xl z-10">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Nova Publicacao</h2>
            <p className="text-xs text-gray-500">Ajude animais a encontrarem seu lugar</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* Upload de imagem */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Foto do animal <span className="text-red-500">*</span>
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl overflow-hidden cursor-pointer transition-colors ${
                errors.image ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-orange-300 bg-gray-50"
              }`}
            >
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm font-medium">Clique para alterar</p>
                  </div>
                </div>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center gap-3">
                  <div className="w-14 h-14 bg-linear-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center">
                    <Camera className="w-7 h-7 text-orange-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">Clique para adicionar foto</p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG ou WebP - Maximo 10MB</p>
                  </div>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
            {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image}</p>}
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tipo da publicacao <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 gap-2">
              {typeOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { setType(opt.value); setErrors(prev => ({ ...prev, type: "" })) }}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                    type === opt.value
                      ? `${opt.cls} border-current shadow-sm`
                      : "border-gray-200 bg-white hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <span className={type === opt.value ? "" : "text-gray-400"}>{opt.icon}</span>
                  <div>
                    <p className="text-sm font-semibold">{opt.label}</p>
                    <p className="text-xs opacity-80">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            {errors.type && <p className="text-xs text-red-500 mt-1">{errors.type}</p>}
          </div>

          {/* Identificacao do Animal */}
          <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-200">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <PawPrint className="w-5 h-5 text-orange-500" />
              Identificacao do Animal
            </h3>
            
            <div className="space-y-3">
              {/* Especie */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Especie</label>
                <div className="flex gap-2">
                  {[
                    { value: "cachorro", label: "Cachorro", icon: <Dog className="w-4 h-4" /> },
                    { value: "gato", label: "Gato", icon: <Cat className="w-4 h-4" /> },
                    { value: "outro", label: "Outro", icon: <Tag className="w-4 h-4" /> },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setAnimalSpecies(opt.value as AnimalSpecies)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
                        animalSpecies === opt.value
                          ? "bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-md"
                          : "bg-white text-gray-700 border border-gray-200 hover:border-orange-300"
                      }`}
                    >
                      {opt.icon}
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sexo e Porte */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Sexo</label>
                  <div className="flex gap-2">
                    {[
                      { value: "macho", label: "Macho" },
                      { value: "femea", label: "Femea" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setAnimalSex(opt.value as AnimalSex)}
                        className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                          animalSex === opt.value
                            ? "bg-blue-500 text-white shadow-md"
                            : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Porte</label>
                  <select
                    value={animalSize}
                    onChange={(e) => setAnimalSize(e.target.value as AnimalSize)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                  >
                    <option value="pequeno">Pequeno</option>
                    <option value="medio">Medio</option>
                    <option value="grande">Grande</option>
                  </select>
                </div>
              </div>

              {/* Raca */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Raca <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={animalBreed}
                  onChange={(e) => { setAnimalBreed(e.target.value); setErrors(prev => ({ ...prev, breed: "" })) }}
                  placeholder="Ex: Vira-lata, Pinscher, Siames..."
                  className={`w-full px-3 py-2 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-orange-400 ${
                    errors.breed ? "border-red-400" : "border-gray-200"
                  }`}
                />
                {errors.breed && <p className="text-xs text-red-500 mt-1">{errors.breed}</p>}
              </div>

              {/* Cor e Nome */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Cor</label>
                  <input
                    type="text"
                    value={animalColor}
                    onChange={(e) => setAnimalColor(e.target.value)}
                    placeholder="Ex: Caramelo"
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Nome (se souber)</label>
                  <input
                    type="text"
                    value={animalName}
                    onChange={(e) => setAnimalName(e.target.value)}
                    placeholder="Ex: Rex"
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>

              {/* Coleira */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasCollar}
                  onChange={(e) => setHasCollar(e.target.checked)}
                  className="w-4 h-4 text-orange-500 rounded border-gray-300 focus:ring-orange-400"
                />
                <span className="text-sm text-gray-700">Animal usa coleira</span>
              </label>
            </div>
          </div>

          {/* Local de encontro */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Local onde o pet foi encontrado/esta
            </label>
            <input
              type="text"
              value={foundLocation}
              onChange={(e) => setFoundLocation(e.target.value)}
              placeholder="Ex: Praca da Se, Centro, Salvador"
              className="w-full px-3 py-2.5 text-sm border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            />
          </div>

          {/* Data de encontro */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Data de encontro
            </label>
            <input
              type="date"
              value={foundDate}
              onChange={(e) => setFoundDate(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
            />
          </div>

          {/* Descricao */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descricao <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => { setDescription(e.target.value); setErrors(prev => ({ ...prev, description: "" })) }}
              placeholder="Descreva detalhes do ocorrido, caracteristicas especificas, onde foi visto pela ultima vez..."
              rows={3}
              className={`w-full px-3 py-2.5 text-sm border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all ${
                errors.description ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
              }`}
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
          </div>

          {/* Localizacao */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Regiao/Cidade <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={location}
                onChange={(e) => { setLocation(e.target.value); setErrors(prev => ({ ...prev, location: "" })) }}
                placeholder="Bairro, cidade..."
                className={`flex-1 px-3 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all ${
                  errors.location ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"
                }`}
              />
              <button
                type="button"
                onClick={handleGPS}
                disabled={locating}
                title="Usar localizacao atual"
                className="px-3 py-2.5 bg-linear-to-r from-orange-100 to-amber-100 text-orange-600 rounded-xl hover:from-orange-200 hover:to-amber-200 transition-colors disabled:opacity-50"
              >
                <Navigation className="w-4 h-4" />
              </button>
            </div>
            {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
            {locating && <p className="text-xs text-gray-400 mt-1">Obtendo localizacao...</p>}
          </div>

          {/* Contato */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Telefone de contato <span className="text-gray-400 font-normal">(opcional)</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(71) 99999-9999"
                className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Se preferir, deixe em branco - o contato pode ser feito pelos comentarios.
            </p>
          </div>
        </div>

        {/* Footer do Modal */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 sm:px-6 py-3 sm:py-4 flex gap-3 rounded-b-3xl">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handlePublish}
            className="flex-1 py-2.5 text-sm font-semibold text-white bg-linear-to-r from-orange-500 to-amber-500 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-200"
          >
            <Plus className="w-4 h-4" />
            Publicar
          </button>
        </div>
      </div>
    </div>
  )
}

// --- Pagina principal ---
export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [selectedType, setSelectedType] = useState<PostType | "todos">("todos")
  const [selectedPetCategory, setSelectedPetCategory] = useState<string>("todos")
  const [selectedStatus, setSelectedStatus] = useState<"todos" | "aberto" | "resolvido">("todos")
  const [selectedDistance, setSelectedDistance] = useState<string>("10km")
  const [sortBy, setSortBy] = useState<"recentes" | "curtidos" | "comentados">("recentes")
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "instagram">("grid")

  const handleLike = (postId: number) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ))
  }

  const handlePublish = (newPost: Omit<Post, "id" | "likes" | "comments" | "isLiked" | "createdAt" | "updatedAt" | "author" | "commentsList">) => {
    const post: Post = {
      ...newPost,
      id: posts.length + 1,
      likes: 0,
      comments: 0,
      isLiked: false,
      createdAt: "agora mesmo",
      updatedAt: "agora",
      author: { name: "Voce", avatar: "https://i.pravatar.cc/40?img=10" },
      commentsList: []
    }
    setPosts([post, ...posts])
  }

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  // Filtros funcionais
  const filteredPosts = posts
    .filter(post => {
      if (selectedType !== "todos" && post.type !== selectedType) return false
      if (selectedPetCategory !== "todos" && post.animal.species !== selectedPetCategory) return false
      if (selectedStatus === "aberto" && post.status !== "aberto") return false
      if (selectedStatus === "resolvido" && post.status === "aberto") return false
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.animal.breed.toLowerCase().includes(query) ||
          post.location.toLowerCase().includes(query)
        )
      }
      return true
    })
    .sort((a, b) => {
      if (sortBy === "curtidos") return b.likes - a.likes
      if (sortBy === "comentados") return b.comments - a.comments
      return 0
    })

  const statusTabs: { value: PostType | "todos"; label: string; color: string }[] = [
    { value: "todos", label: "Todos", color: "from-gray-500 to-gray-600" },
    { value: "perdido", label: "Perdidos", color: "from-red-500 to-rose-500" },
    { value: "adocao", label: "Adocao", color: "from-green-500 to-emerald-500" },
    { value: "encontrado", label: "Encontrados", color: "from-blue-500 to-cyan-500" },
  ]

  return (
    <div className="min-h-dvh bg-linear-to-br from-orange-50 via-white to-amber-50">
      {/* Navbar */}
      <Navbar
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
        user={mockUser}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Busca Mobile */}
        <div className="md:hidden mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar pets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-400 shadow-sm"
            />
          </div>
        </div>

        {/* Banner de Localizacao e Publicar - Estilo Petz */}
        <div className="bg-white rounded-3xl p-5 mb-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-orange-200">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Mostrando pets proximos a</p>
              <p className="font-bold text-gray-900 text-lg">Salvador, Bahia</p>
            </div>
          </div>
          <div className="flex items-center gap-3 ml-16 sm:ml-0">
            <button className="text-sm text-gray-500 hover:text-orange-500 font-medium flex items-center gap-1.5 transition-colors">
              <ChevronDown className="w-4 h-4" />
              Alterar
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-full hover:from-orange-600 hover:to-amber-600 transition-all text-sm font-bold shadow-lg shadow-orange-200"
            >
              <Plus className="w-4 h-4" />
              Publicar
            </button>
          </div>
        </div>

        {/* Filtros de categoria estilo Petz (circulos com imagens) */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Tipo de Pet</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {petCategoryFilters.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedPetCategory(cat.id)}
                className="flex flex-col items-center gap-2 shrink-0 group"
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-3 transition-all duration-300 ${
                  selectedPetCategory === cat.id 
                    ? `${cat.borderColor} border-4 shadow-lg scale-105` 
                    : "border-gray-200 group-hover:border-orange-300 group-hover:scale-105"
                }`}>
                  <img 
                    src={cat.image} 
                    alt={cat.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className={`text-xs font-semibold transition-colors ${
                  selectedPetCategory === cat.id ? "text-orange-600" : "text-gray-600 group-hover:text-orange-500"
                }`}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tabs de status - Estilo moderno */}
        <div className="bg-white rounded-2xl p-2 mb-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 overflow-x-auto pb-1 flex-1 scrollbar-hide">
              {statusTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setSelectedType(tab.value)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    selectedType === tab.value
                      ? `bg-linear-to-r ${tab.color} text-white shadow-lg`
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            {/* Seletor de modo de visualizacao */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "grid" ? "bg-white shadow-sm text-orange-500" : "text-gray-400 hover:text-gray-600"
                }`}
                title="Visualizacao em grade"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("instagram")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "instagram" ? "bg-white shadow-sm text-orange-500" : "text-gray-400 hover:text-gray-600"
                }`}
                title="Visualizacao Instagram"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                showFilters 
                  ? "bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-lg" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {showFilters ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
              <span className="hidden sm:inline">Filtrar</span>
            </button>
          </div>
        </div>

        {/* Filtros avancados */}
        {showFilters && (
          <div className="bg-white rounded-2xl p-5 mb-6 border border-gray-100 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Distancia</label>
                <select
                  value={selectedDistance}
                  onChange={(e) => setSelectedDistance(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                >
                  <option value="5km">Ate 5km</option>
                  <option value="10km">Ate 10km</option>
                  <option value="25km">Ate 25km</option>
                  <option value="50km">Ate 50km</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as "todos" | "aberto" | "resolvido")}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                >
                  <option value="todos">Todos</option>
                  <option value="aberto">Em aberto</option>
                  <option value="resolvido">Resolvido</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Ordenar</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "recentes" | "curtidos" | "comentados")}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                >
                  <option value="recentes">Mais recentes</option>
                  <option value="curtidos">Mais curtidos</option>
                  <option value="comentados">Mais comentados</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Contagem */}
        <p className="text-sm text-gray-500 mb-4">
          <span className="font-bold text-gray-900">{filteredPosts.length}</span>{" "}
          {filteredPosts.length === 1 ? "publicacao encontrada" : "publicacoes encontradas"}
        </p>

        {/* Destaque de Evento Proximo - Estilo Petz */}
        <Link 
          to="/eventos"
          className="flex items-center gap-4 p-4 mb-6 bg-linear-to-r from-orange-500 to-amber-500 rounded-2xl hover:from-orange-600 hover:to-amber-600 transition-all group shadow-lg shadow-orange-200"
        >
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-colors">
            <Calendar className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/80 font-medium mb-0.5">Evento proximo de voce</p>
            <p className="font-bold text-white truncate">Feira de Adocao - Parque da Cidade</p>
            <p className="text-sm text-white/80">Amanha, 09:00 - 17:00 - Salvador, BA</p>
          </div>
          <span className="text-white text-sm font-bold shrink-0 bg-white/20 px-3 py-1.5 rounded-full group-hover:bg-white/30 transition-colors">
            Ver mais
          </span>
        </Link>

        {/* Grid de Posts */}
        {filteredPosts.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPosts.map((post) => (
                <PostCardGrid 
                  key={post.id} 
                  post={post} 
                  onLike={handleLike} 
                  onOpenDetail={setSelectedPost}
                />
              ))}
            </div>
          ) : (
            <div className="max-w-xl mx-auto space-y-6">
              {filteredPosts.map((post) => (
                <PostCardInstagram 
                  key={post.id} 
                  post={post} 
                  onLike={handleLike} 
                  onOpenDetail={setSelectedPost}
                />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-linear-to-br from-orange-100 to-amber-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhum resultado encontrado</h3>
            <p className="text-gray-500 text-sm mb-4">Tente ajustar os filtros ou buscar por outro termo.</p>
            <button
              onClick={() => { 
                setSelectedType("todos")
                setSelectedPetCategory("todos")
                setSelectedStatus("todos")
                setSearchQuery("") 
              }}
              className="text-orange-500 hover:text-orange-600 font-bold text-sm"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </main>

      {/* Modal de criacao */}
      {showCreateModal && (
        <CreatePostModal onClose={() => setShowCreateModal(false)} onPublish={handlePublish} />
      )}

      {/* Modal de detalhe do post */}
      {selectedPost && (
        <PostDetailModal 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} 
          onLike={handleLike}
        />
      )}
    </div>
  )
}
