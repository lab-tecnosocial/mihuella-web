import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

export function Question15TransportDays({
  onNext,
  onBack,
  onExit,
  initialValue = 0,
}: {
  onNext: (value: { transportDays: number }) => void;
  onBack: () => void;
  onExit: () => void;
  initialValue?: number;
}) {
  const [days, setDays] = useState(initialValue);

  const handleIncrement = () => {
    setDays((prev) => Math.min(7, prev + 1));
  };

  const handleDecrement = () => {
    setDays((prev) => Math.max(0, prev - 1));
  };

  const handleChange = (e: { target: { value: string; }; }) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) setDays(0);
    else setDays(Math.min(7, Math.max(0, val)));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onNext({ transportDays: days });
  };

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={1} 
      currentQuestionIndex={2} 
      totalQuestionsInCategory={3}
      icon={'/img/trufi.webp'}
      onBack={onBack}
      onExit={onExit}
      onNext={() => onNext({ transportDays: days })}
      isNextDisabled={false}
      nextText="Continuar"
    >
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
          ¿Cuántos días a la semana usas este medio de transporte?
        </h2>
        <p className="text-sm text-gray-500 mb-6">Ingresa un valor</p>

        {/* Control Numérico */}
        <div className="relative w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between mb-6 shadow-sm">
        <div className="flex-1 flex items-baseline justify-center gap-2 border-b-2 border-dashed border-gray-300 pb-1 mx-4">
          <span className="text-3xl sm:text-4xl font-black text-gray-800">
            {days}
          </span>
          <span className="text-sm sm:text-base font-semibold text-gray-400">
            días
          </span>
        </div>

          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={handleIncrement}
              className="p-2 bg-[#3ABA67]-100 hover:bg-[#3ABA67]-200 text-[#3ABA67]-700 rounded-lg transition-colors"
            >
              <ChevronUp size={20} />
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              className="p-2 bg-[#3ABA67]-100 hover:bg-[#3ABA67]-200 text-[#3ABA67]-700 rounded-lg transition-colors"
            >
              <ChevronDown size={20} />
            </button>
          </div>
        </div>
      </form>
    </CarbonQuestionLayout>
  );
}
