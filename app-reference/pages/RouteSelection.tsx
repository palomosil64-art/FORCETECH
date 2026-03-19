import { useState } from "react";
import { ArrowLeft, MapPin } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { RouteCard } from "../components/RouteCard";
import { Button } from "../components/ui/button";
import { useNavigate, useLocation } from "react-router";

export function RouteSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.destination || "Centro de Hermosillo";

  const routes = [
    {
      id: "1",
      name: "Ruta 12 - Vía Sonora",
      duration: "35 min",
      arrivalTime: "14:45",
      heatLevel: "low" as const,
      comfortLevel: 4,
      isRecommended: true,
    },
    {
      id: "2",
      name: "Ruta 8 - Directo",
      duration: "28 min",
      arrivalTime: "14:38",
      heatLevel: "high" as const,
      comfortLevel: 2,
    },
    {
      id: "3",
      name: "Ruta 15 + Transbordo",
      duration: "42 min",
      arrivalTime: "14:52",
      heatLevel: "medium" as const,
      comfortLevel: 3,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2>Rutas disponibles</h2>
        </div>
        
        <div className="flex items-start gap-2 bg-primary-foreground/10 rounded-lg p-3">
          <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm opacity-80">Destino</p>
            <p>{destination}</p>
          </div>
        </div>
      </div>

      {/* Routes List */}
      <div className="flex-1 p-4 space-y-6">
        <div className="bg-accent/20 border border-accent/30 rounded-lg p-3 flex items-start gap-2">
          <div className="w-1 h-full bg-accent rounded-full"></div>
          <div>
            <p className="text-sm">
              💡 <strong>Tip de SmartHeat:</strong> La temperatura actual es de 42°C. 
              Te recomendamos rutas con más paradas ecológicas para reducir tu exposición al calor.
            </p>
          </div>
        </div>

        {routes.map((route) => (
          <RouteCard
            key={route.id}
            route={route}
            onClick={() => navigate(`/route-detail/${route.id}`)}
          />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
