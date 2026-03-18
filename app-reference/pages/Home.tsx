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

export function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [isQuickMode, setIsQuickMode] = useState(true);
  const [showNotification, setShowNotification] = useState(true);
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
          onStopClick={(stopId) => navigate(`/stop/${stopId}`)}
        />

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
      </div>

      <BottomNav />
    </div>
  );
}