"use client";
import { ArrowLeft, ChevronDown, ChevronUp, PlayCircle, FileText, ChevronRight, ClipboardList } from 'lucide-react';
import { useState, useEffect } from 'react';
import ModuleQuiz from './ModuleQuiz';
import { enrollCourse } from '@/lib/session';

export default function LessonView({ course, onBack }) {
  // Iniciamos en null para evitar el error de "undefined"
  const [expandedModule, setExpandedModule] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeModuleForQuiz, setActiveModuleForQuiz] = useState(null);

  // Sincronizamos los datos cuando el curso termina de cargar desde Supabase
  useEffect(() => {
    if (course?.modulesList?.length > 0) {
      setExpandedModule(course.modulesList[0].id);
      setActiveLesson(course.modulesList[0].lessons[0]);
      // Inscribir al usuario
      enrollCourse(course.id);
    }
  }, [course]);

  const getCurrentModule = () =>
    course?.modulesList?.find(m => m.lessons.some(l => l.id === activeLesson?.id));

  const handleNext = () => {
    if (!activeLesson || !course?.modulesList) return;

    const allLessons = course.modulesList.flatMap(m => m.lessons);
    const currentIndex = allLessons.findIndex(l => l.id === activeLesson.id);
    const currentModule = getCurrentModule();
    
    const isLastInModule =
      currentModule?.lessons[currentModule.lessons.length - 1]?.id === activeLesson.id;

    if (isLastInModule && currentModule?.quiz) {
      setActiveModuleForQuiz(currentModule);
      setShowQuiz(true);
    } else if (currentIndex < allLessons.length - 1) {
      setActiveLesson(allLessons[currentIndex + 1]);
      setShowQuiz(false);
    }
  };

  const handlePassQuiz = () => {
    const allLessons = course.modulesList.flatMap(m => m.lessons);
    const currentIndex = allLessons.findIndex(l => l.id === activeLesson.id);
    setShowQuiz(false);
    if (currentIndex < allLessons.length - 1) {
      setActiveLesson(allLessons[currentIndex + 1]);
    }
  };

  // Si aún no hay lección activa, mostramos carga para evitar el error 'id'
  if (!activeLesson) {
    return <div className="p-20 text-center font-bold text-green-700">Preparando lecciones...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* ... (Todo tu código de botones y diseño se queda igual abajo) ... */}
      <button onClick={onBack} className="flex items-center gap-2 text-green-700 hover:text-green-600 mb-6 font-medium">
        <ArrowLeft className="w-4 h-4" /> Catálogo de cursos
      </button>

      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <h1 className="text-xl font-bold text-gray-900">{course.title}</h1>
        <p className="text-gray-600 text-sm">{course.description}</p>
      </div>

      <div className="flex gap-6">
        <div className="w-80 flex-shrink-0">
          <div className="space-y-2">
            {course.modulesList.map((module, moduleIndex) => (
              <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                  className="w-full px-4 py-3 bg-white hover:bg-gray-50 flex items-center justify-between text-left"
                >
                  <span className="font-medium text-gray-900 text-sm">Módulo {moduleIndex + 1}: {module.title}</span>
                  {expandedModule === module.id ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                </button>
                {expandedModule === module.id && (
                  <div className="border-t border-gray-200">
                    {module.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => { setActiveLesson(lesson); setShowQuiz(false); }}
                        className={`w-full px-4 py-3 flex items-start gap-3 text-left hover:bg-gray-50 transition-colors ${activeLesson?.id === lesson.id && !showQuiz ? 'bg-green-50 border-l-4 border-green-700' : ''}`}
                      >
                        <div className="mt-0.5">{lesson.type === 'video' ? <PlayCircle className="w-4 h-4 text-green-700" /> : <FileText className="w-4 h-4 text-green-700" />}</div>
                        <div className="flex-1"><p className="text-sm text-gray-900">{lesson.title}</p><p className="text-xs text-gray-500">{lesson.duration}</p></div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          {showQuiz && activeModuleForQuiz?.quiz ? (
            <ModuleQuiz quiz={activeModuleForQuiz.quiz} onPass={handlePassQuiz} />
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-green-700 text-white px-6 py-4"><h2 className="text-lg font-semibold">{activeLesson.title}</h2></div>
              <div className="p-6">
                {activeLesson.type === 'video' && activeLesson.videoUrl && (
                  <div className="mb-6"><div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <iframe src={activeLesson.videoUrl} className="w-full h-full" allowFullScreen />
                  </div></div>
                )}
                <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">{activeLesson.content}</div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                <button onClick={handleNext} className="flex items-center gap-2 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-colors font-medium">
                  {(() => {
                    const currentModule = getCurrentModule();
                    const isLastInModule = currentModule?.lessons[currentModule.lessons.length - 1]?.id === activeLesson.id;
                    return isLastInModule && currentModule?.quiz ? 'Ir a evaluación' : 'Siguiente';
                  })()}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}