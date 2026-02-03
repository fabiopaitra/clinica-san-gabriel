"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { getTakenSlotStarts } from "@/app/agendar/actions";
import {
  DateStep,
  DateStepFooter,
} from "@/components/agendar/date-step";
import {
  PatientFormStep,
} from "@/components/agendar/patient-form-step";
import {
  SpecialtyStep,
  SpecialtyStepFooter,
} from "@/components/agendar/specialty-step";
import {
  SlotStep,
  SlotStepFooter,
} from "@/components/agendar/slot-step";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getSlotsForDate } from "@/lib/slots";
import type { SpecialtyId } from "@/components/agendar/specialty-step";

const STEPS = [
  "Especialidade",
  "Data",
  "Horário",
  "Seus dados",
] as const;

export default function AgendarPage() {
  const [step, setStep] = useState(1);
  const [specialtyId, setSpecialtyId] = useState<SpecialtyId | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const [takenSlotStarts, setTakenSlotStarts] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  const fetchTakenSlots = useCallback(async (date: Date, specialty: string) => {
    setSlotsLoading(true);
    try {
      const slots = getSlotsForDate(date);
      const isos = slots.map((s) => s.start.toISOString());
      const taken = await getTakenSlotStarts(isos, specialty);
      setTakenSlotStarts(taken);
    } finally {
      setSlotsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (step === 3 && selectedDate && specialtyId) {
      fetchTakenSlots(selectedDate, specialtyId);
    }
  }, [step, selectedDate, specialtyId, fetchTakenSlots]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-16">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Agendar consulta
      </h1>
      <p className="mt-2 text-muted-foreground">
        Passo {step} de {STEPS.length}: {STEPS[step - 1]}
      </p>

      <Card className="mt-8">
        <CardHeader />
        <CardContent className="space-y-8">
          {step === 1 && (
            <>
              <SpecialtyStep
                selectedId={specialtyId}
                onSelect={setSpecialtyId}
              />
              <SpecialtyStepFooter
                selectedId={specialtyId}
                onNext={() => setStep(2)}
              />
            </>
          )}

          {step === 2 && (
            <>
              <DateStep
                selectedDate={selectedDate}
                onSelect={setSelectedDate}
              />
              <DateStepFooter
                selectedDate={selectedDate}
                onNext={() => {
                  setSelectedSlot(null);
                  setStep(3);
                }}
                onBack={() => setStep(1)}
              />
            </>
          )}

          {step === 3 && (
            <>
              <SlotStep
                date={selectedDate}
                takenStartIsos={takenSlotStarts}
                selectedSlot={selectedSlot}
                onSelect={setSelectedSlot}
                isLoading={slotsLoading}
              />
              <SlotStepFooter
                selectedSlot={selectedSlot}
                onNext={() => setStep(4)}
                onBack={() => setStep(2)}
              />
            </>
          )}

          {step === 4 && specialtyId && selectedSlot && (
            <PatientFormStep
              specialtyId={specialtyId}
              slotStart={selectedSlot.start}
              slotEnd={selectedSlot.end}
              onBack={() => setStep(3)}
            />
          )}
        </CardContent>
      </Card>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link href="/" className="underline hover:text-foreground">
          Voltar ao início
        </Link>
      </p>
    </div>
  );
}
