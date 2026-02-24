"use client";
import Header from "./Header";
import { useRouter, usePathname } from "next/navigation";

export default function HeaderWrapper() {
  const router = useRouter();
  const pathname = usePathname();

  // No mostrar header en login
  if (pathname === '/login' || pathname === '/') return null;

  return (
    <Header
      currentUser={{ name: "Jose Angel" }}
      onLogout={() => router.push('/login')}
    />
  );
}