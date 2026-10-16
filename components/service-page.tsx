import Link from "next/link";
import { Check } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { CLINIC, TECHNICAL_DIRECTOR } from "@/lib/clinic-data";
import {
  examPath,
  findExamPage,
  type ServicePage,
  type ServiceSection,
} from "@/lib/service-pages";

type ServicePageKind = "exame" | "especialidade";

function SectionBody({ section }: { section: ServiceSection }) {
  return (
    <>
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="mt-3 text-base leading-relaxed">
          {paragraph}
        </p>
      ))}
      {section.items && (
        <ul className="mt-3 space-y-2" role="list">
          {section.items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check className="mt-1 size-5 shrink-0 text-primary" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function BookingCta({ page, kind }: { page: ServicePage; kind: ServicePageKind }) {
  return (
    <Button variant="whatsapp" size="lg" asChild>
      <a
        href={CLINIC.whatsappMessage(page.whatsappText)}
        data-track-event="whatsapp_click"
        data-track-location={kind}
        data-track-service={page.slug}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2"
      >
        <WhatsAppIcon className="size-5 shrink-0" />
        Agendar pelo WhatsApp
      </a>
    </Button>
  );
}

function RelatedExams({ slugs }: { slugs: readonly string[] }) {
  const related = slugs.map(findExamPage).filter((page) => page !== undefined);
  if (related.length === 0) return null;

  return (
    <section id="exames-relacionados" aria-labelledby="exames-relacionados-title" className="mt-10">
      <h2 id="exames-relacionados-title" className="text-xl font-semibold">
        Exames relacionados
      </h2>
      <ul className="mt-3 flex flex-wrap gap-3" role="list">
        {related.map((exam) => (
          <li key={exam.slug}>
            <Link
              href={examPath(exam.slug)}
              data-track-event="nav_click"
              data-track-location="relacionados"
              data-track-target={examPath(exam.slug)}
              className="inline-flex rounded-full bg-primary/5 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 hover:underline"
            >
              {exam.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ServicePageView({ page, kind }: { page: ServicePage; kind: ServicePageKind }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header>
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          ← Voltar ao início
        </Link>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{page.heading}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{page.description}</p>
        <div className="mt-6">
          <BookingCta page={page} kind={kind} />
        </div>
      </header>

      {page.sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          aria-labelledby={`${section.id}-title`}
          className="mt-10"
        >
          <h2 id={`${section.id}-title`} className="text-xl font-semibold">
            {section.heading}
          </h2>
          <SectionBody section={section} />
        </section>
      ))}

      {page.relatedExams && <RelatedExams slugs={page.relatedExams} />}

      <section
        id="agendar"
        aria-labelledby="agendar-title"
        className="mt-12 rounded-2xl border bg-muted/30 p-6"
      >
        <h2 id="agendar-title" className="text-xl font-semibold">
          Agende na {CLINIC.name}
        </h2>
        <p className="mt-2 text-base text-muted-foreground">
          {CLINIC.address.street}, {CLINIC.address.neighborhood}, {CLINIC.address.city} –{" "}
          {CLINIC.address.state} ({CLINIC.address.landmark}). Atendemos particular e{" "}
          <Link href="/#convenios" className="text-primary hover:underline">
            diversos convênios
          </Link>
          .
        </p>
        {TECHNICAL_DIRECTOR && (
          <p className="mt-2 text-sm text-muted-foreground">
            {TECHNICAL_DIRECTOR.name} · Oftalmologista · CRM-{TECHNICAL_DIRECTOR.crmState}{" "}
            {TECHNICAL_DIRECTOR.crm} · RQE {TECHNICAL_DIRECTOR.rqe}
          </p>
        )}
        <div className="mt-4">
          <BookingCta page={page} kind={kind} />
        </div>
      </section>

      <p className="mt-10 text-sm text-muted-foreground">
        <strong>Aviso:</strong> O conteúdo desta página é informativo e não substitui avaliação
        médica. Consulte sempre um profissional de saúde.
      </p>
    </article>
  );
}
