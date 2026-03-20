import { useState, useEffect } from "react";
import { BusMarker } from "./BusMarker";
import { MapPin } from "lucide-react";

interface MapFiltersState {
  showRoutes: boolean;
  showEcoStops: boolean;
  showTraffic: boolean;
  showBuses: boolean;
}

interface HermosilloMapProps {
  filters: MapFiltersState;
  highlightedRouteId?: "linea3" | "linea4" | "linea8" | null;
  onStopClick?: (stopId: string) => void;
}

// Definir rutas exactas sobre las calles para cada camión
const busRoutes = {
  route12: [
    { x: 250, y: 150 }, // Colosio & Sonora
    { x: 320, y: 150 }, // Colosio & Morelia
    { x: 320, y: 220 }, // Morelia & Matamoros
    { x: 380, y: 220 }, // Matamoros & Serdán
    { x: 380, y: 280 }, // Serdán & Encinas
    { x: 450, y: 280 }, // Encinas & Yáñez
    { x: 450, y: 330 }, // Yáñez & Guerrero
    { x: 520, y: 330 }, // Guerrero & Morelos
  ],
  route8: [
    { x: 250, y: 280 }, // Encinas & Sonora
    { x: 320, y: 280 }, // Encinas & Morelia
    { x: 380, y: 280 }, // Encinas & Serdán
    { x: 450, y: 280 }, // Encinas & Yáñez
    { x: 520, y: 280 }, // Encinas & Morelos
    { x: 520, y: 380 }, // Morelos & Rosales
    { x: 520, y: 450 }, // Morelos Sur
  ],
  route15: [
    { x: 250, y: 380 }, // Rosales & Sonora
    { x: 320, y: 380 }, // Rosales & Morelia
    { x: 380, y: 380 }, // Rosales & Serdán
    { x: 380, y: 330 }, // Serdán & Guerrero
    { x: 450, y: 330 }, // Guerrero & Yáñez
    { x: 520, y: 330 }, // Guerrero & Morelos
    { x: 520, y: 420 }, // Morelos Sur
  ],
};

export function HermosilloMap({ filters, highlightedRouteId, onStopClick }: HermosilloMapProps) {
  const [buses, setBuses] = useState([
    { 
      id: "b1", 
      route: "12", 
      color: "#e67e22", 
      routePath: busRoutes.route12,
      currentIndex: 0,
      occupancy: "low" as const 
    },
    { 
      id: "b2", 
      route: "8", 
      color: "#8bc34a", 
      routePath: busRoutes.route8,
      currentIndex: 0,
      occupancy: "high" as const 
    },
    { 
      id: "b3", 
      route: "15", 
      color: "#f4a460", 
      routePath: busRoutes.route15,
      currentIndex: 0,
      occupancy: "medium" as const 
    },
  ]);

  // Mover camiones a lo largo de sus rutas definidas
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prevBuses => prevBuses.map(bus => {
        const nextIndex = (bus.currentIndex + 1) % bus.routePath.length;
        const currentPoint = bus.routePath[nextIndex];
        const prevPoint = bus.routePath[bus.currentIndex];
        
        // Calcular ángulo de rotación basado en dirección
        const angle = Math.atan2(
          currentPoint.y - prevPoint.y,
          currentPoint.x - prevPoint.x
        ) * (180 / Math.PI);
        
        return {
          ...bus,
          currentIndex: nextIndex,
          position: {
            top: `${(currentPoint.y / 600) * 100}%`,
            left: `${(currentPoint.x / 800) * 100}%`,
          },
          rotation: angle,
        };
      }));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const ecoStops = [
    { id: "1", name: "Sonora & Morelia", position: { top: "25%", left: "31.25%" }, street: { x: 250, y: 150 } },
    { id: "3", name: "Parque Madero", position: { top: "53%", left: "65%" }, street: { x: 520, y: 318 } },
    { id: "5", name: "Universidad", position: { top: "63.3%", left: "47.5%" }, street: { x: 380, y: 380 } },
  ];

  const regularStops = [
    { id: "2", name: "Blvd. Encinas", position: { top: "46.7%", left: "40%" }, street: { x: 320, y: 280 } },
    { id: "4", name: "Rosales Centro", position: { top: "46.7%", left: "56.25%" }, street: { x: 450, y: 280 } },
    { id: "6", name: "Serdán", position: { top: "63.3%", left: "31.25%" }, street: { x: 250, y: 380 } },
  ];

  const routeIsActive = (routeId: "linea3" | "linea4" | "linea8") =>
    !highlightedRouteId || highlightedRouteId === routeId;

  return (
    <div className="relative w-full h-full bg-[#e5e3df] overflow-hidden">
      {/* Base map - Google Maps style */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            {/* Patterns for realistic textures */}
            <pattern id="buildings" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="#d4d2ce" />
              <rect x="1" y="1" width="8" height="8" fill="#c8c6c2" />
              <rect x="11" y="1" width="8" height="8" fill="#c8c6c2" />
              <rect x="1" y="11" width="8" height="8" fill="#c8c6c2" />
              <rect x="11" y="11" width="8" height="8" fill="#c8c6c2" />
            </pattern>
            
            <filter id="shadow">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.2"/>
            </filter>
          </defs>

          {/* Background - urban area */}
          <rect width="800" height="600" fill="#e5e3df" />
          
          {/* City blocks pattern */}
          <rect x="50" y="50" width="700" height="500" fill="url(#buildings)" opacity="0.3" />

          {/* Parks and green areas */}
          <rect x="505" y="290" width="70" height="70" fill="#c8e6c9" rx="4" />
          <rect x="340" y="390" width="80" height="60" fill="#dcedc8" rx="4" />
          
          {/* Buildings - important landmarks */}
          {/* Downtown buildings */}
          <rect x="360" y="260" width="50" height="45" fill="#bdbdbd" stroke="#9e9e9e" strokeWidth="1" rx="2" />
          <rect x="370" y="265" width="10" height="15" fill="#90caf9" opacity="0.3" />
          <rect x="385" y="265" width="10" height="15" fill="#90caf9" opacity="0.3" />
          
          {/* Shopping area */}
          <rect x="480" y="260" width="35" height="30" fill="#bdbdbd" stroke="#9e9e9e" strokeWidth="1" rx="2" />
          
          {/* Residential blocks */}
          <rect x="200" y="120" width="30" height="25" fill="#d7ccc8" stroke="#bcaaa4" strokeWidth="1" rx="1" />
          <rect x="270" y="120" width="35" height="25" fill="#d7ccc8" stroke="#bcaaa4" strokeWidth="1" rx="1" />
          <rect x="200" y="350" width="30" height="25" fill="#d7ccc8" stroke="#bcaaa4" strokeWidth="1" rx="1" />
          <rect x="270" y="350" width="30" height="25" fill="#d7ccc8" stroke="#bcaaa4" strokeWidth="1" rx="1" />

          {/* Main Streets - realistic style */}
          
          {/* Boulevard Luis Donaldo Colosio (Horizontal - Norte) */}
          <line x1="50" y1="150" x2="750" y2="150" stroke="#ffffff" strokeWidth="16" opacity="1" />
          <line x1="50" y1="150" x2="750" y2="150" stroke="#f5d0a9" strokeWidth="14" opacity="1" />
          <line x1="50" y1="150" x2="750" y2="150" stroke="#ffeb3b" strokeWidth="1.5" strokeDasharray="10,10" opacity="0.7" />
          <text x="600" y="142" fill="#5d4037" fontSize="11" textAnchor="middle" fontWeight="600">
            Blvd. Luis D. Colosio
          </text>

          {/* Boulevard Luis Encinas (Horizontal - Centro) */}
          <line x1="50" y1="280" x2="750" y2="280" stroke="#ffffff" strokeWidth="16" opacity="1" />
          <line x1="50" y1="280" x2="750" y2="280" stroke="#f5d0a9" strokeWidth="14" opacity="1" />
          <line x1="50" y1="280" x2="750" y2="280" stroke="#ffeb3b" strokeWidth="1.5" strokeDasharray="10,10" opacity="0.7" />
          <text x="600" y="272" fill="#5d4037" fontSize="11" textAnchor="middle" fontWeight="600">
            Blvd. Luis Encinas
          </text>

          {/* Boulevard Rosales (Horizontal - Sur) */}
          <line x1="50" y1="380" x2="750" y2="380" stroke="#ffffff" strokeWidth="14" opacity="1" />
          <line x1="50" y1="380" x2="750" y2="380" stroke="#f5d0a9" strokeWidth="12" opacity="1" />
          <line x1="50" y1="380" x2="750" y2="380" stroke="#ffeb3b" strokeWidth="1.5" strokeDasharray="8,8" opacity="0.7" />
          <text x="600" y="372" fill="#5d4037" fontSize="10" textAnchor="middle" fontWeight="600">
            Rosales
          </text>

          {/* Avenida Sonora (Vertical - Oeste) */}
          <line x1="250" y1="50" x2="250" y2="550" stroke="#ffffff" strokeWidth="14" opacity="1" />
          <line x1="250" y1="50" x2="250" y2="550" stroke="#f5d0a9" strokeWidth="12" opacity="1" />
          <line x1="250" y1="50" x2="250" y2="550" stroke="#ffeb3b" strokeWidth="1.5" strokeDasharray="8,8" opacity="0.7" />
          <text x="262" y="100" fill="#5d4037" fontSize="10" textAnchor="start" fontWeight="600">
            Av. Sonora
          </text>

          {/* Avenida Serdán (Vertical - Centro) */}
          <line x1="380" y1="50" x2="380" y2="550" stroke="#ffffff" strokeWidth="14" opacity="1" />
          <line x1="380" y1="50" x2="380" y2="550" stroke="#f5d0a9" strokeWidth="12" opacity="1" />
          <line x1="380" y1="50" x2="380" y2="550" stroke="#ffeb3b" strokeWidth="1.5" strokeDasharray="8,8" opacity="0.7" />
          <text x="392" y="100" fill="#5d4037" fontSize="10" textAnchor="start" fontWeight="600">
            Serdán
          </text>

          {/* Boulevard Morelos (Vertical - Este) */}
          <line x1="520" y1="50" x2="520" y2="550" stroke="#ffffff" strokeWidth="14" opacity="1" />
          <line x1="520" y1="50" x2="520" y2="550" stroke="#f5d0a9" strokeWidth="12" opacity="1" />
          <line x1="520" y1="50" x2="520" y2="550" stroke="#ffeb3b" strokeWidth="1.5" strokeDasharray="8,8" opacity="0.7" />
          <text x="532" y="100" fill="#5d4037" fontSize="10" textAnchor="start" fontWeight="600">
            Blvd. Morelos
          </text>

          {/* Secondary streets */}
          {/* Calle Matamoros (Horizontal) */}
          <line x1="150" y1="220" x2="650" y2="220" stroke="#ffffff" strokeWidth="10" opacity="1" />
          <line x1="150" y1="220" x2="650" y2="220" stroke="#f0e6d2" strokeWidth="8" opacity="1" />
          <text x="500" y="214" fill="#6d6d6d" fontSize="9" textAnchor="middle">
            Matamoros
          </text>

          {/* Calle Guerrero (Horizontal) */}
          <line x1="150" y1="330" x2="650" y2="330" stroke="#ffffff" strokeWidth="10" opacity="1" />
          <line x1="150" y1="330" x2="650" y2="330" stroke="#f0e6d2" strokeWidth="8" opacity="1" />
          <text x="500" y="324" fill="#6d6d6d" fontSize="9" textAnchor="middle">
            Guerrero
          </text>

          {/* Calle Morelia (Vertical) */}
          <line x1="320" y1="100" x2="320" y2="500" stroke="#ffffff" strokeWidth="10" opacity="1" />
          <line x1="320" y1="100" x2="320" y2="500" stroke="#f0e6d2" strokeWidth="8" opacity="1" />
          <text x="328" y="200" fill="#6d6d6d" fontSize="9" textAnchor="start">
            Morelia
          </text>

          {/* Calle Yáñez (Vertical) */}
          <line x1="450" y1="100" x2="450" y2="500" stroke="#ffffff" strokeWidth="10" opacity="1" />
          <line x1="450" y1="100" x2="450" y2="500" stroke="#f0e6d2" strokeWidth="8" opacity="1" />
          <text x="458" y="200" fill="#6d6d6d" fontSize="9" textAnchor="start">
            Yáñez
          </text>

          {/* Landmarks labels */}
          {/* Parque Madero */}
          <text x="540" y="320" fill="#2e7d32" fontSize="10" textAnchor="middle" fontWeight="700">
            Parque
          </text>
          <text x="540" y="332" fill="#2e7d32" fontSize="10" textAnchor="middle" fontWeight="700">
            Madero
          </text>

          {/* Centro marker */}
          <circle cx="380" cy="280" r="40" fill="none" stroke="#d35400" strokeWidth="2" strokeDasharray="4,4" opacity="0.4" />
          <text x="380" y="245" fill="#d35400" fontSize="11" textAnchor="middle" fontWeight="700">
            Centro
          </text>

          {/* Universidad de Sonora */}
          <text x="380" y="415" fill="#1565c0" fontSize="10" textAnchor="middle" fontWeight="700">
            Universidad
          </text>
          <text x="380" y="427" fill="#1565c0" fontSize="10" textAnchor="middle" fontWeight="700">
            de Sonora
          </text>

          {/* Bus Routes overlay - drawn over streets */}
          {filters.showRoutes && (
            <>
              {/* Ruta 12 - siguiendo las calles exactas */}
              <path
                d="M 250 150 L 320 150 L 320 220 L 380 220 L 380 280 L 450 280 L 450 330 L 520 330"
                stroke="#e67e22"
                strokeWidth={routeIsActive("linea3") ? 8 : 4}
                fill="none"
                opacity={routeIsActive("linea3") ? 0.95 : 0.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Ruta 8 - siguiendo las calles exactas */}
              <path
                d="M 250 280 L 320 280 L 380 280 L 450 280 L 520 280 L 520 380 L 520 450"
                stroke="#8bc34a"
                strokeWidth={routeIsActive("linea8") ? 8 : 4}
                fill="none"
                opacity={routeIsActive("linea8") ? 0.95 : 0.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Ruta 15 - siguiendo las calles exactas */}
              <path
                d="M 250 380 L 320 380 L 380 380 L 380 330 L 450 330 L 520 330 L 520 420"
                stroke="#f4a460"
                strokeWidth={routeIsActive("linea4") ? 8 : 4}
                fill="none"
                opacity={routeIsActive("linea4") ? 0.95 : 0.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}

          {/* Traffic indicators - on specific street segments */}
          {filters.showTraffic && (
            <>
              {/* Traffic segment - high (Centro congestionado) */}
              <line x1="320" y1="280" x2="450" y2="280" stroke="#ef5350" strokeWidth="8" opacity="0.9" strokeLinecap="round" />
              
              {/* Traffic segment - medium */}
              <line x1="250" y1="150" x2="380" y2="150" stroke="#ffa726" strokeWidth="8" opacity="0.9" strokeLinecap="round" />
              
              {/* Traffic segment - low */}
              <line x1="520" y1="200" x2="520" y2="330" stroke="#8bc34a" strokeWidth="8" opacity="0.9" strokeLinecap="round" />
            </>
          )}
        </svg>
      </div>

      {/* Eco stops markers */}
      {filters.showEcoStops && ecoStops.map((stop) => (
        <div
          key={stop.id}
          className="absolute transition-transform hover:scale-110 cursor-pointer group z-10"
          style={{
            top: stop.position.top,
            left: stop.position.left,
            transform: "translate(-50%, -50%)",
          }}
          onClick={() => onStopClick?.(stop.id)}
        >
          <div className="w-9 h-9 bg-[#4caf50] rounded-full border-4 border-white shadow-lg flex items-center justify-center relative">
            <MapPin className="w-4 h-4 text-white" />
            {/* Pulse animation */}
            <div className="absolute inset-0 bg-[#4caf50] rounded-full animate-ping opacity-30"></div>
          </div>
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-foreground text-background rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs pointer-events-none z-20">
            {stop.name}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
          </div>
        </div>
      ))}

      {/* Regular stops markers */}
      {regularStops.map((stop) => (
        <div
          key={stop.id}
          className="absolute transition-transform hover:scale-110 cursor-pointer group z-10"
          style={{
            top: stop.position.top,
            left: stop.position.left,
            transform: "translate(-50%, -50%)",
          }}
          onClick={() => onStopClick?.(stop.id)}
        >
          <div className="w-7 h-7 bg-primary rounded-full border-3 border-white shadow-md relative">
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-foreground text-background rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs pointer-events-none z-20">
              {stop.name}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
            </div>
          </div>
        </div>
      ))}

      {/* Bus markers - now moving along streets */}
      {filters.showBuses && buses.map((bus) => (
        <BusMarker
          key={bus.id}
          routeNumber={bus.route}
          color={bus.color}
          position={bus.position || { top: "50%", left: "50%" }}
          rotation={bus.rotation || 0}
          occupancy={bus.occupancy}
        />
      ))}

      {/* User location */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative">
          <div className="absolute w-16 h-16 bg-[#42a5f5]/20 rounded-full animate-pulse"></div>
          <div className="relative w-4 h-4 bg-[#42a5f5] rounded-full border-2 border-white shadow-lg"></div>
        </div>
      </div>
    </div>
  );
}