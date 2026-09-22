import { useState } from 'react';
import { CarbonCalculatorOnboarding } from './CarbonCalculatorOnboarding';
import { Question1People } from './Question1People';
import { Question2Department } from './Question2Department';
import { Question3MealConsumption } from './Question3MealConsumption';
import { Question4ChickenConsumption } from './Question4ChickenConsumption';
import { Question5PorkConsumption } from './Question5PorkConsumption';
import { Question9CheeseConsumption } from './Question9CheeseConsumption';
import { Question10YogurtConsumption } from './Question10YogurtConsumption';
import { Question11FruitsConsumption } from './Question11FruitsConsumption';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

export function CarbonCalculatorFlow() {
  const [currentStep, setCurrentStep] = useState(-1);

  const [formData, setFormData] = useState({
    peopleCount: 0,
    department: '',
    meatKg: 0,
    chickenKg: 0,
    porkKg: 0,
    cheeseConsumptionKg: 0,
    yogurtConsumptionLt: 0,
    fruitsAndVegetablesKg: 0,
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
            setCurrentStep(5);
          }}
          onBack={() => setCurrentStep(3)}
          onExit={handleBackToHome}
        />
      )}

      {currentStep === 5 && (
        <Question5PorkConsumption
          initialValue={formData.porkKg}
          onNext={(data) => {
            const kg = typeof data === 'object' ? data.porkKg : data;
            setFormData((prev) => ({ ...prev, porkKg: kg }));
            setCurrentStep(9); // Salta directo a Queso
          }}
          onBack={() => setCurrentStep(4)}
          onExit={handleBackToHome}
        />
      )}

      {currentStep === 9 && (
        <Question9CheeseConsumption
          initialValue={formData.cheeseConsumptionKg}
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }));
            setCurrentStep(10);
          }}
          onBack={() => setCurrentStep(5)}
          onExit={handleBackToHome}
        />
      )}

      {currentStep === 10 && (
        <Question10YogurtConsumption
          initialValue={formData.yogurtConsumptionLt}
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }));
            setCurrentStep(11);
          }}
          onBack={() => setCurrentStep(9)}
          onExit={handleBackToHome}
        />
      )}

      {currentStep === 11 && (
        <Question11FruitsConsumption
          initialValue={formData.fruitsAndVegetablesKg}
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }));
            setCurrentStep(12);
          }}
          onBack={() => setCurrentStep(10)}
          onExit={handleBackToHome}
        />
      )}

      {/* VISTA DE RESPALDO: Evita que la pantalla quede en blanco si currentStep no coincide */}
      {(currentStep > 11 || (currentStep > 5 && currentStep < 9)) && (
        <CarbonQuestionLayout
          currentCategoryIndex={1}
          icon="/img/semilla.webp"
          onBack={() => setCurrentStep(5)}
          onExit={handleBackToHome}
        >
          <div className="flex flex-col items-center text-center text-gray-800">
            <h2 className="text-xl font-bold mb-2">Próximamente</h2>
            <p className="text-sm text-gray-600">
              Esta sección está en desarrollo. (Paso actual: {currentStep})
            </p>
          </div>
        </CarbonQuestionLayout>
      )}
    </>
  );
}