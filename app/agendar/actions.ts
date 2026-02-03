"use server";

import { and, eq, inArray } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "@/lib/db";
import { appointments } from "@/lib/db/schema";
import { SCHEDULING_SPECIALTIES } from "@/lib/clinic-data";
import { checkAppointmentLimit } from "@/lib/rate-limit";

const specialtyIds = SCHEDULING_SPECIALTIES.map((s) => s.id);

const createAppointmentSchema = z.object({
  patientName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(200),
  patientPhone: z
    .string()
    .min(10, "Telefone inválido")
    .max(20)
    .regex(/^[\d\s()+-]+$/, "Use apenas números e símbolos ( ) + -"),
  specialty: z.enum(specialtyIds as [string, ...string[]]),
  slotStart: z.string().datetime(),
  slotEnd: z.string().datetime(),
});

/**
 * Returns ISO date strings of slot starts that are already booked for the given specialty.
 */
export async function getTakenSlotStarts(
  slotStartIsos: string[],
  specialty: string
): Promise<string[]> {
  if (slotStartIsos.length === 0) return [];
  const validSpecialty = (specialtyIds as readonly string[]).includes(specialty);
  if (!validSpecialty) return [];

  const dates = slotStartIsos
    .map((s) => {
      try {
        return new Date(s);
      } catch {
        return null;
      }
    })
    .filter((d): d is Date => d !== null && !Number.isNaN(d.getTime()));

  if (dates.length === 0) return [];

  const rows = await db
    .select({ slotStart: appointments.slotStart })
    .from(appointments)
    .where(
      and(
        eq(appointments.specialty, specialty),
        inArray(appointments.slotStart, dates)
      )
    );

  return rows.map((r) => r.slotStart.toISOString());
}

export type CreateAppointmentResult =
  | { success: true }
  | { success: false; error: string };

export async function createAppointment(
  formData: FormData
): Promise<CreateAppointmentResult> {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "anonymous";
  const limitResult = await checkAppointmentLimit(ip);
  if (!limitResult.allowed) {
    return { success: false, error: limitResult.error };
  }

  const raw = {
    patientName: formData.get("patientName") ?? "",
    patientPhone: formData.get("patientPhone") ?? "",
    specialty: formData.get("specialty") ?? "",
    slotStart: formData.get("slotStart") ?? "",
    slotEnd: formData.get("slotEnd") ?? "",
  };

  const parsed = createAppointmentSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      first.patientName?.[0] ??
      first.patientPhone?.[0] ??
      first.specialty?.[0] ??
      first.slotStart?.[0] ??
      first.slotEnd?.[0] ??
      "Dados inválidos.";
    return { success: false, error: msg };
  }

  const { patientName, patientPhone, specialty, slotStart, slotEnd } =
    parsed.data;
  const startDate = new Date(slotStart);
  const endDate = new Date(slotEnd);

  const taken = await getTakenSlotStarts([slotStart], specialty);
  if (taken.length > 0) {
    return {
      success: false,
      error: "Este horário já foi reservado. Escolha outro horário.",
    };
  }

  try {
    await db.insert(appointments).values({
      patientName,
      patientPhone,
      specialty,
      slotStart: startDate,
      slotEnd: endDate,
    });
  } catch (err) {
    const msg = String(err ?? "");
    if (msg.includes("unique") || msg.includes("appointments_slot_specialty")) {
      return {
        success: false,
        error: "Este horário já foi reservado. Escolha outro horário.",
      };
    }
    return {
      success: false,
      error: "Não foi possível agendar. Tente novamente.",
    };
  }

  redirect(
    `/agendar/confirmacao?nome=${encodeURIComponent(patientName)}&data=${encodeURIComponent(startDate.toISOString())}&especialidade=${encodeURIComponent(specialty)}&telefone=${encodeURIComponent(patientPhone)}`
  );
}

/** Wrapper for useActionState: (prevState, formData) => createAppointment(formData) */
export async function createAppointmentAction(
  _prev: CreateAppointmentResult | null,
  formData: FormData
): Promise<CreateAppointmentResult> {
  return createAppointment(formData);
}
