import { Button } from "@/components/ui/button";
import { CLINIC } from "@/lib/clinic-data";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero - placeholder para a primeira seção */}
      <section
        className="relative min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-primary/5 to-background px-4 py-16 sm:py-24"
        aria-labelledby="hero-title"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h1
            id="hero-title"
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Clínica Médica San Gabriel
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Saúde e Bem-Estar em Colombo
          </p>
          <p className="mt-6 text-lg leading-relaxed">
            Atendimento humanizado, oftalmologia e exames completos. Parceria com
            o Hospital de Olhos do Paraná para oferecer a melhor qualidade em
            saúde ocular.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button variant="whatsapp" size="xl" asChild>
              <a
                href={CLINIC.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Agende sua consulta agora
              </a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href={`tel:${CLINIC.phone}`}>Ligar: {CLINIC.phoneFormatted}</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Disclaimer médico - obrigatório para clínicas */}
      <section
        className="border-t bg-muted/30 px-4 py-8"
        aria-label="Aviso importante"
      >
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-sm text-muted-foreground">
            <strong>Aviso:</strong> O conteúdo deste site é informativo e não
            substitui avaliação médica. Consulte sempre um profissional de saúde.
          </p>
        </div>
      </section>
    </div>
  );
}
