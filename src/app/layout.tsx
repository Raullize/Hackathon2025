import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "sonner";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sora",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "MIRC - Início",
  description: "MIRC - Movimento Integrado de Revitalização das Cidades. Plataforma dedicada ao desenvolvimento urbano sustentável e revitalização de cidades na região metropolitana.",
  keywords: "MIRC, revitalização urbana, desenvolvimento sustentável, cidades, urbanismo, planejamento urbano",
  authors: [{ name: "MIRC" }],
  robots: "index, follow",
  openGraph: {
    title: "MIRC - Movimento Integrado de Revitalização das Cidades",
    description: "Plataforma dedicada ao desenvolvimento urbano sustentável e revitalização de cidades.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${sora.className} antialiased`}>
        <AuthProvider>
          {children}
          <Toaster 
            position="top-right"
            richColors
            closeButton={false}
            duration={4000}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
