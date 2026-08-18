import { useState } from 'react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

export function Question1People({ onNext, onBack, onExit }) {
  const [peopleCount, setPeopleCount] = useState(0);

  const handleIncrement = () => setPeopleCount((prev) => prev + 1);
  const handleDecrement = () => setPeopleCount((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={0}
      icon="/src/assets/images/house.png"
      onBack={onBack}
      onExit={onExit}
      onNext={() => onNext(peopleCount)}
      isNextDisabled={peopleCount === 0}
    >
      {/* Título de la pregunta */}
      <h2 className="text-xl sm:text-2xl font-black text-gray-800 leading-tight mb-1">
        ¿Cuántas personas viven en tu casa? (Incluyéndote)
      </h2>
      <p className="text-xs sm:text-sm text-gray-400 font-medium mb-6">
        Ingresa una cantidad
      </p>

      {/* Input de conteo de personas con flechas */}
      <div className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl p-4 flex items-center justify-between mb-2 shadow-sm">
        
        {/* Número y texto central */}
        <div className="flex-1 flex items-baseline justify-center gap-2 border-b-2 border-dashed border-gray-300 pb-1 mx-4">
          <span className="text-3xl sm:text-4xl font-black text-gray-800">
            {peopleCount}
          </span>
          <span className="text-sm sm:text-base font-semibold text-gray-400">
            personas
          </span>
        </div>

        {/* Botones de subida y bajada */}
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            onClick={handleIncrement}
            className="w-8 h-8 rounded-full bg-emerald-200 hover:bg-emerald-300 text-emerald-800 flex items-center justify-center transition active:scale-90 font-bold text-xs cursor-pointer shadow-sm"
          >
            ▲
          </button>
          <button
            type="button"
            onClick={handleDecrement}
            className="w-8 h-8 rounded-full bg-emerald-200 hover:bg-emerald-300 text-emerald-800 flex items-center justify-center transition active:scale-90 font-bold text-xs cursor-pointer shadow-sm"
          >
            ▼
          </button>
        </div>
      </div>
    </CarbonQuestionLayout>
  );
}