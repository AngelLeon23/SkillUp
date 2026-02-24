import CourseDetail from "@/Componentes/CourseDetail";

export default function CursoPage({ params }) {
  return <CourseDetail id={params.id} />;
}