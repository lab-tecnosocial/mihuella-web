import { useState } from 'react';
import { WaterQuestionLayout } from '../WaterQuestionLayout';

const ORIGIN_OPTIONS = [
  { id: 'red', label: 'Agua potable por red', icon: '/img/potable-red.webp' },
  { id: 'pileta', label: 'Pileta pública', icon: '/img/pileta-publica.webp' },
  { id: 'camion', label: 'Cisterna o camión repartidor', icon: '/img/cisterna-hidrica.webp' },
  { id: 'pozo', label: 'Pozo propio', icon: '/img/pozo.webp' },
  { id: 'rio', label: 'Río o vertiente', icon: '/img/rio-vertiente.webp' },
  { id: 'otro', label: 'Otro', icon: '/img/hidrica-bs.webp' }, // ✅ usas hidrica-bs.webp
];

export function Question1Origin({ onNext, onBack, onExit, initialValue = '' }) {
  const [selected, setSelected] = useState(initialValue);

  const handleSubmit = () => {
    if (!selected) return;
    onNext({ origin: selected });
  };

  return (
    <WaterQuestionLayout
      currentCategoryIndex={0}
      currentQuestionIndex={0}
      totalQuestionsInCategory={1}
      icon="/img/hidrica-bs.webp" // ✅ icono de la pregunta
      onBack={onBack}
      onExit={onExit}
      onNext={handleSubmit}
      isNextDisabled={!selected}
      nextText="Continuar"
    >
      <div className="flex flex-col items-center text-center text-black w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
          ¿Cuál es la fuente principal de agua en tu hogar?
        </h2>
        <p className="text-sm text-gray-500 mb-5">Selecciona una opción</p>

        <div className="w-full grid grid-cols-2 gap-3">
          {ORIGIN_OPTIONS.map((option) => (
            <label
              key={option.id}
              className={`relative flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition ${
                selected === option.id
                  ? 'border-[#2178BD] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={option.icon}
                alt={option.label}
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain mb-1"
              />
              <span className="text-sm sm:text-base font-medium text-gray-700 text-center leading-tight">
                {option.label}
              </span>
              {/* Radio button visible en esquina superior derecha */}
              <input
                type="radio"
                name="origin"
                value={option.id}
                checked={selected === option.id}
                onChange={() => setSelected(option.id)}
                className="absolute top-2 right-2 w-4 h-4 text-[#2178BD] focus:ring-[#2178BD]"
              />
            </label>
          ))}
        </div>
      </div>
    </WaterQuestionLayout>
  );
}