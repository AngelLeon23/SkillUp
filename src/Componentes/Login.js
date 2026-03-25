"use client";

import { useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase'; // Importamos Supabase
import { useRouter } from 'next/navigation'; // Importamos el Router para redireccionar

export default function Login() {
  const router = useRouter(); // Inicializamos el router
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMsg, setErrorMsg] = useState(''); //Estado para mostrar errores
  const [isLoading, setIsLoading] = useState(false); //Estado para mostrar que está cargando
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  //Modificamos el handleSubmit para que sea asíncrono
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(''); // Limpiamos errores previos
    setIsLoading(true); // Bloqueamos el botón

    if (isRegistering) {
      //LÓGICA DE REGISTRO CON SUPABASE
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name, // Guardamos el nombre extra del alumno
          }
        }
      });

      if (error) {
        setErrorMsg('Error al registrar: ' + error.message);
      } else {
        // Registro exitoso, redireccionamos al catálogo
        router.push('/catalogo');
      }

    } else {
      //LÓGICA DE INICIO DE SESIÓN CON SUPABASE
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setErrorMsg('Error al iniciar sesión: Correo o contraseña incorrectos.');
      } else {
        // Inicio de sesión exitoso, redireccionamos al catálogo
        router.push('/catalogo');
      }
    }
    
    setIsLoading(false); // Desbloqueamos el botón
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-600 to-green-700 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-white font-bold text-4xl tracking-wide">
              SkillUp
            </span>
          </div>
          <p className="text-green-100 mt-2">
            Formación profesional en seguridad y operaciones petroleras
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </h2>

          {/* MENSAJE DE ERROR VISUAL */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="usuario"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading} // Bloqueamos el botón mientras carga
              className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors text-white ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-700 hover:bg-green-600'
              }`}
            >
              {isLoading ? 'Cargando...' : isRegistering ? (
                <>
                  <UserPlus className="w-5 h-5" />
                  Registrarse
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Iniciar Sesión
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setErrorMsg(''); // Limpiar errores al cambiar de vista
              }}
              className="text-green-700 hover:text-green-600 text-sm font-medium"
            >
              {isRegistering
                ? '¿Ya tienes cuenta? Inicia sesión'
                : '¿No tienes cuenta? Regístrate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}