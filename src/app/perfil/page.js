"use client";
import { useEffect, useState } from "react";
import UserProfile from "@/Componentes/UserProfile";
import { getCurrentUser, getEnrollments, getCertificados } from "@/lib/session";
import { supabase } from "@/lib/supabase";

export default function PerfilPage() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [certificados, setCertificados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const profile = await getCurrentUser();
        if (profile) {
          setUser({
            name: profile.nombre,
            email: profile.correo,
            joinDate: new Date(profile.fecha_registro).toLocaleDateString("es-MX", {
              month: "long",
              year: "numeric",
            }),
          });
        }

        const progress = await getEnrollments();
        setUserProgress(progress);

        const courseIds = Object.keys(progress).map(Number);
        if (courseIds.length > 0) {
          const { data: cursosData } = await supabase
            .from("cursos")
            .select("id_curso, nombre, id_categoria")
            .in("id_curso", courseIds);

          if (cursosData) {
            setCourses(cursosData.map((c) => ({
              id: c.id_curso,
              title: c.nombre,
              category: c.id_categoria?.toString() ?? "General",
            })));
          }
        }

        const certs = await getCertificados();
        setCertificados(certs);
      } catch (err) {
        console.error("Error cargando perfil:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        No se pudo cargar el perfil.
      </div>
    );
  }

  return (
    <UserProfile
      user={user}
      userProgress={userProgress}
      courses={courses}
      certificados={certificados}
    />
  );
}