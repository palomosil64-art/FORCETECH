import { useState } from "react";
import { Search, Navigation, MapPin, Filter } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { HermosilloMap } from "../components/HermosilloMap";
import { MapFilters } from "../components/MapFilters";
import { QuickModeToggle } from "../components/QuickModeToggle";
import { Notification } from "../components/Notification";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";

type RouteId = "linea3" | "linea4" | "linea8";

const routeReviews = [
  {
    id: "linea3" as RouteId,
    routeName: "Línea 3 Monteverde",
    stars: 4,
    author: "Mariana R.",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Mariana",
    comment: "La Línea 3 es constante, pero necesitamos más unidades con aire activo en horas pico.",
  },
  {
    id: "linea4" as RouteId,
    routeName: "Línea 4 Centro",
    stars: 3,
    author: "César M.",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Cesar",
    comment: "Cumple en horario laboral, pero en la tarde la frecuencia baja y se siente la saturación.",
  },
  {
    id: "linea8" as RouteId,
    routeName: "Línea 8 Aeropuerto",
    stars: 5,
    author: "Gabriela T.",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Gabriela",
    comment: "Ruta muy útil para cruces largos. Cuando pasa, llega puntual y reduce trasbordos.",
  },
];

const stopReviews = [
  {
    id: "conv-1",
    type: "convencional",
    stopLabel: "Parada Convencional - Encinas",
    stars: 2,
    author: "Luis A.",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Luis",
    comment: "En esta parada el calor pega directo. A mediodía no hay sombra suficiente.",
  },
  {
    id: "conv-2",
    type: "convencional",
    stopLabel: "Parada Convencional - Rosales",
    stars: 2,
    author: "Ana P.",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Ana",
    comment: "La espera se vuelve pesada por el sol y el piso caliente. Falta confort térmico real.",
  },
  {
    id: "conv-3",
    type: "convencional",
    stopLabel: "Parada Convencional - Centro",
    stars: 1,
    author: "Jorge V.",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Jorge",
    comment: "Sin vegetación ni ventilación, esperar aquí en verano es muy difícil.",
  },
  {
    id: "eco-1",
    type: "ecoparada",
    stopLabel: "Ecoparada Inteligente - Sonora",
    stars: 5,
    author: "Diana C.",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Diana",
    comment: "Por fin una parada donde no te quemas esperando el camión. La sombra de las plantas sí hace diferencia.",
  },
  {
    id: "eco-2",
    type: "ecoparada",
    stopLabel: "Ecoparada Inteligente - Madero",
    stars: 5,
    author: "Ramón O.",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Ramon",
    comment: "Se nota el diseño técnico: el techo verde reduce calor y la espera es más cómoda.",
  },
  {
    id: "eco-3",
    type: "ecoparada",
    stopLabel: "Ecoparada Inteligente - Universidad",
    stars: 4,
    author: "Paola G.",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Paola",
    comment: "Más sombra, mejor aire y mejor iluminación. Se siente una infraestructura pensada para la gente.",
  },
];

function StarRow({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Calificación ${value} de 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`text-sm leading-none ${i < value ? "text-[#D35400]" : "text-[#D9D9D9]"}`}>
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({
  title,
  author,
  avatar,
  stars,
  comment,
  onClick,
  active,
}: {
  title: string;
  author: string;
  avatar: string;
  stars: number;
  comment: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left bg-white border-2 rounded-2xl p-4 shadow-sm transition-all ${
        active
          ? "border-[#D35400] ring-2 ring-[#D35400]/20"
          : "border-[#D35400] hover:shadow-md hover:-translate-y-0.5"
      }`}
    >
      <div className="flex items-start gap-3">
        <img src={avatar} alt={author} className="w-12 h-12 rounded-full object-cover border border-[#D35400]/35" />
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-wide text-[#6B7280] font-semibold">{title}</p>
          <p className="font-bold text-[#1E392A] leading-tight">{author}</p>
          <div className="mt-1">
            <StarRow value={stars} />
          </div>
          <p className="mt-2 text-sm text-[#374151] leading-relaxed">{comment}</p>
        </div>
      </div>
    </button>
  );
}

export function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isQuickMode, setIsQuickMode] = useState(true);
  const [showNotification, setShowNotification] = useState(true);
  const [showCitizenReviews, setShowCitizenReviews] = useState(false);
  const [activeRouteHighlight, setActiveRouteHighlight] = useState<RouteId | null>(null);
  const [mapFilters, setMapFilters] = useState({
    showRoutes: true,
    showEcoStops: true,
    showTraffic: false,
    showBuses: true,
  });

  const nearbyStops = [
    { id: "1", name: "Parada Sonora & Morelia", distance: "120m", isEco: true },
    { id: "2", name: "Parada Blvd. Luis Encinas", distance: "350m", isEco: false },
    { id: "3", name: "Parada Parque Madero", distance: "480m", isEco: true },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate("/route-selection", { state: { destination: searchQuery } });
    }
  };

  const handleFilterChange = (filter: string, value: boolean) => {
    setMapFilters(prev => ({ ...prev, [filter]: value }));
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 shadow-md z-20 relative">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-center flex-1">UNE SmartHeat</h1>
          <QuickModeToggle 
            isQuickMode={isQuickMode} 
            onToggle={() => setIsQuickMode(!isQuickMode)} 
          />
        </div>
        
        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="¿A dónde vas?"
              className="pl-10 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch} className="bg-secondary hover:bg-secondary/90">
            Buscar
          </Button>
        </div>
      </div>

      {/* Notification */}
      {showNotification && (
        <div className="px-4 pt-3 z-20 relative">
          <Notification 
            message="Temperatura actual: 42°C. Prefiere rutas con paradas ecológicas."
            type="warning"
            icon="shade"
            autoHide={false}
          />
        </div>
      )}

      {/* Map View */}
      <div className="flex-1 relative bg-[#f5f0e8]">
        <HermosilloMap 
          filters={mapFilters}
          highlightedRouteId={activeRouteHighlight}
          onStopClick={(stopId) => navigate(`/stop/${stopId}`)}
        />

        {/* Main actions */}
        <div className="absolute top-4 left-4 z-30 flex flex-wrap gap-2 max-w-[calc(100%-8rem)]">
          <Button className="rounded-full bg-[#D35400] hover:bg-[#B84400] text-white shadow-md">
            Ver una línea
          </Button>
          <Button className="rounded-full bg-[#D35400] hover:bg-[#B84400] text-white shadow-md">
            Crear viaje
          </Button>
          <Button className="rounded-full bg-[#D35400] hover:bg-[#B84400] text-white shadow-md">
            Reportar
          </Button>
          <button
            type="button"
            onClick={() => setShowCitizenReviews(true)}
            className="rounded-full px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wide text-white shadow-md bg-gradient-to-r from-[#F17A20] via-[#D35400] to-[#B84400]"
          >
            ¿Qué opinan los hermosillenses?
          </button>
        </div>

        {/* Map controls */}
        <div className="absolute top-4 right-4 space-y-3 z-30">
          <Button
            size="icon"
            variant={showFilters ? "default" : "outline"}
            className="rounded-full bg-white text-foreground shadow-lg hover:bg-white/90"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-5 h-5" />
          </Button>

          <Button
            size="icon"
            className="rounded-full bg-white text-foreground shadow-lg hover:bg-white/90"
          >
            <Navigation className="w-5 h-5" />
          </Button>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="absolute top-4 left-4 z-30 animate-in slide-in-from-left">
            <MapFilters 
              filters={mapFilters}
              onFilterChange={handleFilterChange}
            />
          </div>
        )}

        {/* Nearby stops panel */}
        <div className="absolute bottom-20 left-0 right-0 bg-white/95 backdrop-blur-sm rounded-t-3xl shadow-xl p-4 max-w-md mx-auto z-20">
          <h3 className="mb-3">Paradas cercanas</h3>
          <div className="space-y-2">
            {nearbyStops.map((stop) => (
              <button
                key={stop.id}
                onClick={() => navigate(`/stop/${stop.id}`)}
                className="w-full flex items-center justify-between p-3 bg-card rounded-lg hover:bg-muted/50 transition-colors border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${stop.isEco ? "bg-[#4caf50]" : "bg-primary"}`}></div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span>{stop.name}</span>
                      {stop.isEco && (
                        <span className="text-xs bg-[#4caf50]/10 text-[#4caf50] px-2 py-0.5 rounded-full">
                          Ecológica
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{stop.distance}</p>
                  </div>
                </div>
                <MapPin className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        <CitizenReviewsPanel
          isOpen={showCitizenReviews}
          onClose={() => {
            setShowCitizenReviews(false);
            setActiveRouteHighlight(null);
          }}
          onRouteFocus={(routeId) => {
            setActiveRouteHighlight(routeId);
            setMapFilters((prev) => ({ ...prev, showRoutes: true }));
          }}
          activeRouteId={activeRouteHighlight}
        />
      </div>

      <BottomNav />
    </div>
  );
}

function CitizenReviewsPanel({
  isOpen,
  onClose,
  onRouteFocus,
  activeRouteId,
}: {
  isOpen: boolean;
  onClose: () => void;
  onRouteFocus: (routeId: RouteId) => void;
  activeRouteId: RouteId | null;
}) {
  if (!isOpen) return null;

  const conventional = stopReviews.filter((review) => review.type === "convencional");
  const eco = stopReviews.filter((review) => review.type === "ecoparada");

  return (
    <div className="absolute inset-0 z-40">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <aside className="absolute top-0 right-0 h-full w-full max-w-2xl bg-[#FFFDFB] border-l border-[#D35400]/25 shadow-2xl overflow-y-auto">
        <div className="sticky top-0 bg-[#FFFDFB] border-b border-[#E5E7EB] p-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] font-bold text-[#D35400]">Percepción ciudadana</p>
            <h2 className="text-xl font-extrabold text-[#1E392A]">¿Qué opinan los hermosillenses?</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-[#D35400]/30 flex items-center justify-center text-[#D35400] hover:bg-[#D35400]/10"
          >
            <span className="text-lg leading-none">×</span>
          </button>
        </div>

        <div className="p-4 space-y-6">
          <section>
            <h3 className="text-sm uppercase tracking-wide text-[#1E392A] font-extrabold mb-3">Rutas y camiones</h3>
            <div className="space-y-3">
              {routeReviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  title={review.routeName}
                  author={review.author}
                  avatar={review.avatar}
                  stars={review.stars}
                  comment={review.comment}
                  onClick={() => onRouteFocus(review.id)}
                  active={activeRouteId === review.id}
                />
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm uppercase tracking-wide text-[#1E392A] font-extrabold mb-3">
              Paradas convencionales vs. ecoparadas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase font-bold tracking-wide text-[#7C2D12] mb-2">Paradas convencionales</p>
                <div className="space-y-3">
                  {conventional.map((review) => (
                    <ReviewCard
                      key={review.id}
                      title={review.stopLabel}
                      author={review.author}
                      avatar={review.avatar}
                      stars={review.stars}
                      comment={review.comment}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs uppercase font-bold tracking-wide text-[#14532D] mb-2">Ecoparadas inteligentes</p>
                <div className="space-y-3">
                  {eco.map((review) => (
                    <ReviewCard
                      key={review.id}
                      title={review.stopLabel}
                      author={review.author}
                      avatar={review.avatar}
                      stars={review.stars}
                      comment={review.comment}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}