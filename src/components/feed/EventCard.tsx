import { Calendar, MapPin, Clock, Users } from "lucide-react"
import { BaseCard, CardBody, Badge } from "./BaseCard"
import { ImageCarousel } from "./ImageCarousel"

export interface EventData {
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
  link?: string
  contact?: string
}

interface EventCardProps {
  event: EventData
  onClick?: () => void
  compact?: boolean
}

const typeLabels: Record<EventData["type"], string> = {
  adocao: "Adocao",
  veterinario: "Veterinario",
  feira: "Feira",
  workshop: "Workshop",
  outro: "Outro"
}

const typeColors: Record<EventData["type"], "success" | "info" | "warning" | "orange" | "default"> = {
  adocao: "success",
  veterinario: "info",
  feira: "warning",
  workshop: "orange",
  outro: "default"
}

export function EventCard({ event, onClick, compact = false }: EventCardProps) {
  if (compact) {
    return (
      <BaseCard onClick={onClick} className="flex items-center gap-3 p-3">
        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
          <img 
            src={event.images[0]} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant={typeColors[event.type]} size="sm">
              {typeLabels[event.type]}
            </Badge>
          </div>
          <h3 className="font-semibold text-gray-900 text-sm truncate">{event.title}</h3>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
            <Calendar className="w-3 h-3" />
            {event.date} - {event.time}
          </p>
        </div>
      </BaseCard>
    )
  }

  return (
    <BaseCard onClick={onClick}>
      <ImageCarousel images={event.images} alt={event.title} aspectRatio="video" />
      
      <CardBody>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant={typeColors[event.type]}>{typeLabels[event.type]}</Badge>
        </div>

        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">{event.title}</h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-orange-500" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-orange-500" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span className="truncate">{event.location}, {event.city}</span>
          </div>
          {event.attendees && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4 text-orange-500" />
              <span>{event.attendees} interessados</span>
            </div>
          )}
        </div>
      </CardBody>
    </BaseCard>
  )
}
