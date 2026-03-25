"use client";
import Header from "./Header";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function HeaderWrapper() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      // 1. Obtenemos el usuario que inició sesión
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // 2. ¡LA MAGIA! Vamos a TU tabla 'usuarios' a buscar su nombre real
        const { data: perfilUsuario, error } = await supabase
          .from('usuarios')
          .select('nombre')
          .eq('id_usuario', user.id) // Buscamos por su ID único
          .single(); // Solo queremos un resultado

        if (perfilUsuario) {
          // Si lo encontramos en tu tabla, ponemos su nombre
          setCurrentUser({ name: perfilUsuario.nombre });
        } else {
          // Plan B: si por algo no está en la tabla, usamos su correo
          setCurrentUser({ name: user.email.split('@')[0] });
        }
      }
    };

    fetchUser(); // Llamamos a la función al cargar la página

    // 3. Escuchamos cambios (por si cierra o inicia sesión)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        fetchUser(); // Si hay un nuevo usuario, volvemos a buscar su perfil
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (pathname === '/login' || pathname === '/') return null;

  return (
    <Header
      currentUser={currentUser}
      onLogout={handleLogout}
    />
  );
}