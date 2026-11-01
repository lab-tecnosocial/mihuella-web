import { useState } from 'react';
import { ChevronUp, ChevronDown, HelpCircle } from 'lucide-react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

const STEP = 10;

/** Ícono de factura de luz (marco 32×32, Principal/Verde/500 #3ABA67). */
function BillIcon({ className = 'w-8 h-8' }) {
  const green = '#3ABA67';
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Contorno de la hoja (izquierda y arriba) */}
      <path
        d="M6 27.5V3.5A2 2 0 0 1 8 1.5h16.5"
        stroke={green}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Borde derecho de la hoja */}
      <path
        d="M29.3 7.5v20"
        stroke={green}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Banderín curvo superior derecho */}
      <path
        d="M24.5 1h3.8a1.7 1.7 0 0 1 1.7 1.7V7l-2.6-1.9L24.5 7V1Z"
        fill={green}
      />
      {/* Rollo inferior */}
      <rect x="2.5" y="27" width="25" height="4" rx="2" fill={green} />

      {/* Signo $ */}
      <text
        x="6.6"
        y="10.4"
        fontSize="8.6"
        fontWeight="700"
        fill={green}
        fontFamily="Quicksand, Arial, sans-serif"
      >
        $
      </text>
      {/* Rayitas junto al $ */}
      <path
        d="M13 5h8M13 8h8"
        stroke={green}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Líneas de texto */}
      <path
        d="M7.5 12.8h10.5M7.5 15.8h10.5M7.5 18.8h10.5M7.5 21.8h7"
        stroke={green}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Bombilla (9 × 12,5 en x=20,5 / y=11) */}
      <path
        d="M24.8 11.2a3.9 3.9 0 0 0-2.4 7c.5.4.8.9.8 1.4v.4h3.2v-.4c0-.5.3-1 .8-1.4a3.9 3.9 0 0 0-2.4-7Z"
        stroke={green}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="24.8" cy="15.2" r="1.3" fill={green} />
      <rect x="24.2" y="16" width="1.2" height="3" rx="0.6" fill={green} />
      <rect x="23.4" y="21.4" width="2.8" height="2" rx="1" fill={green} />
    </svg>
  );
}

export function Question12ElectricEnergyCost({
  onNext,
  onBack,
  onExit,
  initialValue = 0,
}) {
  const [amount, setAmount] = useState(initialValue);

  const handleIncrement = () => setAmount((prev) => prev + STEP);
  const handleDecrement = () => setAmount((prev) => Math.max(0, prev - STEP));

  const handleChange = (e) => {
    const val = parseFloat(e.target.value);
    setAmount(isNaN(val) ? 0 : Math.max(0, val));
  };

  const submit = () => onNext({ electricityCostBs: amount });

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const arrowBtn =
    'w-10 h-10 rounded-full bg-[#A9E4BE] text-[#1E6B3E] flex items-center justify-center hover:brightness-95 active:scale-95 transition';

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={2}
      currentQuestionIndex={0}
      totalQuestionsInCategory={3}
      icon="/img/luz_amarilla.png"
      onBack={onBack}
      onExit={onExit}
      onNext={submit}
      isNextDisabled={false}
      nextText="Continuar"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5 w-full max-w-[470px] mx-auto"
      >
        {/* Título */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 leading-tight font-quicksand">
            ¿Cuál es el costo aproximado que pagas por el servicio de energía
            eléctrica en Bs al mes?
          </h2>
          <p className="mt-2 text-lg text-gray-500 font-quicksand">
            Ingresa una cantidad
          </p>
        </div>

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
                Bs
              </span>
            </div>

            <span className="mt-2 flex items-center gap-1.5 text-xs text-gray-500 font-quicksand">
              <HelpCircle className="w-3.5 h-3.5 shrink-0" />
              Si no consumes energía eléctrica escribe 0
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

        {/* Referencia */}
        <div className="w-full min-h-[66px] flex items-center gap-3 rounded-lg bg-[#D0F0DC] p-4 text-left">
          <BillIcon className="w-8 h-8 shrink-0" />
          <p className="text-sm text-gray-600 font-['Poppins',sans-serif] leading-snug">
            <span className="font-medium text-[#2E9E5B]">Referencia:</span>{' '}
            Revisa tu factura de luz. ¿Cuánto pagaste el último mes?
          </p>
        </div>
      </form>
    </CarbonQuestionLayout>
  );
}