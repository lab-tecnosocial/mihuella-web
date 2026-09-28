import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { WaterQuestionLayout } from "../WaterQuestionLayout";

const DRINK_METADATA = {
  te: { label: "Té", image: "/img/tea.webp" },
  cafe: { label: "Café", image: "/img/cofeee.webp" },
  leche: { label: "Leche", image: "/img/milk.webp" },
  jugos: { label: "Jugos", image: "/img/orange-juice.webp" },
  gaseosa: { label: "Gaseosas", image: "/img/soda.webp" },
  otro: { label: "Otro", image: "/img/three-dots.webp" },
};

export function Question19DrinkAmounts({
  onNext,
  onBack,
  onExit,
  selectedDrinks = [], // Bebidas seleccionadas en la pregunta 18
  initialValue = {},
}) {
  const activeDrinks = selectedDrinks.filter((id) => id !== "ninguno");

  const [amounts, setAmounts] = useState(() => {
    const initial = {};
    activeDrinks.forEach((id) => {
      initial[id] = initialValue[id] !== undefined ? initialValue[id] : 0.0;
    });
    return initial;
  });

  const handleIncrement = (id) => {
    setAmounts((prev) => ({
      ...prev,
      [id]: parseFloat(((prev[id] || 0) + 0.5).toFixed(1)),
    }));
  };

  const handleDecrement = (id) => {
    setAmounts((prev) => ({
      ...prev,
      [id]: Math.max(0, parseFloat(((prev[id] || 0) - 0.5).toFixed(1))),
    }));
  };

  const handleInputChange = (id, valStr) => {
    const val = parseFloat(valStr);
    setAmounts((prev) => ({
      ...prev,
      [id]: isNaN(val) || val < 0 ? 0 : val,
    }));
  };

  return (
    <WaterQuestionLayout
      currentCategoryIndex={3} // Categoría: Dieta
      currentQuestionIndex={7}
      totalQuestionsInCategory={7}
      icon="/img/drinks-icon.webp"
      onBack={onBack}
      onExit={onExit}
      onNext={() => onNext({ drinkAmounts: amounts })}
      isNextDisabled={false}
      nextText="Continuar"
    >
      <div className="flex flex-col items-center w-full max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug mb-1 text-center font-quicksand">
          Indica tu consumo semanal
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 font-medium mb-6 text-center font-quicksand">
          Ingresa las cantidades
        </p>

        {/* LISTADO DINÁMICO DE BEBIDAS SELECCIONADAS */}
        <div className="w-full flex flex-col gap-4 mb-6">
          {activeDrinks.map((id) => {
            const meta = DRINK_METADATA[id] || {
              label: id,
              image: "/img/otro.webp",
            };
            const value = amounts[id] !== undefined ? amounts[id] : 0;

            return (
              <div
                key={id}
                className="flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
                    <img
                      src={meta.image}
                      alt={meta.label}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700 font-quicksand">
                    {meta.label}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDecrement(id)}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#90C8EF] hover:bg-[#72B7E5] text-[#124168] flex items-center justify-center transition active:scale-95 cursor-pointer"
                    aria-label={`Disminuir ${meta.label}`}
                  >
                    <Minus className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  <div className="bg-white border border-gray-200 rounded-lg px-2 py-1 flex items-center gap-1 w-20 sm:w-24 justify-center shadow-xs">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={value}
                      onChange={(e) => handleInputChange(id, e.target.value)}
                      className="w-10 text-center font-bold text-gray-700 text-sm focus:outline-none font-quicksand"
                    />
                    <span className="text-xs text-gray-400 font-medium font-quicksand">
                      kg
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleIncrement(id)}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#90C8EF] hover:bg-[#72B7E5] text-[#124168] flex items-center justify-center transition active:scale-95 cursor-pointer"
                    aria-label={`Aumentar ${meta.label}`}
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </WaterQuestionLayout>
  );
}