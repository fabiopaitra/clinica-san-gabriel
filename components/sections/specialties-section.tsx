import Image from "next/image";
import { Check } from "lucide-react";
import { SPECIALTIES } from "@/lib/clinic-data";

const specialty = SPECIALTIES.ophthalmology;

const SPECIALTY_IMAGE = {
  src: "/clinica-oftalmologia-especialidade.jpg",
  alt: "Consulta oftalmológica na Clínica San Gabriel em Colombo, PR - atendimento especializado em saúde ocular",
  width: 600,
  height: 400,
} as const;

export function SpecialtiesSection() {
  return (
    <section
      id="especialidades"
      className="bg-gradient-to-b from-background to-muted/30"
      aria-labelledby="specialties-title"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:items-center">
          {/* Left: Content */}
          <div>
            <h2
              id="specialties-title"
              className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
            >
              Nossa Especialidade
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              <em>Oftalmologia</em> com tecnologia e cuidado humanizado
            </p>
            <p className="mt-6 text-base leading-relaxed">
              {specialty.description}
            </p>
            <ul className="mt-8 space-y-1" role="list">
              {specialty.features.map((feature) => (
                <li
                  key={feature}
                  className="flex min-h-[48px] items-center gap-3"
                >
                  <Check
                    className="size-5 shrink-0 text-primary"
                    aria-hidden
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <span className="inline-flex rounded-full bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                Parceria Hospital de Olhos do Paraná
              </span>
            </div>
          </div>

          {/* Right: Foto da clínica (Stripe bento style) */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
              <Image
                src={SPECIALTY_IMAGE.src}
                alt={SPECIALTY_IMAGE.alt}
                width={SPECIALTY_IMAGE.width}
                height={SPECIALTY_IMAGE.height}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[3/2] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
