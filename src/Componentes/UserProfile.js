"use client";
import { User, Mail, Calendar, Award, BookOpen, CheckCircle2, Edit } from 'lucide-react';

export default function UserProfile({ user, userProgress, courses }) {
  const enrolledCourses = Object.keys(userProgress).filter((id) => userProgress[id] > 0).length;
  const completedCourses = Object.keys(userProgress).filter((id) => userProgress[id] === 100).length;
  const inProgressCourses = enrolledCourses - completedCourses;

  const achievements = [
    {
      id: 1,
      title: 'Primera Lección',
      description: 'Completaste tu primera lección',
      icon: BookOpen,
      earned: enrolledCourses > 0,
      color: 'blue',
    },
    {
      id: 2,
      title: 'Estudiante Dedicado',
      description: 'Completa 3 cursos',
      icon: Award,
      earned: completedCourses >= 3,
      color: 'yellow',
    },
    {
      id: 3,
      title: 'Experto en Seguridad',
      description: 'Completa todos los cursos de SSPA',
      icon: CheckCircle2,
      earned: false,
      color: 'green',
    },
    {
      id: 4,
      title: 'Estudiante Constante',
      description: 'Completa 5 cursos',
      icon: Award,
      earned: completedCourses >= 5,
      color: 'purple',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Completaste',
      item: 'Módulo 1: Introducción a SSPA',
      date: '2 días atrás',
    },
    {
      id: 2,
      action: 'Iniciaste',
      item: 'Curso: Primeros Auxilios Básicos',
      date: '5 días atrás',
    },
    {
      id: 3,
      action: 'Completaste',
      item: 'Curso: Uso Correcto de EPP',
      date: '1 semana atrás',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="w-32 h-32 bg-gradient-to-br from-green-700 to-green-600 rounded-full flex items-center justify-center">
            <User className="w-16 h-16 text-white" />
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
              <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Edit className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-gray-600 justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Miembro desde {user.joinDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-700">{enrolledCourses}</p>
            <p className="text-sm text-gray-600">Cursos Inscritos</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{completedCourses}</p>
            <p className="text-sm text-gray-600">Completados</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-600">{inProgressCourses}</p>
            <p className="text-sm text-gray-600">En Progreso</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-600" />
            Logros
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.earned
                      ? 'border-yellow-400 bg-yellow-50'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        achievement.earned
                          ? `bg-${achievement.color}-100`
                          : 'bg-gray-200'
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          achievement.earned
                            ? `text-${achievement.color}-600`
                            : 'text-gray-400'
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900 mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-green-700" />
            Actividad Reciente
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                <div className="w-2 h-2 bg-green-700 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-semibold">{activity.action}</span> {activity.item}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Progress */}
      <div className="bg-white rounded-xl shadow-md p-6 mt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Progreso por Curso</h3>
        <div className="space-y-4">
          {courses
            .filter((course) => userProgress[course.id] > 0)
            .map((course) => {
              const progress = userProgress[course.id];
              return (
                <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{course.title}</h4>
                      <p className="text-sm text-gray-600">{course.category}</p>
                    </div>
                    <span className="text-lg font-bold text-green-700">{progress}%</span>
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
              );
            })}
        </div>
      </div>
    </div>
  );
}