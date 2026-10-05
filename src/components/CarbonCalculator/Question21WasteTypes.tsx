import { useState } from 'react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';


const WASTE_TYPES = [
  { id: 'comunes', label: 'Residuos comunes', icon: '/img/garbage-black-bag.webp' },
  { id: 'organicos', label: 'Residuos orgánicos', icon: '/img/garbage-fruits.webp' },
  { id: 'papel', label: 'Papel y cartón', icon: '/img/carton.webp' },
  { id: 'plasticos', label: 'Plásticos', icon: '/img/bottles.webp' },
];

export function Question21WasteTypes({
  onNext,
  onBack,
  onExit,
  initialValue = [],
}: {
  onNext: (value: { wasteTypes: string[] }) => void;
  onBack: () => void;
  onExit: () => void;
  initialValue?: string[];
}) {
  const [selectedTypes, setSelectedTypes] = useState(initialValue);

  const toggleType = (id: string) => {
    setSelectedTypes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onNext({ wasteTypes: selectedTypes });
  };

  return (
    <CarbonQuestionLayout

      currentCategoryIndex={4}
      icon={'/img/basurero.webp'}
      onBack={onBack}
      onExit={onExit}
      onNext={() => onNext({ wasteTypes: selectedTypes })}
      isNextDisabled={false}
      nextText="Continuar"
    >
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
          Indica los residuos que separas
        </h2>
        <p className="text-sm text-gray-500 mb-6">Selecciona las opciones</p>

        <div className="grid grid-cols-2 gap-4 w-full mb-6">
          {WASTE_TYPES.map((item) => {
            const isSelected = selectedTypes.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleType(item.id)}
                className={`cursor-pointer rounded-2xl p-4 border-2 transition-all flex flex-col items-center justify-center text-center relative bg-white min-h-[120px] ${isSelected
                    ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : 'border-gray-200 hover:border-gray-300'
                  }`}
              >
                <div className="absolute top-3 right-3">
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${isSelected
                        ? 'border-emerald-500 bg-emerald-500 text-white'
                        : 'border-gray-300 bg-white'
                      }`}
                  >
                    {isSelected && (
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                      </svg>
                    )}
                  </div>
                </div>

                <img src={item.icon} alt="" className="h-10 w-10 object-contain" />
                <span className="text-sm font-semibold text-gray-700 mt-2">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </form>
    </CarbonQuestionLayout>
  );
}