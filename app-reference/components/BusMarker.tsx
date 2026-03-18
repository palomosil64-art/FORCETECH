import { Bus } from "lucide-react";

interface BusMarkerProps {
  routeNumber: string;
  color: string;
  position: { top: string; left: string };
  rotation?: number;
  occupancy?: "low" | "medium" | "high";
}

export function BusMarker({ routeNumber, color, position, rotation = 0, occupancy = "low" }: BusMarkerProps) {
  const occupancyColors = {
    low: "#8bc34a",
    medium: "#ffa726",
    high: "#ef5350",
  };

  return (
    <div
      className="absolute transition-all duration-1000 ease-linear"
      style={{
        top: position.top,
        left: position.left,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
    >
      {/* Bus icon container */}
      <div className="relative group cursor-pointer">
        <div
          className="w-10 h-10 rounded-lg shadow-lg flex items-center justify-center border-2 border-white"
          style={{ backgroundColor: color }}
        >
          <Bus className="w-5 h-5 text-white" />
        </div>
        
        {/* Route number badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full border-2 border-white shadow-md flex items-center justify-center">
          <span className="text-xs font-bold" style={{ color }}>{routeNumber}</span>
        </div>

        {/* Occupancy indicator */}
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white"
          style={{ backgroundColor: occupancyColors[occupancy] }}
        ></div>

        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-foreground text-background rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm pointer-events-none z-10">
          <div className="text-center">
            <div className="font-bold">Ruta {routeNumber}</div>
            <div className="text-xs mt-1">
              Ocupación: {occupancy === "low" ? "Baja" : occupancy === "medium" ? "Media" : "Alta"}
            </div>
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
        </div>
      </div>
    </div>
  );
}
