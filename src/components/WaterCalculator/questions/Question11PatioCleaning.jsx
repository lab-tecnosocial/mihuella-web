import React, { useState } from "react";
import { WaterQuestionLayout } from "../WaterQuestionLayout";

const OPTIONS = [
  {
    value: "noTengoPatio",
    label: "No tengo patio",
    image: "/img/prohibido.webp",
  },
  {
    value: "manguera",
    label: "Con manguera",
    image: "/img/manguera.webp",
  },
  {
    value: "balde",
    label: "Con balde",
    image: "/img/balde.webp",
  },
];

export function Question11PatioCleaning({
  onNext,
  onBack,
  onExit,
  initialValue = "",
}) {
  const [patioCleaningMethod, setPatioCleaningMethod] = useState(initialValue);

  const handleSelect = (value) => {
    setPatioCleaningMethod(value);
  };

  return (
    <WaterQuestionLayout
      currentCategoryIndex={1} // Categoría: Limpieza
      currentQuestionIndex={4} // Ajusta según el orden real de la sub-pregunta
      totalQuestionsInCategory={4}
      icon="/img/casa-arbol.webp"
      onBack={onBack}
      onExit={onExit}
      onNext={() => onNext({ patioCleaningMethod })}
      isNextDisabled={!patioCleaningMethod}
      nextText="Continuar"
    >
      <div className="flex flex-col items-center w-full max-w-md mx-auto">
        {/* TÍTULO Y SUBTÍTULO */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug mb-1 text-center font-quicksand">
          Si cuentas con patio en tu hogar, ¿cómo realizas habitualmente su limpieza?
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 font-medium mb-5 text-center font-quicksand">
          Selecciona una opción
        </p>

        {/* TARJETAS DE OPCIONES */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {OPTIONS.map((option) => {
            const isSelected = patioCleaningMethod === option.value;
            return (
              <button
                type="button"
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border p-4 sm:p-5 transition cursor-pointer font-quicksand ${
                  isSelected
                    ? "border-[#2178BD] bg-[#EAF4FB]"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <span
                  className={`absolute top-3 right-3 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? "border-[#2178BD]" : "border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#2178BD]" />
                  )}
                </span>
                <img
                  src={option.image}
                  alt={option.label}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                />
                <span className="text-sm sm:text-base font-bold text-gray-700 text-center">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </WaterQuestionLayout>
  );
}