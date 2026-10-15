import { useState } from 'react';
import { WaterCalculatorOnboarding } from './WaterCalculatorOnboarding';
import { WaterQuestionLayout } from './WaterQuestionLayout';
import { Question1Origin } from './questions/Question1Origin';
import { Question7ToiletType } from './questions/Question7ToiletType';
import { Question9Dishwashing } from './questions/Question9Dishwashing';
import { NumberQuestion } from './questions/NumberQuestion';

const NUMBER_QUESTIONS = {
  2: {
    answerKey: 'waterExpenseBs',
    title: '¿Cuál es tu gasto mensual aproximado en agua? En Bs',
    icon: '/img/form_hidrica_gotita.webp',
    unit: 'Bs',
    step: 10,
    ariaLabel: 'gasto en Bs',
    currentCategoryIndex: 0,
    currentQuestionIndex: 0,
    totalQuestionsInCategory: 1,
    reference:
      'Revisa tu factura de servicio de agua potable del último mes para colocar un dato preciso.',
  },
  3: {
    answerKey: 'showerMinutes',
    title: '¿Aproximadamente cuántos minutos duran tus duchas?',
    icon: '/img/shower.webp',
    unit: 'minutos',
    step: 1,
    ariaLabel: 'minutos',
    currentCategoryIndex: 1,
    currentQuestionIndex: 0,
    totalQuestionsInCategory: 1,
    reference: 'Una ducha promedio dura entre 5 a 10 minutos.',
  },
  4: {
    answerKey: 'showerFrequencyPerWeek',
    title: '¿Cuántas veces te duchas a la semana?',
    icon: '/img/shower.webp',
    unit: 'veces',
    step: 1,
    ariaLabel: 'veces por semana',
    currentCategoryIndex: 1,
    currentQuestionIndex: 1,
    totalQuestionsInCategory: 3,
    reference:
      'Lo común para una persona es ducharse entre 7 y 14 veces a la semana (1 a 2 veces al día).',
  },
  5: {
    answerKey: 'teethBrushingFrequencyPerDay',
    title: '¿Cuántas veces al día te cepillas los dientes?',
    icon: '/img/toothbrush.webp',
    unit: 'veces',
    step: 1,
    ariaLabel: 'veces al día',
    currentCategoryIndex: 1,
    currentQuestionIndex: 2,
    totalQuestionsInCategory: 3,
    reference:
      'Lo común para una persona es cepillarse entre 2 y 3 veces al día.',
  },
  6: {
    answerKey: 'handWashingFrequencyPerDay',
    title: '¿Cuántas veces al día te lavas las manos?',
    icon: '/img/handwashing.webp',
    unit: 'veces',
    step: 1,
    ariaLabel: 'veces al día',
    currentCategoryIndex: 1,
    currentQuestionIndex: 3,
    totalQuestionsInCategory: 3,
    reference:
      'Una persona suele lavarse las manos entre 5 y 10 veces al día.',
  },
  8: {
    answerKey: 'clothesWashingFrequencyPerWeek',
    title: '¿Cuántas veces lavas ropa en una semana?',
    icon: '/img/lavar-ropa.webp',
    unit: 'Veces',
    step: 1,
    ariaLabel: 'veces',
    currentCategoryIndex: 2,
    currentQuestionIndex: 0,
    totalQuestionsInCategory: 2,
    reference: 'Lo común es lavar la ropa entre 1 y 3 veces por semana.',
  },
};

export function WaterCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleStart = () => setCurrentStep(1);
  const handleBackToHome = () => window.location.href = '/';

  const handleBack = () => {
    if (currentStep === 1) setCurrentStep(0);
    else setCurrentStep(currentStep - 1);
  };

  const handleNext = (newAnswer) => {
    setAnswers({ ...answers, ...newAnswer });
    setCurrentStep(currentStep + 1);
  };

  const numberQuestion = NUMBER_QUESTIONS[currentStep];

  return (
    <div className="relative min-h-screen w-full bg-[#2178BD] flex flex-col justify-between overflow-hidden font-sans">
      <div
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat pointer-events-none z-0 opacity-90 sm:opacity-100"
        style={{ backgroundImage: "url('/img/bg-hidrica.webp')" }}
      />

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-6">
        {currentStep === 0 && (
          <WaterCalculatorOnboarding
            onBackToHome={handleBackToHome}
            onStartCalculation={handleStart}
          />
        )}

        {currentStep === 1 && (
          <Question1Origin
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleBackToHome}
            initialValue={answers.origin || ''}
          />
        )}

        {numberQuestion && (
          <NumberQuestion
            {...numberQuestion}
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleBackToHome}
            initialValue={answers[numberQuestion.answerKey] || 0}
          />
        )}

        {currentStep === 7 && (
          <Question7ToiletType
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleBackToHome}
            initialValue={answers.toiletType || ''}
          />
        )}

        {currentStep === 9 && (
          <Question9Dishwashing
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleBackToHome}
            initialValue={answers.dishwashingMethod || ''}
          />
        )}

        {/* Pantalla final después de la pregunta 9 */}
        {currentStep > 9 && (
          <WaterQuestionLayout
            currentCategoryIndex={-1}
            icon="/img/huella-hidrica-icon.webp"
            onBack={handleBack}
            onExit={handleBackToHome}
          >
            <div className="flex flex-col items-center text-center text-black w-full max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Próximamente</h2>
              <p className="text-gray-600">
                Más preguntas estarán disponibles pronto.
              </p>
            </div>
          </WaterQuestionLayout>
        )}
      </main>

      <footer className="relative z-10 py-2 text-center text-xs text-white/70">
        Mi Huella ©
      </footer>
    </div>
  );
}
