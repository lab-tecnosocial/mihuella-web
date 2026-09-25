import { ChevronUp, ChevronDown, Lightbulb } from 'lucide-react';
import { CarbonQuestionLayout } from "./CarbonQuestionLayout";
import { useState } from 'react';

export function Question11FruitsConsumption({
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
    onNext({ fruitsAndVegetablesKg: amount });
  };

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={1} 
      currentQuestionIndex={2} 
      totalQuestionsInCategory={3}
      icon="/img/apple-and-carrot.webp" 
      onBack={onBack}
      onExit={onExit}
      onNext={() => onNext(amount)}
      isNextDisabled={false}
      nextText="Continuar"
    >
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
          ¿Cuántos kilos de fruta y verduras consumes a la semana?
        </h2>
        <p className="text-sm text-gray-500 mb-6">Ingresa una cantidad</p>

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
              Si no consumes ni frutas ni verduras escribe 0
            </span>
          </div>

      <div className="w-full bg-[#D8F3E5] border border-[#A0E6BA] rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 text-left">
          <div className="bg-[#3ABA67] text-white p-1 rounded-full shrink-0 mt-0.5">
            <Lightbulb className="w-3.5 h-3.5" />
          </div>
          <p className="text-[11px] sm:text-xs text-[#1E7B5C] font-semibold leading-relaxed font-quicksand">
            <span className="font-bold">Referencia:</span> Una fruta mediana pesa aprox. <span className="font-semibold">0,15 kg</span> Cuenta tus porciones de la semana.
          </p>
          <br/>
        </div>
      </form>
    </CarbonQuestionLayout>
  );
}