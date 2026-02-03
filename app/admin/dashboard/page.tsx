import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { appointments } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { SignOutButton } from "../sign-out-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SCHEDULING_SPECIALTIES } from "@/lib/clinic-data";

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin");
  }

  const list = await db
    .select()
    .from(appointments)
    .orderBy(desc(appointments.slotStart));

  const specialtyLabel = (id: string) =>
    SCHEDULING_SPECIALTIES.find((s) => s.id === id)?.label ?? id;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Agendamentos</h1>
        <SignOutButton />
      </div>

      <Card className="mt-8">
        <CardHeader>
          <p className="text-muted-foreground">
            Pacientes agendados. Ordenado por data e horário (mais recentes primeiro).
          </p>
        </CardHeader>
        <CardContent>
          {list.length === 0 ? (
            <p className="text-muted-foreground">Nenhum agendamento ainda.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 pr-4 font-medium">Data e horário</th>
                    <th className="pb-2 pr-4 font-medium">Paciente</th>
                    <th className="pb-2 pr-4 font-medium">Telefone</th>
                    <th className="pb-2 font-medium">Especialidade</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((row) => (
                    <tr key={row.id} className="border-b last:border-0">
                      <td className="py-3 pr-4">
                        {new Date(row.slotStart).toLocaleString("pt-BR", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </td>
                      <td className="py-3 pr-4">{row.patientName}</td>
                      <td className="py-3 pr-4">{row.patientPhone}</td>
                      <td className="py-3">
                        {specialtyLabel(row.specialty)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <p className="mt-6">
        <Link href="/admin" className="text-sm text-muted-foreground underline hover:text-foreground">
          Voltar ao login
        </Link>
      </p>
    </div>
  );
}
