import { useState } from 'react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

const OPTIONS = [
  { value: 'foot', label: 'A pie', capacity: '(1 persona)', image: '/img/persona.png' },
  { value: 'car', label: 'Auto propio', capacity: '(4 pasajeros)', image: '/img/car_red.png' },
  { value: 'taxi', label: 'Taxi', capacity: '(1–4 pasajeros)', image: '/img/taxi.png' },
  { value: 'taxi_trufi', label: 'Taxi - Trufi', capacity: '(5–10 pasajeros)', image: '/img/taxi_big.png' },
  { value: 'trufi_grande', label: 'Trufi grande', capacity: '(11–20 pasajeros)', image: '/img/trufi_big.png' },
  { value: 'coaster', label: 'Coaster', capacity: '(15–20 pasajeros)', image: '/img/coaster.png' },
  { value: 'micro', label: 'Micro', capacity: '(20–30 pasajeros)', image: '/img/micro.png' },
  { value: 'moto', label: 'Moto', capacity: '(1–2 pasajeros)', image: '/img/moto.png' },
  { value: 'electric_car', label: 'Auto eléctrico', capacity: '(4 pasajeros)', image: '/img/car_electric.png' },
  { value: 'cable_car', label: 'Teleférico', capacity: '(8 pasajeros)', image: '/img/teleferico.png' },
];

// La pantalla 16 lo usa para mostrar el vehículo elegido en su ícono.
export const TRANSPORT_OPTIONS = OPTIONS;

export function Question15TypeTransport({
  onNext,
  onBack,
  onExit,
  initialValue = null,
}) {
  const [selected, setSelected] = useState(initialValue);

  const submit = () => {
    if (selected) onNext({ transportType: selected });
  };

  // Si queda una sola tarjeta en la última fila, se centra.
  const centerLast = OPTIONS.length % 3 === 1;

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={3}
      currentQuestionIndex={0}
      totalQuestionsInCategory={6}
      icon="/img/transporte.png"
      onBack={onBack}
      onExit={onExit}
      onNext={submit}
      isNextDisabled={!selected}
      nextText="Continuar"
    >
      <div className="flex flex-col items-center gap-6 w-full max-w-[686px] mx-auto">
        {/* Título */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 leading-tight font-quicksand">
            ¿Qué medio de transporte
            <br />
            usas con mayor frecuencia?
          </h2>
          <p className="mt-2 text-lg text-gray-500 font-quicksand">
            Selecciona una opción
          </p>
        </div>

        {/* Opciones (selección excluyente) */}
        <div
          role="radiogroup"
          aria-label="Medio de transporte"
          className="w-full grid grid-cols-3 gap-4"
        >
          {OPTIONS.map((option, index) => {
            const isSelected = selected === option.value;
            const isLastCentered = centerLast && index === OPTIONS.length - 1;

            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelected(option.value)}
                className={`relative h-[192px] flex flex-col items-center justify-center gap-3 rounded-xl border-2 bg-[#FAFAFA] px-2 py-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABA67]/50 ${
                  isLastCentered ? 'col-start-2' : ''
                } ${
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
                  className="h-14 max-w-[104px] w-auto object-contain"
                />
                <span className="text-base font-medium leading-6 tracking-[-0.02em] text-[#404040] font-quicksand text-center">
                  {option.label}
                  <br />
                  {option.capacity}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </CarbonQuestionLayout>
  );
}