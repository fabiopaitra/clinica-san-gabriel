"use client";

import { SCHEDULING_SPECIALTIES } from "@/lib/clinic-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type SpecialtyId = (typeof SCHEDULING_SPECIALTIES)[number]["id"];

export function SpecialtyStep({
  selectedId,
  onSelect,
}: {
  selectedId: SpecialtyId | null;
  onSelect: (id: SpecialtyId) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {SCHEDULING_SPECIALTIES.map((s) => (
        <Card
          key={s.id}
          className={cn(
            "cursor-pointer transition-colors hover:border-primary hover:bg-primary/5",
            selectedId === s.id && "border-primary bg-primary/5 ring-2 ring-primary/30"
          )}
          onClick={() => onSelect(s.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(s.id);
            }
          }}
          aria-pressed={selectedId === s.id}
          aria-label={`Selecionar ${s.label}`}
        >
          <CardHeader>
            <h3 className="text-lg font-semibold">{s.label}</h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{s.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function SpecialtyStepFooter({
  selectedId,
  onNext,
}: {
  selectedId: SpecialtyId | null;
  onNext: () => void;
}) {
  return (
    <Button
      size="lg"
      className="min-h-[var(--touch-min)]"
      disabled={!selectedId}
      onClick={onNext}
    >
      Continuar
    </Button>
  );
}
