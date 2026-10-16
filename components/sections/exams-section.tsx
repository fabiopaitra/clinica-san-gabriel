"use client";

import React from "react";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import {
  Contrast,
  Gauge,
  IdCard,
  Map,
  Microscope,
  Move,
  Ruler,
  ScanEye,
  Sparkles,
} from "lucide-react";
import { EXAMS } from "@/lib/clinic-data";
import { trackEvent } from "@/lib/analytics";
import { Card, CardContent } from "@/components/ui/card";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import { examPath, examSlug } from "@/lib/service-pages";
import { cn, toSlug } from "@/lib/utils";

const ICON_MAP = {
  Ruler,
  Map,
  Microscope,
  ScanEye,
  Contrast,
  Move,
  Gauge,
  Sparkles,
  IdCard,
} as const;

function ExamCard({
  exam,
  isSelected = false,
}: {
  exam: (typeof EXAMS)[number];
  isSelected?: boolean;
}) {
  const Icon = ICON_MAP[exam.lucideIcon as keyof typeof ICON_MAP];
  const isExpanded = isSelected;

  return (
    <div className="flex min-h-[280px] items-center justify-center">
      {/* Wrapper: -m-4 compensa para não mover outros cards; z-10 no selecionado para ficar por cima */}
      <div
        className={cn(
          "relative group w-fit transition-all duration-500 ease-out",
          "hover:-m-4 hover:z-10",
          isExpanded && "-m-4 z-10"
        )}
      >
        {/* Card: barra sempre 100% largura; padding só no conteúdo */}
        <div
          className={cn(
            "flex min-w-[260px] flex-col overflow-hidden rounded-2xl border border-border/40 bg-card",
            "transition-[box-shadow] duration-500 ease-out",
            "shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),0_4px_12px_-4px_rgba(0,0,0,0.06)]",
            "hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.2)]",
            isExpanded &&
              "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_12px_30px_-8px_rgba(0,0,0,0.2)]"
          )}
        >
          {/* Barra colorida: sempre 100% da largura do card */}
          <div className="h-2 w-full shrink-0 bg-primary" aria-hidden />
          {/* Conteúdo: padding p-4 quando expandido, conteúdo fixo 260px centralizado */}
          <div
            className={cn(
              "flex flex-1 flex-col items-center justify-center transition-[padding] duration-500 ease-out",
              "p-0",
              "group-hover:p-4",
              isExpanded && "p-4"
            )}
          >
            <div className="flex w-[260px] min-w-[260px] flex-shrink-0 flex-col">
              <div className="min-w-0 overflow-hidden rounded-b-2xl">
                <Card className="rounded-none border-0 border-t-0 shadow-none">
                  <CardContent className="flex flex-col items-center px-6 pr-8 py-6 text-center">
                    <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-primary/12 text-primary">
                      {Icon && <Icon className="size-7" aria-hidden />}
                    </div>
                    <h3 className="text-lg font-semibold">{exam.name}</h3>
                    <p className="mt-2 text-base text-muted-foreground leading-relaxed">
                      {exam.description}
                    </p>
                    <Link
                      href={examPath(examSlug(exam))}
                      data-track-event="nav_click"
                      data-track-location="exames"
                      data-track-target={examPath(examSlug(exam))}
                      className="mt-3 text-sm font-medium text-primary hover:underline"
                    >
                      Saiba mais<span className="sr-only"> sobre {exam.name}</span>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExamsSection() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const apiRef = React.useRef<CarouselApi | null>(null);
  const userNavigatedRef = React.useRef(false);
  const onSelect = React.useCallback(() => {
    const api = apiRef.current;
    if (!api) return;
    const index = api.selectedScrollSnap();
    setSelectedIndex(index);
    if (!userNavigatedRef.current) return;
    userNavigatedRef.current = false;
    trackEvent("exam_carousel_navigate", { exam: toSlug(EXAMS[index].name) });
  }, []);
  const onPointerDown = React.useCallback(() => {
    userNavigatedRef.current = true;
  }, []);
  const onDotClick = React.useCallback((event: React.MouseEvent) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest('[role="tab"][aria-selected="false"]')) userNavigatedRef.current = true;
  }, []);
  const handleCarouselApi = React.useCallback((api: CarouselApi | undefined) => {
    const prev = apiRef.current;
    if (prev) {
      prev.off("select", onSelect);
      prev.off("pointerDown", onPointerDown);
    }
    apiRef.current = api ?? null;
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    api.on("pointerDown", onPointerDown);
  }, [onSelect, onPointerDown]);

  return (
    <section
      id="exames"
      className="overflow-visible bg-muted/20 py-10"
      aria-labelledby="exams-title"
    >
      <div className="mx-auto max-w-6xl overflow-visible px-4 sm:px-6 lg:px-8">
        {/* Título e descrição - alinhados à esquerda (estilo Stripe) */}
        <div className="text-left">
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

        {/* Mobile: Carousel - px-14 dá espaço para sombra lateral (50px blur), overflow-y-visible para sombra vertical; cards sobrepostos */}
        <div className="overflow-x-hidden overflow-y-visible px-14 lg:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            plugins={[Autoplay({ delay: 2500 })]}
            setApi={handleCarouselApi}
            className="mx-2"
          >
            <CarouselContent className="-ml-2" overflowVisible>
              {EXAMS.map((exam, i) => (
                <CarouselItem
                  key={exam.name}
                  className={cn(
                    "relative basis-[78%] overflow-visible px-4 py-[32px] pl-12 sm:basis-[70%] sm:pl-14",
                    selectedIndex === i && "z-10"
                  )}
                >
                  <ExamCard exam={exam} isSelected={selectedIndex === i} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots count={EXAMS.length} onClickCapture={onDotClick} />
          </Carousel>
        </div>

        {/* Desktop: Grid com slots fixos - card expande sem mover os outros */}
        <div className="mt-12 hidden grid-cols-2 gap-6 lg:grid lg:grid-cols-4">
          {EXAMS.map((exam) => (
            <ExamCard key={exam.name} exam={exam} />
          ))}
        </div>
      </div>
    </section>
  );
}
