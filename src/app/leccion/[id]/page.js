"use client";
import LessonView from "@/Componentes/LessonView";
import { useRouter } from "next/navigation";

const cursoEjemplo = {
  id: 1,
  title: "Introducción a la Extracción de Crudo",
  description: "Domina los fundamentos técnicos y operativos del proceso de producción petrolera en tierra (Onshore) y alta mar (Offshore)",
  modulesList: [
    {
      id: 1,
      title: "El Origen y el Yacimiento",
      lessons: [
        {
          id: 1,
          title: "Lección 1: El Origen de los Hidrocarburos",
          type: "text",
          duration: "10 min",
          content: `Conceptos Clave: "La Trampa Perfecta"
Para que exista un yacimiento explotable, deben coincidir cuatro elementos fundamentales:

Roca Madre: Rica en materia orgánica que, tras millones de años de presión y calor, genera hidrocarburos.

Migración: El proceso por el cual el petróleo viaja desde la roca madre hacia zonas de menor presión.

Roca Almacén: Una roca con suficiente porosidad (espacio para guardar el crudo) y permeabilidad (capacidad de dejarlo fluir).

Sello y Trampa: Una capa de roca impermeable que impide que el petróleo escape hacia la superficie.`,
        },
        {
          id: 2,
          title: "Leccion 2 Introducción en video",
          type: "video",
          duration: "5 min",
          videoUrl: "https://www.youtube.com/embed/N-DYWTc9iP4?si=yEm2gZ_vAtwXkjys",
          content: "Descripción del video y notas adicionales.",
        },
        {
          id: 3,
          title: "Leccion 3: conceptos",
          type: "lectura",
          duration: "5 min",
          content: "Descripción del video y notas adicionales.",
        },

      ],
    },
    {
      id: 2,
      title: "Equipos de Perforación y Protección",
      lessons: [
        { id: 3, title: "Componentes del Taladro",
          type: "text",
          duration: "8 min",
          content: `La extracción comienza con la perforación. Aquí conocerás los sistemas que componen una torre de perforación moderna:

Sistema de Levantamiento: Estructura y malacate para manejar las pesadas sartas de tubería.

Sistema de Rotación: La mesa rotaria o el Top Drive que hace girar la mecha (broca).

Sistema de Circulación: El lodo de perforación, esencial para enfriar la mecha y sacar los recortes de roca.`, },


        { id: 4, title: "Tipos de torres de perforación y componentes básicos de la sarta de perforación.", type: "video", duration: "6 min", videoUrl: "https://www.youtube.com/embed/bTZ3XmG6AwY?si=dx_yhrmTgbx9MDGd", content: "Notas del video." },
      ],
    },
  ],
};

export default function LeccionPage() {
  const router = useRouter();

  return (
    <LessonView
      course={cursoEjemplo}
      onBack={() => router.push("/catalogo")}
    />
  );
}