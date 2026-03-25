"use client";
import Dashboard from "@/Componentes/Dashboard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUser, getEnrollments } from "@/lib/session";

const cursosEjemplo = [
  { id: 1, title: "Introduccion a la Extraccion de Crudo", category: "Extraccion", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=300&fit=crop", duration: "12 horas", modules: 2, level: "Basico" },
  { id: 2, title: "Seguridad Industrial", category: "Seguridad", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop", duration: "8 horas", modules: 3, level: "Basico" },
  { id: 3, title: "Manejo de Equipos", category: "Equipos", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop", duration: "10 horas", modules: 4, level: "Intermedio" },
];

const loadProgress = () => {
  const enrollments = getEnrollments();
  const progress = {};
  Object.keys(enrollments).forEach(id => {
    progress[id] = enrollments[id].progress;
  });
  return progress;
};

export default function DashboardPage() {
  const router = useRouter();
  const [userProgress, setUserProgress] = useState({});

  useEffect(() => {
    // Carga inicial
    setUserProgress(loadProgress());

    // Se actualiza cada vez que la ventana recibe foco
    const handleFocus = () => setUserProgress(loadProgress());
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return (
    <Dashboard
      user={getCurrentUser()}
      courses={cursosEjemplo}
      userProgress={userProgress}
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