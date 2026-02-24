"use client";
import CourseDetail from "@/Componentes/CourseDetail";
import { useRouter } from "next/navigation";

const cursoEjemplo = {
  id: 1,
  title: "Seguridad Industrial",
  category: "Seguridad",
  duration: "12 horas",
  modules: 3,
  level: "Básico",
  progress: 40,
  image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=400&fit=crop",
  longDescription: "Aprende los fundamentos de seguridad en operaciones petroleras con este curso completo.",
  objectives: [
    "Identificar riesgos en el área de trabajo",
    "Aplicar protocolos de seguridad",
    "Usar correctamente el equipo de protección personal",
  ],
  modulesList: [
    {
      id: 1,
      title: "Introducción a la Seguridad",
      duration: "2 horas",
      completed: true,
      lessons: [
        { id: 1, title: "¿Qué es la seguridad industrial?", type: "Video", duration: "15 min", completed: true },
        { id: 2, title: "Normativas y regulaciones", type: "Lectura", duration: "20 min", completed: true },
      ],
    },
    {
      id: 2,
      title: "Equipos de Protección Personal",
      duration: "4 horas",
      completed: false,
      lessons: [
        { id: 3, title: "Tipos de EPP", type: "Video", duration: "30 min", completed: false },
        { id: 4, title: "Uso correcto del casco", type: "Video", duration: "20 min", completed: false },
      ],
    },
  ],
};

export default function CursoPage({ params }) {
  const router = useRouter();

  return (
    <CourseDetail
      course={cursoEjemplo}
      progress={40}
      onBack={() => router.push("/catalogo")}
      onStartLesson={(courseId, moduleId, lessonId) =>
        console.log("Iniciando lección:", lessonId)
      }
    />
  );
}