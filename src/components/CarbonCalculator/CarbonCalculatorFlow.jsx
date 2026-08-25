import { useState } from 'react';
import { CarbonCalculatorOnboarding } from './CarbonCalculatorOnboarding';
import { Question1People } from './Question1People';
import { Question2Department } from './Question2Department';
import { Question3MealConsumption } from './Question3MealConsumption';
import { Question4ChickenConsumption } from './Question4ChickenConsumption';

export function CarbonCalculatorFlow() {
  const [currentStep, setCurrentStep] = useState(-1);

  const [formData, setFormData] = useState({
    peopleCount: 0,
    department: '',
    meatKg: 0,
    chickenKg: 0,
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
            setCurrentStep(4);
          }}
          onBack={() => setCurrentStep(2)}
          onExit={handleBackToHome}
        />
      )}

      {currentStep === 4 && (
        <Question4ChickenConsumption
          initialValue={formData.chickenKg}
          onNext={(kg) => {
            setFormData((prev) => ({ ...prev, chickenKg: kg }));
            alert(`Paso 4 completado: ${kg} kg de pollo.`);
            // Siguiente pregunta: setCurrentStep(5);
          }}
          onBack={() => setCurrentStep(3)} // Regresa a la pregunta de carne
          onExit={handleBackToHome}
        />
      )}
    </>
  );
}