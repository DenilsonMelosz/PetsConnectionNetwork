import { MapPin, Phone, Star, MessageCircle } from "lucide-react"
import { BaseCard, CardBody, Badge } from "./BaseCard"

export interface ServiceData {
  id: number
  name: string
  type: "passeador" | "adestrador" | "banho_tosa" | "veterinario" | "pet_sitter" | "outro"
  description: string
  location: string
  city: string
  contact?: string
  whatsapp?: string
  rating?: number
  reviewsCount?: number
  price?: string
  image?: string
  verified?: boolean
}

interface ServiceCardProps {
  service: ServiceData
  onClick?: () => void
}

const typeLabels: Record<ServiceData["type"], string> = {
  passeador: "Passeador",
  adestrador: "Adestrador",
  banho_tosa: "Banho e Tosa",
  veterinario: "Veterinario",
  pet_sitter: "Pet Sitter",
  outro: "Outro"
}

const typeColors: Record<ServiceData["type"], "success" | "info" | "warning" | "orange" | "default" | "error"> = {
  passeador: "success",
  adestrador: "info",
  banho_tosa: "warning",
  veterinario: "error",
  pet_sitter: "orange",
  outro: "default"
}

export function ServiceCard({ service, onClick }: ServiceCardProps) {
  return (
    <BaseCard onClick={onClick} className="flex flex-col sm:flex-row">
      {/* Image */}
      {service.image && (
        <div className="sm:w-32 sm:h-auto h-40 shrink-0">
          <img 
            src={service.image} 
            alt={service.name}
            className="w-full h-full object-cover sm:rounded-l-2xl sm:rounded-tr-none rounded-t-2xl"
          />
        </div>
      )}
      
      <CardBody className="flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={typeColors[service.type]}>{typeLabels[service.type]}</Badge>
            {service.verified && (
              <Badge variant="success" size="sm">Verificado</Badge>
            )}
          </div>
          {service.rating && (
            <div className="flex items-center gap-1 text-sm shrink-0">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium text-gray-900">{service.rating}</span>
              {service.reviewsCount && (
                <span className="text-gray-500">({service.reviewsCount})</span>
              )}
            </div>
          )}
        </div>

        <h3 className="font-bold text-gray-900 text-base mb-1">{service.name}</h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>

        <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span>{service.location}, {service.city}</span>
          </div>
          {service.price && (
            <span className="font-semibold text-orange-600">{service.price}</span>
          )}
        </div>

        {/* Contact Buttons */}
        <div className="flex items-center gap-2 mt-3">
          {service.whatsapp && (
            <a
              href={`https://wa.me/${service.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white rounded-full text-xs font-medium hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          )}
          {service.contact && (
            <a
              href={`tel:${service.contact}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              Ligar
            </a>
          )}
        </div>
      </CardBody>
    </BaseCard>
  )
}
