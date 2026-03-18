import { ArrowLeft, MapPin, Leaf, Wind, Armchair, TreePine, Star, AlertCircle } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { Button } from "../components/ui/button";
import { useNavigate, useParams } from "react-router";
import { Progress } from "../components/ui/progress";

export function StopInfo() {
  const navigate = useNavigate();
  const { stopId } = useParams();

  const stopData = {
    name: "Parada Sonora & Morelia",
    address: "Blvd. Luis Donaldo Colosio esquina con Morelia",
    distance: "120m de tu ubicación",
    isEco: true,
    rating: 4.5,
    totalRatings: 127,
    features: [
      { icon: Leaf, label: "Techo verde", available: true, score: 90 },
      { icon: Wind, label: "Ventilación natural", available: true, score: 85 },
      { icon: Armchair, label: "Bancas", available: true, score: 95 },
      { icon: TreePine, label: "Árboles cercanos", available: true, score: 80 },
    ],
    routes: ["Ruta 12", "Ruta 15", "Ruta 23"],
    nextBuses: [
      { route: "12", time: "5 min", destination: "Centro" },
      { route: "15", time: "12 min", destination: "Universidad" },
      { route: "23", time: "18 min", destination: "Villa de Seris" },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20">
      {/* Header */}
      <div className="bg-[#4caf50] text-white p-4 shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="flex-1">{stopData.name}</h2>
              <div className="bg-white/20 px-2 py-1 rounded-lg text-xs">
                Ecológica
              </div>
            </div>
            <p className="text-sm opacity-90 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {stopData.distance}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span>{stopData.rating}</span>
          </div>
          <span className="text-sm opacity-80">({stopData.totalRatings} calificaciones)</span>
          <Button
            size="sm"
            variant="outline"
            className="ml-auto bg-white/10 border-white/30 hover:bg-white/20 text-white"
            onClick={() => navigate("/ratings")}
          >
            Calificar
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Features */}
        <div>
          <h3 className="mb-3">Características de la parada</h3>
          <div className="grid grid-cols-1 gap-3">
            {stopData.features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.label} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-[#4caf50]/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#4caf50]" />
                      </div>
                      <span>{feature.label}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{feature.score}%</span>
                  </div>
                  <Progress value={feature.score} className="h-2" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Next buses */}
        <div>
          <h3 className="mb-3">Próximos camiones</h3>
          <div className="space-y-2">
            {stopData.nextBuses.map((bus) => (
              <div
                key={bus.route}
                className="flex items-center justify-between p-3 bg-card border border-border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
                    <span>{bus.route}</span>
                  </div>
                  <div>
                    <p>Ruta {bus.route}</p>
                    <p className="text-sm text-muted-foreground">{bus.destination}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-primary">{bus.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="mb-2">Ubicación</h4>
          <p className="text-sm text-muted-foreground">{stopData.address}</p>
          <Button variant="outline" className="w-full mt-3">
            <MapPin className="w-4 h-4 mr-2" />
            Ver en mapa
          </Button>
        </div>

        {/* Report issue */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate("/reports")}
        >
          <AlertCircle className="w-4 h-4 mr-2" />
          Reportar un problema
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}
