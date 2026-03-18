import { Sun, Settings } from "lucide-react";
import { Button } from "./ui/button";

interface QuickModeToggleProps {
  isQuickMode: boolean;
  onToggle: () => void;
}

export function QuickModeToggle({ isQuickMode, onToggle }: QuickModeToggleProps) {
  return (
    <Button
      onClick={onToggle}
      variant={isQuickMode ? "default" : "outline"}
      size="sm"
      className={`${isQuickMode ? "bg-[#ffa726] hover:bg-[#ffa726]/90" : ""}`}
    >
      {isQuickMode ? (
        <>
          <Sun className="w-4 h-4 mr-2" />
          Modo Sol
        </>
      ) : (
        <>
          <Settings className="w-4 h-4 mr-2" />
          Normal
        </>
      )}
    </Button>
  );
}
