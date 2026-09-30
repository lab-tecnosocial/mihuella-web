import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Lightbulb, HelpCircle } from 'lucide-react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

interface Question19FlightDurationProps {
  onNext: (value: { flightDurationMin: number }) => void;
  onBack: () => void;
  onExit: () => void;
  initialValue?: number;
}

export function Question19FlightDuration({
  onNext,
  onBack,
  onExit,
  initialValue = 0,
}: Question19FlightDurationProps) {
  const [minutes, setMinutes] = useState(initialValue);

  const handleIncrement = () => {
    setMinutes((prev) => prev + 10);
  };

  const handleDecrement = () => {
    setMinutes((prev) => Math.max(0, prev - 10));
  };

  const handleChange = (e: { target: { value: string; }; }) => {
    const val = parseInt(e.target.value, 10);
    setMinutes(isNaN(val) ? 0 : Math.max(0, val));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onNext({ flightDurationMin: minutes });
  };

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={3}
      icon={'/img/airplane.webp'}
      onBack={onBack}
      onExit={onExit}
    >
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
          En promedio, ¿Cuántos minutos dura cada vuelo?
        </h2>
        <p className="text-sm text-gray-500 mb-6">Ingresa una cantidad de minutos</p>

        {/* Control Numérico */}
        <div className="relative w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between mb-2 shadow-sm">
          <div className="flex-1 flex flex-col items-center pl-8">
            <div className="flex items-baseline">
              <input
                type="number"
                min="0"
                step="10"
                value={minutes}
                onChange={handleChange}
                className="text-4xl font-extrabold text-gray-700 w-28 text-center focus:outline-none bg-transparent"
              />
              <span className="text-xl font-medium text-gray-400 ml-1">min</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
              <HelpCircle size={12} />
              <span>Si no viajaste escribe 0</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={handleIncrement}
              className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition-colors"
            >
              <ChevronUp size={20} />
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              className="p-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition-colors"
            >
              <ChevronDown size={20} />
            </button>
          </div>
        </div>

        {/* Cuadro de Referencia */}
        <div className="w-full bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-start gap-2.5 mb-6 text-left">
          <Lightbulb className="text-emerald-500 shrink-0 mt-0.5" size={18} />
          <div className="text-xs text-emerald-800 leading-relaxed">
            <p><span className="font-semibold">Referencia:</span> Santa Cruz - La Paz (1 hora / 60 min); La Paz - Cochabamba (30 minutos)</p>
          </div>
        </div>

        {/* Botón de Continuar */}
        <button
          type="submit"
          className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
        >
          Continuar →
        </button>
      </form>
    </CarbonQuestionLayout>
  );
}
