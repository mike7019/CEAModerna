import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "CEA Moderna | Escuela de Conducción en Medellín",
  description:
    "Aprende a conducir con los mejores instructores certificados de Medellín. Cursos de motocicleta, automóvil y camión. 4 sedes disponibles.",
  keywords: "escuela de conducción, Medellín, licencia de conducir, CEA Moderna, cursos de conducción",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full">
          <SessionProvider>{children}</SessionProvider>
        </body>
    </html>
  );
}
