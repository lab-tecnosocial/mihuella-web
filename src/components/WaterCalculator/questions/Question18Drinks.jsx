import { useState } from "react";
import { Check } from "lucide-react";
import { WaterQuestionLayout } from "../WaterQuestionLayout";

const DRINK_OPTIONS = [
  { id: "te", label: "Té", unit: "Lt/semana", image: "/img/tea.webp" },
  { id: "cafe", label: "Café", unit: "Lt/semana", image: "/img/coffeee.webp" },
  { id: "leche", label: "Leche", unit: "Lt/semana", image: "/img/milk.webp" },
  { id: "jugos", label: "Jugos", unit: "Lt/semana", image: "/img/orange-juice.webp" },
  { id: "gaseosa", label: "Gaseosa", unit: "Lt/semana", image: "/img/soda.webp" },
  { id: "ninguno", label: "Ninguno", unit: "", image: "/img/none.webp" },
  { id: "otro", label: "Otro", unit: "Lt/semana", image: "/img/three_dots.webp"},
];

export function Question18Drinks({
  onNext,
  onBack,
  onExit,
  initialValue = [],
}) {
  const [selectedDrinks, setSelectedDrinks] = useState(initialValue);

  const toggleOption = (id) => {
    if (id === "ninguno") {
      setSelectedDrinks(["ninguno"]);
      return;
    }

    setSelectedDrinks((prev) => {
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
      currentQuestionIndex={6}
      totalQuestionsInCategory={7}
      icon="/img/drinks-icon.webp"
      onBack={onBack}
      onExit={onExit}
      onNext={() => onNext({ drinks: selectedDrinks })}
      isNextDisabled={selectedDrinks.length === 0}
      nextText="Continuar"
    >
      <div className="flex flex-col items-center w-full max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug mb-1 text-center font-quicksand">
          ¿Qué tipo de bebidas includes en tu alimentación habitual?
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 font-medium mb-5 text-center font-quicksand">
          Selecciona todas las que consumes
        </p>

        {/* REJILLA DE OPCIONES */}
        <div className="grid grid-cols-2 gap-3 w-full mb-2">
          {DRINK_OPTIONS.map((option) => {
            const isSelected = selectedDrinks.includes(option.id);

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
                <div
                  className={`absolute top-2.5 right-2.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-[#2178BD] text-white"
                      : "border-2 border-gray-300 bg-white"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="w-12 h-12 sm:w-14 sm:h-14 mb-2 flex items-center justify-center">
                  <img
                    src={option.image}
                    alt={option.label}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

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