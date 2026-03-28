interface AuthFooterProps {
  showTerms?: boolean
}

export function AuthFooter({ showTerms = true }: AuthFooterProps) {
  return (
    <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-200">
      <div className="text-center space-y-1 sm:space-y-2">
        {showTerms && (
          <div className="flex items-center justify-center gap-3 text-xs">
            <a href="/termos-de-uso" className="text-gray-500 hover:text-orange-500 transition-colors">
              Termos de Uso
            </a>
            <span className="text-gray-300">•</span>
            <a href="/politica-de-privacidade" className="text-gray-500 hover:text-orange-500 transition-colors">
              Política de Privacidade
            </a>
          </div>
        )}
        <p className="text-xs text-gray-400">© 2026 Pets Connection Network</p>
      </div>
    </div>
  )
}
