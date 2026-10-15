import { useState, type FormEvent } from 'react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

const TRANSPORT_OPTIONS = [
  { id: 'pie', label: 'A pie', subtext: '(1 persona)', image: '/img/person.webp' },
  { id: 'auto_propio', label: 'Auto propio', subtext: '(4 pasajeros)', image: '/img/car.webp' },
  { id: 'taxi', label: 'Taxi', subtext: '(1-4 pasajeros)', image: '/img/taxi.webp' },
  { id: 'taxi_trufi', label: 'Taxi - Trufi', subtext: '(5-10 pasajeros)', image: '/img/taxitrufi.webp' },
  { id: 'trufi_grande', label: 'Trufi grande', subtext: '(11-20 pasajeros)', image: '/img/taxitrufi.webp' },
  { id: 'coaster', label: 'Coaster', subtext: '(15-20 pasajeros)', image: '/img/trufi.webp' },
  { id: 'micro', label: 'Micro', subtext: '(20-30 pasajeros)', image: '/img/micro.webp' },
  { id: 'moto', label: 'Moto', subtext: '(1-2 pasajeros)', image: '/img/moto.webp' },
  { id: 'auto_electrico', label: 'Auto eléctrico', subtext: '(4 pasajeros)', image: '/img/electric-car.webp' },
  { id: 'teleferico', label: 'Teleférico', subtext: '(8 pasajeros)', image: '/img/teleferico.webp' },
];

export function Question14TransportMode({
  onNext,
  onBack,
  onExit,
  initialValue = '',
}: {
  onNext: (value: { transportMode: string }) => void;
  onBack: () => void;
  onExit: () => void;
  initialValue?: string;
}) {
  const [selectedTransport, setSelectedTransport] = useState(initialValue);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedTransport) {
      onNext({ transportMode: selectedTransport });
    }
  };

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={1}
      currentQuestionIndex={2}
      totalQuestionsInCategory={3}
      icon="/img/transporte-icon.webp"
      onBack={onBack}
      onExit={onExit}
      onNext={() => onNext(selectedTransport ? { transportMode: selectedTransport } : { transportMode: '' })}
      isNextDisabled={false}
      nextText="Continuar"
    >
      <style>{`main > div:has(.transport-mode-question) { width: 65vw; max-width: none; }`}</style>
      <form onSubmit={handleSubmit} className="transport-mode-question flex flex-col items-center w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-1">
          ¿Qué medio de transporte usas con mayor frecuencia?
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mb-5">Selecciona una opción</p>

        {/* Carrusel/Scroll horizontal con las opciones */}
        <div className="w-full overflow-x-auto pb-4 pt-1 px-1 flex gap-3 no-scrollbar scroll-smooth">
          {TRANSPORT_OPTIONS.map((option) => {
            const isSelected = selectedTransport === option.id;
            return (
              <div
                key={option.id}
                onClick={() => setSelectedTransport(option.id)}
                className={`min-w-[130px] sm:min-w-[140px] flex-shrink-0 cursor-pointer rounded-2xl p-4 border-2 transition-all flex flex-col items-center justify-between text-center relative bg-white ${isSelected
                    ? 'border-[#3ABA67] -500 shadow-md ring-2 ring-[#3ABA67] -500/20'
                    : 'border-gray-200 hover:border-gray-300'
                  }`}
              >
                {/* Radio Button indicador */}
                <div className="absolute top-3 right-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected
                        ? 'border-[#3ABA67] -500 bg-[#3ABA67] -500'
                        : 'border-gray-300 bg-white'
                      }`}
                  >
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                </div>

                {/* Ícono de la opción */}
                <img
                  src={option.image}
                  alt=""
                  className="h-12 w-12 object-contain my-2"
                />

                {/* Texto principal y secundario */}
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-tight">
                    {option.label}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                    {option.subtext}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </form>
    </CarbonQuestionLayout>
  );
}