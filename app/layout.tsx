import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";

import { Header, Footer, WhatsAppFAB, SkipLink } from "@/components/layout";
import { CLINIC } from "@/lib/clinic-data";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-sans-app",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(CLINIC.domain),
  title: {
    default: `${CLINIC.name} | Oftalmologia em Colombo, PR`,
    template: `%s | ${CLINIC.name}`,
  },
  description:
    "Clínica de oftalmologia em Colombo. Exames completos, paquimetria, topografia, mapeamento de retina. Parceria Hospital de Olhos do Paraná. Agende via WhatsApp.",
  keywords: [
    "oftalmologia Colombo",
    "clínica olhos Colombo",
    "exames oftalmológicos",
    "Hospital de Olhos Paraná",
    "consulta oftalmologista",
    "Clínica San Gabriel",
  ],
  authors: [{ name: CLINIC.name }],
  creator: CLINIC.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: CLINIC.name,
    title: `${CLINIC.name} | Oftalmologia em Colombo, PR`,
    description:
      "Clínica de oftalmologia em Colombo. Exames completos, paquimetria, topografia, mapeamento de retina. Parceria Hospital de Olhos do Paraná. Agende via WhatsApp.",
    url: CLINIC.domain,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Clínica San Gabriel - Oftalmologia em Colombo, PR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${CLINIC.name} | Oftalmologia em Colombo, PR`,
    description:
      "Clínica de oftalmologia em Colombo. Exames completos, paquimetria, topografia, mapeamento de retina. Parceria Hospital de Olhos do Paraná. Agende via WhatsApp.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: CLINIC.domain,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${sourceSans.variable} font-sans antialiased`}>
        <SkipLink />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <WhatsAppFAB />
      </body>
    </html>
  );
}
