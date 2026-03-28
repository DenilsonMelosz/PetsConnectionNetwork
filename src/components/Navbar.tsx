import { useState, useRef, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Bell, Search, User, X, PawPrint, Calendar, Wrench, Menu, LogOut, HelpCircle, Settings } from "lucide-react"

// --- Tipos ---
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

interface NavbarProps {
  logo?: string
  notifications?: Notification[]
  onMarkAllRead?: () => void
  user?: UserProfile
}

// Usuario padrao nao logado
const defaultUser: UserProfile = {
  isLoggedIn: false,
  name: "",
  avatar: "",
  email: ""
}

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

  // Mobile: usar fullscreen modal
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

  // Desktop: dropdown
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

      {/* Lista */}
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

// --- Navbar Principal ---
export default function Navbar({ logo, notifications = [], onMarkAllRead, user = defaultUser }: NavbarProps) {
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
            {logo ? (
              <img src={logo} alt="Logo" className="h-8 w-auto" />
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-200">
                  <PawPrint className="w-6 h-6 text-white" />
                </div>
                <div className="hidden sm:block">
                  <span className="font-bold text-gray-900 text-lg">Pet</span>
                  <span className="font-bold text-orange-500 text-lg">Connect</span>
                </div>
              </div>
            )}
          </Link>

          {/* Navegacao Desktop com hover emoji */}
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
                onClick={() => user.isLoggedIn ? setShowProfileDropdown(!showProfileDropdown) : undefined}
                className="p-1.5 hover:bg-orange-50 rounded-full transition-colors"
              >
                {user.isLoggedIn ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-200"
                  />
                ) : (
                  <Link to="/login" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </Link>
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