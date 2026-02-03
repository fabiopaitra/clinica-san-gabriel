"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { CLINIC } from "@/lib/clinic-data";

const linkClass =
  "inline-flex items-center gap-2 text-base font-medium text-white/95 hover:opacity-90 hover:underline focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-black/50";

export function HeroSection() {
  const heroVideoUrl = CLINIC.heroVideoUrl;

  return (
    <section
      className="relative min-h-[70vh] flex flex-col items-start justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Video ou imagem de fundo */}
      <div className="absolute inset-0 z-0">
        {heroVideoUrl && heroVideoUrl.length > 0 ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={CLINIC.heroPosterUrl}
            className="absolute inset-0 size-full object-cover"
            aria-hidden
          >
            <source src={heroVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={CLINIC.heroPosterUrl}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        {/* Overlay escuro para legibilidade */}
        <div
          className="absolute inset-0 bg-black/50"
          aria-hidden
        />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 py-16 text-left sm:py-24">
        <h1
          id="hero-title"
          className="text-3xl font-bold tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl"
        >
          Clínica Médica San Gabriel
        </h1>
        <p className="mt-4 text-xl text-white/95 drop-shadow-md">
          Saúde e Bem-Estar em Colombo
        </p>
        <p className="mt-6 text-lg leading-relaxed text-white/90 drop-shadow-md">
          Atendimento humanizado, oftalmologia e exames completos. Parceria com
          o Hospital de Olhos do Paraná para oferecer a melhor qualidade em
          saúde ocular.
        </p>
        <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-4">
          <Button variant="default" size="xl" asChild>
            <a
              href={CLINIC.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <WhatsAppIcon className="size-6" />
              Agende sua consulta pelo WhatsApp
            </a>
          </Button>
          <a
            href={`tel:${CLINIC.phone}`}
            className={linkClass}
          >
            <Phone className="size-5 shrink-0" aria-hidden />
            Ligue para agendar sua consulta
          </a>
        </div>
      </div>
    </section>
  );
}
