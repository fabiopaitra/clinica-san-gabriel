"use client";

import React from "react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { CONVENIOS, CLINIC } from "@/lib/clinic-data";

export function ConveniosSection() {
  return (
    <section
      id="convenios"
      className="bg-white"
      aria-labelledby="convenios-title"
    >
      <div className="mx-auto max-w-6xl">
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <h2
            id="convenios-title"
            className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
          >
            Convênios
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Aceitamos os principais planos de saúde para você cuidar da sua
            visão com tranquilidade.
          </p>
          <p className="mt-2 text-lg text-muted-foreground">
            Trabalhamos com Amil, Bradesco Saúde, SulAmérica, Unimed,
            NotreDame Intermédica, Porto Saúde e outros. Confira a lista
            completa e tire dúvidas sobre sua cobertura.
          </p>
          <div className="mt-8">
            <Link
              href={CLINIC.whatsappMessage(
                "Olá, gostaria de saber se meu convênio é aceito na clínica."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base font-medium text-primary hover:opacity-90 hover:underline focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Dúvidas? Fale conosco
              <WhatsAppIcon className="size-5 shrink-0" />
            </Link>
          </div>
          <p className="sr-only">
            Convênios aceitos: {CONVENIOS.map((c) => c.name).join(", ")}.
          </p>
        </div>

        {/* Horizontal scrolling logos: full width, no padding */}
        <div
          className="flex min-h-[60px] w-full items-center overflow-hidden"
          aria-hidden="true"
        >
          <span className="sr-only">Convênios aceitos</span>
          <div className="flex w-max animate-convenios-scroll items-center gap-20 pr-20">
            {[...CONVENIOS, ...CONVENIOS].map((convenio, i) => (
              <span
                key={`${convenio.name}-${i}`}
                className="whitespace-nowrap text-lg font-medium text-neutral-400"
              >
                {convenio.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
