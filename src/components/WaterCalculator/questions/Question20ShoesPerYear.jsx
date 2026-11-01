import React from "react";
import { NumberQuestion } from "./NumberQuestion";

export function Question20ShoesPerYear({
  onNext,
  onBack,
  onExit,
  initialValue = 0,
}) {
  return (
    <NumberQuestion
      title="¿Cuántos pares de calzado compras al año?"
      icon="/img/shoes.webp"
      unit="pares"
      step={1}
      min={0}
      ariaLabel="pares de calzado"
      currentCategoryIndex={4} // Categoría: Bienes
      currentQuestionIndex={0}
      totalQuestionsInCategory={4}
      answerKey="shoesPerYear"
      reference="Revisa tus compras del año. Cuenta cada par de zapatos como una unidad."
      onNext={onNext}
      onBack={onBack}
      onExit={onExit}
      initialValue={initialValue}
      nextText="Continuar"
    />
  );
}