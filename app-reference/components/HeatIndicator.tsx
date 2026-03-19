import { Thermometer } from "lucide-react";

type HeatLevel = "low" | "medium" | "high";

interface HeatIndicatorProps {
  level: HeatLevel;
  showLabel?: boolean;
}

export function HeatIndicator({ level, showLabel = true }: HeatIndicatorProps) {
  const config = {
    low: {
      color: "text-[#8bc34a]",
      bg: "bg-[#8bc34a]/10",
      label: "Bajo",
    },
    medium: {
      color: "text-[#ffa726]",
      bg: "bg-[#ffa726]/10",
      label: "Medio",
    },
    high: {
      color: "text-[#ef5350]",
      bg: "bg-[#ef5350]/10",
      label: "Alto",
    },
  };

  const { color, bg, label } = config[level];

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${bg}`}>
      <Thermometer className={`w-4 h-4 ${color}`} />
      {showLabel && <span className={`text-sm ${color}`}>{label}</span>}
    </div>
  );
}
