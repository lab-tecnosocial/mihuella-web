import { useState } from 'react';
import { Check } from 'lucide-react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

const OPTIONS = [
  { value: 'common', label: 'Residuos comunes', image: '/img/trash.png' },
  { value: 'organic', label: 'Residuos orgánicos', image: '/img/residuos_organicos.png' },
  { value: 'paper', label: 'Papel y cartón', image: '/img/papel_carton.png' },
  { value: 'plastic', label: 'Plástico', image: '/img/plastico.png' },
];

export function Question22WasteTypes({
  onNext,
  onBack,
  onExit,
  initialValue = [],
  progress,
}) {
  const [selected, setSelected] = useState(
    Array.isArray(initialValue) ? initialValue : []
  );

  const toggle = (value) =>
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

  // Mantiene el orden de OPTIONS al guardar
  const submit = () => {
    if (selected.length > 0) {
      onNext({ wasteTypes: OPTIONS.map((o) => o.value).filter((v) => selected.includes(v)) });
    }
  };

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={4}
      currentQuestionIndex={1}
      totalQuestionsInCategory={3}
      {...progress}
      icon="/img/residuos.png"
      onBack={onBack}
      onExit={onExit}
      onNext={submit}
      isNextDisabled={selected.length === 0}
      nextText="Continuar"
    >
      <div className="flex flex-col items-center gap-6 w-full max-w-[470px] mx-auto">
        {/* Título */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 leading-tight font-quicksand">
            Indica los residuos que separas
          </h2>
          <p className="mt-2 text-lg text-gray-500 font-quicksand">
            Selecciona las opciones
          </p>
        </div>

        {/* Opciones (2 x 2, espacio 24px) */}
        <div
          role="group"
          aria-label="Residuos que separas"
          className="w-full grid grid-cols-2 gap-6"
        >
          {OPTIONS.map((option) => {
            const isSelected = selected.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                role="checkbox"
                aria-checked={isSelected}
                onClick={() => toggle(option.value)}
                className={`relative h-[192px] flex flex-col items-center justify-center gap-3 rounded-xl border-2 bg-[#FAFAFA] px-4 py-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABA67]/50 ${
                  isSelected ? 'border-[#3ABA67]' : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {/* Casilla */}
                <span
                  className={`absolute top-3 right-3 w-[22px] h-[22px] rounded-[4px] border-2 flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-[#3ABA67] border-[#3ABA67]' : 'bg-white border-gray-300'
                  }`}
                >
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  )}
                </span>

                <img
                  src={option.image}
                  alt=""
                  width="80"
                  height="80"
                  className="w-20 h-20 object-contain"
                />
                <span className="text-base font-medium leading-6 tracking-[-0.02em] text-[#404040] font-quicksand text-center">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </CarbonQuestionLayout>
  );
}