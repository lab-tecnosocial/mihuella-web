import React, { useState } from "react";
import { ChevronUp, ChevronDown, Lightbulb } from "lucide-react";
import { CarbonQuestionLayout } from "./CarbonQuestionLayout";

export function Question5PorkConsumption({
  onNext,
  onBack,
  onExit,
  initialValue = 0.0,
}) {
  const [kgAmount, setKgAmount] = useState(initialValue);

  const handleIncrement = () => {
    setKgAmount((prev) => parseFloat((prev + 0.5).toFixed(1)));
  };

  const handleDecrement = () => {
    setKgAmount((prev) => {
      const nextVal = prev - 0.5;
      return nextVal < 0 ? 0 : parseFloat(nextVal.toFixed(1));
    });
  };

  const handleInputChange = (e) => {
    const val = parseFloat(e.target.value);
    if (isNaN(val)) {
      setKgAmount(0);
    } else {
      setKgAmount(val >= 0 ? val : 0);
    }
  };

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={1} // Categoría: Alimentos
      currentQuestionIndex={2} // Tercera sub-pregunta de la categoría
      totalQuestionsInCategory={3}
      icon="/img/bacon.webp" 
      onBack={onBack}
      onExit={onExit}
      onNext={() => onNext(kgAmount)}
      isNextDisabled={false}
      nextText="Continuar"
    >
      <div className="flex flex-col items-center w-full max-w-md mx-auto">
        {/* TÍTULO Y SUBTÍTULO */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug mb-1 text-center font-quicksand">
          ¿Cuántos kilos de carne de cerdo consumes en una semana?
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 font-medium mb-5 text-center font-quicksand">
          Ingresa una cantidad
        </p>

        {/* CAMPO DE ENTRADA CON FLECHAS */}
        <div className="w-full bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 flex items-center justify-between mb-4 shadow-sm">
          {/* Valor y Sufijo de Unidad */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex items-baseline justify-center gap-1 border-b-2 border-dashed border-gray-300 pb-1 px-4 w-full max-w-[200px]">
              <input
                type="number"
                step="0.1"
                min="0"
                value={kgAmount === 0 ? "0.0" : kgAmount}
                onChange={handleInputChange}
                className="text-3xl sm:text-4xl font-extrabold text-gray-600 text-center bg-transparent focus:outline-none w-28 font-quicksand"
              />
              <span className="text-sm sm:text-base font-semibold text-gray-400 font-quicksand">
                Kg
              </span>
            </div>

            {/* Texto aclaratorio */}
            <span className="text-[11px] sm:text-xs text-gray-400 font-medium mt-2 flex items-center gap-1">
              <span className="inline-block w-3.5 h-3.5 rounded-full border border-gray-400 text-gray-400 text-[9px] text-center leading-3">
                ?
              </span>
              Si no consumes carne escribe 0
            </span>
          </div>

          {/* Botones Incrementar / Decrementar */}
          <div className="flex flex-col gap-1.5 pl-2">
            <button
              type="button"
              onClick={handleIncrement}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#A0E6BA] hover:bg-[#8BD8A8] text-[#1E7B5C] flex items-center justify-center transition active:scale-95 shadow-xs cursor-pointer"
              aria-label="Aumentar kilos de carne de cerdo"
            >
              <ChevronUp className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#A0E6BA] hover:bg-[#8BD8A8] text-[#1E7B5C] flex items-center justify-center transition active:scale-95 shadow-xs cursor-pointer"
              aria-label="Disminuir kilos de carne de cerdo"
            >
              <ChevronDown className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* NOTA DE REFERENCIA Y AYUDA */}
        <div className="w-full bg-[#D8F3E5] border border-[#A0E6BA] rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 text-left">
          <div className="bg-[#3ABA67] text-white p-1 rounded-full shrink-0 mt-0.5">
            <Lightbulb className="w-3.5 h-3.5" />
          </div>
          <p className="text-[11px] sm:text-xs text-[#1E7B5C] font-semibold leading-relaxed font-quicksand">
            <span className="font-bold">Referencia:</span> Una chuleta de cerdo suele pesar 0,1 kg. ¿Cuántas comiste esta semana?
          </p>
        </div>
      </div>
    </CarbonQuestionLayout>
  );
}