"use client";
import UserProfile from "@/Componentes/UserProfile";

const usuarioEjemplo = {
  name: "Jose Angel",
  email: "cepillin@empresa.com",
  joinDate: "mayo 2025",
};

const cursosEjemplo = [
  { id: 1, title: "Seguridad Industrial", category: "Seguridad" },
  { id: 2, title: "Operaciones en Plataforma", category: "Operaciones" },
  { id: 3, title: "Manejo de Equipos", category: "Equipos" },
];

const progresoEjemplo = {
  1: 75,
  2: 100,
  3: 30,
};

export default function PerfilPage() {
  return (
    <UserProfile
      user={usuarioEjemplo}
      userProgress={progresoEjemplo}
      courses={cursosEjemplo}
    />
  );
}