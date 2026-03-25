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
      quiz: {
        title: "Evaluación: El Origen y el Yacimiento",
        minScore: 70,
        questions: [
          {
            id: 1,
            type: "multiple",
            question: "¿Cuál es la función de la Roca Almacén en un yacimiento petrolero?",
            options: ["Generar hidrocarburos mediante presión y calor", "Impedir que el petróleo escape a la superficie", "Almacenar el crudo gracias a su porosidad y permeabilidad", "Transportar el petróleo desde la roca madre"],
            correctAnswer: "Almacenar el crudo gracias a su porosidad y permeabilidad",
          },
          {
            id: 2,
            type: "truefalse",
            question: "La Roca Madre es la que impide que el petróleo escape hacia la superficie.",
            correctAnswer: "Falso",
          },
          {
            id: 3,
            type: "multiple",
            question: "¿Cómo se llama el proceso por el cual el petróleo viaja desde la roca madre?",
            options: ["Extracción", "Migración", "Perforación", "Refinación"],
            correctAnswer: "Migración",
          },
          {
            id: 4,
            type: "truefalse",
            question: "Para que exista un yacimiento explotable deben coincidir cuatro elementos fundamentales.",
            correctAnswer: "Verdadero",
          },
        ],
      },
    },
    {
      id: 2,
      title: "Equipos de Perforación y Protección",
      lessons: [
        {
          id: 4,
          title: "Componentes del Taladro",
          type: "text",
          duration: "8 min",
          content: `La extracción comienza con la perforación. Aquí conocerás los sistemas que componen una torre de perforación moderna:

Sistema de Levantamiento: Estructura y malacate para manejar las pesadas sartas de tubería.

Sistema de Rotación: La mesa rotaria o el Top Drive que hace girar la mecha (broca).

Sistema de Circulación: El lodo de perforación, esencial para enfriar la mecha y sacar los recortes de roca.`,
        },
        {
          id: 5,
          title: "Tipos de torres de perforación y componentes básicos de la sarta de perforación.",
          type: "video",
          duration: "6 min",
          videoUrl: "https://www.youtube.com/embed/bTZ3XmG6AwY?si=dx_yhrmTgbx9MDGd",
          content: "Notas del video.",
        },
      ],
      quiz: {
        title: "Evaluación: Equipos de Perforación",
        minScore: 70,
        questions: [
          {
            id: 5,
            type: "multiple",
            question: "¿Cuál es la función del Sistema de Circulación en la perforación?",
            options: ["Hacer girar la mecha de perforación", "Enfriar la mecha y sacar los recortes de roca", "Sostener la estructura de la torre", "Manejar las sartas de tubería"],
            correctAnswer: "Enfriar la mecha y sacar los recortes de roca",
          },
          {
            id: 6,
            type: "truefalse",
            question: "El Top Drive es parte del Sistema de Levantamiento.",
            correctAnswer: "Falso",
          },
          {
            id: 7,
            type: "multiple",
            question: "¿Qué componente se encarga de hacer girar la mecha de perforación?",
            options: ["Malacate", "Lodo de perforación", "Mesa rotaria o Top Drive", "Sarta de tubería"],
            correctAnswer: "Mesa rotaria o Top Drive",
          },
        ],
      },
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