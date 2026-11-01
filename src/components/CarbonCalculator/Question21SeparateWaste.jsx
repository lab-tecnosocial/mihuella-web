import { useState } from 'react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

const OPTIONS = [
  { value: true, label: 'Sí, los separo por tipo', image: '/img/check_recyclar.png' },
  { value: false, label: 'No, los desecho juntos', image: '/img/negatico_recyclar.png' },
];

export function Question21SeparateWaste({
  onNext,
  onBack,
  onExit,
  initialValue = null,
  progress,
}) {
  // true = separa, false = no separa, null = sin responder
  const [selected, setSelected] = useState(initialValue);

  const submit = () => {
    if (selected !== null) onNext({ separatesWaste: selected });
  };

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={4}
      currentQuestionIndex={0}
      totalQuestionsInCategory={3}
      {...progress}
      icon="/img/icono_recyclar.png"
      onBack={onBack}
      onExit={onExit}
      onNext={submit}
      isNextDisabled={selected === null}
      nextText="Continuar"
    >
      <div className="flex flex-col items-center gap-6 w-full max-w-[470px] mx-auto">
        {/* Título */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 leading-tight font-quicksand">
            ¿Separas los residuos
            <br />
            en tu hogar?
          </h2>
          <p className="mt-2 text-lg text-gray-500 font-quicksand">
            Selecciona una opción
          </p>
        </div>

        {/* Opciones (2 columnas, espacio 24px) */}
        <div
          role="radiogroup"
          aria-label="¿Separas los residuos?"
          className="w-full grid grid-cols-2 gap-6"
        >
          {OPTIONS.map((option) => {
            const isSelected = selected === option.value;
            return (
              <button
                key={String(option.value)}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelected(option.value)}
                className={`relative h-[168px] flex flex-col items-center justify-center gap-3 rounded-xl border-2 bg-[#FAFAFA] px-2 py-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABA67]/50 ${
                  isSelected ? 'border-[#3ABA67]' : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {/* Radio */}
                <span
                  className={`absolute top-3 right-3 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-[#3ABA67] border-[#3ABA67]' : 'bg-white border-gray-300'
                  }`}
                >
                  {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                </span>

                <img
                  src={option.image}
                  alt=""
                  width="72"
                  height="72"
                  className="h-[72px] w-auto object-contain"
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