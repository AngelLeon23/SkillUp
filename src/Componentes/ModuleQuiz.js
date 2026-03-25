"use client";
import { useState } from 'react';
import { CheckCircle2, XCircle, Award, RotateCcw, ChevronRight } from 'lucide-react';

export default function ModuleQuiz({ quiz, onPass }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const minScore = quiz.minScore || 70;

  const handleAnswer = (questionId, answer) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    const correct = quiz.questions.filter(q => answers[q.id] === q.correctAnswer).length;
    const result = Math.round((correct / quiz.questions.length) * 100);
    setScore(result);
    setSubmitted(true);
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const passed = score >= minScore;
  const allAnswered = quiz.questions.every(q => answers[q.id] !== undefined);

  if (submitted) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className={passed ? "px-6 py-4 bg-green-700 text-white" : "px-6 py-4 bg-red-600 text-white"}>
          <h2 className="text-lg font-semibold">Resultado de la Evaluacion</h2>
          <p className="text-sm opacity-90">{quiz.title}</p>
        </div>

        <div className="p-8 text-center border-b border-gray-200">
          <div className={passed ? "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 bg-green-100" : "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 bg-red-100"}>
            {passed
              ? <Award className="w-12 h-12 text-green-700" />
              : <XCircle className="w-12 h-12 text-red-600" />
            }
          </div>
          <p className={passed ? "text-5xl font-bold mb-2 text-green-700" : "text-5xl font-bold mb-2 text-red-600"}>
            {score}%
          </p>
          <p className="text-gray-600 mb-1">
            {quiz.questions.filter(q => answers[q.id] === q.correctAnswer).length} de {quiz.questions.length} correctas
          </p>
          <p className={passed ? "font-semibold text-lg text-green-700" : "font-semibold text-lg text-red-600"}>
            {passed ? "Modulo aprobado!" : "Minimo requerido: " + minScore + "%"}
          </p>
        </div>

        <div className="p-6 space-y-6">
          <h3 className="font-semibold text-gray-900">Revision de respuestas</h3>
          {quiz.questions.map((question, index) => {
            const isCorrect = answers[question.id] === question.correctAnswer;
            return (
              <div key={question.id} className={isCorrect ? "p-4 rounded-lg border-2 border-green-300 bg-green-50" : "p-4 rounded-lg border-2 border-red-300 bg-red-50"}>
                <div className="flex items-start gap-3 mb-3">
                  {isCorrect
                    ? <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    : <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  }
                  <p className="font-medium text-gray-900">{index + 1}. {question.question}</p>
                </div>
                <div className="ml-8 space-y-1 text-sm">
                  <p className="text-green-700">
                    <span className="font-semibold">Correcta:</span> {question.correctAnswer}
                  </p>
                  {!isCorrect && (
                    <p className="text-red-600">
                      <span className="font-semibold">Tu respuesta:</span> {answers[question.id]}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
          {!passed ? (
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-6 py-2 border border-green-700 text-green-700 rounded-lg hover:bg-green-50 transition-colors font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              Reintentar
            </button>
          ) : <div />}
          {passed && (
            <button
              onClick={onPass}
              className="flex items-center gap-2 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              Continuar
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-green-700 text-white px-6 py-4">
        <h2 className="text-lg font-semibold">{quiz.title}</h2>
        <p className="text-sm opacity-90">
          {quiz.questions.length} preguntas - Minimo para aprobar: {minScore}%
        </p>
      </div>

      <div className="p-6 space-y-8">
        {quiz.questions.map((question, index) => (
          <div key={question.id}>
            <p className="font-semibold text-gray-900 mb-4">
              {index + 1}. {question.question}
            </p>

            {question.type === 'truefalse' && (
              <div className="flex gap-4">
                {['Verdadero', 'Falso'].map(option => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(question.id, option)}
                    className={answers[question.id] === option
                      ? "flex-1 py-3 rounded-lg border-2 font-medium transition-colors border-green-700 bg-green-50 text-green-700"
                      : "flex-1 py-3 rounded-lg border-2 font-medium transition-colors border-gray-200 hover:border-green-300 text-gray-700"
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {question.type === 'multiple' && (
              <div className="space-y-3">
                {question.options.map(option => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(question.id, option)}
                    className={answers[question.id] === option
                      ? "w-full text-left px-4 py-3 rounded-lg border-2 transition-colors border-green-700 bg-green-50 text-green-700"
                      : "w-full text-left px-4 py-3 rounded-lg border-2 transition-colors border-gray-200 hover:border-green-300 text-gray-700"
                    }
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
          className={allAnswered
            ? "px-6 py-2 rounded-lg font-medium transition-colors bg-green-700 text-white hover:bg-green-600"
            : "px-6 py-2 rounded-lg font-medium transition-colors bg-gray-200 text-gray-400 cursor-not-allowed"
          }
        >
          Enviar evaluacion
        </button>
      </div>
    </div>
  );
}