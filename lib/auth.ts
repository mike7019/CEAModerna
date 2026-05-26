import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        cedula: { label: "Cédula", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.cedula || !credentials?.password) return null;

        const estudiante = await prisma.estudiante.findUnique({
          where: { cedula: credentials.cedula },
        });

        if (!estudiante) return null;

        const passwordOk = await bcrypt.compare(
          credentials.password,
          estudiante.password
        );

        if (!passwordOk) return null;

        return {
          id: estudiante.id,
          name: `${estudiante.nombre} ${estudiante.apellido}`,
          email: estudiante.email,
          cedula: estudiante.cedula,
        };
      },
    }),
  ],
  pages: {
    signIn: "/estudiantes/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.cedula = (user as unknown as { cedula: string }).cedula;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.cedula = token.cedula as string;
      }
      return session;
    },
  },
};
