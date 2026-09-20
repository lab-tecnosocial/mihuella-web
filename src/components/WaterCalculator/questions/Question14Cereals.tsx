import { useState } from "react";
import { Check } from "lucide-react";
import { WaterQuestionLayout } from "../WaterQuestionLayout";

const CEREAL_OPTIONS = [
  { id: "arroz", label: "Arroz", unit: "Kg/semana", image: "/img/rice.webp" },
  { id: "fideo", label: "Fideo", unit: "Kg/semana", image: "/img/pasta.webp" },
  { id: "avena", label: "Avena", unit: "Kg/semana", image: "/img/avena.webp" },
  { id: "quinua", label: "Quinua", unit: "Kg/semana", image: "/img/quinua.webp" },
  { id: "pan", label: "Pan", unit: "Kg/semana", image: "/img/bread.webp" },
  { id: "maiz", label: "Maíz", unit: "Kg/semana", image: "/img/corn.webp" },
  { id: "ninguno", label: "Ninguno", unit: "", image: "/img/none.webp" },
  { id: "otro", label: "Otro", unit: "", image: "/img/three_dots.webp" },
] as const;

type CerealId = (typeof CEREAL_OPTIONS)[number]["id"];

type Question14CerealsProps = {
  onNext: (value: { cereals: string[] }) => void;
  onBack: () => void;
  onExit: () => void;
  initialValue?: string[];
};

export function Question14Cereals({
  onNext,
  onBack,
  onExit,
  initialValue = [],
}: Question14CerealsProps) {
  const [selectedCereals, setSelectedCereals] = useState<string[]>(initialValue);

  const toggleOption = (id: CerealId | string) => {
    if (id === "ninguno") {
      setSelectedCereals(["ninguno"]);
      return;
    }

    setSelectedCereals((prev) => {
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
      currentQuestionIndex={2}
      totalQuestionsInCategory={4}
      icon="/img/dieta-icon.webp"
      onBack={onBack}
      onExit={onExit}
      onNext={() => onNext({ cereals: selectedCereals })}
      isNextDisabled={selectedCereals.length === 0}
      nextText="Continuar"
    >
      <div className="flex flex-col items-center w-full max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug mb-1 text-center font-quicksand">
          ¿Qué tipo de cereales incluyes en tu alimentación habitual?
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 font-medium mb-5 text-center font-quicksand">
          Selecciona todas las que consumes
        </p>

        {/* REJILLA DE OPCIONES (2 COLUMNAS) */}
        <div className="grid grid-cols-2 gap-3 w-full mb-2">
          {CEREAL_OPTIONS.map((option) => {
            const isSelected = selectedCereals.includes(option.id);

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