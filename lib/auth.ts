import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";

export const { handlers, auth, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Usuário", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!username?.trim() || !password) return null;

        const rows = await db
          .select()
          .from(adminUsers)
          .where(eq(adminUsers.username, username.trim()))
          .limit(1);

        const user = rows[0];
        if (!user) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return {
          id: user.id,
          name: user.username,
          email: null,
          image: null,
        };
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  pages: {
    signIn: "/admin",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.sub ?? undefined;
        session.user.name = (token.name as string) ?? null;
      }
      return session;
    },
  },
});
