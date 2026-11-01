import { useState } from 'react';
import { ChevronUp, ChevronDown, Lightbulb } from 'lucide-react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

export function Question13bGarrafaQuantity({
  onNext,
  onBack,
  onExit,
  initialValue = 0,
}) {
  const [count, setCount] = useState(initialValue);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCount((prev) => Math.max(0, prev - 1));
  };

  const handleChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setCount(isNaN(val) ? 0 : Math.max(0, val));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ garrafaCount: count });
  };

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={2}
      currentQuestionIndex={3}
      totalQuestionsInCategory={3}
      icon="/img/gas-cylinder.webp"
      onBack={onBack}
      onExit={onExit}
      onNext={() => onNext({ garrafaCount: count })}
      isNextDisabled={false}
      nextText="Continuar"
    >
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-1">
          ¿Cuántas garrafas de gas utilizas al mes?
        </h2>
        <p className="text-sm text-gray-500 mb-6">Selecciona una opción</p>

        {/* Contador */}
        <div className="flex-1 flex flex-col items-center justify-center w-full mb-6">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 w-full flex items-center justify-between">
            <div className="flex-1 flex flex-col items-center pl-8">
              <div className="flex items-baseline justify-center gap-1 border-b-2 border-dashed border-gray-300 pb-1 px-4 w-full max-w-[180px]">
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={count}
                  onChange={handleChange}
                  className="text-3xl sm:text-4xl font-extrabold text-gray-600 text-center bg-transparent focus:outline-none w-24 font-quicksand"
                />
                <span className="text-sm sm:text-base font-semibold text-gray-400 font-quicksand">
                  unid
                </span>
              </div>

              {/* Aclaración */}
              <span className="text-[11px] sm:text-xs text-gray-400 font-medium mt-3 flex items-center gap-1">
                <span className="inline-block w-3.5 h-3.5 rounded-full border border-gray-400 text-gray-400 text-[9px] text-center leading-3">
                  ?
                </span>
                Si no usaste garrafas este mes escribe 0
              </span>
            </div>

            {/* Botones de incremento */}
            <div className="flex flex-col gap-1 pl-2">
              <button
                type="button"
                onClick={handleIncrement}
                className="p-1.5 rounded-full bg-[#A0E6BA] text-[#1E7B5C] hover:bg-[#83dca3] transition-colors"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleDecrement}
                className="p-1.5 rounded-full bg-[#A0E6BA] text-[#1E7B5C] hover:bg-[#83dca3] transition-colors"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mensaje de Referencia */}
        <div className="w-full bg-[#D8F3E5] border border-[#A0E6BA] rounded-xl p-3 sm:p-3.5 flex items-center gap-2.5 text-left">
          <div className="bg-[#3ABA67] text-white p-1 rounded-full shrink-0">
            <Lightbulb className="w-3.5 h-3.5" />
          </div>
          <p className="text-[11px] sm:text-xs text-[#1E7B5C] font-semibold leading-relaxed font-quicksand">
            <span className="font-bold">Referencia:</span> Una garrafa suele durar 2 semanas en un hogar de 4 a 5 personas. ¿Cuántas usaron este mes?
          </p>
        </div>
      </form>
    </CarbonQuestionLayout>
  );
}