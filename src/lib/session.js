import { supabase } from './supabase';

// 1. Obtener el usuario real de la base de datos
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('usuarios')
    .select('*')
    .eq('id_usuario', user.id)
    .single();

  return profile;
};

// 2. Obtener todas las inscripciones del alumno desde la BD
export const getEnrollments = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return {};

  const { data, error } = await supabase
    .from('inscripciones')
    .select('id_curso, porcentaje_progreso');

  if (error) return {};

  // Convertimos el formato de la BD al formato que espera tu App
  const enrollmentsMap = {};
  data.forEach(item => {
    enrollmentsMap[item.id_curso] = item.porcentaje_progreso;
  });
  return enrollmentsMap;
};

// 3. Inscribir al alumno en un curso de verdad
export const enrollCourse = async (courseId) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  // Primero revisamos si ya está inscrito para no duplicar
  const { data: existing } = await supabase
    .from('inscripciones')
    .select('*')
    .eq('id_usuario', user.id)
    .eq('id_curso', courseId)
    .single();

  if (!existing) {
    const { error } = await supabase
      .from('inscripciones')
      .insert([
        { 
          id_usuario: user.id, 
          id_curso: courseId,
          porcentaje_progreso: 0,
          terminado: false
        }
      ]);
    if (error) console.error("Error al inscribir:", error.message);
  }
};

// 4. Actualizar el progreso en la nube
export const updateProgress = async (courseId, progress) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase
    .from('inscripciones')
    .update({ 
        porcentaje_progreso: progress,
        terminado: progress === 100 
    })
    .eq('id_usuario', user.id)
    .eq('id_curso', courseId);

  if (error) console.error("Error al actualizar progreso:", error.message);
};