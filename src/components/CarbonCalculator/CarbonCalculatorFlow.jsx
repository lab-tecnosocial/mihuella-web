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
import { Question20WasteSeparation } from './Question20WasteSeparation';
import { Question21WasteTypes } from './Question21WasteTypes';
import { Question22WasteQuantities } from './Question22WasteQuantities';

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
    // Campos de Residuos
    separatesWaste: true,
    wasteTypes: [],
    wasteQuantities: {
      comunes: 0,
      organicos: 0,
      papel: 0,
      plasticos: 0,
    },
  });

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  const handleFinishCalculation = (finalData) => {
    const updatedData = { ...formData, ...finalData };
    console.log('Datos completos para calcular huella de carbono:', updatedData);
    // Aquí rediriges a tus resultados o ejecutas la lógica final de cálculo
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

      {/* Pregunta 20: ¿Separas los residuos? */}
      {currentStep === 20 && (
        <Question20WasteSeparation
          initialValue={formData.separatesWaste}
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }));
            // Si el usuario responde "No" (false), puedes finalizar o saltar a la 22 según la lógica requerida
            if (data.separatesWaste) {
              setCurrentStep(21);
            } else {
              setCurrentStep(22);
            }
          }}
          onBack={() => setCurrentStep(19)}
          onExit={handleBackToHome}
        />
      )}

      {/* Pregunta 21: Selección de tipos de residuos */}
      {currentStep === 21 && (
        <Question21WasteTypes
          initialValue={formData.wasteTypes}
          onNext={(data) => {
            setFormData((prev) => ({ ...prev, ...data }));
            setCurrentStep(22);
          }}
          onBack={() => setCurrentStep(20)}
          onExit={handleBackToHome}
        />
      )}

      {/* Pregunta 22: Cantidades por residuo */}
      {currentStep === 22 && (
        <Question22WasteQuantities
          initialValue={formData.wasteQuantities}
          onNext={(data) => {
            handleFinishCalculation(data);
          }}
          onBack={() => {
            if (formData.separatesWaste) {
              setCurrentStep(21);
            } else {
              setCurrentStep(20);
            }
          }}
          onExit={handleBackToHome}
        />
      )}
    </>
  );
}