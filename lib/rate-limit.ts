import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const appointmentLimiter =
  redis &&
  new Ratelimit({
    redis,
    limiter: Ratelimit.fixedWindow(5, "15 m"),
    prefix: "agendar",
  });

/**
 * Returns { allowed: true } or { allowed: false, error: "..." }.
 * If Upstash env vars are not set, allows the request (no rate limiting).
 */
export async function checkAppointmentLimit(
  identifier: string
): Promise<{ allowed: true } | { allowed: false; error: string }> {
  if (!appointmentLimiter) return { allowed: true };
  const { success } = await appointmentLimiter.limit(identifier);
  if (success) return { allowed: true };
  return {
    allowed: false,
    error: "Muitos agendamentos em pouco tempo. Tente novamente em alguns minutos.",
  };
}
