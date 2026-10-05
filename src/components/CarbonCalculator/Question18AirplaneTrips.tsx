import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Lightbulb, HelpCircle } from 'lucide-react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

type Question18AirplaneTripsProps = {
  onNext: (value: { airplaneTrips: number }) => void;
  onBack: () => void;
  onExit: () => void;
  initialValue?: number;
};

export function Question18AirplaneTrips({
  onNext,
  onBack,
  onExit,
  initialValue = 0,
}: Question18AirplaneTripsProps) {
  const [trips, setTrips] = useState(initialValue);

  const handleIncrement = () => {
    setTrips((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setTrips((prev) => Math.max(0, prev - 1));
  };

  const handleChange = (e: { target: { value: string; }; }) => {
    const val = parseInt(e.target.value, 10);
    setTrips(isNaN(val) ? 0 : Math.max(0, val));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onNext({ airplaneTrips: trips });
  };

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={3}
      icon={'/img/airplane.webp'}
      onBack={onBack}
      onExit={onExit}
      onNext={() => onNext({ airplaneTrips: trips })}
      isNextDisabled={false}
      nextText="Continuar"
    >
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
          ¿Cuántos viajes en avión realizas al año?
        </h2>
        <p className="text-sm text-gray-500 mb-6">Ingresa una cantidad</p>

        {/* Control Numérico */}
        <div className="relative w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between mb-2 shadow-sm">
          <div className="flex-1 flex flex-col items-center pl-8">
            <div className="flex-1 flex items-baseline justify-center gap-2 border-b-2 border-dashed border-gray-300 pb-1 mx-4">
              <span className="text-3xl sm:text-4xl font-black text-gray-800">
                {trips}
              </span>
              <span className="text-sm sm:text-base font-semibold text-gray-400">
                viajes
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
              <HelpCircle size={12} />
              <span>Considera un recorrido de ida y vuelta</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={handleIncrement}
              className="p-2 bg-[#3ABA67]-100 hover:bg-[#3ABA67]-200 text-[#3ABA67]-700 rounded-lg transition-colors"
            >
              <ChevronUp size={20} />
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              className="p-2 bg-[#3ABA67]-100 hover:bg-[#3ABA67]-200 text-[#3ABA67]-700 rounded-lg transition-colors"
            >
              <ChevronDown size={20} />
            </button>
          </div>
        </div>

        {/* Cuadro de Referencia */}
        <div className="w-full bg-[#D8F3E5] border border-[#A0E6BA] rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 text-left">
          <div className="bg-[#3ABA67] text-white p-1 rounded-full shrink-0 mt-0.5">
            <Lightbulb className="w-3.5 h-3.5" />
          </div>
          <p className="text-[11px] sm:text-xs text-[#1E7B5C] font-semibold leading-relaxed font-quicksand">
            <span className="font-semibold">Referencia:</span> Cada trayecto cuenta como 1 viaje. Un viaje de ida y vuelta cuenta como 2. 1 tramo (La Paz - Cochabamba) = 1 viaje.</p>
        </div>

      </form>
    </CarbonQuestionLayout>
  );
}
