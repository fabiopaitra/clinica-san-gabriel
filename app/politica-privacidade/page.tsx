import type { Metadata } from "next";
import Link from "next/link";
import { CLINIC } from "@/lib/clinic-data";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade da Clínica San Gabriel. Informações sobre coleta, uso e proteção de dados pessoais em conformidade com a LGPD.",
  robots: { index: true, follow: true },
};

export default function PoliticaPrivacidadePage() {
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
          Política de Privacidade
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>
      </header>

      <div className="prose prose-neutral max-w-none space-y-8 text-base text-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1">
        <section>
          <h2>1. Dados que coletamos</h2>
          <p>
            Coletamos dados necessários ao agendamento e atendimento: nome,
            telefone, e-mail, endereço e data de nascimento. Esses dados podem
            ser obtidos por formulários no site, WhatsApp, telefone ou
            presencialmente na clínica.
          </p>
        </section>

        <section>
          <h2>2. Finalidade</h2>
          <p>
            Utilizamos seus dados para agendamento de consultas, realização de
            exames, comunicações sobre atendimento, lembretes e cumprimento de
            obrigações legais e regulatórias.
          </p>
        </section>

        <section>
          <h2>3. Compartilhamento</h2>
          <p>
            Não vendemos ou alugamos seus dados. Compartilhamos informações
            apenas com profissionais de saúde envolvidos no seu atendimento,
            parceiros necessários ao serviço (por exemplo, Hospital de Olhos do
            Paraná) e autoridades quando exigido por lei.
          </p>
        </section>

        <section>
          <h2>4. Seus direitos (LGPD)</h2>
          <p>
            Em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018), você pode:
          </p>
          <ul>
            <li>Confirmar a existência de tratamento de dados</li>
            <li>Acessar seus dados pessoais</li>
            <li>Corrigir dados incompletos ou desatualizados</li>
            <li>Solicitar a exclusão de dados (respeitando retenção legal)</li>
            <li>Revogar o consentimento para tratamento</li>
          </ul>
        </section>

        <section>
          <h2>5. Contato</h2>
          <p>
            Para exercer seus direitos ou tirar dúvidas sobre esta política,
            entre em contato:
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
