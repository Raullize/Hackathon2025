import Login from '@/components/Login';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MIRC - Login",
  description: "Acesse sua conta MIRC - Movimento Integrado de Revitalização das Cidades.",
};

export default function LoginPage() {
  return <Login />;
}