import {
  SCHEDULING_HOURS,
  SCHEDULING_WORKING_DAYS,
} from "@/lib/clinic-data";

const SLOT_MINUTES = 30;

function parseTime(s: string): { hours: number; minutes: number } {
  const [h, m] = s.split(":").map(Number);
  return { hours: h ?? 0, minutes: m ?? 0 };
}

/**
 * Returns the next `count` bookable dates (working days only).
 * Uses local time (America/Sao_Paulo effectively via server/env).
 */
export function getBookableDates(count: number): Date[] {
  const out: Date[] = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  for (let i = 0; out.length < count; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const day = d.getDay();
    if (SCHEDULING_WORKING_DAYS.includes(day as (typeof SCHEDULING_WORKING_DAYS)[number])) {
      out.push(d);
    }
  }
  return out;
}

/**
 * Returns 30-minute slots for the given date (local day).
 * Saturday uses saturday hours; Mon–Fri use weekdays.
 */
export function getSlotsForDate(date: Date): { start: Date; end: Date }[] {
  const day = date.getDay();
  const config =
    day === 6 ? SCHEDULING_HOURS.saturday : SCHEDULING_HOURS.weekdays;
  const startParsed = parseTime(config.start);
  const endParsed = parseTime(config.end);

  const year = date.getFullYear();
  const month = date.getMonth();
  const dayOfMonth = date.getDate();

  const slots: { start: Date; end: Date }[] = [];
  let currentMinutes =
    startParsed.hours * 60 + startParsed.minutes;
  const endMinutes = endParsed.hours * 60 + endParsed.minutes;

  while (currentMinutes + SLOT_MINUTES <= endMinutes) {
    const startDate = new Date(
      year,
      month,
      dayOfMonth,
      Math.floor(currentMinutes / 60),
      currentMinutes % 60,
      0,
      0
    );
    const endDate = new Date(startDate.getTime() + SLOT_MINUTES * 60 * 1000);
    slots.push({ start: startDate, end: endDate });
    currentMinutes += SLOT_MINUTES;
  }
  return slots;
}
