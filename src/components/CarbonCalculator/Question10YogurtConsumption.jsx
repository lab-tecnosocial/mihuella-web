import { ChevronUp, ChevronDown, Lightbulb } from 'lucide-react';
import { CarbonQuestionLayout } from "./CarbonQuestionLayout";
import { useState } from 'react';

export function Question10YogurtConsumption({
  onNext,
  onBack,
  onExit,
  initialValue = 0,
}) {
  const [amount, setAmount] = useState(initialValue);

  const handleIncrement = () => {
    setAmount((prev) => parseFloat((prev + 0.1).toFixed(1)));
  };

  const handleDecrement = () => {
    setAmount((prev) => Math.max(0, parseFloat((prev - 0.1).toFixed(1))));
  };

  const handleChange = (e) => {
    const val = parseFloat(e.target.value);
    setAmount(isNaN(val) ? 0 : Math.max(0, val));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ yogurtConsumptionLt: amount });
  };

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={1} 
      currentQuestionIndex={2} 
      totalQuestionsInCategory={3}
      icon="/img/yogurt.webp" 
      onBack={onBack}
      onExit={onExit}
      onNext={() => onNext(amount)}
      isNextDisabled={false}
      nextText="Continuar"
    >
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
          ¿Cuántos litros de yogurt consumes a la semana?
        </h2>
        <p className="text-sm text-gray-500 mb-6">Ingresa una cantidad</p>

        <div className="w-full bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 flex items-center justify-between mb-4 shadow-sm">
          {/* Valor y Sufijo de Unidad */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex items-baseline justify-center gap-1 border-b-2 border-dashed border-gray-300 pb-1 px-4 w-full max-w-[200px]">
              <input
                type="number"
                step="0.1"
                min="0"
                value={amount === 0 ? "0.0" : amount}
                onChange={handleChange}
                className="text-3xl sm:text-4xl font-extrabold text-gray-600 text-center bg-transparent focus:outline-none w-28 font-quicksand"
              />
              <span className="text-sm sm:text-base font-semibold text-gray-400 font-quicksand">
                Lts
              </span>
            </div>

            {/* Texto aclaratorio */}
            <span className="text-[11px] sm:text-xs text-gray-400 font-medium mt-2 flex items-center gap-1">
              <span className="inline-block w-3.5 h-3.5 rounded-full border border-gray-400 text-gray-400 text-[9px] text-center leading-3">
                ?
              </span>
              Si no consumes yogurt escribe 0
            </span>
          </div>

          {/* Botones Incrementar / Decrementar */}
          <div className="flex flex-col gap-1.5 pl-2">
            <button
              type="button"
              onClick={handleIncrement}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#A0E6BA] hover:bg-[#8BD8A8] text-[#1E7B5C] flex items-center justify-center transition active:scale-95 shadow-xs cursor-pointer"
              aria-label="Aumentar litros de yogurt"
            >
              <ChevronUp className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#A0E6BA] hover:bg-[#8BD8A8] text-[#1E7B5C] flex items-center justify-center transition active:scale-95 shadow-xs cursor-pointer"
              aria-label="Disminuir kilos de queso"
            >
              <ChevronDown className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

       <div className="w-full bg-[#D8F3E5] border border-[#A0E6BA] rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 text-left">
          <div className="bg-[#3ABA67] text-white p-1 rounded-full shrink-0 mt-0.5">
            <Lightbulb className="w-3.5 h-3.5" />
          </div>
          <p className="text-[11px] sm:text-xs text-[#1E7B5C] font-semibold leading-relaxed font-quicksand">
            <span className="font-bold">Referencia:</span>  Una porción de yogurt equivale aproximadamente a <span className="font-semibold">0,2 Lt</span>. ¿Cuántas comiste esta semana?
          </p>
          <br/>
        </div>
      </form>
    </CarbonQuestionLayout>
  );
}