import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SCHEDULING_SPECIALTIES } from "@/lib/clinic-data";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ConfirmacaoPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const nome = typeof params.nome === "string" ? params.nome : "";
  const dataIso = typeof params.data === "string" ? params.data : "";
  const especialidadeId =
    typeof params.especialidade === "string" ? params.especialidade : "";
  const telefone = typeof params.telefone === "string" ? params.telefone : "";

  const especialidadeLabel =
    SCHEDULING_SPECIALTIES.find((s) => s.id === especialidadeId)?.label ??
    especialidadeId;
  const dataFormatada = dataIso
    ? new Date(dataIso).toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:py-16">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Agendamento confirmado
      </h1>

      <Card className="mt-8">
        <CardHeader>
          <p className="text-muted-foreground">
            Sua consulta foi agendada com sucesso.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {nome && <p><strong>Paciente:</strong> {nome}</p>}
          {telefone && <p><strong>Telefone:</strong> {telefone}</p>}
          {especialidadeLabel && (
            <p><strong>Especialidade:</strong> {especialidadeLabel}</p>
          )}
          {dataFormatada && <p><strong>Data e horário:</strong> {dataFormatada}</p>}
        </CardContent>
      </Card>

      <div className="mt-8 flex flex-col items-center gap-4">
        <Button size="lg" asChild className="min-h-[var(--touch-min)]">
          <Link href="/">Voltar ao início</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/agendar">Agendar outra consulta</Link>
        </Button>
      </div>
    </div>
  );
}
