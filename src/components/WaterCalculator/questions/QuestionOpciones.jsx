import { useState } from 'react';
import { WaterQuestionLayout } from '../WaterQuestionLayout';

// Pregunta de opción única. Con opciones booleanas (true/false) sirve para Sí/No.
export function QuestionOpciones({
  onNext,
  onBack,
  onExit,
  initialValue,
  answerKey,
  title,
  subtitle = 'Selecciona una opción',
  icon,
  options,
}) {
  const [selected, setSelected] = useState(initialValue);
  const tieneValor = selected !== undefined && selected !== null && selected !== '';

  const handleSubmit = () => {
    if (!tieneValor) return;
    onNext({ [answerKey]: selected });
  };

  return (
    <WaterQuestionLayout
      icon={icon}
      onBack={onBack}
      onExit={onExit}
      onNext={handleSubmit}
      isNextDisabled={!tieneValor}
      nextText="Continuar"
    >
      <div className="flex flex-col items-center text-center text-black w-full font-quicksand">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug mb-1">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 font-medium mb-5">{subtitle}</p>

        <div
          className={`w-full grid grid-cols-1 gap-4 max-w-md mx-auto ${
            options.length > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
          }`}
        >
          {options.map((option) => (
            <label
              key={String(option.id)}
              className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition ${
                selected === option.id
                  ? 'border-[#2178BD] bg-blue-50/50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              {option.icon && (
                <img
                  src={option.icon}
                  alt={option.label}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-2"
                />
              )}
              <span className="text-sm sm:text-base font-semibold text-gray-700 text-center leading-tight whitespace-pre-line">
                {option.label}
              </span>

              <input
                type="radio"
                name={answerKey}
                value={String(option.id)}
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
