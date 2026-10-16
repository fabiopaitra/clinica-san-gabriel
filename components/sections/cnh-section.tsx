import Link from "next/link";
import { IdCard } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { CLINIC } from "@/lib/clinic-data";
import { examPath, findExamPage } from "@/lib/service-pages";

const CNH_SLUG = "exame-de-vista-para-cnh";

export function CnhSection() {
  const page = findExamPage(CNH_SLUG);
  if (!page) return null;

  return (
    <section id="cnh" className="bg-muted/30" aria-labelledby="cnh-title">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:gap-6 sm:px-6 lg:px-8">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
          <IdCard className="size-6" aria-hidden />
        </div>
        <div className="flex-1">
          <h2 id="cnh-title" className="text-xl font-semibold">
            Exame de vista para CNH
          </h2>
          <p className="mt-1 text-base text-muted-foreground">
            Vai tirar ou renovar a habilitação? Fazemos o exame de vista,{" "}
            {CLINIC.address.landmark}.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href={examPath(CNH_SLUG)}
            data-track-event="nav_click"
            data-track-location="cnh"
            data-track-target={examPath(CNH_SLUG)}
            className="text-base font-medium text-primary hover:underline"
          >
            Saiba mais
          </Link>
          <a
            href={CLINIC.whatsappMessage(page.whatsappText)}
            data-track-event="whatsapp_click"
            data-track-location="cnh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-base font-medium text-primary hover:underline"
          >
            <WhatsAppIcon className="size-5 shrink-0" />
            Agendar
          </a>
        </div>
      </div>
    </section>
  );
}
