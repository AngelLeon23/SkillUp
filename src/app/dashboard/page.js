"use client";
import Dashboard from "@/Componentes/Dashboard";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <Dashboard
      onCourseClick={(id) => {
        if (id === 'catalog') {
          router.push('/catalogo');
        } else {
          router.push(`/curso/${id}`);
        }
      }}
    />
  );
}