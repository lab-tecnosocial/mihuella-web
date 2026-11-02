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
import { Question12ElectricEnergyCost } from './Question12ElectricEnergyCost';
import { Question13GasConsumption } from './Question13GasConsumption';
import { Question14GasPayment } from './Question14GasPayment';
import { Question15TypeTransport } from './Question15TypeTransport';
import { Question16TransportDays } from './Question16TransportDays';
import { Question17DailyDistance } from './Question17DailyDistance';
import { Question18CarOccupancy } from './Question18CarOccupancy';
import { Question19FlightsPerYear } from './Question19FlightsPerYear';
import { Question20FlightDuration } from './Question20FlightDuration';
import { Question21SeparateWaste } from './Question21SeparateWaste';
import { Question22WasteTypes } from './Question22WasteTypes';
import { Question23WasteQuantify } from './Question23WasteQuantify';
import { CarbonResults } from './CarbonResults';

const DEFAULTS = {
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
  electricityCostBs: 0,
  gasType: null,
  gasPaymentBs: 0,
  gasCylindersPerMonth: 0,
  transportType: null,
  transportDaysPerWeek: 0,
  dailyDistanceKm: 0,
  carOccupancy: null,
  flightsPerYear: 0,
  flightMinutes: 0,
  separatesWaste: null,
  wasteTypes: [],
  wasteKg: 0,
  wasteKgByType: {},
};

const STEPS = [
  { id: 'people', Component: Question1People, key: 'peopleCount', category: 0 },
  { id: 'department', Component: Question2Department, key: 'department', category: 0 },

  { id: 'meat', Component: Question3MealConsumption, key: 'meatKg', category: 1 },
  { id: 'chicken', Component: Question4ChickenConsumption, key: 'chickenKg', category: 1 },
  { id: 'pork', Component: Question5PorkConsumption, key: 'porkKg', category: 1 },
  { id: 'fish', Component: Question6FishConsumption, key: 'fishKg', category: 1 },
  { id: 'lamb', Component: Question7LambConsumption, key: 'lambKg', category: 1 },
  { id: 'milk', Component: Question8MilkConsumption, key: 'milkLt', category: 1 },
  { id: 'cheese', Component: Question9CheeseConsumption, key: 'cheeseConsumptionKg', category: 1 },
  { id: 'yogurt', Component: Question10YogurtConsumption, key: 'yogurtConsumptionLt', category: 1 },
  { id: 'fruits', Component: Question11FruitsConsumption, key: 'fruitsAndVegetablesKg', category: 1 },

  { id: 'electricCost', Component: Question12ElectricEnergyCost, key: 'electricityCostBs', category: 2 },
  { id: 'gasType', Component: Question13GasConsumption, key: 'gasType', category: 2 },
  { id: 'gasPayment', Component: Question14GasPayment, key: 'gasPaymentBs', category: 2 },

  { id: 'transportType', Component: Question15TypeTransport, key: 'transportType', category: 3 },
  { id: 'transportDays', Component: Question16TransportDays, key: 'transportDaysPerWeek', category: 3 },
  {
    id: 'dailyDistance',
    Component: Question17DailyDistance,
    key: 'dailyDistanceKm',
    category: 3,
    showIf: (d) => d.transportType !== 'foot',
  },
  {
    id: 'carOccupancy',
    Component: Question18CarOccupancy,
    key: 'carOccupancy',
    category: 3,
    showIf: (d) => ['car', 'electric_car'].includes(d.transportType),
  },
  { id: 'flightsPerYear', Component: Question19FlightsPerYear, key: 'flightsPerYear', category: 3 },
  {
    id: 'flightDuration',
    Component: Question20FlightDuration,
    key: 'flightMinutes',
    category: 3,
    showIf: (d) => d.flightsPerYear > 0,
  },

  { id: 'separateWaste', Component: Question21SeparateWaste, key: 'separatesWaste', category: 4 },
  {
    id: 'wasteTypes',
    Component: Question22WasteTypes,
    key: 'wasteTypes',
    category: 4,
    showIf: (d) => d.separatesWaste === true,
  },
  { id: 'wasteQuantity', Component: Question23WasteQuantify, key: 'wasteKg', category: 4 },
];

const isVisible = (step, data) => !step.showIf || step.showIf(data);

const findNext = (from, data) => {
  for (let i = from + 1; i < STEPS.length; i++) {
    if (isVisible(STEPS[i], data)) return i;
  }
  return STEPS.length;
};

const findPrev = (from, data) => {
  for (let i = from - 1; i >= 0; i--) {
    if (isVisible(STEPS[i], data)) return i;
  }
  return -1;
};

const cleanHidden = (data) => {
  const out = { ...data };
  for (const step of STEPS) {
    if (!isVisible(step, out) && step.key in DEFAULTS) {
      out[step.key] = DEFAULTS[step.key];
    }
  }
  return out;
};

const progressFor = (index, data) => {
  const category = STEPS[index].category;
  const visible = STEPS.map((step, i) => ({ step, i })).filter(
    ({ step }) => step.category === category && isVisible(step, data)
  );
  return {
    currentCategoryIndex: category,
    currentQuestionIndex: Math.max(0, visible.findIndex((v) => v.i === index)),
    totalQuestionsInCategory: visible.length,
  };
};

export function CarbonCalculatorFlow() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [formData, setFormData] = useState(DEFAULTS);

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  const handleNext = (index, step, answer) => {
    const isObject =
      answer !== null && typeof answer === 'object' && !Array.isArray(answer);
    const patch = isObject ? answer : { [step.key]: answer };

    const merged = cleanHidden({ ...formData, ...patch });
    setFormData(merged);
    setCurrentStep(findNext(index, merged));
  };

  const handleBack = (index) => {
    setCurrentStep(findPrev(index, formData));
  };

  const activeStep =
    currentStep >= 0 && currentStep < STEPS.length ? STEPS[currentStep] : null;

  return (
    <>
      {currentStep === -1 && (
        <CarbonCalculatorOnboarding
          onBackToHome={handleBackToHome}
          onStartCalculation={() => setCurrentStep(findNext(-1, formData))}
        />
      )}

      {activeStep && (
        <activeStep.Component
          key={activeStep.id}
          initialValue={formData[activeStep.key]}
          data={formData}
          progress={progressFor(currentStep, formData)}
          onNext={(answer) => handleNext(currentStep, activeStep, answer)}
          onBack={() => handleBack(currentStep)}
          onExit={handleBackToHome}
        />
      )}

      {currentStep >= STEPS.length && (
        <CarbonResults data={formData} onExit={handleBackToHome} />
      )}
    </>
  );
}