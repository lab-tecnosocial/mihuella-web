import React, { useState } from "react";
import { HelpCircle } from "lucide-react";
import { WaterQuestionLayout } from "../WaterQuestionLayout";

export function Question24RainwaterSystem({
  onNext,
  onBack,
  onExit,
  initialValue = null,
}) {
  const [selected, setSelected] = useState(initialValue);

  const options = [
    { id: true, label: "Si" },
    { id: false, label: "No" },
  ];

  const handleSubmit = () => {
    if (selected === null) return;
    onNext({ rainwaterSystem: selected });
  };

  return (
    <WaterQuestionLayout
      currentCategoryIndex={5} // Categoría 5: Hábitos
      currentQuestionIndex={0}
      totalQuestionsInCategory={6}
      icon="/img/rainwater.webp"
      onBack={onBack}
      onExit={onExit}
      onNext={handleSubmit}
      isNextDisabled={selected === null}
      nextText="Continuar"
    >
      <div className="flex flex-col items-center text-center text-black w-full max-w-md mx-auto font-quicksand">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug mb-1">
          ¿Tienes sistema de recolección de agua de lluvia?
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 font-medium mb-6">
          Selecciona una opción
        </p>

        {/* Opciones Verticales Sí / No */}
        <div className="flex flex-col gap-3 w-full max-w-xs mb-6">
          {options.map((option) => {
            const isSelected = selected === option.id;
            return (
              <button
                key={String(option.id)}
                type="button"
                onClick={() => setSelected(option.id)}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm sm:text-base transition border-2 cursor-pointer ${
                  isSelected
                    ? "border-[#2178BD] bg-[#2178BD] text-white shadow-xs"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {/* Caja de Referencia */}
        <div className="w-full bg-[#DCEFEF] border border-[#BDE0E0] rounded-2xl p-3 sm:p-4 flex items-start gap-3 text-left">
          <HelpCircle className="w-5 h-5 text-[#2178BD] shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-[#2178BD] font-medium leading-relaxed">
            <span className="font-bold">Referencia:</span> Por ejemplo, guardar agua de lluvia en un recipiente para usarla después.
          </p>
        </div>
      </div>
    </WaterQuestionLayout>
  );
}