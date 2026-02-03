import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminLoginForm } from "./admin-login-form";

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/admin/dashboard");
  }
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center px-4 py-16">
      <h1 className="text-2xl font-bold tracking-tight">Acesso administrativo</h1>
      <p className="mt-2 text-muted-foreground">
        Entre com seu usuário e senha.
      </p>
      <AdminLoginForm className="mt-8" />
    </div>
  );
}
