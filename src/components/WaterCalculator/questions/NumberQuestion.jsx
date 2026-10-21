import { useState } from "react";
import { ChevronUp, ChevronDown, HelpCircle } from "lucide-react";
import { WaterQuestionLayout } from "../WaterQuestionLayout";

export function NumberQuestion({
  title,
  icon,
  unit,
  step = 1,
  min = 0,
  answerKey,
  reference,
  ariaLabel,
  onNext,
  onBack,
  onExit,
  initialValue = 0,
  nextText = "Continuar",
}) {
  const [value, setValue] = useState(initialValue);

  const handleIncrement = () => {
    setValue((prev) => prev + step);
  };

  const handleDecrement = () => {
    setValue((prev) => (prev - step < min ? min : prev - step));
  };

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) {
      setValue(min);
    } else {
      setValue(val >= min ? val : min);
    }
  };

  return (
    <WaterQuestionLayout
      icon={icon}
      onBack={onBack}
      onExit={onExit}
      onNext={() => onNext({ [answerKey]: value })}
      isNextDisabled={false}
      nextText={nextText}
    >
      <div className="flex flex-col items-center w-full max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug mb-1 text-center font-quicksand">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 font-medium mb-5 text-center font-quicksand">
          Ingresa una cantidad
        </p>

        <div className="w-full bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 grid grid-cols-[1fr_auto_1fr] items-center mb-4 shadow-sm">
          <div aria-hidden="true" />

          <div className="flex items-baseline justify-center gap-1 border-b-2 border-dashed border-gray-300 pb-1 px-4">
            <input
              type="number"
              min={min}
              value={value}
              onChange={handleInputChange}
              className="text-3xl sm:text-4xl font-extrabold text-gray-600 text-center bg-transparent focus:outline-none w-24 font-quicksand [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-sm sm:text-base font-semibold text-gray-400 font-quicksand">
              {unit}
            </span>
          </div>

          <div className="flex flex-col gap-1.5 justify-self-end pl-2">
            <button
              type="button"
              onClick={handleIncrement}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#90C8EF] hover:bg-[#72B7E5] text-[#124168] flex items-center justify-center transition active:scale-95 shadow-xs cursor-pointer"
              aria-label={`Aumentar ${ariaLabel || unit}`}
            >
              <ChevronUp className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#90C8EF] hover:bg-[#72B7E5] text-[#124168] flex items-center justify-center transition active:scale-95 shadow-xs cursor-pointer"
              aria-label={`Disminuir ${ariaLabel || unit}`}
            >
              <ChevronDown className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {reference && (
          <div className="w-full bg-[#DCEFEF] border border-[#BDE0E0] rounded-xl p-3 flex items-center gap-2 text-left">
            <HelpCircle className="w-4 h-4 text-[#2178BD] shrink-0" />
            <p className="text-[11px] sm:text-xs text-[#2178BD] font-medium leading-tight font-quicksand">
              <span className="font-bold">Referencia:</span> {reference}
            </p>
          </div>
        )}
      </div>
    </WaterQuestionLayout>
  );
}
