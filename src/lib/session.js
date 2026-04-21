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
    .select('id_curso, porcentaje_progreso')
    .eq('id_usuario', user.id); // ← esto faltaba

  if (error) return {};

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



// Generar certificado al completar el curso
export const generarCertificado = async (courseId) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Usar maybeSingle() en lugar de single() para evitar el 406
  const { data: inscripcion, error: errInsc } = await supabase
    .from('inscripciones')
    .select('id_inscripcion')
    .eq('id_usuario', user.id)
    .eq('id_curso', courseId)
    .maybeSingle();

  console.log('Inscripcion encontrada:', inscripcion, errInsc);
  if (!inscripcion) return null;

  // Verificar si ya existe certificado
  const { data: existing } = await supabase
    .from('certificados')
    .select('*')
    .eq('id_inscripcion', inscripcion.id_inscripcion)
    .maybeSingle();

  if (existing) return existing;

  // Crear certificado
  const codigo = `CERT-${user.id.slice(0, 8).toUpperCase()}-${courseId}-${Date.now()}`;
  const hoy = new Date();
  const vencimiento = new Date();
  vencimiento.setFullYear(hoy.getFullYear() + 2);

  const { data: certificado, error: errCert } = await supabase
    .from('certificados')
    .insert({
      id_inscripcion: inscripcion.id_inscripcion,
      codigo_qr_validacion: codigo,
      fecha_emision: hoy.toISOString().split('T')[0],
      vencimiento: vencimiento.toISOString().split('T')[0],
    })
    .select()
    .maybeSingle();

  console.log('Certificado creado:', certificado, errCert);
  return certificado;
};

// Obtener certificados del usuario
export const getCertificados = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  // Primero obtenemos las inscripciones del usuario
  const { data: inscripciones } = await supabase
    .from('inscripciones')
    .select('id_inscripcion')
    .eq('id_usuario', user.id);

  if (!inscripciones || inscripciones.length === 0) return [];

  const inscripcionIds = inscripciones.map(i => i.id_inscripcion);

  const { data } = await supabase
    .from('certificados')
    .select(`
      *,
      inscripciones (
        id_curso,
        cursos ( nombre )
      )
    `)
    .in('id_inscripcion', inscripcionIds);

  return data ?? [];
};


export const logActividad = async (tipo, descripcion) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from('actividad').insert({
    id_usuario: user.id,
    tipo,
    descripcion,
  });
};

export const getActividad = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from('actividad')
    .select('*')
    .eq('id_usuario', user.id)
    .order('fecha', { ascending: false })
    .limit(5);

  return data ?? [];
};