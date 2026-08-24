import { useState } from 'react';
import { CarbonCalculatorOnboarding } from './CarbonCalculatorOnboarding';
import { Question1People } from './Question1People';
import { Question2Department } from './Question2Department';
import { Question3MealConsumption } from './Question3MeatConsumption';

export function CarbonCalculatorFlow() {
  // Pasos: -1 (Onboarding), 1 (Personas), 2 (Departamento), 3 (Consumo Carne)
  const [currentStep, setCurrentStep] = useState(-1);

  const [formData, setFormData] = useState({
    peopleCount: 0,
    department: '',
    meatKg: 0,
  });

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <>
      {currentStep === -1 && (
        <CarbonCalculatorOnboarding
          onBackToHome={handleBackToHome}
          onStartCalculation={() => setCurrentStep(1)}
        />
      )}

      {currentStep === 1 && (
        <Question1People
          onNext={(count) => {
            setFormData((prev) => ({ ...prev, peopleCount: count }));
            setCurrentStep(2);
          }}
          onBack={() => setCurrentStep(-1)}
          onExit={handleBackToHome}
        />
      )}

      {currentStep === 2 && (
        <Question2Department
          onNext={(departmentId) => {
            setFormData((prev) => ({ ...prev, department: departmentId }));
            setCurrentStep(3);
          }}
          onBack={() => setCurrentStep(1)}
          onExit={handleBackToHome}
        />
      )}

      {currentStep === 3 && (
        <Question3MealConsumption
          initialValue={formData.meatKg}
          onNext={(kg) => {
            setFormData((prev) => ({ ...prev, meatKg: kg }));
            alert(`Paso 3 guardado: ${kg} kg de carne.`);
            // Siguiente pregunta: setCurrentStep(4);
          }}
          onBack={() => setCurrentStep(2)}
          onExit={handleBackToHome}
        />
      )}
    </>
  );
}