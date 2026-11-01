import { useState } from 'react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

const OPTIONS = [
  { value: 1, label: '1 persona', image: '/img/car_one.png' },
  { value: 2, label: '2 personas', image: '/img/car_two.png' },
  { value: 3, label: '3 personas', image: '/img/car_three.png' },
  { value: 4, label: '4 personas', image: '/img/car_four.png' },
  { value: 5, label: 'Más de 4 personas', image: '/img/car_more.png' }, // 5 = "más de 4"
];

export function Question18CarOccupancy({
  onNext,
  onBack,
  onExit,
  initialValue = null,
  progress,
}) {
  const [selected, setSelected] = useState(initialValue);

  const submit = () => {
    if (selected) onNext({ carOccupancy: selected });
  };

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={3}
      currentQuestionIndex={3}
      totalQuestionsInCategory={6}
      {...progress}
      icon="/img/car_red.png"
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
            Si usas auto propio, ¿con cuántas personas te transportas?
          </h2>
          <p className="mt-2 text-lg text-gray-500 font-quicksand">
            Selecciona una opción
          </p>
        </div>

        {/* Opciones (2 columnas, espacio 24px) */}
        <div
          role="radiogroup"
          aria-label="Cantidad de personas en el auto"
          className="w-full grid grid-cols-2 gap-6"
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
                  className="h-16 w-auto object-contain"
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