"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthError } from "next-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function AdminLoginForm({ className }: { className?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin/dashboard";
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const result = await signIn("credentials", {
        username: formData.get("username") as string,
        password: formData.get("password") as string,
        redirect: false,
      });
      if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
      } else {
        setError(result?.error ?? "Usuário ou senha inválidos.");
      }
    } catch (err) {
      if (err instanceof AuthError) {
        setError("Usuário ou senha inválidos.");
      } else {
        setError("Erro ao entrar. Tente novamente.");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-4", className)}>
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      <div className="space-y-2">
        <Label htmlFor="username">Usuário</Label>
        <Input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          disabled={pending}
          className="min-h-[var(--touch-min)]"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={pending}
          className="min-h-[var(--touch-min)]"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="w-full min-h-[var(--touch-min)]"
        disabled={pending}
      >
        {pending ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
