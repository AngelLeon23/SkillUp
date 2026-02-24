"use client";

import { useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';



export default function Login({ onLogin, onRegister }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      onRegister(formData.name, formData.email, formData.password);
    } else {
      onLogin(formData.email, formData.password);
    }
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
              className="w-full bg-green-700 hover:bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              {isRegistering ? (
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
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-green-700 hover:text-green-600 text-sm font-medium"
            >
              {isRegistering
                ? '¿Ya tienes cuenta? Inicia sesión'
                : '¿No tienes cuenta? Regístrate'}
            </button>
          </div>

          {/* Demo hint */}
          {!isRegistering && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-green-800 text-center">
                Demo: Ingresa cualquier correo y contraseña
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}