import { Layers, Leaf, Navigation, Zap } from "lucide-react";
import { Switch } from "./ui/switch";

interface MapFiltersProps {
  filters: {
    showRoutes: boolean;
    showEcoStops: boolean;
    showTraffic: boolean;
    showBuses: boolean;
  };
  onFilterChange: (filter: string, value: boolean) => void;
}

export function MapFilters({ filters, onFilterChange }: MapFiltersProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary" />
          <span className="text-sm">Rutas</span>
        </div>
        <Switch
          checked={filters.showRoutes}
          onCheckedChange={(checked) => onFilterChange("showRoutes", checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className="w-4 h-4 text-[#4caf50]" />
          <span className="text-sm">Paradas ecológicas</span>
        </div>
        <Switch
          checked={filters.showEcoStops}
          onCheckedChange={(checked) => onFilterChange("showEcoStops", checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#ffa726]" />
          <span className="text-sm">Camiones en vivo</span>
        </div>
        <Switch
          checked={filters.showBuses}
          onCheckedChange={(checked) => onFilterChange("showBuses", checked)}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-[#ef5350]" />
          <span className="text-sm">Tráfico</span>
        </div>
        <Switch
          checked={filters.showTraffic}
          onCheckedChange={(checked) => onFilterChange("showTraffic", checked)}
        />
      </div>
    </div>
  );
}
