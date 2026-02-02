"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Contrast,
  Gauge,
  Map,
  Microscope,
  Move,
  Ruler,
  ScanEye,
  Sparkles,
} from "lucide-react";
import { EXAMS } from "@/lib/clinic-data";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";

const ICON_MAP = {
  Ruler,
  Map,
  Microscope,
  ScanEye,
  Contrast,
  Move,
  Gauge,
  Sparkles,
} as const;

function ExamCard({
  exam,
}: {
  exam: (typeof EXAMS)[number];
}) {
  const Icon = ICON_MAP[exam.lucideIcon as keyof typeof ICON_MAP];

  return (
    <div className="flex flex-col rounded-2xl border border-border/40 bg-card shadow-[0_4px_6px_-1_rgba(0,0,0,0.07),0_2px_4px_-2_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_10px_15px_-3_rgba(0,0,0,0.08),0_4px_6px_-4_rgba(0,0,0,0.04)]">
      {/* Barra colorida reta - fora do overflow para manter bordas retas */}
      <div className="h-1 w-full shrink-0 bg-primary" aria-hidden />
      <div className="min-w-0 overflow-hidden rounded-b-2xl">
        <Card className="rounded-none border-0 border-t-0 shadow-none">
        <CardContent className="flex flex-col items-center px-6 py-6 text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {Icon && <Icon className="size-7" aria-hidden />}
        </div>
        <h3 className="text-lg font-semibold">{exam.name}</h3>
        <p className="mt-2 text-base text-muted-foreground leading-relaxed">
          {exam.description}
        </p>
      </CardContent>
    </Card>
      </div>
    </div>
  );
}

export function ExamsSection() {
  return (
    <section
      id="exames"
      className="bg-muted/20 py-10"
      aria-labelledby="exams-title"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            id="exams-title"
            className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
          >
            Exames Realizados
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Utilizamos equipamentos de última geração para garantir resultados
            precisos e confiáveis.
          </p>
        </div>

        {/* Mobile: Carousel com peek do próximo card (estilo Stripe) */}
        <div className="mt-12 lg:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            plugins={[Autoplay({ delay: 3000 })]}
            className="mx-2"
          >
            <CarouselContent className="-ml-2">
              {EXAMS.map((exam) => (
                <CarouselItem
                  key={exam.name}
                  className="basis-[85%] pl-2 sm:basis-[75%]"
                >
                  <ExamCard exam={exam} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots count={EXAMS.length} />
          </Carousel>
        </div>

        {/* Desktop: Grid */}
        <div className="mt-12 hidden grid-cols-2 gap-4 lg:grid lg:grid-cols-4">
          {EXAMS.map((exam) => (
            <ExamCard key={exam.name} exam={exam} />
          ))}
        </div>
      </div>
    </section>
  );
}
