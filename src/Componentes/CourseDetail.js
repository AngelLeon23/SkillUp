"use client";
import { ArrowLeft, Clock, BookOpen, Award, CheckCircle2, Circle, PlayCircle } from 'lucide-react';
import { useState } from 'react';

export default function CourseDetail({ course, progress, onBack, onStartLesson }) {
  const [expandedModule, setExpandedModule] = useState(course.modulesList[0]?.id);

  const completedModules = course.modulesList.filter(m => m.completed).length;
  const totalLessons = course.modulesList.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = course.modulesList.reduce(
    (acc, m) => acc + m.lessons.filter(l => l.completed).length,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-green-700 hover:text-green-600 mb-6 font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver al catálogo
      </button>

      {/* Course Header */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:w-2/5">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="p-8 md:w-3/5">
            <div className="mb-4">
              <span className="px-3 py-1 bg-green-700 text-white text-xs font-semibold rounded-full">
                {course.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-6">{course.longDescription}</p>

            {/* Course Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-700" />
                <div>
                  <p className="text-xs text-gray-500">Duración</p>
                  <p className="font-semibold text-sm">{course.duration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-700" />
                <div>
                  <p className="text-xs text-gray-500">Módulos</p>
                  <p className="font-semibold text-sm">{course.modules}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-green-700" />
                <div>
                  <p className="text-xs text-gray-500">Nivel</p>
                  <p className="font-semibold text-sm">{course.level}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-xs text-gray-500">Progreso</p>
                  <p className="font-semibold text-sm">{progress}%</p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Tu progreso</span>
                <span className="text-sm font-semibold text-green-700">
                  {completedLessons} de {totalLessons} lecciones
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    progress === 100 ? 'bg-green-500' : 'bg-green-600'
                  }`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Objectives */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Objetivos del Curso</h2>
        <ul className="space-y-3">
          {course.objectives.map((objective, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{objective}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Course Content */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Contenido del Curso</h2>
        <div className="space-y-4">
          {course.modulesList.map((module, moduleIndex) => (
            <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Module Header */}
              <button
                onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    module.completed ? 'bg-green-500' : 'bg-green-700'
                  } text-white text-sm font-semibold`}>
                    {moduleIndex + 1}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">{module.title}</h3>
                    <p className="text-sm text-gray-500">
                      {module.lessons.length} lecciones • {module.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {module.completed && (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  )}
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      expandedModule === module.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Lessons List */}
              {expandedModule === module.id && (
                <div className="px-6 py-4 bg-white">
                  <div className="space-y-3">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {lesson.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400" />
                          )}
                          <div>
                            <p className={`text-sm ${lesson.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                              {lesson.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {lesson.type} • {lesson.duration}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => onStartLesson(course.id, module.id, lesson.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            lesson.completed
                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              : 'bg-green-700 text-white hover:bg-green-600'
                          }`}
                        >
                          <PlayCircle className="w-4 h-4" />
                          {lesson.completed ? 'Repasar' : 'Iniciar'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}