"use client";
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import CertificadoView from '@/Componentes/CertificadoView';
import { supabase } from '@/lib/supabase';
import { getCurrentUser } from '@/lib/session';

export default function CertificadoPage({ params: paramsPromise }) {
  const { id } = use(paramsPromise);
  const router = useRouter();
  const [certificado, setCertificado] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [nombreCurso, setNombreCurso] = useState('');

  useEffect(() => {
    const load = async () => {
      const profile = await getCurrentUser();
      if (profile) setNombreUsuario(profile.nombre);

      const { data } = await supabase
        .from('certificados')
        .select(`*, inscripciones(id_curso, cursos(nombre))`)
        .eq('id_certificado', id)
        .single();

      if (data) {
        setCertificado(data);
        setNombreCurso(data.inscripciones?.cursos?.nombre ?? '');
      }
    };
    load();
  }, [id]);

  if (!certificado) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
      </div>
    );
  }

  return (
    <CertificadoView
      certificado={certificado}
      nombreUsuario={nombreUsuario}
      nombreCurso={nombreCurso}
      onBack={() => router.back()}
    />
  );
}