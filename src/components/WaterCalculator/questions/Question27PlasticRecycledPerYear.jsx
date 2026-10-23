import React from "react";
import { NumberQuestion } from "./NumberQuestion";

export function Question27PlasticRecycledPerYear({
  onNext,
  onBack,
  onExit,
  initialValue = 0,
}) {
  return (
    <NumberQuestion
      title="¿Cuántos kilos de plástico reciclas al año? aproximadamente"
      icon="/img/recycled-plastic.webp"
      unit="Kg"
      step={1}
      min={0}
      ariaLabel="kilos de plástico reciclado"
      currentCategoryIndex={5} // Categoría 5: Hábitos
      currentQuestionIndex={3}
      totalQuestionsInCategory={6}
      answerKey="plasticRecycledPerYear"
      reference="Si juntas 2 kg al mes, son 24 kg al año. Incluye envases y recipientes de plástico"
      onNext={onNext}
      onBack={onBack}
      onExit={onExit}
      initialValue={initialValue}
      nextText="Continuar"
    />
  );
}