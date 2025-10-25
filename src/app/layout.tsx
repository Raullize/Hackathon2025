import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChatBot } from "@/components/ChatBot";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hackathon 2025",
  description: "Base arquitetural para Hackathon 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
