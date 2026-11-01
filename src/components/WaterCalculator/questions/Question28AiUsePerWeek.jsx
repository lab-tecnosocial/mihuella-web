import React from "react";
import { NumberQuestion } from "./NumberQuestion";

export function Question28AiUsePerWeek({
  onNext,
  onBack,
  onExit,
  initialValue = 0,
}) {
  return (
    <NumberQuestion
      title="¿Cuántas veces a la semana usas herramientas de inteligencia artificial?"
      icon="/img/ai-use.webp"
      unit="veces"
      step={1}
      min={0}
      ariaLabel="veces a la semana de uso de inteligencia artificial"
      currentCategoryIndex={5} // Categoría 5: Hábitos
      currentQuestionIndex={4}
      totalQuestionsInCategory={6}
      answerKey="aiUsePerWeek"
      reference="Cuenta cada sesión en que usaste IA esta semana, no cada pregunta que hiciste."
      onNext={onNext}
      onBack={onBack}
      onExit={onExit}
      initialValue={initialValue}
      nextText="Continuar"
    />
  );
}