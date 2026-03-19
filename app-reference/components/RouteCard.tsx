import { Clock, Leaf, TrendingUp } from "lucide-react";
import { HeatIndicator } from "./HeatIndicator";
import { Card } from "./ui/card";

interface RouteCardProps {
  route: {
    id: string;
    name: string;
    duration: string;
    arrivalTime: string;
    heatLevel: "low" | "medium" | "high";
    comfortLevel: number;
    isRecommended?: boolean;
  };
  onClick?: () => void;
}

export function RouteCard({ route, onClick }: RouteCardProps) {
  return (
    <Card
      className="p-4 cursor-pointer hover:shadow-md transition-shadow relative"
      onClick={onClick}
    >
      {route.isRecommended && (
        <div className="absolute -top-2 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          Mejor opción con menor exposición al calor
        </div>
      )}
      
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="mb-1">{route.name}</h3>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Clock className="w-4 h-4" />
            <span>{route.duration}</span>
            <span>•</span>
            <span>Llega a las {route.arrivalTime}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">Exposición:</span>
            <HeatIndicator level={route.heatLevel} showLabel={false} />
          </div>
          
          <div className="flex items-center gap-1">
            <Leaf className="w-4 h-4 text-[#4caf50]" />
            <span className="text-sm text-muted-foreground">
              Comodidad: {route.comfortLevel}/5
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
