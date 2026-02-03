"use client";

import { getBookableDates } from "@/lib/slots";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: "short",
  day: "numeric",
  month: "short",
};

export function DateStep({
  selectedDate,
  onSelect,
  count = 14,
}: {
  selectedDate: Date | null;
  onSelect: (d: Date) => void;
  count?: number;
}) {
  const dates = getBookableDates(count);
  const format = (d: Date) =>
    d.toLocaleDateString("pt-BR", DATE_OPTIONS);

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {dates.map((d) => {
        const key = d.toISOString().slice(0, 10);
        const isSelected =
          selectedDate?.toISOString().slice(0, 10) === key;
        return (
          <Button
            key={key}
            type="button"
            variant={isSelected ? "default" : "outline"}
            size="lg"
            className="min-h-[3.5rem] flex flex-col items-center justify-center gap-0.5 py-5"
            onClick={() => onSelect(d)}
          >
            <span className="text-xs font-normal leading-tight opacity-90">
              {format(d).split(" ")[0]}
            </span>
            <span className="font-semibold leading-tight">
              {format(d).split(" ").slice(1).join(" ")}
            </span>
          </Button>
        );
      })}
    </div>
  );
}

export function DateStepFooter({
  selectedDate,
  onNext,
  onBack,
}: {
  selectedDate: Date | null;
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
        disabled={!selectedDate}
        onClick={onNext}
      >
        Continuar
      </Button>
    </div>
  );
}
