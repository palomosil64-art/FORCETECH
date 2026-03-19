import { X, Bell, Leaf } from "lucide-react";
import { useState, useEffect } from "react";

interface NotificationProps {
  message: string;
  type?: "info" | "success" | "warning";
  icon?: "bus" | "shade";
  autoHide?: boolean;
}

export function Notification({ message, type = "info", icon = "bus", autoHide = true }: NotificationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => setVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [autoHide]);

  if (!visible) return null;

  const bgColors = {
    info: "bg-[#42a5f5]",
    success: "bg-[#4caf50]",
    warning: "bg-[#ffa726]",
  };

  return (
    <div
      className={`${bgColors[type]} text-white rounded-lg shadow-lg p-4 flex items-start gap-3 animate-in slide-in-from-top`}
    >
      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
        {icon === "bus" && <Bell className="w-4 h-4" />}
        {icon === "shade" && <Leaf className="w-4 h-4" />}
      </div>
      <p className="flex-1 text-sm">{message}</p>
      <button
        onClick={() => setVisible(false)}
        className="flex-shrink-0 hover:bg-white/20 rounded p-1 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
