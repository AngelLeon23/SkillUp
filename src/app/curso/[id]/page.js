"use client";
import CourseDetail from "@/Componentes/CourseDetail";
import { useRouter } from "next/navigation";

const cursoEjemplo = {
  id: 1,
  title: "introduccion a la extraccion de crudo",
  category: "Seguridad",
  duration: "12 horas",
  modules: 3,
  level: "Básico",
  progress: 40,
  image: "/images/equipos.jpg",
  longDescription: "Domina los fundamentos técnicos y operativos del proceso de producción petrolera en tierra (Onshore) y alta mar (Offshore)",
  objectives: [
    "Fundamentos Geológicos: Cómo se almacena el petróleo y qué es una roca reservorio.",
    "Sistemas de Perforación: El viaje desde la superficie hasta el objetivo.",
    "Tratamiento Inicial: Qué sucede con el petróleo una vez que sale del pozo.",
  ],
  modulesList: [
    {
      id: 1,
      title: "El Origen y el Yacimiento",
      duration: "2 horas",
      completed: true,
      lessons: [
        { id: 1, title: "El Origen de los Hidrocarburos", type: "Lectura", duration: "15 min", completed: false },
        { id: 2, title: "Introducción en Video", type: "Video", duration: "20 min", completed: false },
      ],
    },
    {
      id: 2,
      title: "Equipos de Perforación y Proteccion",
      duration: "4 horas",
      completed: false,
      lessons: [
        { id: 3, title: "Componentes del Taladro", type: "Lectura", duration: "30 min", completed: false },
        { id: 4, title: "Introduccion en video", type: "Video", duration: "20 min", completed: false },
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
      onStartLesson={(courseId, moduleId, lessonId) => {
        // Esto redirigirá a localhost:3000/leccion/1 (o el ID que corresponda)
        router.push(`/leccion/${lessonId}`);
      }}
    />
  );
}