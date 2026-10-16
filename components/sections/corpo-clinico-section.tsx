import { GraduationCap } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { CLINIC, DOCTORS } from "@/lib/clinic-data";

function DoctorCard({ doctor }: { doctor: (typeof DOCTORS)[number] }) {
  return (
    <article className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
      <div className="min-w-0">
        <h3 className="text-xl font-semibold">{doctor.name}</h3>
        <p className="mt-1 text-base text-muted-foreground">
          {doctor.specialty} · CRM-{doctor.crmState} {doctor.crm} · RQE {doctor.rqe}
          {doctor.isTechnicalDirector && " · Responsável técnico"}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2" role="list" aria-label="Áreas de atuação">
          {doctor.areas.map((area) => (
            <li
              key={area}
              className="rounded-full bg-primary/5 px-3 py-1 text-sm font-medium text-primary"
            >
              {area}
            </li>
          ))}
        </ul>
        <ul className="mt-4 space-y-2 text-base" role="list" aria-label="Formação">
          {doctor.education.map((item) => (
            <li key={item.course} className="flex items-start gap-3">
              <GraduationCap className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <span>
                {item.course} – {item.institution}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function CorpoClinicoSection() {
  return (
    <section id="corpo-clinico" className="bg-muted/20" aria-labelledby="corpo-clinico-title">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h2
          id="corpo-clinico-title"
          className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
        >
          Corpo Clínico
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">
          Atendimento com oftalmologista especialista, com título registrado no CRM.
        </p>
        <div className="mt-8 grid gap-6">
          {DOCTORS.map((doctor) => (
            <DoctorCard key={doctor.crm} doctor={doctor} />
          ))}
        </div>
        <div className="mt-8">
          <Button variant="whatsapp" size="lg" asChild>
            <a
              href={CLINIC.whatsappBooking}
              data-track-event="whatsapp_click"
              data-track-location="corpo-clinico"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <WhatsAppIcon className="size-5 shrink-0" />
              Agendar consulta
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
