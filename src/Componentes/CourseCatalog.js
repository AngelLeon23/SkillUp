"use client";
import { CourseCard } from './CourseCard';
import { Search, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase'; 
import { getEnrollments } from '../lib/session';

export default function CourseCatalog({ onCourseClick = () => {} }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [courses, setCourses] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      
      // 1. Pedimos los cursos (Evitamos el join que daba error 400)
      const { data: dbCourses, error: courseError } = await supabase
        .from('cursos')
        .select('*');

      if (courseError) {
        console.error("Error de Supabase:", courseError.message);
        setLoading(false);
        return;
      }

      // 2. Pedimos las categorías aparte para "unirlas" nosotros
      const { data: dbCategories } = await supabase.from('categorias').select('*');

      if (dbCourses) {
        const cleanCourses = dbCourses.map(c => {
          // Buscamos el nombre de la categoría manualmente
          const cat = dbCategories?.find(cat => cat.id_categoria === c.id_categoria);
          
          return {
            id: c.id_curso,
            title: c.nombre,
            description: c.descripcion,
            image: c.imagen_url || 'https://images.unsplash.com/photo-1516937941344-00b4e0337589',
            category: cat ? cat.nombre : 'General'
          };
        });
        setCourses(cleanCourses);
      }

      // 3. Cargamos el progreso real de las inscripciones
      const progress = await getEnrollments();
      setUserProgress(progress);
      
      setLoading(false);
    }

    loadData();
  }, []);

  // Lógica de filtros (la que ya tenías)
  const categories = ['Todos', ...Array.from(new Set(courses.map(c => c.category)))];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <p className="text-green-700 font-bold animate-pulse">Cargando catálogo de SkillUp...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Catálogo de Cursos</h2>
        <p className="text-gray-600">Formación profesional en seguridad y operaciones petroleras</p>
      </div>

      {/* Buscador y Filtros */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar cursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Cursos Dinámico */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            progress={userProgress[course.id] || 0}
            onClick={() => onCourseClick(course.id)}
          />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No se encontraron cursos que coincidan con tu búsqueda.
        </div>
      )}
    </div>
  );
}