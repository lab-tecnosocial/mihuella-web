import React from "react";
import { NumberQuestion } from "./NumberQuestion";

export function Question26PaperRecycledPerYear({
  onNext,
  onBack,
  onExit,
  initialValue = 0,
}) {
  return (
    <NumberQuestion
      title="¿Cuántos kilos de papel reciclas al año aproximadamente"
      icon="/img/recycled-paper.webp"
      unit="Kg"
      step={1}
      min={0}
      ariaLabel="kilos de papel reciclado"
      currentCategoryIndex={5} // Categoría 5: Hábitos
      currentQuestionIndex={2}
      totalQuestionsInCategory={6}
      answerKey="paperRecycledPerYear"
      reference="Si juntas 2 kg al mes, son 24 kg al año. Incluye papel, cartón y periódicos"
      onNext={onNext}
      onBack={onBack}
      onExit={onExit}
      initialValue={initialValue}
      nextText="Continuar"
    />
  );
}