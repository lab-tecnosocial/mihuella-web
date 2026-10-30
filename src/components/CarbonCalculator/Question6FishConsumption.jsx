import { useState } from 'react';
import { ChevronUp, ChevronDown, HelpCircle, Lightbulb } from 'lucide-react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

const STEP = 0.1;

// Texto -> número >= 0 (acepta coma o punto)
const toNumber = (s) => {
  const n = parseFloat(String(s).replace(',', '.'));
  return Number.isNaN(n) ? 0 : Math.max(0, n);
};
const fmt = (n) => toNumber(n).toFixed(1);

export function Question6FishConsumption({
  onNext,
  onBack,
  onExit,
  initialValue = 0,
  progress,
}) {
  // Se guarda como texto para mostrar siempre un decimal ("0.0")
  const [value, setValue] = useState(fmt(initialValue ?? 0));

  const handleIncrement = () => setValue((v) => fmt(toNumber(v) + STEP));
  const handleDecrement = () => setValue((v) => fmt(Math.max(0, toNumber(v) - STEP)));

  const handleChange = (e) => {
    const raw = e.target.value.replace(',', '.');
    if (/^\d*\.?\d{0,1}$/.test(raw)) setValue(raw);
  };

  const submit = () => onNext({ fishKg: toNumber(value) });

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const arrowBtn =
    'w-10 h-10 rounded-full bg-[#A9E4BE] text-[#1E6B3E] flex items-center justify-center hover:brightness-95 active:scale-95 transition';

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={1}
      currentQuestionIndex={3}
      totalQuestionsInCategory={9}
      {...progress}
      icon="/img/fish.webp"
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
            ¿Cuántos kilos de carne de pescado consumes en una semana?
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
                  type="text"
                  inputMode="decimal"
                  value={value}
                  placeholder="0.0"
                  onChange={handleChange}
                  onFocus={(e) => e.target.select()}
                  onBlur={() => setValue(fmt(value))}
                  aria-label="Kilos de pescado por semana"
                  style={{ width: `${Math.max(value.length, 1) + 0.5}ch` }}
                  className="text-6xl font-bold text-gray-400 placeholder:text-gray-400 text-center bg-transparent focus:outline-none font-quicksand"
                />
                <span className="text-xl font-medium text-gray-400 font-quicksand">
                  Kg
                </span>
              </div>

              <span className="mt-2 flex items-center gap-1.5 text-xs text-gray-500 font-['Poppins',sans-serif]">
                <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                Si no consumes pescado escribe 0
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
            <div className="bg-[#3ABA67] text-white p-1.5 rounded-full shrink-0">
              <Lightbulb className="w-4 h-4" />
            </div>
            <p className="text-sm text-gray-600 font-['Poppins',sans-serif] leading-snug">
              <span className="font-medium text-[#2E9E5B]">Referencia:</span>{' '}
              Un filete de pescado suele pesar{' '}
              <b className="font-semibold">0,15 kg</b>. ¿Cuántos comiste esta semana?
            </p>
          </div>
        </div>
      </form>
    </CarbonQuestionLayout>
  );
}