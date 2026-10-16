"use client";

import React from "react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { CONVENIOS, CLINIC } from "@/lib/clinic-data";
import { toSlug } from "@/lib/utils";

function ConvenioLinks({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex items-center gap-20 pr-20" aria-hidden={hidden || undefined}>
      {CONVENIOS.map((convenio) => (
        <a
          key={convenio.name}
          href={CLINIC.whatsappMessage(
            `Olá, gostaria de agendar uma consulta pelo convênio ${convenio.name}.`
          )}
          data-track-event="whatsapp_click"
          data-track-location="convenios-lista"
          data-track-convenio={toSlug(convenio.name)}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={hidden ? -1 : undefined}
          className="whitespace-nowrap rounded-sm text-lg font-medium text-neutral-400 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {convenio.name}
        </a>
      ))}
    </div>
  );
}

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
            Trabalhamos com Amil, Bradesco Saúde, Sul América, Porto Seguro Saúde, Unimed Curitiba e outros. Confira a lista completa abaixo e tire dúvidas sobre sua cobertura.
          </p>
          <div className="mt-8">
            <Link
              href={CLINIC.whatsappMessage(
                "Olá, gostaria de saber se meu convênio é aceito na clínica."
              )}
              data-track-event="whatsapp_click"
              data-track-location="convenios"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base font-medium text-primary hover:opacity-90 hover:underline focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Dúvidas? Fale conosco
              <WhatsAppIcon className="size-5 shrink-0" />
            </Link>
          </div>
        </div>

        {/* Horizontal scrolling logos: full width, no padding */}
        <div
          className="flex min-h-[60px] w-full items-center overflow-hidden"
          role="region"
          aria-label="Convênios aceitos"
        >
          <div className="flex w-max animate-convenios-scroll items-center">
            <ConvenioLinks />
            <ConvenioLinks hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
