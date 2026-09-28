import React, { useState } from "react";
import { ChevronUp, ChevronDown, HelpCircle } from "lucide-react";
import { WaterQuestionLayout } from "../WaterQuestionLayout";

export function Question2WaterExpense({
  onNext,
  onBack,
  onExit,
  initialValue = 0,
}) {
  const [expenseBs, setExpenseBs] = useState(initialValue);

  const handleIncrement = () => {
    setExpenseBs((prev) => prev + 10);
  };

  const handleDecrement = () => {
    setExpenseBs((prev) => (prev - 10 < 0 ? 0 : prev - 10));
  };

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) {
      setExpenseBs(0);
    } else {
      setExpenseBs(val >= 0 ? val : 0);
    }
  };

  return (
    <WaterQuestionLayout
      currentCategoryIndex={0} // Categoría: General
      currentQuestionIndex={0}
      totalQuestionsInCategory={1}
      icon="/img/form_hidrica_gotita.webp" 
      onBack={onBack}
      onExit={onExit}
      onNext={() => onNext({ waterExpenseBs: expenseBs })}
      isNextDisabled={false}
      nextText="Continuar"
    >
      <div className="flex flex-col items-center w-full max-w-md mx-auto">
        {/* TÍTULO Y SUBTÍTULO */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug mb-1 text-center font-quicksand">
          ¿Cuál es tu gasto mensual aproximado en agua? En Bs
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 font-medium mb-5 text-center font-quicksand">
          Ingresa una cantidad
        </p>

        {/* CAMPO DE ENTRADA CON BOTONES DE INCREMENTO */}
        <div className="w-full bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 flex items-center justify-between mb-4 shadow-sm">
          <div className="flex-1 flex items-baseline justify-center gap-1 border-b-2 border-dashed border-gray-300 pb-1 px-4 max-w-[200px]">
            <input
              type="number"
              min="0"
              value={expenseBs}
              onChange={handleInputChange}
              className="text-3xl sm:text-4xl font-extrabold text-gray-600 text-center bg-transparent focus:outline-none w-24 font-quicksand"
            />
            <span className="text-sm sm:text-base font-semibold text-gray-400 font-quicksand">
              Bs
            </span>
          </div>

          <div className="flex flex-col gap-1.5 pl-2">
            <button
              type="button"
              onClick={handleIncrement}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#90C8EF] hover:bg-[#72B7E5] text-[#124168] flex items-center justify-center transition active:scale-95 shadow-xs cursor-pointer"
              aria-label="Aumentar gasto en Bs"
            >
              <ChevronUp className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#90C8EF] hover:bg-[#72B7E5] text-[#124168] flex items-center justify-center transition active:scale-95 shadow-xs cursor-pointer"
              aria-label="Disminuir gasto en Bs"
            >
              <ChevronDown className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* NOTA DE REFERENCIA Y AYUDA */}
        <div className="w-full bg-[#DCEFEF] border border-[#BDE0E0] rounded-xl p-3 flex items-center gap-2 text-left">
          <HelpCircle className="w-4 h-4 text-[#2178BD] shrink-0" />
          <p className="text-[11px] sm:text-xs text-[#2178BD] font-medium leading-tight font-quicksand">
            <span className="font-bold">Referencia:</span> Revisa tu factura de servicio de agua potable del último mes para colocar un dato preciso.
          </p>
        </div>
      </div>
    </WaterQuestionLayout>
  );
}