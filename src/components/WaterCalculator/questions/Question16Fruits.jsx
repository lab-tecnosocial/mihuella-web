import React, { useState } from "react";
import { Check } from "lucide-react";
import { WaterQuestionLayout } from "../WaterQuestionLayout";

const FRUIT_OPTIONS = [
  { id: "platano", label: "Plátano", unit: "Kg/semana", image: "/img/yellow-banana.webp" },
  { id: "manzana", label: "Manzana", unit: "Kg/semana", image: "/img/apple.webp" },
  { id: "naranja", label: "Naranja", unit: "Kg/semana", image: "/img/orangee.webp" },
  { id: "uvas", label: "Uvas", unit: "Kg/semana", image: "/img/grapes.webp" },
  { id: "frutilla", label: "Frutilla", unit: "Kg/semana", image: "/img/strawberry.webp" },
  { id: "papaya", label: "Papaya", unit: "Kg/semana", image: "/img/papaya.webp" },
  { id: "ninguno", label: "Ninguno", unit: "", image: "/img/none.webp" },
  { id: "otro", label: "Otro", unit: "", image: "/img/three_dots.webp" },
];

export function Question16Fruits({
  onNext,
  onBack,
  onExit,
  initialValue = [],
}) {
  const [selectedFruits, setSelectedFruits] = useState(initialValue);

  const toggleOption = (id) => {
    if (id === "ninguno") {
      setSelectedFruits(["ninguno"]);
      return;
    }

    setSelectedFruits((prev) => {
      const filtered = prev.filter((item) => item !== "ninguno");
      if (filtered.includes(id)) {
        return filtered.filter((item) => item !== id);
      }
      return [...filtered, id];
    });
  };

  return (
    <WaterQuestionLayout
      currentCategoryIndex={3} // Categoría: Dieta
      currentQuestionIndex={4}
      totalQuestionsInCategory={5}
      icon="/img/fruits-icon.webp"
      onBack={onBack}
      onExit={onExit}
      onNext={() => onNext({ fruits: selectedFruits })}
      isNextDisabled={selectedFruits.length === 0}
      nextText="Continuar"
    >
      <div className="flex flex-col items-center w-full max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug mb-1 text-center font-quicksand">
          ¿Qué tipo de frutas includes en tu alimentación habitual?
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 font-medium mb-5 text-center font-quicksand">
          Selecciona todas las que consumes
        </p>

        {/* REJILLA DE OPCIONES (2 COLUMNAS) */}
        <div className="grid grid-cols-2 gap-3 w-full mb-2">
          {FRUIT_OPTIONS.map((option) => {
            const isSelected = selectedFruits.includes(option.id);

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleOption(option.id)}
                className={`relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#2178BD] bg-[#F0F7FC] shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                {/* CHECKBOX ESQUINA SUPERIOR DERECHA */}
                <div
                  className={`absolute top-2.5 right-2.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-[#2178BD] text-white"
                      : "border-2 border-gray-300 bg-white"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                {/* IMAGEN DE FRUTA */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 mb-2 flex items-center justify-center">
                  <img
                    src={option.image}
                    alt={option.label}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* ETIQUETA Y UNIDAD */}
                <span className="text-xs sm:text-sm font-bold text-gray-800 text-center font-quicksand leading-tight">
                  {option.label}
                </span>
                {option.unit && (
                  <span className="text-[10px] sm:text-[11px] text-gray-400 font-medium mt-0.5 font-quicksand">
                    {option.unit}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </WaterQuestionLayout>
  );
}