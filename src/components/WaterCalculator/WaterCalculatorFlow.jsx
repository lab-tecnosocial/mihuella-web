import { useState } from 'react';
import { WaterCalculatorOnboarding } from './WaterCalculatorOnboarding';
import { Question1Origin } from './questions/Question1Origin';
import { Question2WaterExpense } from './questions/Question2WaterExpense';
import { Question3ShowerDuration } from './questions/Question3ShowerDuration';
import { Question4ShowerFrequency } from './questions/Question4ShowerFrequency';
import { Question5TeethBrushing } from './questions/Question5TeethBrushing';

export function WaterCalculatorFlow() {
  const [currentStep, setCurrentStep] = useState(-1);

  const [formData, setFormData] = useState({
    origin: '',
    expense: 0,
    showerDuration: 0,
    showerFrequencyPerWeek: 0,
    teethBrushingFrequencyPerDay: 0, // Estado inicial
  });

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <>
      {currentStep === -1 && (
        <WaterCalculatorOnboarding
          onBackToHome={handleBackToHome}
          onStartCalculation={() => setCurrentStep(1)}
        />
      )}

      {/* Pregunta 1: Origen */}
      {currentStep === 1 && (
        <Question1Origin
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }));
            setCurrentStep(2);
          }}
          onBack={() => setCurrentStep(-1)}
          onExit={handleBackToHome}
        />
      )}

      {/* Pregunta 2: Gasto de agua */}
      {currentStep === 2 && (
        <Question2WaterExpense
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }));
            setCurrentStep(3);
          }}
          onBack={() => setCurrentStep(1)}
          onExit={handleBackToHome}
        />
      )}

      {/* Pregunta 3: Duración de ducha */}
      {currentStep === 3 && (
        <Question3ShowerDuration
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }));
            setCurrentStep(4);
          }}
          onBack={() => setCurrentStep(2)}
          onExit={handleBackToHome}
        />
      )}

      {/* Pregunta 4: Frecuencia de ducha */}
      {currentStep === 4 && (
        <Question4ShowerFrequency
          initialValue={formData.showerFrequencyPerWeek}
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }));
            setCurrentStep(5); // 2. AVANZA AL PASO 5
          }}
          onBack={() => setCurrentStep(3)}
          onExit={handleBackToHome}
        />
      )}

      {/* Pregunta 5: Cepillado de dientes */}
      {currentStep === 5 && ( // 3. NUEVO BLOQUE
        <Question5TeethBrushing
          initialValue={formData.teethBrushingFrequencyPerDay}
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }));
            setCurrentStep(6); // Siguiente pregunta o categoría
          }}
          onBack={() => setCurrentStep(4)}
          onExit={handleBackToHome}
        />
      )}
    </>
  );
}