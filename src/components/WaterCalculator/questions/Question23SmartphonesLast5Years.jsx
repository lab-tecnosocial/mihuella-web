import React from "react";
import { NumberQuestion } from "./NumberQuestion";

export function Question23SmartphonesLast5Years({
  onNext,
  onBack,
  onExit,
  initialValue = 0,
}) {
  return (
    <NumberQuestion
      title="¿Cuántos celulares has tenido en los últimos 5 años?"
      icon="/img/cellphone.webp"
      unit="unidades"
      step={1}
      min={0}
      ariaLabel="unidades de celulares"
      currentCategoryIndex={4} // Categoría: Bienes
      currentQuestionIndex={3} // Cuarta pregunta de Bienes
      totalQuestionsInCategory={4}
      answerKey="smartphonesLast5Years"
      reference="Recuerda los celulares que usaste en esos 5 años, incluido el que tienes ahora."
      onNext={onNext}
      onBack={onBack}
      onExit={onExit}
      initialValue={initialValue}
      nextText="Continuar"
    />
  );
}