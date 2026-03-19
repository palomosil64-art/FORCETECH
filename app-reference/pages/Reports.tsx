import { useState } from "react";
import { ArrowLeft, Clock, Users, AlertTriangle, CheckCircle2 } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { useNavigate } from "react-router";

export function Reports() {
  const navigate = useNavigate();
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const issueTypes = [
    {
      id: "delay",
      icon: Clock,
      label: "Retraso",
      description: "El camión está tardando más de lo esperado",
      color: "text-[#ffa726]",
      bgColor: "bg-[#ffa726]/10",
    },
    {
      id: "crowded",
      icon: Users,
      label: "Saturación",
      description: "El camión está muy lleno",
      color: "text-[#ef5350]",
      bgColor: "bg-[#ef5350]/10",
    },
    {
      id: "stop-condition",
      icon: AlertTriangle,
      label: "Estado de parada",
      description: "La parada está en mal estado o sin sombra",
      color: "text-[#ff9800]",
      bgColor: "bg-[#ff9800]/10",
    },
  ];

  const handleSubmit = () => {
    if (selectedIssue) {
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
          <h2>¡Reporte enviado!</h2>
          <p className="text-muted-foreground">
            Gracias por ayudar a mejorar el servicio. Tu reporte ha sido registrado y será atendido pronto.
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
            <h2>Reportar problema</h2>
            <p className="text-sm opacity-90">Ayúdanos a mejorar el servicio</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        <div>
          <h3 className="mb-4">¿Qué problema encontraste?</h3>
          <div className="space-y-3">
            {issueTypes.map((issue) => {
              const Icon = issue.icon;
              const isSelected = selectedIssue === issue.id;

              return (
                <button
                  key={issue.id}
                  onClick={() => setSelectedIssue(issue.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 ${issue.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${issue.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="mb-1">{issue.label}</p>
                      <p className="text-sm text-muted-foreground">{issue.description}</p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {selectedIssue && (
          <div className="space-y-3">
            <div>
              <label className="block mb-2">
                Descripción adicional (opcional)
              </label>
              <Textarea
                placeholder="Cuéntanos más detalles sobre el problema..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
              <p>
                Tu reporte ayuda a mejorar el servicio de transporte y la calidad de las paradas.
                Todos los reportes son revisados por el equipo de UNE SmartHeat.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Submit button */}
      {selectedIssue && (
        <div className="p-4 bg-background border-t border-border">
          <Button
            className="w-full"
            size="lg"
            onClick={handleSubmit}
          >
            Enviar reporte
          </Button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
