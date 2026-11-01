import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';
import { TRANSPORT_OPTIONS } from './Question15TypeTransport';

const MAX_DAYS = 7;

export function Question16TransportDays({
  onNext,
  onBack,
  onExit,
  initialValue = 0,
  data = {}, // respuestas anteriores (para saber qué transporte eligió)
}) {
  const [days, setDays] = useState(initialValue ?? 0);

  // El ícono del círculo es el vehículo elegido en la pantalla 15
  const selectedTransport = TRANSPORT_OPTIONS.find(
    (o) => o.value === data.transportType
  );
  const icon = selectedTransport?.image ?? '/img/transporte.png';

  const clamp = (n) => Math.min(MAX_DAYS, Math.max(0, n));
  const handleIncrement = () => setDays((prev) => clamp(prev + 1));
  const handleDecrement = () => setDays((prev) => clamp(prev - 1));

  const handleChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setDays(isNaN(val) ? 0 : clamp(val));
  };

  const submit = () => onNext({ transportDaysPerWeek: days });

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const arrowBtn =
    'w-10 h-10 rounded-full bg-[#A9E4BE] text-[#1E6B3E] flex items-center justify-center hover:brightness-95 active:scale-95 transition';

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={3}
      currentQuestionIndex={1}
      totalQuestionsInCategory={6}
      icon={icon}
      onBack={onBack}
      onExit={onExit}
      onNext={submit}
      isNextDisabled={false}
      nextText="Continuar"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-8 w-full max-w-[470px] mx-auto"
      >
        {/* Título */}
        <div className="text-center">
          <h2 className="max-w-[380px] mx-auto text-3xl font-semibold text-gray-800 leading-tight font-quicksand">
            ¿Cuántos días a la semana usas este medio de transporte?
          </h2>
          <p className="mt-2 text-lg text-gray-500 font-quicksand">
            Ingresa un valor
          </p>
        </div>

        {/* Input numérico con botones */}
        <div className="w-full flex items-center justify-between gap-4 rounded-2xl border border-gray-400 bg-white px-6 py-6">
          <div className="flex-1 flex flex-col items-center">
            <div className="flex items-baseline justify-center gap-1 border-b-2 border-dashed border-gray-400 pb-1 px-2">
              <input
                type="number"
                inputMode="numeric"
                step={1}
                min="0"
                max={MAX_DAYS}
                value={days}
                onChange={handleChange}
                style={{ width: `${Math.max(String(days).length, 1) + 0.5}ch` }}
                className="text-6xl font-bold text-gray-400 text-center bg-transparent focus:outline-none font-quicksand [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="text-xl font-medium text-gray-400 font-quicksand">
                {days === 1 ? 'Día' : 'Días'}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleIncrement}
              aria-label="Aumentar"
              className={arrowBtn}
            >
              <ChevronUp className="w-5 h-5" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              aria-label="Disminuir"
              className={arrowBtn}
            >
              <ChevronDown className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </form>
    </CarbonQuestionLayout>
  );
}