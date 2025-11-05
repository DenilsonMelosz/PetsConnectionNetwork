"use client"

import { useState } from "react"
import {
  MapPin,
  Calendar,
  Phone,
  Mail,
  Instagram,
  Edit,
  Settings,
  LogOut,
  MessageCircle,
  Flag,
  Heart,
  Share2,
  Award,
  PawPrint,
  Star,
  Globe,
  Clock,
  DollarSign,
  Users,
  Camera,
  Facebook,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import dogadotado from "@/assets/cachorro-feliz-adotado.png"


// Mock data - substituir com dados reais da API
const mockOngData = {
  type: "ong",
  id: "2",
  name: "Amigos dos Animais",
  logo: "/animal-shelter-logo.png",
  verified: true,
  status: "verified",
  location: "Centro, São Paulo - SP",
  memberSince: "2023-06-10",
  description:
    "ONG dedicada ao resgate, tratamento e adoção responsável de animais abandonados. Atuamos há mais de 10 anos na região de São Paulo.",
  responsible: "João Santos",
  address: "Rua das Flores, 123 - Centro",
  hours: "Seg-Sex: 9h-18h | Sáb: 9h-14h",
  contact: {
    phone: "(11) 3456-7890",
    whatsapp: "(11) 98888-7777",
    email: "contato@amigosdosanimais.org",
    website: "www.amigosdosanimais.org",
    instagram: "@amigosdosanimais",
    facebook: "Amigos dos Animais ONG",
  },
  stats: {
    availableAnimals: 45,
    adoptionsCompleted: 320,
    animalsRescued: 580,
    capacity: { current: 45, max: 60 },
    rating: 4.9,
    animalTypes: ["dog", "cat", "bird"],
  },
  gallery: [
    "/animal-shelter-interior.jpg",
    "/dogs-in-shelter.jpg",
    "/cats-in-shelter.jpg",
    "/volunteers-with-animals.jpg",
  ],
  isOwnProfile: false,
}

type TabType = "posts" | "animals" | "favorites" | "reviews" | "adoption" | "completed" | "help"

export default function ProfilePage() {
  // Alterar entre mockUserData e mockOngData para testar
  const profileData = mockOngData
  const [activeTab, setActiveTab] = useState<TabType>("posts")
  const [showAbout, setShowAbout] = useState(false)
  const [showContact, setShowContact] = useState(false)

  const isOng = profileData.type === "ong"
  const isOwnProfile = profileData.isOwnProfile

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 sm:py-4">
          <div className="flex items-center justify-between">
            <img src="/logo-pcn.png" alt="PCN Logo" className="h-7 sm:h-10" />
            <h1 className="text-sm sm:text-lg font-semibold text-gray-900">Perfil</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-3 sm:py-6 lg:py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6 mb-3 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            {/* Profile Photo/Logo */}
            <div className="shrink-0 mx-auto sm:mx-0">
              <div className="relative">
                <img
                  src={
                    isOng && "logo" in profileData
                      ? (profileData.logo as string)
                      : "photo" in profileData
                        ? (profileData.photo as string)
                        : "/placeholder.svg"
                  }
                  alt={profileData.name}
                  className={`${isOng ? "w-20 h-20 sm:w-32 sm:h-32" : "w-18 h-18 sm:w-28 sm:h-28"} rounded-full object-cover border-4 border-orange-100`}
                />
                {isOwnProfile && (
                  <button className="absolute bottom-0 right-0 bg-orange-500 text-white p-1.5 sm:p-2 rounded-full hover:bg-orange-600 transition-colors">
                    <Camera className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 mb-2">
                <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900">{profileData.name}</h2>
                {isOng && "verified" in profileData && profileData.verified && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium mx-auto sm:mx-0 w-fit">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                    Verificado
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1 sm:gap-1.5 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4">
                <div className="flex items-center gap-1 justify-center sm:justify-start">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                  <span className="text-xs sm:text-sm">{profileData.location}</span>
                </div>
                <div className="flex items-center gap-1 justify-center sm:justify-start">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                  <span className="text-xs sm:text-sm">
                    Membro desde {new Date(profileData.memberSince).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>

              {isOng && "description" in profileData && (
                <div className="mb-3 sm:mb-6">
                  {/* Mobile: Collapsible header */}
                  <button
                    onClick={() => setShowAbout(!showAbout)}
                    className="w-full flex items-center justify-between sm:hidden mb-2 p-2 bg-gray-50 rounded-lg"
                  >
                    <h3 className="text-sm font-semibold text-gray-900">Sobre a ONG</h3>
                    {showAbout ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {/* Desktop: Always visible */}
                  <h3 className="hidden sm:block text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                    Sobre a ONG
                  </h3>

                  {/* Content - collapsible on mobile */}
                  <div className={`${showAbout ? "block" : "hidden"} sm:block`}>
                    <p className="text-xs sm:text-base text-gray-700 mb-2 sm:mb-4 leading-relaxed">
                      {String(profileData.description ?? "")}
                    </p>

                    {/* Institutional Information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4">
                      {"responsible" in profileData && (
                        <div className="flex items-start gap-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
                          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-0.5">Responsável</p>
                            <p className="text-xs sm:text-sm font-semibold text-gray-900">
                              {String(profileData.responsible ?? "")}
                            </p>
                          </div>
                        </div>
                      )}
                      {"address" in profileData && (
                        <div className="flex items-start gap-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
                          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-0.5">Endereço</p>
                            <p className="text-xs sm:text-sm font-semibold text-gray-900">
                              {String(profileData.address ?? "")}
                            </p>
                          </div>
                        </div>
                      )}
                      {"hours" in profileData && (
                        <div className="flex items-start gap-2 p-2 sm:p-3 bg-gray-50 rounded-lg sm:col-span-2">
                          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-0.5">Horário de Funcionamento</p>
                            <p className="text-xs sm:text-sm font-semibold text-gray-900">
                              {String(profileData.hours ?? "")}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-gray-200 pt-2 sm:pt-4">
                      {/* Mobile: Collapsible header */}
                      <button
                        onClick={() => setShowContact(!showContact)}
                        className="w-full flex items-center justify-between sm:hidden mb-2 p-2 bg-gray-50 rounded-lg"
                      >
                        <h4 className="text-xs font-semibold text-gray-900">Informações de Contato</h4>
                        {showContact ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {/* Desktop: Always visible */}
                      <h4 className="hidden sm:block text-sm font-semibold text-gray-900 mb-3">
                        Informações de Contato
                      </h4>

                      <div
                        className={`${showContact ? "grid" : "hidden"} sm:grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-2.5`}
                      >
                        {profileData.contact.phone && (
                          <a
                            href={`tel:${profileData.contact.phone}`}
                            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                          >
                            <div className="bg-blue-500 p-1.5 sm:p-2 rounded-lg group-hover:bg-blue-600 transition-colors shrink-0">
                              <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs text-blue-600 font-medium">Telefone</p>
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                                {profileData.contact.phone}
                              </p>
                            </div>
                          </a>
                        )}
                        {"whatsapp" in profileData.contact && profileData.contact.whatsapp && (
                          <a
                            href={`https://wa.me/${profileData.contact.whatsapp.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
                          >
                            <div className="bg-green-500 p-1.5 sm:p-2 rounded-lg group-hover:bg-green-600 transition-colors shrink-0">
                              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs text-green-600 font-medium">WhatsApp</p>
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                                {profileData.contact.whatsapp}
                              </p>
                            </div>
                          </a>
                        )}
                        {profileData.contact.email && (
                          <a
                            href={`mailto:${profileData.contact.email}`}
                            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors group xs:col-span-2"
                          >
                            <div className="bg-orange-500 p-1.5 sm:p-2 rounded-lg group-hover:bg-orange-600 transition-colors shrink-0">
                              <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs text-orange-600 font-medium">E-mail</p>
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                                {profileData.contact.email}
                              </p>
                            </div>
                          </a>
                        )}
                        {"website" in profileData.contact && profileData.contact.website && (
                          <a
                            href={`https://${profileData.contact.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
                          >
                            <div className="bg-purple-500 p-1.5 sm:p-2 rounded-lg group-hover:bg-purple-600 transition-colors shrink-0">
                              <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs text-purple-600 font-medium">Website</p>
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                                {profileData.contact.website}
                              </p>
                            </div>
                          </a>
                        )}
                        {profileData.contact.instagram && (
                          <a
                            href={`https://instagram.com/${profileData.contact.instagram.replace("@", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors group"
                          >
                            <div className="bg-pink-500 p-1.5 sm:p-2 rounded-lg group-hover:bg-pink-600 transition-colors shrink-0">
                              <Instagram className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs text-pink-600 font-medium">Instagram</p>
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                                {profileData.contact.instagram}
                              </p>
                            </div>
                          </a>
                        )}
                        {"facebook" in profileData.contact && profileData.contact.facebook && (
                          <a
                            href={`https://facebook.com/${profileData.contact.facebook}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group xs:col-span-2"
                          >
                            <div className="bg-blue-600 p-1.5 sm:p-2 rounded-lg group-hover:bg-blue-700 transition-colors shrink-0">
                              <Facebook className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs text-blue-600 font-medium">Facebook</p>
                              <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                                {profileData.contact.facebook}
                              </p>
                            </div>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* {!isOng && "bio" in profileData && profileData.bio && (
                <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">{profileData.bio}</p>
              )} */}

              {!isOng && (
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center sm:justify-start mb-3 sm:mb-4">
                  {profileData.contact.phone && (
                    <a
                      href={`tel:${profileData.contact.phone}`}
                      className="flex items-center gap-1 text-xs sm:text-sm text-blue-600 hover:text-blue-700"
                    >
                      <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">{profileData.contact.phone}</span>
                    </a>
                  )}
                  {profileData.contact.email && (
                    <a
                      href={`mailto:${profileData.contact.email}`}
                      className="flex items-center gap-1 text-xs sm:text-sm text-blue-600 hover:text-blue-700"
                    >
                      <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">{profileData.contact.email}</span>
                    </a>
                  )}
                  {profileData.contact.instagram && (
                    <a
                      href={`https://instagram.com/${profileData.contact.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs sm:text-sm text-blue-600 hover:text-blue-700"
                    >
                      <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">{profileData.contact.instagram}</span>
                    </a>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 justify-center sm:justify-start">
                {isOwnProfile ? (
                  <>
                    <button className="flex items-center justify-center gap-1.5 px-2 sm:px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-xs sm:text-sm col-span-2 sm:col-span-1">
                      <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Editar Perfil</span>
                      <span className="xs:hidden">Editar</span>
                    </button>
                    <button className="flex items-center justify-center gap-1.5 px-2 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs sm:text-sm">
                      <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Configurações</span>
                      <span className="xs:hidden">Config</span>
                    </button>
                    <button className="flex items-center justify-center gap-1.5 px-2 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs sm:text-sm">
                      <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Sair
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex items-center justify-center gap-1.5 px-2 sm:px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-xs sm:text-sm col-span-2 sm:col-span-1">
                      <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Enviar Mensagem</span>
                      <span className="xs:hidden">Mensagem</span>
                    </button>
                    <button className="flex items-center justify-center gap-1.5 px-2 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs sm:text-sm">
                      <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Seguir
                    </button>
                    <button className="flex items-center justify-center gap-1.5 px-2 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs sm:text-sm">
                      <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Compartilhar</span>
                      <span className="xs:hidden">Share</span>
                    </button>
                    <button className="flex items-center justify-center gap-1.5 px-2 sm:px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-xs sm:text-sm col-span-2 sm:col-span-1">
                      <Flag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Denunciar
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="mt-3 sm:mt-6 pt-3 sm:pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
              {!isOng && "stats" in profileData && "posts" in profileData.stats && (
                <>
                  <div className="text-center p-2 sm:p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600">
                      {(profileData.stats as any).posts}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Posts</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
                      {(profileData.stats as any).animalsHelped}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Animais Ajudados</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-yellow-50 rounded-lg col-span-2 sm:col-span-1">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                      {(profileData.stats as any).reputation}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Reputação</div>
                  </div>
                </>
              )}

              {isOng && "stats" in profileData && (
                <>
                  <div className="text-center p-2 sm:p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600">
                      {profileData.stats.availableAnimals}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Para Adoção</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">
                      {profileData.stats.adoptionsCompleted}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Adoções</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
                      {profileData.stats.animalsRescued}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Resgates</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">
                      {profileData.stats.capacity.current}/{profileData.stats.capacity.max}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Capacidade</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-yellow-50 rounded-lg">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                      {profileData.stats.rating}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">Avaliação</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Gallery (ONG only) */}
        {isOng && "gallery" in profileData && profileData.gallery.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6 mb-3 sm:mb-6">
            <h3 className="text-sm sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-4">Galeria de Fotos</h3>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {(profileData.gallery as string[]).map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-md">
                  <img
                    src={dogadotado}
                    alt={`Galeria ${index + 1}`}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="flex min-w-max sm:min-w-0">
              {!isOng ? (
                <>
                  <button
                    onClick={() => setActiveTab("posts")}
                    className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                      activeTab === "posts"
                        ? "text-orange-600 border-b-2 border-orange-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Meus Posts
                  </button>
                  <button
                    onClick={() => setActiveTab("animals")}
                    className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                      activeTab === "animals"
                        ? "text-orange-600 border-b-2 border-orange-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Meus Animais
                  </button>
                  {isOwnProfile && (
                    <button
                      onClick={() => setActiveTab("favorites")}
                      className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                        activeTab === "favorites"
                          ? "text-orange-600 border-b-2 border-orange-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      Favoritos
                    </button>
                  )}
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                      activeTab === "reviews"
                        ? "text-orange-600 border-b-2 border-orange-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Avaliações
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setActiveTab("adoption")}
                    className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                      activeTab === "adoption"
                        ? "text-orange-600 border-b-2 border-orange-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Para Adoção
                  </button>
                  <button
                    onClick={() => setActiveTab("posts")}
                    className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                      activeTab === "posts"
                        ? "text-orange-600 border-b-2 border-orange-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Publicações
                  </button>
                  <button
                    onClick={() => setActiveTab("completed")}
                    className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                      activeTab === "completed"
                        ? "text-orange-600 border-b-2 border-orange-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Adoções Concluídas
                  </button>
                  <button
                    onClick={() => setActiveTab("help")}
                    className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                      activeTab === "help"
                        ? "text-orange-600 border-b-2 border-orange-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Como Ajudar
                  </button>
                  <button
                    onClick={() => setActiveTab("reviews")}
                    className={`flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                      activeTab === "reviews"
                        ? "text-orange-600 border-b-2 border-orange-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Avaliações
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-3 sm:p-6">
            {activeTab === "posts" && (
              <div className="text-center py-8 sm:py-12">
                <PawPrint className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-gray-500">Nenhuma publicação ainda</p>
              </div>
            )}

            {activeTab === "animals" && (
              <div className="text-center py-8 sm:py-12">
                <PawPrint className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-gray-500">Nenhum animal cadastrado</p>
              </div>
            )}

            {activeTab === "favorites" && (
              <div className="text-center py-8 sm:py-12">
                <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-gray-500">Nenhum favorito salvo</p>
              </div>
            )}

            {activeTab === "adoption" && (
              <div className="text-center py-8 sm:py-12">
                <PawPrint className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-gray-500">Nenhum animal disponível para adoção</p>
              </div>
            )}

            {activeTab === "completed" && (
              <div className="text-center py-8 sm:py-12">
                <Award className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-gray-500">Nenhuma adoção concluída ainda</p>
              </div>
            )}

            {activeTab === "help" && (
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-orange-50 p-4 sm:p-6 rounded-lg">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                    Faça uma Doação
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
                    Sua contribuição ajuda a manter nosso trabalho de resgate e cuidado com os animais.
                  </p>
                  <div className="bg-white p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm font-medium text-gray-900 mb-1">PIX:</p>
                    <p className="text-xs sm:text-sm text-gray-700 font-mono">contato@amigosdosanimais.org</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    Seja Voluntário
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
                    Ajude-nos com seu tempo e dedicação. Entre em contato para saber como participar.
                  </p>
                  <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm">
                    Quero ser Voluntário
                  </button>
                </div>

                <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Necessidades Atuais</h4>
                  <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700">
                    <li>• Ração para cães (adultos e filhotes)</li>
                    <li>• Ração para gatos</li>
                    <li>• Medicamentos veterinários</li>
                    <li>• Cobertores e toalhas</li>
                    <li>• Produtos de limpeza</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="text-center py-8 sm:py-12">
                <Star className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-gray-500">Nenhuma avaliação ainda</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
