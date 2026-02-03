"use client";

import { getSlotsForDate } from "@/lib/slots";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function formatTime(d: Date) {
  return d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function SlotStep({
  date,
  takenStartIsos,
  selectedSlot,
  onSelect,
  isLoading,
}: {
  date: Date | null;
  takenStartIsos: string[];
  selectedSlot: { start: Date; end: Date } | null;
  onSelect: (slot: { start: Date; end: Date }) => void;
  isLoading?: boolean;
}) {
  if (!date) return null;

  const slots = getSlotsForDate(date);
  const takenSet = new Set(takenStartIsos);
  const available = slots.filter(
    (s) => !takenSet.has(s.start.toISOString())
  );

  if (isLoading) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        Carregando horários...
      </div>
    );
  }

  if (available.length === 0) {
    return (
      <p className="text-muted-foreground">
        Não há horários disponíveis para esta data. Escolha outra data.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
      {available.map((slot) => {
        const key = slot.start.toISOString();
        const isSelected =
          selectedSlot?.start.toISOString() === key;
        return (
          <Button
            key={key}
            type="button"
            variant={isSelected ? "default" : "outline"}
            size="lg"
            className="min-h-[var(--touch-min)]"
            onClick={() => onSelect(slot)}
          >
            {formatTime(slot.start)}
          </Button>
        );
      })}
    </div>
  );
}

export function SlotStepFooter({
  selectedSlot,
  onNext,
  onBack,
}: {
  selectedSlot: { start: Date; end: Date } | null;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button type="button" variant="outline" size="lg" onClick={onBack}>
        Voltar
      </Button>
      <Button
        size="lg"
        className="min-h-[var(--touch-min)]"
        disabled={!selectedSlot}
        onClick={onNext}
      >
        Continuar
      </Button>
    </div>
  );
}
