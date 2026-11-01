import React from "react";
import { NumberQuestion } from "./NumberQuestion";

export function Question21JeansPerYear({
  onNext,
  onBack,
  onExit,
  initialValue = 0,
}) {
  return (
    <NumberQuestion
      title="¿Cuántos jeans compras al año?"
      icon="/img/jeans.webp"
      unit="unidades"
      step={1}
      min={0}
      ariaLabel="unidades de jeans"
      currentCategoryIndex={4} // Categoría: Bienes
      currentQuestionIndex={1} // Segunda pregunta de la categoría Bienes
      totalQuestionsInCategory={4}
      answerKey="jeansPerYear"
      reference="Revisa tus compras del año. Cuenta cada prenda como una unidad."
      onNext={onNext}
      onBack={onBack}
      onExit={onExit}
      initialValue={initialValue}
      nextText="Continuar"
    />
  );
}