import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, MessageCircle, Clock } from "lucide-react";
import { CLINIC } from "@/lib/clinic-data";

export function Footer() {
  return (
    <footer
      className="border-t bg-muted/30"
      role="contentinfo"
      aria-label="Rodapé do site"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Sobre */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/clinica-san-gabriel-logo.svg"
                alt={CLINIC.name}
                width={160}
                height={44}
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-base text-muted-foreground leading-relaxed">
              Especializada em oftalmologia e exames oftalmológicos em Colombo,
              PR. Atendimento humanizado e de qualidade.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Parceria com o Hospital de Olhos do Paraná.
            </p>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2 text-base text-muted-foreground">
              <li>Consulta Oftalmológica</li>
              <li>Paquimetria</li>
              <li>Topografia Corneana</li>
              <li>Mapeamento de Retina</li>
              <li>Microscopia</li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <address className="not-italic space-y-3 text-base">
              <p className="flex items-start gap-3">
                <MapPin
                  className="size-5 shrink-0 mt-0.5 text-primary"
                  aria-hidden
                />
                <span>
                  {CLINIC.address.street}
                  <br />
                  {CLINIC.address.neighborhood}, {CLINIC.address.city} -{" "}
                  {CLINIC.address.state}
                  <br />
                  CEP: {CLINIC.address.zip}
                  <br />
                  <em className="text-muted-foreground">
                    ({CLINIC.address.landmark})
                  </em>
                </span>
              </p>
              <p>
                <a
                  href={`tel:${CLINIC.phone}`}
                  className="flex items-center gap-3 hover:text-primary hover:underline"
                >
                  <Phone className="size-5 shrink-0" aria-hidden />
                  {CLINIC.phoneFormatted}
                </a>
              </p>
              <p>
                <a
                  href={CLINIC.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary hover:underline"
                >
                  <MessageCircle className="size-5 shrink-0" aria-hidden />
                  WhatsApp
                </a>
              </p>
            </address>
          </div>

          {/* Horários */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Horário de Atendimento
            </h3>
            <div className="flex items-start gap-3">
              <Clock className="size-5 shrink-0 mt-0.5 text-primary" aria-hidden />
              <dl className="space-y-1 text-base text-muted-foreground">
                <div>
                  <dt className="font-medium text-foreground">Segunda a Sexta</dt>
                  <dd>{CLINIC.hours.weekdays}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Sábados</dt>
                  <dd>{CLINIC.hours.saturday}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Domingos</dt>
                  <dd>{CLINIC.hours.sunday}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {CLINIC.name}. Todos os direitos
            reservados.
          </p>
          <div className="flex gap-6">
            <Link
              href="/politica-privacidade"
              className="text-sm text-muted-foreground hover:text-foreground hover:underline"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/termos-uso"
              className="text-sm text-muted-foreground hover:text-foreground hover:underline"
            >
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
