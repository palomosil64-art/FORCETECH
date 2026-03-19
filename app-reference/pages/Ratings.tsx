import { useState } from "react";
import { ArrowLeft, Star, Bus, MapPin, CheckCircle2 } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { useNavigate } from "react-router";

export function Ratings() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<"route" | "stop" | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const routes = [
    { id: "r1", name: "Ruta 12 - Vía Sonora", avgRating: 4.5 },
    { id: "r2", name: "Ruta 8 - Directo", avgRating: 3.8 },
    { id: "r3", name: "Ruta 15 - Universidad", avgRating: 4.2 },
  ];

  const stops = [
    { id: "s1", name: "Parada Sonora & Morelia", avgRating: 4.5, isEco: true },
    { id: "s2", name: "Parada Blvd. Luis Encinas", avgRating: 3.2, isEco: false },
    { id: "s3", name: "Parada Parque Madero", avgRating: 4.7, isEco: true },
  ];

  const handleSubmit = () => {
    if (rating > 0 && selectedItem) {
      setSubmitted(true);
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <div className="max-w-sm w-full text-center space-y-4">
          <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-accent" />
          </div>
          <h2>¡Calificación enviada!</h2>
          <p className="text-muted-foreground">
            Gracias por tu opinión. Tu calificación ayuda a otros usuarios a tomar mejores decisiones.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 shadow-md">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2>Calificar servicio</h2>
            <p className="text-sm opacity-90">Comparte tu experiencia</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Type selection */}
        {!selectedType && (
          <div>
            <h3 className="mb-4">¿Qué quieres calificar?</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedType("route")}
                className="p-6 bg-card border-2 border-border rounded-lg hover:border-primary transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Bus className="w-6 h-6 text-primary" />
                </div>
                <p className="text-center">Ruta</p>
              </button>
              <button
                onClick={() => setSelectedType("stop")}
                className="p-6 bg-card border-2 border-border rounded-lg hover:border-primary transition-all"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <p className="text-center">Parada</p>
              </button>
            </div>
          </div>
        )}

        {/* Item selection */}
        {selectedType && !selectedItem && (
          <div>
            <Button
              variant="ghost"
              onClick={() => setSelectedType(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>

            <h3 className="mb-4">
              Selecciona {selectedType === "route" ? "una ruta" : "una parada"}
            </h3>
            <div className="space-y-2">
              {(selectedType === "route" ? routes : stops).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item.id)}
                  className="w-full p-4 bg-card border border-border rounded-lg hover:border-primary transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p>{item.name}</p>
                        {"isEco" in item && item.isEco && (
                          <span className="text-xs bg-[#4caf50]/10 text-[#4caf50] px-2 py-0.5 rounded-full">
                            Ecológica
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{item.avgRating}</span>
                        <span className="ml-1">promedio</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Rating form */}
        {selectedItem && (
          <div className="space-y-6">
            <Button
              variant="ghost"
              onClick={() => setSelectedItem(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>

            <div>
              <h3 className="mb-2">
                {selectedType === "route" 
                  ? routes.find(r => r.id === selectedItem)?.name
                  : stops.find(s => s.id === selectedItem)?.name
                }
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                ¿Cómo calificarías tu experiencia?
              </p>

              {/* Star rating */}
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-12 h-12 ${
                        star <= (hoveredRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {rating > 0 && (
                <div className="text-center mb-6">
                  <p className="text-2xl">
                    {rating === 5 && "¡Excelente! 🌟"}
                    {rating === 4 && "Muy bueno 😊"}
                    {rating === 3 && "Bueno 👍"}
                    {rating === 2 && "Regular 😐"}
                    {rating === 1 && "Necesita mejorar 😔"}
                  </p>
                </div>
              )}
            </div>

            {rating > 0 && (
              <div>
                <label className="block mb-2">
                  Comentario (opcional)
                </label>
                <Textarea
                  placeholder="Cuéntanos más sobre tu experiencia..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>
            )}

            {rating > 0 && (
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                <p className="text-sm">
                  <strong>Gracias por tu tiempo.</strong> Tu opinión ayuda a mejorar
                  el servicio y a otros usuarios a elegir las mejores opciones considerando
                  el calor extremo de Hermosillo.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Submit button */}
      {rating > 0 && selectedItem && (
        <div className="p-4 bg-background border-t border-border">
          <Button
            className="w-full"
            size="lg"
            onClick={handleSubmit}
          >
            Enviar calificación
          </Button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
