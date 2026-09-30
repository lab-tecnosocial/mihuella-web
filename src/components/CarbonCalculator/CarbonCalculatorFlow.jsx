import { useState } from 'react';
import { CarbonCalculatorOnboarding } from './CarbonCalculatorOnboarding';
import { Question1People } from './Question1People';
import { Question2Department } from './Question2Department';
import { Question3MealConsumption } from './Question3MealConsumption';
import { Question4ChickenConsumption } from './Question4ChickenConsumption';
import { Question5PorkConsumption } from './Question5PorkConsumption';
import { Question6FishConsumption } from './Question6FishConsumption';
import { Question7LambConsumption } from './Question7LambConsumption';
import { Question8MilkConsumption } from './Question8MilkConsumption';
import { Question9CheeseConsumption } from './Question9CheeseConsumption';
import { Question10YogurtConsumption } from './Question10YogurtConsumption';
import { Question11FruitsConsumption } from './Question11FruitsConsumption';
import { Question14TransportMode } from './Question14TransportMode';
import { Question15TransportDays } from './Question15TransportDays';
import { Question16TransportDistance } from './Question16TransportDistance';
import { Question17CarOccupants } from './Question17CarOccupants';
import { Question18AirplaneTrips } from './Question18AirplaneTrips';
import { Question19FlightDuration } from './Question19FlightDuration';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

export function CarbonCalculatorFlow() {
  const [currentStep, setCurrentStep] = useState(-1);

  const [formData, setFormData] = useState({
    peopleCount: 0,
    department: '',
    meatKg: 0,
    chickenKg: 0,
    porkKg: 0,
    fishKg: 0,
    lambKg: 0,
    milkLt: 0,
    cheeseConsumptionKg: 0,
    yogurtConsumptionLt: 0,
    fruitsAndVegetablesKg: 0,
    // Campos de Transporte
    transportMode: '',
    transportDays: 0,
    transportDistance: 0,
    carOccupants: 1,
    airplaneTrips: 0,
    flightDurationMin: 0,
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
            setCurrentStep(6);
          }}
          onBack={() => setCurrentStep(4)}
          onExit={handleBackToHome}
        />
      )}

      {currentStep === 6 && (
        <Question6FishConsumption
          initialValue={formData.fishKg}
          onNext={(kg) => {
            setFormData((prev) => ({ ...prev, fishKg: kg }));
            setCurrentStep(7);
          }}
          onBack={() => setCurrentStep(5)}
          onExit={handleBackToHome}
        />
      )}

      {currentStep === 7 && (
        <Question7LambConsumption
          initialValue={formData.lambKg}
          onNext={(kg) => {
            setFormData((prev) => ({ ...prev, lambKg: kg }));
            setCurrentStep(8);
          }}
          onBack={() => setCurrentStep(6)}
          onExit={handleBackToHome}
        />
      )}

      {currentStep === 8 && (
        <Question8MilkConsumption
          initialValue={formData.milkLt}
          onNext={(lt) => {
            setFormData((prev) => ({ ...prev, milkLt: lt }));
            setCurrentStep(9);
          }}
          onBack={() => setCurrentStep(7)}
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
          onBack={() => setCurrentStep(8)}
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
            // Corregido: salta directamente al paso 14 (Modo de transporte)
            setCurrentStep(14);
          }}
          onBack={() => setCurrentStep(10)}
          onExit={handleBackToHome}
        />
      )}

      {currentStep === 14 && (
        <Question14TransportMode
          initialValue={formData.transportMode}
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }));
            setCurrentStep(15);
          }}
          onBack={() => setCurrentStep(11)}
          onExit={handleBackToHome}
        />
      )}

      {currentStep === 15 && (
        <Question15TransportDays
          initialValue={formData.transportDays}
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }));
            setCurrentStep(16);
          }}
          onBack={() => setCurrentStep(14)}
          onExit={handleBackToHome}
        />
      )}

      {currentStep === 16 && (
        <Question16TransportDistance
          initialValue={formData.transportDistance}
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }));
            // Lógica condicional: sólo va a la 17 si es auto propio
            if (formData.transportMode === 'auto_propio') {
              setCurrentStep(17);
            } else {
              setCurrentStep(18);
            }
          }}
          onBack={() => setCurrentStep(15)}
          onExit={handleBackToHome}
        />
      )}

      {currentStep === 17 && (
        <Question17CarOccupants
          initialValue={formData.carOccupants}
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }));
            setCurrentStep(18);
          }}
          onBack={() => setCurrentStep(16)}
          onExit={handleBackToHome}
        />
      )}

      {currentStep === 18 && (
        <Question18AirplaneTrips
          initialValue={formData.airplaneTrips}
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }));
            setCurrentStep(19);
          }}
          onBack={() => {
            // Regresa al paso 17 o 16 según el modo de transporte
            if (formData.transportMode === 'auto_propio') {
              setCurrentStep(17);
            } else {
              setCurrentStep(16);
            }
          }}
          onExit={handleBackToHome}
        />
      )}

      {currentStep === 19 && (
        <Question19FlightDuration
          initialValue={formData.flightDurationMin}
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }));
            setCurrentStep(20);
          }}
          onBack={() => setCurrentStep(18)}
          onExit={handleBackToHome}
        />
      )}

      {/* VISTA DE RESPALDO: Para pasos futuros (> 19) */}
      {currentStep > 19 && (
        <CarbonQuestionLayout
          currentCategoryIndex={1}
          icon="/img/semilla.webp"
          onBack={() => setCurrentStep(19)}
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