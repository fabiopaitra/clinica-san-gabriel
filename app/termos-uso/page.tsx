import type { Metadata } from "next";
import Link from "next/link";
import { CLINIC } from "@/lib/clinic-data";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos de Uso do site da Clínica San Gabriel. Regras de utilização e informações importantes sobre o conteúdo do site.",
  robots: { index: true, follow: true },
};

export default function TermosUsoPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          ← Voltar ao início
        </Link>
        <h1 className="mt-4 text-2xl font-semibold text-foreground sm:text-3xl">
          Termos de Uso
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>
      </header>

      <div className="prose prose-neutral max-w-none space-y-8 text-base text-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1">
        <section>
          <h2>1. Uso do site</h2>
          <p>
            Este site é de uso institucional da {CLINIC.name}, destinado a
            divulgar informações sobre serviços, localização e formas de contato.
            O uso do site deve ser feito de forma lícita e sem fins comerciais não
            autorizados.
          </p>
        </section>

        <section>
          <h2>2. Não substitui orientação médica</h2>
          <p>
            O conteúdo disponível aqui é exclusivamente informativo e não substitui
            consulta, diagnóstico ou tratamento médico. Sempre consulte um
            profissional de saúde qualificado para avaliação adequada.
          </p>
        </section>

        <section>
          <h2>3. Links externos</h2>
          <p>
            O site pode conter links para páginas de terceiros (Google Maps,
            redes sociais, etc.). Não nos responsabilizamos pelo conteúdo ou
            práticas desses sites externos.
          </p>
        </section>

        <section>
          <h2>4. Contato</h2>
          <p>
            Para dúvidas sobre estes termos, entre em contato:
          </p>
          <p>
            <a
              href={`mailto:${CLINIC.email}`}
              className="text-primary hover:underline"
            >
              {CLINIC.email}
            </a>
            {" · "}
            <a
              href={`tel:${CLINIC.phone}`}
              className="text-primary hover:underline"
            >
              {CLINIC.phoneFormatted}
            </a>
          </p>
        </section>
      </div>
    </article>
  );
}
