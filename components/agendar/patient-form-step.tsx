"use client";

import { useActionState } from "react";
import { SCHEDULING_SPECIALTIES } from "@/lib/clinic-data";
import {
  createAppointmentAction,
  type CreateAppointmentResult,
} from "@/app/agendar/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SpecialtyId } from "./specialty-step";

export function PatientFormStep({
  specialtyId,
  slotStart,
  slotEnd,
  onBack,
}: {
  specialtyId: SpecialtyId;
  slotStart: Date;
  slotEnd: Date;
  onBack: () => void;
}) {
  const [state, formAction, isPending] = useActionState(
    createAppointmentAction,
    null as CreateAppointmentResult | null
  );

  const specialtyLabel =
    SCHEDULING_SPECIALTIES.find((s) => s.id === specialtyId)?.label ?? specialtyId;

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="specialty" value={specialtyId} />
      <input type="hidden" name="slotStart" value={slotStart.toISOString()} />
      <input type="hidden" name="slotEnd" value={slotEnd.toISOString()} />

      <div className="rounded-lg border bg-muted/30 p-4">
        <p className="text-sm text-muted-foreground">
          <strong>Especialidade:</strong> {specialtyLabel}
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>Horário:</strong>{" "}
          {slotStart.toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}{" "}
          às {slotStart.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>

      {state?.success === false && state.error && (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      )}

      <div className="space-y-2">
        <Label htmlFor="patientName">Nome completo</Label>
        <Input
          id="patientName"
          name="patientName"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          maxLength={200}
          placeholder="Seu nome"
          className="min-h-[var(--touch-min)]"
          disabled={isPending}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="patientPhone">Telefone</Label>
        <Input
          id="patientPhone"
          name="patientPhone"
          type="tel"
          autoComplete="tel"
          required
          minLength={10}
          placeholder="(41) 99999-9999"
          className="min-h-[var(--touch-min)]"
          disabled={isPending}
        />
        <p className="text-xs text-muted-foreground">
          Com DDD. Apenas números e símbolos ( ) + -
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onBack}
          disabled={isPending}
        >
          Voltar
        </Button>
        <Button
          type="submit"
          size="lg"
          className="min-h-[var(--touch-min)]"
          disabled={isPending}
        >
          {isPending ? "Agendando..." : "Confirmar agendamento"}
        </Button>
      </div>
    </form>
  );
}
