"use client";
import { useEffect, useState, use } from "react";
import CourseDetail from "@/Componentes/CourseDetail";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getEnrollments, enrollCourse } from "@/lib/session";

export default function CursoPage({ params: paramsPromise }) {
  const router = useRouter();
  const { id } = use(paramsPromise);
  const [curso, setCurso] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const loadCurso = async () => {
    const courseId = Number(id);

    const { data: cursoData } = await supabase
      .from("cursos")
      .select("*")
      .eq("id_curso", courseId)
      .single();

    const enrollments = await getEnrollments();
    const realProgress = enrollments[courseId] ?? 0;
    setProgress(realProgress);
    setIsEnrolled(courseId in enrollments);

    if (cursoData) {
      setCurso({
        id: cursoData.id_curso,
        title: cursoData.nombre,
        category: "Seguridad",
        duration: `${cursoData.duracion_horas} horas`,
        modules: 3,
        level: "Básico",
        progress: realProgress,
        image: cursoData.imagen_url,
        longDescription: cursoData.descripcion,
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
            completed: realProgress >= 50,
            lessons: [
              { id: 1, title: "El Origen de los Hidrocarburos", type: "Lectura", duration: "15 min", completed: false },
              { id: 2, title: "Introducción en Video", type: "Video", duration: "20 min", completed: false },
            ],
          },
          {
            id: 2,
            title: "Equipos de Perforación y Protección",
            duration: "4 horas",
            completed: realProgress === 100,
            lessons: [
              { id: 3, title: "Componentes del Taladro", type: "Lectura", duration: "30 min", completed: false },
              { id: 4, title: "Introducción en video", type: "Video", duration: "20 min", completed: false },
            ],
          },
        ],
      });
    }
  };

  useEffect(() => {
    loadCurso();
  }, [id]);

  if (!curso) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700" />
      </div>
    );
  }

  return (
    <CourseDetail
      course={curso}
      progress={progress}
      isEnrolled={isEnrolled}
      onEnroll={async () => {
        await enrollCourse(Number(id));
        await loadCurso(); // recarga para mostrar barra de progreso
      }}
      onBack={() => router.push("/catalogo")}
      onStartLesson={(courseId, moduleId, lessonId) => {
        router.push(`/leccion/${lessonId}`);
      }}
    />
  );
}