"use client";
import { useState, useEffect } from 'react';
import { Award, XCircle, CheckCircle2, RotateCcw, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { updateProgress, generarCertificado } from '@/lib/session';

export default function FinalExam({ courseId, onPass }) {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [certificadoId, setCertificadoId] = useState(null);

  const FINAL_EXAM_ID = 14;
  const MIN_SCORE = 70;

  useEffect(() => {
    const loadQuestions = async () => {
      const { data } = await supabase
        .from('preguntas')
        .select('*')
        .eq('id_evaluacion', FINAL_EXAM_ID);
      if (data) setQuestions(data);
      setLoading(false);
    };
    loadQuestions();
  }, []);

  const handleAnswer = (questionId, answer) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

 const handleSubmit = async () => {
  const correct = questions.filter(q => answers[q.id_pregunta] === q.respuesta_correcta).length;
  const result = Math.round((correct / questions.length) * 100);
  setScore(result);
  setSubmitted(true);

  if (result >= MIN_SCORE) {
    await updateProgress(courseId, 100);
    // Ya no generamos el certificado aquí
  }
};

const [generando, setGenerando] = useState(false);

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const passed = score >= MIN_SCORE;
  const allAnswered = questions.length > 0 && questions.every(q => answers[q.id_pregunta] !== undefined);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700" />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className={`px-6 py-4 ${passed ? 'bg-green-700' : 'bg-red-600'} text-white`}>
          <h2 className="text-lg font-semibold">Resultado del Examen Final</h2>
          <p className="text-sm opacity-90">Introducción a la Extracción de Crudo</p>
        </div>

        <div className="p-8 text-center border-b border-gray-200">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${passed ? 'bg-green-100' : 'bg-red-100'}`}>
            {passed
              ? <Award className="w-12 h-12 text-green-700" />
              : <XCircle className="w-12 h-12 text-red-600" />
            }
          </div>
          <p className={`text-5xl font-bold mb-2 ${passed ? 'text-green-700' : 'text-red-600'}`}>
            {score}%
          </p>
          <p className="text-gray-600 mb-1">
            {questions.filter(q => answers[q.id_pregunta] === q.respuesta_correcta).length} de {questions.length} correctas
          </p>
          <p className={`font-semibold text-lg ${passed ? 'text-green-700' : 'text-red-600'}`}>
            {passed ? '¡Curso completado! 🎉' : `Mínimo requerido: ${MIN_SCORE}%`}
          </p>
          {passed && (
            <p className="text-gray-500 text-sm mt-2">Tu certificado ha sido generado</p>
          )}
        </div>

        <div className="p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Revisión de respuestas</h3>
          {questions.map((question, index) => {
            const isCorrect = answers[question.id_pregunta] === question.respuesta_correcta;
            return (
              <div key={question.id_pregunta} className={`p-4 rounded-lg border-2 ${isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                <div className="flex items-start gap-3 mb-2">
                  {isCorrect
                    ? <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    : <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  }
                  <p className="font-medium text-gray-900">{index + 1}. {question.enunciado}</p>
                </div>
                <div className="ml-8 text-sm space-y-1">
                  <p className="text-green-700"><span className="font-semibold">Correcta:</span> {question.respuesta_correcta}</p>
                  {!isCorrect && (
                    <p className="text-red-600"><span className="font-semibold">Tu respuesta:</span> {answers[question.id_pregunta]}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
          {passed && (
  <button
    onClick={async () => {
      setGenerando(true);
      const cert = await generarCertificado(courseId);
      console.log('Cert resultado:', cert);
      if (cert) {
        router.push(`/certificado/${cert.id_certificado}`);
      } else {
        alert('Error al generar certificado, intenta de nuevo');
        setGenerando(false);
      }
    }}
    disabled={generando}
    className="flex items-center gap-2 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 font-medium ml-auto disabled:opacity-50"
  >
    {generando ? (
      <>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
        Generando...
      </>
    ) : (
      <>
        Obtener mi certificado
        <ChevronRight className="w-4 h-4" />
      </>
    )}
  </button>
)}

        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-green-700 text-white px-6 py-4">
        <h2 className="text-lg font-semibold">Examen Final</h2>
        <p className="text-sm opacity-90">{questions.length} preguntas — Mínimo para aprobar: {MIN_SCORE}%</p>
      </div>

      <div className="p-6 space-y-8">
        {questions.map((question, index) => (
          <div key={question.id_pregunta}>
            <p className="font-semibold text-gray-900 mb-4">{index + 1}. {question.enunciado}</p>

            {question.tipo === 'truefalse' && (
              <div className="flex gap-4">
                {['Verdadero', 'Falso'].map(option => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(question.id_pregunta, option)}
                    className={`flex-1 py-3 rounded-lg border-2 font-medium transition-colors ${
                      answers[question.id_pregunta] === option
                        ? 'border-green-700 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-300 text-gray-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {question.tipo === 'multiple' && (
              <div className="space-y-3">
                {question.opciones.map(option => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(question.id_pregunta, option)}
                    className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-colors ${
                      answers[question.id_pregunta] === option
                        ? 'border-green-700 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-300 text-gray-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            allAnswered
              ? 'bg-green-700 text-white hover:bg-green-600'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Enviar examen final
        </button>
      </div>
    </div>
  );
}