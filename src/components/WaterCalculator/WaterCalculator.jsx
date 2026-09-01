import { useState } from 'react';
import { WaterCalculatorOnboarding } from './WaterCalculatorOnboarding';
import { WaterQuestionLayout } from './WaterQuestionLayout';
import { Question1Origin } from './questions/Question1Origin';

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

        {currentStep > 1 && (
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