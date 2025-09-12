import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;
        if (!email || !password) return null;
        const envEmail = process.env.ADMIN_EMAIL;
        const hash = process.env.ADMIN_PASSWORD_HASH;
        const plain = process.env.ADMIN_PASSWORD; // dev fallback only
        if (!envEmail) return null;
        if (email !== envEmail) return null;
        let ok = false;
        if (hash) {
          try { ok = await bcrypt.compare(password, hash); } catch { ok = false; }
        } else if (plain) {
          ok = password === plain;
        }
        if (!ok) return null;
        const role = (process.env.ADMIN_ROLE as any) || 'owner';
        return { id: '1', name: 'Admin', email, role } as any;
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 60 * 60 * 2 }, // 2 hours
  jwt: { maxAge: 60 * 60 * 2 },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role || token.role || 'owner';
      return token as any;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = (token as any).role || 'owner';
      return session;
    },
  },
  pages: {
    signIn: '/admin-login',
  },
};
