import { useState } from "react"
import { Link } from "react-router-dom"
import {
  User,
  Mail,
  MapPin,
  Camera,
  Edit3,
  Plus,
  Heart,
  MessageCircle,
  Trash2,
  Clock,
  CheckCircle,
  AlertCircle,
  Home,
  Settings,
  Shield,
  FileText,
  Lock,
  Bell,
  ChevronRight,
  BadgeCheck,
  Building2,
  Loader2,
  X,
  PawPrint,
  Calendar,
  Wrench,
  Menu,
} from "lucide-react"

// --- Tipos ---
type PostType = "perdido" | "encontrado" | "adocao"
type PostStatus = "aberto" | "devolvido" | "adotado"
type AccountType = "usuario" | "ong"
type ONGRequestStatus = "none" | "pendente" | "aprovado" | "rejeitado"

interface UserPost {
  id: number
  type: PostType
  status: PostStatus
  image: string
  title: string
  createdAt: string
  likes: number
  comments: number
}

interface UserProfile {
  id: number
  name: string
  email: string
  avatar?: string
  bio?: string
  location?: string
  accountType: AccountType
  ongVerified?: boolean
  ongRequestStatus: ONGRequestStatus
  createdAt: string
  posts: UserPost[]
}

// --- Dados mockados ---
const mockUserProfile: UserProfile = {
  id: 1,
  name: "Perfil Teste",
  email: "testando@gmail.com",
  avatar: "https://i.pravatar.cc/150?img=1",
  bio: "Apaixonada por animais. Voluntaria em ONGs de resgate desde 2020. Ajudo pets perdidos a encontrarem suas familias.",
  location: "Salvador, BA",
  accountType: "usuario",
  ongVerified: false,
  ongRequestStatus: "none",
  createdAt: "Janeiro 2024",
  posts: [
    {
      id: 1,
      type: "perdido",
      status: "aberto",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200",
      title: "Rex - Golden Retriever",
      createdAt: "2h atras",
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      type: "adocao",
      status: "aberto",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200",
      title: "Luna - Gata Siames",
      createdAt: "5h atras",
      likes: 56,
      comments: 12
    },
    {
      id: 3,
      type: "perdido",
      status: "devolvido",
      image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200",
      title: "Thor - Bulldog Frances",
      createdAt: "3d atras",
      likes: 145,
      comments: 34
    },
    {
      id: 4,
      type: "adocao",
      status: "adotado",
      image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=200",
      title: "Mia - Gata Persa",
      createdAt: "4d atras",
      likes: 32,
      comments: 7
    }
  ]
}

// --- Navbar Simples ---
function ProfileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  
  const navLinks = [
    { to: "/feed", label: "Pets", icon: <PawPrint className="w-4 h-4" />, emoji: "🐾" },
    { to: "/eventos", label: "Eventos", icon: <Calendar className="w-4 h-4" />, emoji: "📅" },
    { to: "/servicos", label: "Servicos", icon: <Wrench className="w-4 h-4" />, emoji: "🔧" },
  ]

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

          {/* Nav Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-all"
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Perfil ativo */}
          <div className="flex items-center gap-2">
            <div className="px-4 py-2 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-full text-sm font-semibold shadow-lg shadow-orange-200">
              Meu Perfil
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
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
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

// --- Badge de Status do Post ---
function PostStatusBadge({ type, status }: { type: PostType; status: PostStatus }) {
  const typeConfig: Record<PostType, { label: string; cls: string; icon: React.ReactNode }> = {
    perdido: {
      label: "Perdido",
      cls: "bg-red-100 text-red-700",
      icon: <AlertCircle className="w-3 h-3" />
    },
    encontrado: {
      label: "Encontrado",
      cls: "bg-blue-100 text-blue-700",
      icon: <CheckCircle className="w-3 h-3" />
    },
    adocao: {
      label: "Adocao",
      cls: "bg-green-100 text-green-700",
      icon: <Home className="w-3 h-3" />
    }
  }

  const statusConfig: Record<PostStatus, { label: string; cls: string }> = {
    aberto: { label: "Em aberto", cls: "bg-yellow-100 text-yellow-700" },
    devolvido: { label: "Devolvido", cls: "bg-emerald-100 text-emerald-700" },
    adotado: { label: "Adotado", cls: "bg-purple-100 text-purple-700" }
  }

  const tc = typeConfig[type]
  const sc = statusConfig[status]

  return (
    <div className="flex gap-1">
      <span className={`flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full ${tc.cls}`}>
        {tc.icon} {tc.label}
      </span>
      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${sc.cls}`}>
        {sc.label}
      </span>
    </div>
  )
}

// --- Card do Post do Usuario ---
function UserPostCard({ post, onEdit, onDelete, onUpdateStatus }: {
  post: UserPost
  onEdit: (id: number) => void
  onDelete: (id: number) => void
  onUpdateStatus: (id: number) => void
}) {
  const [showActions, setShowActions] = useState(false)

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200">
      <div className="flex gap-0">
        {/* Imagem */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 p-3.5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-gray-900 text-sm truncate">{post.title}</h3>
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors shrink-0 -mt-0.5 -mr-1"
            >
              <Settings className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <PostStatusBadge type={post.type} status={post.status} />

          <div className="flex items-center gap-3 mt-2.5 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.createdAt}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {post.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              {post.comments}
            </span>
          </div>
        </div>
      </div>

      {/* Acoes */}
      {showActions && (
        <div className="flex items-center gap-2 px-3 pb-3 border-t border-gray-50 pt-2.5">
          <button
            onClick={() => onEdit(post.id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-semibold hover:bg-blue-100 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Editar
          </button>
          <button
            onClick={() => onUpdateStatus(post.id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-semibold hover:bg-emerald-100 transition-colors"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            Status
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-red-50 text-red-600 rounded-xl text-xs font-semibold hover:bg-red-100 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}

// --- Modal de Editar Perfil ---
function EditProfileModal({ profile, onClose, onSave }: {
  profile: UserProfile
  onClose: () => void
  onSave: (data: Partial<UserProfile>) => void
}) {
  const [name, setName] = useState(profile.name)
  const [bio, setBio] = useState(profile.bio || "")
  const [location, setLocation] = useState(profile.location || "")
  const [avatar, setAvatar] = useState(profile.avatar || "")

  const handleSave = () => {
    onSave({ name, bio, location, avatar })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-lg font-bold text-gray-900">Editar Perfil</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={avatar || "https://i.pravatar.cc/150"}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover ring-4 ring-orange-100"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-full shadow-lg">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Clique para alterar a foto</p>
          </div>

          {/* Nome */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              placeholder="Conte um pouco sobre voce..."
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 resize-none transition-all"
            />
          </div>

          {/* Localizacao */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Localizacao</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Cidade, Estado"
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
              />
              <button className="px-3 py-2.5 bg-orange-100 text-orange-600 rounded-xl hover:bg-orange-200 transition-colors">
                <MapPin className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Caso o GPS esteja desativado, informe manualmente</p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 text-sm font-semibold text-white bg-linear-to-r from-orange-500 to-amber-500 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-200"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}

// --- Modal de Solicitar ONG ---
function RequestONGModal({ onClose, onSubmit }: {
  onClose: () => void
  onSubmit: () => void
}) {
  const [orgName, setOrgName] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    onSubmit()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Solicitar Conta ONG</h2>
            <p className="text-xs text-gray-500">Obtenha o selo de ONG verificada</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Info */}
          <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                <BadgeCheck className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">Beneficios da conta ONG</h3>
                <ul className="text-xs text-gray-600 mt-1 space-y-1">
                  <li>- Selo de verificacao nas publicacoes</li>
                  <li>- Destaque no feed de adocao</li>
                  <li>- Relatorios e metricas</li>
                  <li>- Suporte prioritario</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Nome da ONG */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nome da ONG</label>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Ex: Amigos dos Animais"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
            />
          </div>

          {/* CNPJ */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">CNPJ (opcional)</label>
            <input
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              placeholder="00.000.000/0001-00"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
            />
          </div>

          {/* Descricao */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sobre a ONG</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Descreva as atividades e missao da sua organizacao..."
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-400 resize-none transition-all"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !orgName.trim()}
            className="flex-1 py-2.5 text-sm font-semibold text-white bg-linear-to-r from-orange-500 to-amber-500 rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar Solicitacao"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// --- Pagina de Perfil ---
export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showONGModal, setShowONGModal] = useState(false)
  const [activeTab, setActiveTab] = useState<"posts" | "config">("posts")

  const handleEditPost = (id: number) => {
    console.log("Editar post:", id)
    // Implementar logica de edicao
  }

  const handleDeletePost = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta publicacao?")) {
      setProfile(prev => ({
        ...prev,
        posts: prev.posts.filter(p => p.id !== id)
      }))
    }
  }

  const handleUpdateStatus = (id: number) => {
    console.log("Atualizar status:", id)
    // Implementar modal de atualizacao de status
  }

  const handleSaveProfile = (data: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...data }))
  }

  const handleRequestONG = () => {
    setProfile(prev => ({ ...prev, ongRequestStatus: "pendente" }))
  }

  const ongStatusConfig: Record<ONGRequestStatus, { label: string; cls: string; icon: React.ReactNode } | null> = {
    none: null,
    pendente: { label: "Solicitacao pendente", cls: "bg-yellow-100 text-yellow-700", icon: <Clock className="w-4 h-4" /> },
    aprovado: { label: "Aprovado", cls: "bg-green-100 text-green-700", icon: <CheckCircle className="w-4 h-4" /> },
    rejeitado: { label: "Rejeitado", cls: "bg-red-100 text-red-700", icon: <X className="w-4 h-4" /> }
  }

  return (
    <div className="min-h-dvh bg-linear-to-br from-orange-50 via-white to-amber-50">
      <ProfileNavbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Header do Perfil */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-5">
          {/* Banner com elementos decorativos */}
          <div className="relative h-32 sm:h-40 bg-linear-to-br from-orange-400 via-amber-400 to-orange-500 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-52 h-52 bg-white/10 rounded-full" />
            <div className="absolute -bottom-16 -left-10 w-64 h-64 bg-white/10 rounded-full" />
            <div className="absolute top-4 right-1/3 w-20 h-20 bg-white/5 rounded-full" />
            <div className="absolute bottom-2 right-6 opacity-20">
              <PawPrint className="w-10 h-10 text-white" />
            </div>
            <div className="absolute top-3 left-1/4 opacity-10">
              <PawPrint className="w-8 h-8 text-white rotate-12" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-black/10 to-transparent" />
          </div>

          {/* Info */}
          <div className="px-5 pb-5">
            {/* Avatar + botao editar */}
            <div className="flex items-end justify-between -mt-12 sm:-mt-14 mb-4">
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl ring-4 ring-white shadow-xl overflow-hidden">
                  <img
                    src={profile.avatar || "https://i.pravatar.cc/150"}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {profile.accountType === "ong" && profile.ongVerified && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center ring-3 ring-white shadow-lg">
                    <BadgeCheck className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowEditModal(true)}
                className="mb-1 flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Editar perfil
              </button>
            </div>

            {/* Nome + badges */}
            <div className="mb-3">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h1 className="text-xl font-black text-gray-900 tracking-tight">{profile.name}</h1>
                {profile.accountType === "ong" && profile.ongVerified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                    <Building2 className="w-3 h-3" />
                    ONG Verificada
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Mail className="w-3.5 h-3.5" />
                  {profile.email}
                </span>
                {profile.location && (
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin className="w-3.5 h-3.5" />
                    {profile.location}
                  </span>
                )}
                <span className="text-xs text-gray-400">Membro desde {profile.createdAt}</span>
              </div>
            </div>

            {/* Bio */}
            {profile.bio && (
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{profile.bio}</p>
            )}

            {/* Stats em faixa */}
            <div className="flex divide-x divide-gray-100 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
              {[
                { value: profile.posts.length, label: "Posts" },
                { value: profile.posts.reduce((acc, p) => acc + p.likes, 0), label: "Curtidas" },
                { value: profile.posts.filter(p => p.status !== "aberto").length, label: "Resolvidos" }
              ].map((stat, i) => (
                <div key={i} className="flex-1 py-3.5 text-center">
                  <p className="text-xl font-black text-gray-900 tabular-nums leading-none">{stat.value}</p>
                  <p className="text-[11px] text-gray-400 font-semibold mt-1 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botao Publicar */}
        <Link
          to="/feed"
          className="flex items-center justify-center gap-2 w-full py-3.5 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-2xl font-bold text-sm hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-200/50 mb-5"
        >
          <Plus className="w-4 h-4" />
          Nova Publicacao
        </Link>

        {/* Tabs - estilo underline */}
        <div className="flex bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm mb-5">
          {[
            { id: "posts" as const, label: "Publicacoes", count: profile.posts.length },
            { id: "config" as const, label: "Configuracoes", count: undefined },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold relative transition-colors ${
                activeTab === tab.id
                  ? "text-orange-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                  activeTab === tab.id ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-400"
                }`}>{tab.count}</span>
              )}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 inset-x-4 h-0.5 bg-linear-to-r from-orange-500 to-amber-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Conteudo das Tabs */}
        {activeTab === "posts" ? (
          <div className="space-y-4">
            {profile.posts.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm">
                <div className="w-16 h-16 bg-linear-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <PawPrint className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="font-black text-gray-900 mb-1.5">Nenhuma publicacao ainda</h3>
                <p className="text-gray-400 text-sm mb-5">Comece criando sua primeira publicacao para ajudar um pet!</p>
                <Link
                  to="/feed"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-full font-bold text-sm hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-200/50"
                >
                  <Plus className="w-4 h-4" />
                  Criar Publicacao
                </Link>
              </div>
            ) : (
              profile.posts.map(post => (
                <UserPostCard
                  key={post.id}
                  post={post}
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                  onUpdateStatus={handleUpdateStatus}
                />
              ))
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {/* Solicitar ONG */}
            {profile.accountType === "usuario" && (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-50">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-orange-500" />
                    Evoluir para ONG
                  </h3>
                </div>
                <div className="p-4">
                  {profile.ongRequestStatus === "none" ? (
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm text-gray-500">Obtenha o selo de ONG verificada e destaque no feed</p>
                      <button
                        onClick={() => setShowONGModal(true)}
                        className="shrink-0 px-4 py-2 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-full text-xs font-bold hover:from-orange-600 hover:to-amber-600 transition-all shadow-md shadow-orange-200/50"
                      >
                        Solicitar
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      {ongStatusConfig[profile.ongRequestStatus] && (
                        <span className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${ongStatusConfig[profile.ongRequestStatus]!.cls}`}>
                          {ongStatusConfig[profile.ongRequestStatus]!.icon}
                          {ongStatusConfig[profile.ongRequestStatus]!.label}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Notificacoes */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <Link to="/notificacoes" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                    <Bell className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="font-semibold text-gray-900 text-sm">Notificacoes</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </Link>
            </div>

            {/* Seguranca */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="px-4 py-3 border-b border-gray-50">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-orange-500" />
                  Seguranca
                </h3>
              </div>
              <Link to="/alterar-senha" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Lock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">Alterar senha</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </Link>
            </div>

            {/* Area Legal */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="px-4 py-3 border-b border-gray-50">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-orange-500" />
                  Area Legal
                </h3>
              </div>
              <Link to="/termos" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50">
                <span className="text-sm text-gray-700">Termos de Uso</span>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </Link>
              <Link to="/privacidade" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <span className="text-sm text-gray-700">Politica de Privacidade</span>
                <ChevronRight className="w-4 h-4 text-gray-300" />
              </Link>
            </div>

            {/* Info da conta */}
            <div className="text-center text-xs text-gray-400 py-4">
              Membro desde {profile.createdAt} · PetConnect v1.0
            </div>
          </div>
        )}
      </main>

      {/* Modais */}
      {showEditModal && (
        <EditProfileModal
          profile={profile}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveProfile}
        />
      )}

      {showONGModal && (
        <RequestONGModal
          onClose={() => setShowONGModal(false)}
          onSubmit={handleRequestONG}
        />
      )}
    </div>
  )
}