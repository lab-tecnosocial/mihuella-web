import React, { useState } from 'react';
import { WaterQuestionLayout } from '../WaterQuestionLayout';

const TOILET_OPTIONS = [
  { id: 'tradicional', label: 'Tradicional', icon: '/img/inodoro-tradicional.webp' },
  { id: 'ahorrador', label: 'Ahorrador\n(doble botón)', icon: '/img/inodoro-ahorrador.webp' },
];

export function Question7ToiletType({ onNext, onBack, onExit, initialValue = '' }) {
  const [selected, setSelected] = useState(initialValue);

  const handleSubmit = () => {
    if (!selected) return;
    onNext({ toiletType: selected });
  };

  return (
    <WaterQuestionLayout
      currentCategoryIndex={1}
      currentQuestionIndex={4}
      totalQuestionsInCategory={5}
      icon="/img/toilet.webp"
      onBack={onBack}
      onExit={onExit}
      onNext={handleSubmit}
      isNextDisabled={!selected}
      nextText="Continuar"
    >
      <div className="flex flex-col items-center text-center text-black w-full font-quicksand">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug mb-1">
          ¿Qué tipo de inodoro usas en tu hogar?
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 font-medium mb-5">
          Selecciona una opción
        </p>

        <div className="w-full grid grid-cols-2 gap-4 max-w-md mx-auto">
          {TOILET_OPTIONS.map((option) => (
            <label
              key={option.id}
              className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition ${
                selected === option.id
                  ? 'border-[#2178BD] bg-blue-50/50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <img
                src={option.icon}
                alt={option.label}
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-2"
              />
              <span className="text-sm sm:text-base font-semibold text-gray-700 text-center leading-tight whitespace-pre-line">
                {option.label}
              </span>

              <input
                type="radio"
                name="toiletType"
                value={option.id}
                checked={selected === option.id}
                onChange={() => setSelected(option.id)}
                className="absolute top-3 right-3 w-5 h-5 text-[#2178BD] focus:ring-[#2178BD]"
              />
            </label>
          ))}
        </div>
      </div>
    </WaterQuestionLayout>
  );
}