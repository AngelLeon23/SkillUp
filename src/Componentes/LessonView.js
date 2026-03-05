"use client";
import { ArrowLeft, ChevronDown, ChevronUp, PlayCircle, FileText, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function LessonView({ course, onBack }) {
  const [expandedModule, setExpandedModule] = useState(course.modulesList[0]?.id);
  const [activeLesson, setActiveLesson] = useState(course.modulesList[0]?.lessons[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-green-700 hover:text-green-600 mb-6 font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Catálogo de cursos
      </button>

      {/* Course Info */}
      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <h1 className="text-xl font-bold text-gray-900">{course.title}</h1>
        <p className="text-gray-600 text-sm">{course.description}</p>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Left - Modules List */}
        <div className="w-80 flex-shrink-0">
          <div className="space-y-2">
            {course.modulesList.map((module, moduleIndex) => (
              <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Module Header */}
                <button
                  onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                  className="w-full px-4 py-3 bg-white hover:bg-gray-50 flex items-center justify-between text-left"
                >
                  <span className="font-medium text-gray-900 text-sm">
                    Módulo {moduleIndex + 1}: {module.title}
                  </span>
                  {expandedModule === module.id
                    ? <ChevronUp className="w-4 h-4 text-gray-500" />
                    : <ChevronDown className="w-4 h-4 text-gray-500" />
                  }
                </button>

                {/* Lessons */}
                {expandedModule === module.id && (
                  <div className="border-t border-gray-200">
                    {module.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        className={`w-full px-4 py-3 flex items-start gap-3 text-left hover:bg-gray-50 transition-colors ${
                          activeLesson?.id === lesson.id ? 'bg-green-50 border-l-4 border-green-700' : ''
                        }`}
                      >
                        <div className="mt-0.5">
                          {lesson.type === 'video'
                            ? <PlayCircle className="w-4 h-4 text-green-700" />
                            : <FileText className="w-4 h-4 text-green-700" />
                          }
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{lesson.title}</p>
                          <p className="text-xs text-gray-500">{lesson.duration}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right - Lesson Content */}
        <div className="flex-1">
          {activeLesson ? (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Lesson Title */}
              <div className="bg-green-700 text-white px-6 py-4">
                <h2 className="text-lg font-semibold">{activeLesson.title}</h2>
              </div>

              {/* Content */}
              <div className="p-6">
                {activeLesson.type === 'video' && activeLesson.videoUrl ? (
                  <div className="mb-6">
                    <div className="aspect-video bg-black rounded-lg overflow-hidden">
                      <iframe
                        src={activeLesson.videoUrl}
                        className="w-full h-full"
                        allowFullScreen
                        title={activeLesson.title}
                      />
                    </div>
                  </div>
                ) : null}

                {/* Text Content */}
                <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                  {activeLesson.content}
                </div>
              </div>

              {/* Next Button */}
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => {
                    // Buscar la siguiente lección
                    const allLessons = course.modulesList.flatMap(m => m.lessons);
                    const currentIndex = allLessons.findIndex(l => l.id === activeLesson.id);
                    if (currentIndex < allLessons.length - 1) {
                      setActiveLesson(allLessons[currentIndex + 1]);
                    }
                  }}
                  className="flex items-center gap-2 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Selecciona una lección para comenzar
            </div>
          )}
        </div>
      </div>
    </div>
  );
}