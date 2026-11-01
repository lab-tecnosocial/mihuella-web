import React from "react";
import { NumberQuestion } from "./NumberQuestion";

export function Question29EmailCleanupPerMonth({
  onNext,
  onBack,
  onExit,
  initialValue = 0,
}) {
  return (
    <NumberQuestion
      title="¿Cuántas veces al mes eliminas correos electrónicos que ya no usas?"
      icon="/img/email-cleanup.webp"
      unit="veces"
      step={1}
      min={0}
      ariaLabel="veces al mes de eliminación de correos electrónicos"
      currentCategoryIndex={5} // Categoría 5: Hábitos
      currentQuestionIndex={5}
      totalQuestionsInCategory={6}
      answerKey="emailCleanupPerMonth"
      reference="Cuenta las veces que limpiaste tu correo durante el mes."
      onNext={onNext}
      onBack={onBack}
      onExit={onExit}
      initialValue={initialValue}
      nextText="Calcular mi Huella"
    />
  );
}