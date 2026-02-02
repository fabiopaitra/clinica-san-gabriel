import { HeroSection } from "@/components/sections/hero-section";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />

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
