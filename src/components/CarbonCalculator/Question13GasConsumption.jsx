import { useState } from 'react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

const OPTIONS = [
  {
    value: 'domicilio',
    label: 'Gas a domicilio',
    image: '/img/casa_domicilio.png',
  },
  {
    value: 'garrafa',
    label: 'Garrafa de GLP',
    image: '/img/gas_naranja.png',
  },
];

export function Question13GasConsumption({
  onNext,
  onBack,
  onExit,
  initialValue = null,
}) {
  const [selected, setSelected] = useState(initialValue);

  const submit = () => {
    if (selected) onNext({ gasType: selected });
  };

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={2}
      currentQuestionIndex={1}
      totalQuestionsInCategory={3}
      icon="/img/luz_azul.png"
      onBack={onBack}
      onExit={onExit}
      onNext={submit}
      isNextDisabled={!selected}
      nextText="Continuar"
    >
      <div className="flex flex-col items-center gap-6 w-full max-w-[470px] mx-auto">
        {/* Título */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 leading-tight font-quicksand">
            Indica el tipo de suministro de gas que utilizas en casa
          </h2>
          <p className="mt-2 text-lg text-gray-500 font-quicksand">
            Selecciona una opción
          </p>
        </div>

        {/* Opciones (selección excluyente) */}
        <div
          role="radiogroup"
          aria-label="Tipo de suministro de gas"
          className="w-full flex gap-6"
        >
          {OPTIONS.map((option) => {
            const isSelected = selected === option.value;

            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelected(option.value)}
                className={`relative flex-1 h-[168px] flex flex-col items-center justify-center gap-3 rounded-xl border-2 bg-[#FAFAFA] px-2 py-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABA67]/50 ${
                  isSelected
                    ? 'border-[#3ABA67]'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {/* Radio */}
                <span
                  className={`absolute top-3 right-3 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-[#3ABA67] border-[#3ABA67]'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-white" />
                  )}
                </span>

                <img
                  src={option.image}
                  alt=""
                  className="h-16 w-auto object-contain"
                />
                <span className="text-base font-medium text-[#404040] font-quicksand">
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