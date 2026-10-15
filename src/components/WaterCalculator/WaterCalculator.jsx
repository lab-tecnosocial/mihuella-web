import { useState } from 'react';
import { WaterCalculatorOnboarding } from './WaterCalculatorOnboarding';
import { WaterQuestionLayout } from './WaterQuestionLayout';
import { Question1Origin } from './questions/Question1Origin';
import { Question7ToiletType } from './questions/Question7ToiletType';
import { Question9Dishwashing } from './questions/Question9Dishwashing';
import { Question11PatioCleaning } from './questions/Question11PatioCleaning';
import { Question12Proteins } from './questions/Question12Proteins';
import { Question13ProteinAmounts } from './questions/Question13ProteinAmounts';
import { Question14Cereals } from './questions/Question14Cereals';
import { Question15CerealAmounts } from './questions/Question15CerealAmounts';
import { Question16Fruits } from './questions/Question16Fruits';
import { Question17FruitAmounts } from './questions/Question17FruitAmounts';
import { Question18Drinks } from './questions/Question18Drinks';
import { Question19DrinkAmounts } from './questions/Question19DrinkAmounts';
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
  10: {
    answerKey: 'dishwashingTimesPerDay',
    title: '¿Cuántas veces al día lavas los platos?',
    icon: '/img/traste-calendario.webp',
    unit: 'Veces',
    step: 1,
    ariaLabel: 'veces al día',
    currentCategoryIndex: 1,
    currentQuestionIndex: 3,
    totalQuestionsInCategory: 3,
    reference:
      'Lavar platos a mano puede usar hasta 20 litros por lavado; con lavavajillas, el consumo baja considerablemente.',
  },
};

export function WaterCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleStart = () => setCurrentStep(1);
  const handleBackToHome = () => window.location.href = '/';

  const handleBack = () => {
    if (currentStep === 1) setCurrentStep(0);
    else if (currentStep === 12) setCurrentStep(11);
    else if (currentStep === 11) setCurrentStep(10);
    else if (currentStep === 10) setCurrentStep(9);
    else if (currentStep === 13) setCurrentStep(12);
    else if (currentStep === 14) {
      const selectedProteins = answers.proteins || [];
      if (selectedProteins.length === 1 && selectedProteins[0] === 'ninguno') {
        setCurrentStep(12);
      } else {
        setCurrentStep(13);
      }
    }
    else if (currentStep === 15) setCurrentStep(14);
    else if (currentStep === 16) {
      const selectedCereals = answers.cereals || [];
      if (selectedCereals.length === 1 && selectedCereals[0] === 'ninguno') {
        setCurrentStep(14);
      } else {
        setCurrentStep(15);
      }
    }
    else if (currentStep === 17) setCurrentStep(16);
    else if (currentStep === 18) {
      const selectedFruits = answers.fruits || [];
      if (selectedFruits.length === 1 && selectedFruits[0] === 'ninguno') {
        setCurrentStep(16);
      } else {
        setCurrentStep(17);
      }
    }
    else if (currentStep === 19) setCurrentStep(18);
    else if (currentStep === 20) {
      const selectedDrinks = answers.drinks || [];
      if (selectedDrinks.length === 1 && selectedDrinks[0] === 'ninguno') {
        setCurrentStep(18);
      } else {
        setCurrentStep(19);
      }
    }
    else setCurrentStep(currentStep - 1);
  };

  const handleNext = (newAnswer) => {
    const updatedAnswers = { ...answers, ...newAnswer };
    setAnswers(updatedAnswers);

    if (currentStep === 9) {
      setCurrentStep(10);
    } else if (currentStep === 10) {
      setCurrentStep(11);
    } else if (currentStep === 11) {
      setCurrentStep(12);
    } else if (currentStep === 12) {
      const selected = updatedAnswers.proteins || [];
      if (selected.length === 1 && selected[0] === 'ninguno') {
        setCurrentStep(14);
      } else {
        setCurrentStep(13);
      }
    } else if (currentStep === 13) {
      setCurrentStep(14);
    } else if (currentStep === 14) {
      const selectedCereals = updatedAnswers.cereals || [];
      if (selectedCereals.length === 1 && selectedCereals[0] === 'ninguno') {
        setCurrentStep(16);
      } else {
        setCurrentStep(15);
      }
    } else if (currentStep === 15) {
      setCurrentStep(16);
    } else if (currentStep === 16) {
      const selectedFruits = updatedAnswers.fruits || [];
      if (selectedFruits.length === 1 && selectedFruits[0] === 'ninguno') {
        setCurrentStep(18);
      } else {
        setCurrentStep(17);
      }
    } else if (currentStep === 17) {
      setCurrentStep(18);
    } else if (currentStep === 18) {
      const selectedDrinks = updatedAnswers.drinks || [];
      if (selectedDrinks.length === 1 && selectedDrinks[0] === 'ninguno') {
        setCurrentStep(20); // Salta directo a la pregunta 20 si eligió "ninguno"
      } else {
        setCurrentStep(19);
      }
    } else if (currentStep === 19) {
      setCurrentStep(20);
    } else {
      setCurrentStep(currentStep + 1);
    }
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

        {currentStep === 11 && (
          <Question11PatioCleaning
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleBackToHome}
            initialValue={answers.patioCleaningMethod || ''}
          />
        )}

        {currentStep === 12 && (
          <Question12Proteins
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleBackToHome}
            initialValue={answers.proteins || []}
          />
        )}

        {currentStep === 13 && (
          <Question13ProteinAmounts
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleBackToHome}
            selectedProteins={answers.proteins || []}
            initialValue={answers.proteinAmounts || {}}
          />
        )}

        {currentStep === 14 && (
          <Question14Cereals
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleBackToHome}
            initialValue={answers.cereals || []}
          />
        )}

        {currentStep === 15 && (
          <Question15CerealAmounts
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleBackToHome}
            selectedCereals={answers.cereals || []}
            initialValue={answers.cerealAmounts || {}}
          />
        )}

        {currentStep === 16 && (
          <Question16Fruits
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleBackToHome}
            initialValue={answers.fruits || []}
          />
        )}

        {currentStep === 17 && (
          <Question17FruitAmounts
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleBackToHome}
            selectedFruits={answers.fruits || []}
            initialValue={answers.fruitAmounts || {}}
          />
        )}

        {currentStep === 18 && (
          <Question18Drinks
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleBackToHome}
            initialValue={answers.drinks || []}
          />
        )}

        {currentStep === 19 && (
          <Question19DrinkAmounts
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleBackToHome}
            selectedDrinks={answers.drinks || []}
            initialValue={answers.drinkAmounts || {}}
          />
        )}

        {/* Pantalla final después de la pregunta 19 */}
        {currentStep > 19 && (
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
