import React, { useState } from 'react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

type Question17CarOccupantsProps = {
  onNext: (value: { carOccupants: number }) => void;
  onBack: () => void;
  onExit: () => void;
  initialValue?: number;
};

const OCCUPANT_OPTIONS = [
  { id: '1', label: '1 persona', value: 1 },
  { id: '2', label: '2 personas', value: 2 },
  { id: '3', label: '3 personas', value: 3 },
  { id: '4', label: '4 personas', value: 4 },
  { id: 'more_4', label: 'Más de 4 personas', value: 5 },
];

export function Question17CarOccupants({
  onNext,
  onBack,
  onExit,
  initialValue = 1,
}: Question17CarOccupantsProps) {
  const [occupants, setOccupants] = useState(initialValue);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onNext({ carOccupants: occupants });
  };

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={3}
      icon={'/img/car.webp'}
      onBack={onBack}
      onExit={onExit}
    >
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-1">
          Si usas auto propio, ¿con cuántas personas te transportas?
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mb-5">Selecciona una opción</p>

        {/* Opciones en rejilla (Grid) */}
        <div className="grid grid-cols-2 gap-3 w-full mb-6">
          {OCCUPANT_OPTIONS.map((option) => {
            const isSelected = occupants === option.value;
            return (
              <div
                key={option.id}
                onClick={() => setOccupants(option.value)}
                className={`cursor-pointer rounded-2xl p-3 border-2 transition-all flex flex-col items-center justify-between text-center relative bg-white min-h-[90px] ${
                  isSelected
                    ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-gray-200 hover:border-gray-300'
                } ${option.id === 'more_4' ? 'col-span-2' : ''}`}
              >
                {/* Radio Circle */}
                <div className="absolute top-3 right-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-500'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>

                <span className="text-emerald-600 font-extrabold text-lg mt-1">
                  {option.id === 'more_4' ? '+4' : option.value}
                </span>
                <span className="text-xs text-gray-600 font-medium">{option.label}</span>
              </div>
            );
          })}
        </div>

        {/* Botón de Continuar */}
        <button
          type="submit"
          className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          Continuar →
        </button>
      </form>
    </CarbonQuestionLayout>
  );
}	
