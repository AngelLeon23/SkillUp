"use client";

import { useState, useEffect } from 'react';
import { Header } from './Componentes/Header';
import { Login } from './Componentes/Login';
import { CourseCatalog } from './Componentes/CourseCatalog';
import { CourseDetail } from './Componentes/CourseDetail';
import { Dashboard } from './Componentes/Dashboard';
import { UserProfile } from './Componentes/UserProfile';

const MOCK_COURSES = [
  {
    id: '1',
    title: 'SSPA - Sistema de Seguridad, Protección Ambiental y Salud Ocupacional',
    category: 'SSPA',
    duration: '40 horas',
    level: 'Básico',
    image: 'https://images.unsplash.com/photo-1573153178631-49e3aa9e018b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvaWwlMjByZWZpbmVyeSUyMHNhZmV0eXxlbnwxfHx8fDE3NjkzNTU3OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Conoce los 27 elementos del anexo SSPA y su aplicación en la industria petrolera.',
    modules: 8,
    longDescription: 'Este curso integral cubre los 27 elementos del Sistema de Seguridad, Protección Ambiental y Salud Ocupacional, proporcionando las herramientas necesarias para implementar y mantener estándares de seguridad en operaciones petroleras.',
    objectives: [
      'Comprender los 27 elementos del anexo SSPA',
      'Implementar políticas de seguridad efectivas',
      'Identificar y evaluar riesgos operacionales',
      'Desarrollar planes de respuesta a emergencias',
      'Promover una cultura de seguridad en la organización',
    ],
    modulesList: [
      {
        id: 'm1',
        title: 'Módulo 1: Introducción al SSPA',
        duration: '5 horas',
        completed: false,
        lessons: [
          { id: 'l1', title: 'Historia y evolución del SSPA', duration: '45 min', type: 'Video', completed: false },
          { id: 'l2', title: 'Marco normativo mexicano', duration: '1 hora', type: 'Lectura', completed: false },
          { id: 'l3', title: 'Los 27 elementos del SSPA', duration: '1.5 horas', type: 'Video', completed: false },
          { id: 'l4', title: 'Evaluación del módulo', duration: '30 min', type: 'Quiz', completed: false },
        ],
      },
      {
        id: 'm2',
        title: 'Módulo 2: Análisis de Riesgos',
        duration: '6 horas',
        completed: false,
        lessons: [
          { id: 'l5', title: 'Identificación de peligros', duration: '1 hora', type: 'Video', completed: false },
          { id: 'l6', title: 'Metodologías de análisis de riesgos', duration: '2 horas', type: 'Lectura', completed: false },
          { id: 'l7', title: 'Casos prácticos', duration: '2 horas', type: 'Práctica', completed: false },
          { id: 'l8', title: 'Evaluación del módulo', duration: '1 hora', type: 'Quiz', completed: false },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Seguridad Básica en Instalaciones Petroleras',
    category: 'Seguridad Industrial',
    duration: '24 horas',
    level: 'Básico',
    image: 'https://images.unsplash.com/photo-1759159091245-fc043faacddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwc2FmZXR5JTIwdHJhaW5pbmd8ZW58MXx8fHwxNzY5MzMwNTk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Fundamentos de seguridad para trabajar en instalaciones petroleras.',
    modules: 6,
    longDescription: 'Curso esencial para todo trabajador del sector petrolero. Aprende los protocolos básicos de seguridad, procedimientos de emergencia y mejores prácticas para mantener un ambiente de trabajo seguro.',
    objectives: [
      'Conocer las normas básicas de seguridad industrial',
      'Identificar riesgos comunes en instalaciones petroleras',
      'Aplicar procedimientos de trabajo seguro',
      'Responder adecuadamente ante emergencias',
    ],
    modulesList: [
      {
        id: 'm1',
        title: 'Módulo 1: Fundamentos de Seguridad Industrial',
        duration: '4 horas',
        completed: false,
        lessons: [
          { id: 'l1', title: 'Conceptos básicos de seguridad', duration: '1 hora', type: 'Video', completed: false },
          { id: 'l2', title: 'Normativa aplicable', duration: '1.5 horas', type: 'Lectura', completed: false },
          { id: 'l3', title: 'Evaluación', duration: '30 min', type: 'Quiz', completed: false },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Primeros Auxilios en Campo Petrolero',
    category: 'Primeros Auxilios',
    duration: '16 horas',
    level: 'Básico',
    image: 'https://images.unsplash.com/photo-1725391798478-5fe9cfc8398e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXRyb2xldW0lMjBlbmdpbmVlcnxlbnwxfHx8fDE3NjkzNTU3OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Aprende a responder ante emergencias médicas en instalaciones petroleras.',
    modules: 5,
    longDescription: 'Capacitación práctica en primeros auxilios específica para el entorno petrolero, incluyendo atención de quemaduras, traumatismos y exposición a químicos.',
    objectives: [
      'Evaluar situaciones de emergencia médica',
      'Aplicar técnicas básicas de primeros auxilios',
      'Atender casos de quemaduras y traumatismos',
      'Manejar exposición a sustancias peligrosas',
    ],
    modulesList: [
      {
        id: 'm1',
        title: 'Módulo 1: Evaluación de Emergencias',
        duration: '3 horas',
        completed: false,
        lessons: [
          { id: 'l1', title: 'Valoración inicial del paciente', duration: '1 hora', type: 'Video', completed: false },
          { id: 'l2', title: 'Priorización de atención', duration: '1 hora', type: 'Lectura', completed: false },
          { id: 'l3', title: 'Evaluación', duration: '30 min', type: 'Quiz', completed: false },
        ],
      },
    ],
  },
  {
    id: '4',
    title: 'Manejo Seguro de Sustancias Químicas',
    category: 'Sustancias Químicas',
    duration: '20 horas',
    level: 'Intermedio',
    image: 'https://images.unsplash.com/photo-1685826398847-0a5744b8be1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZldHklMjBlcXVpcG1lbnQlMjBoZWxtZXR8ZW58MXx8fHwxNzY5MzU1NzkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Protocolos para el manejo, almacenamiento y transporte de sustancias químicas peligrosas.',
    modules: 6,
    longDescription: 'Curso especializado en el manejo de sustancias químicas utilizadas en la industria petrolera, incluyendo procedimientos de seguridad, hojas de datos y respuesta a derrames.',
    objectives: [
      'Interpretar hojas de datos de seguridad (HDS)',
      'Aplicar procedimientos de manejo seguro',
      'Implementar medidas de almacenamiento adecuadas',
      'Responder a derrames y fugas',
    ],
    modulesList: [
      {
        id: 'm1',
        title: 'Módulo 1: Introducción a Sustancias Químicas',
        duration: '3 horas',
        completed: false,
        lessons: [
          { id: 'l1', title: 'Clasificación de sustancias', duration: '1 hora', type: 'Video', completed: false },
          { id: 'l2', title: 'Riesgos químicos comunes', duration: '1.5 horas', type: 'Lectura', completed: false },
          { id: 'l3', title: 'Evaluación', duration: '30 min', type: 'Quiz', completed: false },
        ],
      },
    ],
  },
  {
    id: '5',
    title: 'Uso Correcto de Equipo de Protección Personal (EPP)',
    category: 'Seguridad Industrial',
    duration: '12 horas',
    level: 'Básico',
    image: 'https://images.unsplash.com/photo-1573153178631-49e3aa9e018b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvaWwlMjByZWZpbmVyeSUyMHNhZmV0eXxlbnwxfHx8fDE3NjkzNTU3OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Selección, uso y mantenimiento adecuado del equipo de protección personal.',
    modules: 4,
    longDescription: 'Aprende a seleccionar y utilizar correctamente el EPP según el tipo de riesgo, así como los procedimientos de inspección y mantenimiento.',
    objectives: [
      'Identificar tipos de EPP según riesgos',
      'Utilizar correctamente el EPP',
      'Realizar inspección y mantenimiento',
      'Comprender limitaciones del EPP',
    ],
    modulesList: [
      {
        id: 'm1',
        title: 'Módulo 1: Tipos de EPP',
        duration: '3 horas',
        completed: false,
        lessons: [
          { id: 'l1', title: 'Protección de cabeza y rostro', duration: '1 hora', type: 'Video', completed: false },
          { id: 'l2', title: 'Protección respiratoria', duration: '1.5 horas', type: 'Video', completed: false },
          { id: 'l3', title: 'Evaluación', duration: '30 min', type: 'Quiz', completed: false },
        ],
      },
    ],
  },
  {
    id: '6',
    title: 'Prevención y Control de Incendios',
    category: 'SSPA',
    duration: '18 horas',
    level: 'Intermedio',
    image: 'https://images.unsplash.com/photo-1759159091245-fc043faacddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwc2FmZXR5JTIwdHJhaW5pbmd8ZW58MXx8fHwxNzY5MzMwNTk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Teoría del fuego, sistemas de detección y extinción en instalaciones petroleras.',
    modules: 5,
    longDescription: 'Curso completo sobre prevención, detección y control de incendios en la industria petrolera, incluyendo uso de extintores y sistemas especializados.',
    objectives: [
      'Comprender la teoría del fuego',
      'Identificar sistemas de detección',
      'Utilizar equipos de extinción',
      'Implementar planes de prevención',
    ],
    modulesList: [
      {
        id: 'm1',
        title: 'Módulo 1: Teoría del Fuego',
        duration: '3 horas',
        completed: false,
        lessons: [
          { id: 'l1', title: 'Triángulo y tetraedro del fuego', duration: '1 hora', type: 'Video', completed: false },
          { id: 'l2', title: 'Clasificación de incendios', duration: '1.5 horas', type: 'Lectura', completed: false },
          { id: 'l3', title: 'Evaluación', duration: '30 min', type: 'Quiz', completed: false },
        ],
      },
    ],
  },
];

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentSection, setCurrentSection] = useState('catalog');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [userProgress, setUserProgress] = useState({});

  // Load user data from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('petrolearn_user');
    const savedProgress = localStorage.getItem('petrolearn_progress');
    
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (Object.keys(userProgress).length > 0) {
      localStorage.setItem('petrolearn_progress', JSON.stringify(userProgress));
    }
  }, [userProgress]);

  const handleLogin = (email, password) => {
    const user = {
      id: '1',
      name: email.split('@')[0],
      email,
      joinDate: 'Enero 2026',
    };
    setCurrentUser(user);
    localStorage.setItem('petrolearn_user', JSON.stringify(user));
  };

  const handleRegister = (name, email, password) => {
    const user = {
      id: '1',
      name,
      email,
      joinDate: 'Enero 2026',
    };
    setCurrentUser(user);
    localStorage.setItem('petrolearn_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('petrolearn_user');
    setCurrentSection('catalog');
    setSelectedCourse(null);
  };

  const handleCourseClick = (courseId) => {
    setSelectedCourse(courseId);
    setCurrentSection('course-detail');
  };

  const handleStartLesson = (courseId, moduleId, lessonId) => {
    // Simulate progress update
    const currentProgress = userProgress[courseId] || 0;
    const newProgress = Math.min(currentProgress + 10, 100);
    setUserProgress({
      ...userProgress,
      [courseId]: newProgress,
    });
  };

  const handleNavigate = (section) => {
    setCurrentSection(section);
    if (section !== 'course-detail') {
      setSelectedCourse(null);
    }
  };

  const handleBackToCatalog = () => {
    setSelectedCourse(null);
    setCurrentSection('catalog');
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} onRegister={handleRegister} />;
  }

  const selectedCourseData = selectedCourse
    ? MOCK_COURSES.find((c) => c.id === selectedCourse)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        currentSection={currentSection}
      />

      {currentSection === 'catalog' && (
        <CourseCatalog
          courses={MOCK_COURSES}
          userProgress={userProgress}
          onCourseClick={handleCourseClick}
        />
      )}

      {currentSection === 'dashboard' && (
        <Dashboard
          user={currentUser}
          courses={MOCK_COURSES}
          userProgress={userProgress}
          onCourseClick={handleCourseClick}
        />
      )}

      {currentSection === 'profile' && (
        <UserProfile
          user={currentUser}
          userProgress={userProgress}
          courses={MOCK_COURSES}
        />
      )}

      {currentSection === 'course-detail' && selectedCourseData && (
        <CourseDetail
          course={selectedCourseData}
          progress={userProgress[selectedCourse] || 0}
          onBack={handleBackToCatalog}
          onStartLesson={handleStartLesson}
        />
      )}
    </div>
  );
}