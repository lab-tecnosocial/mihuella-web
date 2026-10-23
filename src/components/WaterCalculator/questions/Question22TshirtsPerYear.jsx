import React from "react";
import { NumberQuestion } from "./NumberQuestion";

export function Question22TshirtsPerYear({
  onNext,
  onBack,
  onExit,
  initialValue = 0,
}) {
  return (
    <NumberQuestion
      title="¿Cuántas camisetas compras al año?"
      icon="/img/tshirt.webp"
      unit="unidades"
      step={1}
      min={0}
      ariaLabel="unidades de camisetas"
      currentCategoryIndex={4} // Categoría: Bienes
      currentQuestionIndex={2} // Tercera pregunta de Bienes
      totalQuestionsInCategory={4}
      answerKey="tshirtsPerYear"
      reference="Revisa tus compras del año. Cuenta cada prenda como una unidad."
      onNext={onNext}
      onBack={onBack}
      onExit={onExit}
      initialValue={initialValue}
      nextText="Continuar"
    />
  );
}