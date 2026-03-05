"use client";
import CourseCatalog from "@/Componentes/CourseCatalog";
import { useRouter } from "next/navigation";

const cursosEjemplo = [
  {
    id: 1,
    title: "Seguridad Industrial",
    description: "Aprende los fundamentos de seguridad en operaciones petroleras.",
    category: "Seguridad",
    image: "/images/seguridad.jpg",
  },
  {
    id: 2,
    title: "Operaciones en Plataforma",
    description: "Curso avanzado de operaciones offshore.",
    category: "Operaciones",
    image: "/images/offshore.jpeg",
  },
  {
    id: 3,
    title: "Introduccion a la extraccion de crudo",
    description: "Domina los fundamentos técnicos y operativos del proceso de producción petrolera en tierra (Onshore) y alta mar (Offshore).",
    category: "Equipos",
    image: "/images/equipos.jpg",
  },
];

export default function CoursesPage() {
  const router = useRouter();

  return (
    <CourseCatalog
      courses={cursosEjemplo}
      userProgress={{}}
      onCourseClick={(id) => router.push(`/curso/${id}`)}
    />
  );
}