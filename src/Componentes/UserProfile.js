"use client";
import { User, Mail, Calendar, Award, BookOpen, CheckCircle2, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';


export default function UserProfile({ user, userProgress, courses, certificados = [], actividad = [] }) {
  const router = useRouter();
  const enrolledCourses = Object.keys(userProgress).filter((id) => userProgress[id] > 0).length;
  const completedCourses = Object.keys(userProgress).filter((id) => userProgress[id] === 100).length;
  const inProgressCourses = enrolledCourses - completedCourses;

  const achievements = certificados.length > 0
    ? certificados.map((cert) => ({
        id: cert.id_certificado,
        certId: cert.id_certificado,
        title: cert.inscripciones?.cursos?.nombre ?? 'Curso',
        description: `Emitido: ${cert.fecha_emision}`,
        icon: Award,
        earned: true,
        color: 'yellow',
      }))
    : [];

  const recentActivity = actividad.length > 0
    ? actividad.map((act) => ({
        id: act.id_actividad,
        action: act.tipo === 'curso' ? 'Iniciaste' : act.tipo === 'certificado' ? 'Obtuviste' : 'Completaste',
        item: act.descripcion,
        date: new Date(act.fecha).toLocaleDateString('es-MX', {
          day: 'numeric',
          month: 'long',
        }),
      }))
    : [];

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
    Certificados
  </h3>
  {achievements.length === 0 ? (
    <div className="text-center py-8 text-gray-400">
      <Award className="w-12 h-12 mx-auto mb-3 opacity-30" />
      <p className="text-sm">Aún no tienes certificados.</p>
      <p className="text-xs mt-1">Completa un curso para obtener el tuyo.</p>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {achievements.map((achievement) => {
        const Icon = achievement.icon;
        return (
          <div
            key={achievement.id}
            onClick={() => achievement.certId && router.push(`/certificado/${achievement.certId}`)}
            className="p-4 rounded-lg border-2 border-yellow-400 bg-yellow-50 cursor-pointer hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-yellow-100">
                <Icon className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm text-gray-900 mb-1">{achievement.title}</h4>
                <p className="text-xs text-gray-600">{achievement.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )}
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