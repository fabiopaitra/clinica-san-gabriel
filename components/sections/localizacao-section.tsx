import Link from "next/link";
import { MapPin, Navigation } from "lucide-react";
import { CLINIC } from "@/lib/clinic-data";

const DIRECTIONS_URL = `https://www.google.com/maps/dir//${encodeURIComponent(CLINIC.address.full)}`;

function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: CLINIC.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: CLINIC.address.street,
      addressLocality: CLINIC.address.city,
      addressRegion: CLINIC.address.state,
      postalCode: CLINIC.address.zip,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CLINIC.address.geo.lat,
      longitude: CLINIC.address.geo.lng,
    },
    telephone: CLINIC.phone,
    url: CLINIC.domain,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalizacaoSection() {
  return (
    <section
      id="localizacao"
      className="bg-muted/50"
      aria-labelledby="localizacao-title"
    >
      <LocalBusinessJsonLd />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h2
          id="localizacao-title"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Localização
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">
          Venha nos visitar. {CLINIC.address.landmark && `Estamos ${CLINIC.address.landmark}. Com estacionamento ou ponto de onibus com parada em frente a clínica. `}
        </p>

        <address className="mt-6 not-italic">
          <p className="text-sm text-muted-foreground">
            <Link
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary hover:underline focus-visible:outline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="Ver endereço e rotas no Google Maps"
            >
              <MapPin className="size-5 shrink-0" aria-hidden />
              {CLINIC.address.full}
            </Link>
          </p>
        </address>

        {CLINIC.address.mapsEmbedSrc && (
          <div className="relative mt-8 w-full overflow-hidden rounded-lg border border-border bg-muted/30">
            <div className="relative aspect-video w-full min-h-[280px] sm:min-h-[320px]">
              <iframe
                src={CLINIC.address.mapsEmbedSrc}
                title="Mapa da Clínica Médica San Gabriel, Colombo - PR"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <Link
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 flex items-end justify-center p-4 sm:items-center sm:pb-0"
                aria-label="Toque para abrir rotas no Google Maps ou app de GPS"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-none hover:bg-secondary/90">
                  Ver rotas
                  <Navigation className="size-5 shrink-0" aria-hidden />
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
