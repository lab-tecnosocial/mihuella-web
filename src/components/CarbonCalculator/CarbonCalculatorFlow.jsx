import { useState } from 'react';
import { CarbonCalculatorOnboarding } from './CarbonCalculatorOnboarding';
import { Question1People } from './Question1People';
import { Question2Department } from './Question2Department';

export function CarbonCalculatorFlow() {
  // -1 = Onboarding, 1 = Pregunta 1, 2 = Pregunta 2
  const [currentStep, setCurrentStep] = useState(-1);

  // Guardar respuestas globales
  const [formData, setFormData] = useState({
    peopleCount: 0,
    department: '',
  });

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  // Onboarding -> Pregunta 1
  const handleStartCalculation = () => {
    setCurrentStep(1);
  };

  // Pregunta 1 -> Pregunta 2
  const handleNextQuestion1 = (count) => {
    setFormData((prev) => ({ ...prev, peopleCount: count }));
    setCurrentStep(2);
  };

  // Pregunta 2 -> Guardar y siguiente
  const handleNextQuestion2 = (departmentId) => {
    setFormData((prev) => ({ ...prev, department: departmentId }));
    alert(`¡Paso 2 completado! Departamento seleccionado: ${departmentId}`);
    // A futuro: setCurrentStep(3);
  };

  return (
    <>
      {/* ONBOARDING (Paso -1) */}
      {currentStep === -1 && (
        <CarbonCalculatorOnboarding
          onBackToHome={handleBackToHome}
          onStartCalculation={handleStartCalculation}
        />
      )}

      {/* PREGUNTA 1 */}
      {currentStep === 1 && (
        <Question1People
          onNext={handleNextQuestion1}
          onBack={() => setCurrentStep(-1)} // Vuelve al Onboarding (-1)
          onExit={handleBackToHome}
        />
      )}

      {/* PREGUNTA 2 */}
      {currentStep === 2 && (
        <Question2Department
          onNext={handleNextQuestion2}
          onBack={() => setCurrentStep(1)} // Vuelve a Pregunta 1
          onExit={handleBackToHome}
        />
      )}
    </>
  );
}