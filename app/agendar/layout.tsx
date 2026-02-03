import type { Metadata } from "next";
import { CLINIC } from "@/lib/clinic-data";

export const metadata: Metadata = {
  title: "Agendar consulta",
  description: `Agende sua consulta na ${CLINIC.name}. Oftalmologia e exame toxicológico (Detran) em Colombo, PR.`,
};

export default function AgendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
