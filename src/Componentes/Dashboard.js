"use client";
import { BookOpen, Award, Clock, TrendingUp, CheckCircle2 } from 'lucide-react';
import { CourseCard } from './CourseCard';

export default function Dashboard({
 user = { name: "Estudiante" },
  courses = [],
  userProgress = {},
   onCourseClick = () => {}
}) {
  const inProgressCourses = courses.filter(
    (course) => userProgress[course.id] > 0 && userProgress[course.id] < 100
  );
  const completedCourses = courses.filter((course) => userProgress[course.id] === 100);

  const totalCoursesEnrolled = Object.keys(userProgress).filter((id) => userProgress[id] > 0).length;
  const totalHoursCompleted = completedCourses.length * 8; // Mock calculation
  const averageProgress = totalCoursesEnrolled > 0
    ? Math.round(Object.values(userProgress).reduce((a, b) => a + b, 0) / totalCoursesEnrolled)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          ¡Bienvenido, {user?.name || "Usuario"}!
        </h2>
        <p className="text-gray-600">Continúa tu formación profesional</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-700" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalCoursesEnrolled}</p>
              <p className="text-sm text-gray-600">Cursos Activos</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{completedCourses.length}</p>
              <p className="text-sm text-gray-600">Completados</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalHoursCompleted}h</p>
              <p className="text-sm text-gray-600">Horas Completadas</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{averageProgress}%</p>
              <p className="text-sm text-gray-600">Progreso Promedio</p>
            </div>
          </div>
        </div>
      </div>

      {/* In Progress Courses */}
      {inProgressCourses.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-green-700" />
            Cursos en Progreso
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgressCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                progress={userProgress[course.id]}
                onClick={() => onCourseClick(course.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Courses */}
      {completedCourses.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            Cursos Completados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                progress={100}
                onClick={() => onCourseClick(course.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {totalCoursesEnrolled === 0 && (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Aún no has iniciado ningún curso
          </h3>
          <p className="text-gray-600 mb-6">
            Explora nuestro catálogo y comienza tu formación profesional
          </p>
          <button
            onClick={() => onCourseClick('catalog')}
            className="px-6 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Ver Catálogo
          </button>
        </div>
      )}
    </div>
  );
}