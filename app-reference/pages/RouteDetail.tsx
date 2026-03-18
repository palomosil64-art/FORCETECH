import { ArrowLeft, Clock, MapPin, Leaf, Bus, Navigation2 } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { HeatIndicator } from "../components/HeatIndicator";
import { Button } from "../components/ui/button";
import { useNavigate, useParams } from "react-router";

export function RouteDetail() {
  const navigate = useNavigate();
  const { routeId } = useParams();

  const routeSteps = [
    {
      id: 1,
      type: "walk",
      description: "Camina a Parada Sonora & Morelia",
      duration: "3 min",
      distance: "120m",
      hasShade: true,
      isEco: true,
    },
    {
      id: 2,
      type: "wait",
      description: "Espera Ruta 12",
      duration: "5 min",
      waitTime: "Próximo camión en 5 min",
      isEco: true,
    },
    {
      id: 3,
      type: "bus",
      description: "Toma Ruta 12 hacia Centro",
      duration: "25 min",
      stops: 8,
    },
    {
      id: 4,
      type: "walk",
      description: "Camina a destino",
      duration: "2 min",
      distance: "80m",
      hasShade: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h2>Ruta 12 - Vía Sonora</h2>
            <p className="text-sm opacity-90">Mejor opción con menor exposición</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 bg-primary-foreground/10 rounded-lg p-3">
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs opacity-80">Duración</span>
            </div>
            <p>35 min</p>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Leaf className="w-4 h-4" />
              <span className="text-xs opacity-80">Comodidad</span>
            </div>
            <p>4/5</p>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              <span className="text-xs opacity-80">Exposición</span>
            </div>
            <HeatIndicator level="low" showLabel={true} />
          </div>
        </div>
      </div>

      {/* Map preview */}
      <div className="h-48 bg-[#f5f0e8] relative border-b-2 border-border">
        <div className="absolute inset-0 overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 600 300" preserveAspectRatio="xMidYMid slice">
            {/* Grid pattern */}
            <defs>
              <pattern id="grid-detail" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#d4c8b4" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="600" height="300" fill="url(#grid-detail)" />

            {/* Streets */}
            {/* Boulevard Colosio */}
            <line x1="0" y1="100" x2="600" y2="100" stroke="#8b7355" strokeWidth="4" opacity="0.5" />
            <text x="300" y="95" fill="#6d5a47" fontSize="9" textAnchor="middle">Blvd. Colosio</text>

            {/* Avenida Sonora */}
            <line x1="150" y1="0" x2="152" y2="300" stroke="#8b7355" strokeWidth="4" opacity="0.5" />
            <text x="165" y="150" fill="#6d5a47" fontSize="9" textAnchor="start">Av. Sonora</text>

            {/* Calle Morelia */}
            <line x1="250" y1="0" x2="252" y2="300" stroke="#9c8670" strokeWidth="3" opacity="0.4" />
            <text x="260" y="150" fill="#7a6f5d" fontSize="8" textAnchor="start">Morelia</text>

            {/* Boulevard Morelos */}
            <line x1="450" y1="0" x2="452" y2="300" stroke="#8b7355" strokeWidth="4" opacity="0.5" />
            <text x="460" y="150" fill="#6d5a47" fontSize="9" textAnchor="start">Blvd. Morelos</text>

            {/* Rosales */}
            <line x1="0" y1="200" x2="600" y2="200" stroke="#8b7355" strokeWidth="3" opacity="0.5" />
            <text x="300" y="195" fill="#6d5a47" fontSize="8" textAnchor="middle">Rosales</text>

            {/* Route path highlighted */}
            <path
              d="M 100 80 L 160 110 L 250 120 L 350 150 L 450 180 L 500 210"
              stroke="#8bc34a"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="0"
            />
            
            {/* Direction arrows along route */}
            <path d="M 200 115 l 5 -3 l 0 6 z" fill="#8bc34a" />
            <path d="M 300 135 l 5 -3 l 0 6 z" fill="#8bc34a" />
            <path d="M 400 165 l 5 -3 l 0 6 z" fill="#8bc34a" />

            {/* Eco stops along route */}
            <circle cx="160" cy="110" r="8" fill="#4caf50" stroke="white" strokeWidth="3" />
            <circle cx="350" cy="150" r="8" fill="#4caf50" stroke="white" strokeWidth="3" />
            
            {/* Regular stops */}
            <circle cx="250" cy="120" r="6" fill="#e67e22" stroke="white" strokeWidth="2" />
            <circle cx="450" cy="180" r="6" fill="#e67e22" stroke="white" strokeWidth="2" />

            {/* Start marker */}
            <g>
              <circle cx="100" cy="80" r="10" fill="#42a5f5" stroke="white" strokeWidth="3" />
              <text x="100" y="65" fill="#42a5f5" fontSize="10" textAnchor="middle" fontWeight="600">Inicio</text>
            </g>

            {/* End marker */}
            <g>
              <circle cx="500" cy="210" r="10" fill="#e67e22" stroke="white" strokeWidth="3" />
              <text x="500" y="230" fill="#e67e22" fontSize="10" textAnchor="middle" fontWeight="600">Destino</text>
            </g>

            {/* Shaded areas indicator */}
            <rect x="140" y="95" width="40" height="30" fill="#8bc34a" opacity="0.1" rx="3" />
            <rect x="330" y="135" width="50" height="30" fill="#8bc34a" opacity="0.1" rx="3" />
          </svg>

          {/* Legend */}
          <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#42a5f5] rounded-full"></div>
                <span>Inicio</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#4caf50] rounded-full"></div>
                <span>Eco</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-[#e67e22] rounded-full"></div>
                <span>Destino</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Route steps */}
      <div className="flex-1 p-4">
        <h3 className="mb-4">Recorrido paso a paso</h3>
        
        <div className="space-y-1">
          {routeSteps.map((step, index) => (
            <div key={step.id} className="flex gap-3">
              {/* Timeline */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.type === "bus" ? "bg-primary text-primary-foreground" :
                  step.isEco ? "bg-[#4caf50] text-white" : "bg-muted text-foreground"
                }`}>
                  {step.type === "walk" && <Navigation2 className="w-5 h-5" />}
                  {step.type === "wait" && <Clock className="w-5 h-5" />}
                  {step.type === "bus" && <Bus className="w-5 h-5" />}
                </div>
                {index < routeSteps.length - 1 && (
                  <div className="w-0.5 h-16 bg-border my-1"></div>
                )}
              </div>

              {/* Step content */}
              <div className="flex-1 pb-4">
                <div className="bg-card border border-border rounded-lg p-3">
                  <div className="flex items-start justify-between mb-1">
                    <p className="flex-1">{step.description}</p>
                    <span className="text-sm text-muted-foreground ml-2">{step.duration}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                    {step.distance && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {step.distance}
                      </span>
                    )}
                    {step.hasShade && (
                      <span className="text-[#4caf50] bg-[#4caf50]/10 px-2 py-0.5 rounded-full text-xs">
                        Con sombra
                      </span>
                    )}
                    {step.isEco && (
                      <span className="text-[#4caf50] bg-[#4caf50]/10 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                        <Leaf className="w-3 h-3" />
                        Parada ecológica
                      </span>
                    )}
                    {step.waitTime && (
                      <span className="text-primary">{step.waitTime}</span>
                    )}
                    {step.stops && (
                      <span>{step.stops} paradas</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button className="w-full mt-6" size="lg">
          Iniciar navegación
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}