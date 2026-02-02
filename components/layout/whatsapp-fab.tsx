import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { CLINIC } from "@/lib/clinic-data";

export function WhatsAppFAB() {
  return (
    <Link
      href={CLINIC.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex size-14 min-h-[56px] min-w-[56px] items-center justify-center rounded-full bg-[var(--whatsapp)] text-white shadow-lg hover:bg-[var(--whatsapp-hover)] hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-[var(--whatsapp)]/40 focus:ring-offset-2"
      aria-label="Falar no WhatsApp - Agendar consulta"
    >
      <WhatsAppIcon className="size-7" />
    </Link>
  );
}
