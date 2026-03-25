import { Clock, BookOpen, Award, CheckCircle2 } from 'lucide-react';

export function CourseCard({ course, progress = 0, onClick }) {
  const isCompleted = progress === 100;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-green-700 text-white text-xs font-semibold rounded-full">
            {course.category}
          </span>
        </div>
        {isCompleted && (
          <div className="absolute top-3 left-3">
            <div className="bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-xs font-semibold">
              <CheckCircle2 className="w-3 h-3" />
              Completado
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.modules} módulos</span>
          </div>
        </div>

        {/* Level Badge */}
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-4 h-4 text-yellow-600" />
          <span className="text-sm font-medium text-gray-700">{course.level}</span>
        </div>

        {/* Progress Bar */}
        {progress > 0 && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-600">Progreso</span>
              <span className="text-xs font-semibold text-green-700">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  isCompleted ? 'bg-green-500' : 'bg-green-600'
                }`}
               style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}