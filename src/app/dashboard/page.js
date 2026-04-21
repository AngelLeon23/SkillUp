"use client";
import Dashboard from "@/Componentes/Dashboard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUser, getEnrollments } from "@/lib/session";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [userProgress, setUserProgress] = useState({});

  const loadData = async () => {
    // 1. Usuario real
    const profile = await getCurrentUser();
    if (profile) {
      setUser({ name: profile.nombre, email: profile.correo });
    }

    // 2. Progreso real desde Supabase
    const enrollments = await getEnrollments();
    setUserProgress(enrollments);

    // 3. Solo los cursos en los que está inscrito
    const courseIds = Object.keys(enrollments).map(Number);
    if (courseIds.length > 0) {
      const { data } = await supabase
        .from("cursos")
        .select("id_curso, nombre, descripcion, duracion_horas, imagen_url, id_categoria")
        .in("id_curso", courseIds);

      if (data) {
        setCourses(data.map(c => ({
          id: c.id_curso,
          title: c.nombre,
          category: c.id_categoria?.toString() ?? "General",
          image: c.imagen_url,
          duration: `${c.duracion_horas} horas`,
          modules: 2,
          level: "Básico",
        })));
      }
    }
  };

  useEffect(() => {
    loadData();
    // Recargar al volver a la pestaña
    window.addEventListener("focus", loadData);
    return () => window.removeEventListener("focus", loadData);
  }, []);

  return (
    <Dashboard
      user={user}
      courses={courses}
      userProgress={userProgress}
      onCourseClick={(id) => {
        if (id === "catalog") {
          router.push("/catalogo");
        } else {
          router.push(`/curso/${id}`);
        }
      }}
    />
  );
}