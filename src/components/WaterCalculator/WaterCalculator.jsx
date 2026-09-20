import { useState } from 'react';
import { WaterCalculatorOnboarding } from './WaterCalculatorOnboarding';
import { WaterQuestionLayout } from './WaterQuestionLayout';
import { Question1Origin } from './questions/Question1Origin';
import { Question2WaterExpense } from './questions/Question2WaterExpense';
import { Question3ShowerDuration } from './questions/Question3ShowerDuration';
import { Question4ShowerFrequency } from './questions/Question4ShowerFrequency';
import { Question5TeethBrushing } from './questions/Question5TeethBrushing';
import { Question6HandWashing } from './questions/Question6HandWashing';
import { Question7ToiletType } from './questions/Question7ToiletType';
import { Question8ClothesWashing } from './questions/Question8ClothesWashing';
import { Question9Dishwashing } from './questions/Question9Dishwashing';
import { Question12Proteins } from './questions/Question12Proteins';
import { Question13ProteinAmounts } from './questions/Question13ProteinAmounts';
import { Question14Cereals } from './questions/Question14Cereals';
import { Question15CerealAmounts } from './questions/Question15CerealAmounts';
import { Question16Fruits } from './questions/Question16Fruits';
import { Question17FruitAmounts } from './questions/Question17FruitAmounts';
import { Question18Drinks } from './questions/Question18Drinks';
import { Question19DrinkAmounts } from './questions/Question19DrinkAmounts';

export function WaterCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleStart = () => setCurrentStep(1);
  const handleBackToHome = () => window.location.href = '/';

  const handleBack = () => {
    if (currentStep === 1) setCurrentStep(0);
    else if (currentStep === 12) setCurrentStep(9);
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

        {currentStep === 2 && (
          <Question2WaterExpense
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleBackToHome}
            initialValue={answers.waterExpenseBs || 0}
          />
        )}

        {currentStep === 3 && (
          <Question3ShowerDuration
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleBackToHome}
            initialValue={answers.showerMinutes || 0}
          />
        )}

        {currentStep === 4 && (
          <Question4ShowerFrequency
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleBackToHome}
            initialValue={answers.showerFrequencyPerWeek || 0}
          />
        )}

        {currentStep === 5 && (
          <Question5TeethBrushing
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleBackToHome}
            initialValue={answers.teethBrushingFrequencyPerDay || 0}
          />
        )}

        {currentStep === 6 && (
          <Question6HandWashing
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleBackToHome}
            initialValue={answers.handWashingFrequencyPerDay || 0}
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

        {currentStep === 8 && (
          <Question8ClothesWashing
            onNext={handleNext}
            onBack={handleBack}
            onExit={handleBackToHome}
            initialValue={answers.clothesWashingFrequencyPerWeek || 0}
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