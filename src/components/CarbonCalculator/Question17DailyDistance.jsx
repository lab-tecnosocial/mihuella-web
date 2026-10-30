import { useState } from 'react';
import { ChevronUp, ChevronDown, HelpCircle, Lightbulb } from 'lucide-react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';
import { TRANSPORT_OPTIONS } from './Question15TypeTransport';

const STEP = 1;

const REFERENCES = [
  'Ceja - Perez (11 km)',
  'Prado - Calacoto (8 km)',
  'Cochabamba - Quillacollo (14 km)',
  'Santa Cruz de la Sierra - La Guardia (19 km)',
  'Santa Cruz de la Sierra - Plan 3000 (9 km)',
];

export function Question17DailyDistance({
  onNext,
  onBack,
  onExit,
  initialValue = 0,
  data = {},
}) {
  const [amount, setAmount] = useState(initialValue);

  // Ícono del círculo: el vehículo elegido en la pantalla 15
  const vehicle = TRANSPORT_OPTIONS.find((o) => o.value === data.transportType);
  const icon = vehicle?.image ?? '/img/transporte.png';

  const handleIncrement = () => setAmount((prev) => prev + STEP);
  const handleDecrement = () => setAmount((prev) => Math.max(0, prev - STEP));

  const handleChange = (e) => {
    const val = parseFloat(e.target.value);
    setAmount(isNaN(val) ? 0 : Math.max(0, val));
  };

  const submit = () => onNext({ dailyDistanceKm: amount });

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const arrowBtn =
    'w-10 h-10 rounded-full bg-[#A9E4BE] text-[#1E6B3E] flex items-center justify-center hover:brightness-95 active:scale-95 transition';

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={3}
      currentQuestionIndex={2}
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
        className="flex flex-col w-full max-w-[470px] mx-auto"
      >
        {/* Título */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 leading-tight font-quicksand">
            ¿Cuántos kilómetros recorres al día en total?
          </h2>
          <p className="mt-2 text-lg text-gray-500 font-quicksand">
            Ingresa una cantidad
          </p>
        </div>

        {/* Grupo input + referencia (espacio 16px) */}
        <div className="flex flex-col gap-4">
          {/* Input numérico con botones */}
          <div className="w-full flex items-center justify-between gap-4 rounded-2xl border border-gray-400 bg-white px-6 py-4">
            <div className="flex-1 flex flex-col items-center">
              <div className="flex items-baseline justify-center gap-1 border-b-2 border-dashed border-gray-400 pb-1 px-2">
                <input
                  type="number"
                  inputMode="decimal"
                  step={STEP}
                  min="0"
                  value={amount}
                  onChange={handleChange}
                  style={{ width: `${Math.max(String(amount).length, 1) + 0.5}ch` }}
                  className="text-6xl font-bold text-gray-400 text-center bg-transparent focus:outline-none font-quicksand [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <span className="text-xl font-medium text-gray-400 font-quicksand">
                  km
                </span>
              </div>

              <span className="mt-2 flex items-center gap-1.5 text-xs text-gray-500 font-['Poppins',sans-serif]">
                <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                Considera un recorrido de ida y vuelta
              </span>
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

          {/* Referencia: recorridos de ejemplo */}
          <div className="w-full min-h-[66px] flex items-start gap-3 rounded-lg bg-[#D0F0DC] p-4 text-left">
            <div className="bg-[#3ABA67] text-white p-1.5 rounded-full shrink-0">
              <Lightbulb className="w-4 h-4" />
            </div>
            <ul className="text-sm text-gray-600 font-['Poppins',sans-serif] leading-snug">
              {REFERENCES.map((ref, i) => (
                <li key={ref}>
                  {ref}
                  {i < REFERENCES.length - 1 ? ';' : ''}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>
    </CarbonQuestionLayout>
  );
}