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
import { guardarRespuestas } from './calculo/almacenamiento';

export function WaterCalculator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleStart = () => setCurrentStep(1);
  const handleBackToHome = () => window.location.href = '/';

  const finishCalculation = (respuestas) => {
    guardarRespuestas(respuestas);
    window.location.href = '/feature/resultado-huella-hidrica';
  };

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
        finishCalculation(updatedAnswers); // Sin bebidas no hay cantidades que pedir
      } else {
        setCurrentStep(19);
      }
    } else if (currentStep === 19) {
      finishCalculation(updatedAnswers);
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

      </main>

      <footer className="relative z-10 py-2 text-center text-xs text-white/70">
        Mi Huella ©
      </footer>
    </div>
  );
}
