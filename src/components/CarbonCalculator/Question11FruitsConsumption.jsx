import { useState } from 'react';
import { ChevronUp, ChevronDown, HelpCircle, Lightbulb } from 'lucide-react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

const STEP = 0.1;

export function Question11FruitsConsumption({
  onNext,
  onBack,
  onExit,
  initialValue = 0,
}) {
  const [amount, setAmount] = useState(initialValue);

  const round = (n) => parseFloat(n.toFixed(1));
  const handleIncrement = () => setAmount((prev) => round(prev + STEP));
  const handleDecrement = () => setAmount((prev) => Math.max(0, round(prev - STEP)));

  const handleChange = (e) => {
    const val = parseFloat(e.target.value);
    setAmount(isNaN(val) ? 0 : Math.max(0, val));
  };

  const submit = () => onNext({ fruitsAndVegetablesKg: amount });

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const arrowBtn =
    'w-10 h-10 rounded-full bg-[#A9E4BE] text-[#1E6B3E] flex items-center justify-center hover:brightness-95 active:scale-95 transition';

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={1}
      currentQuestionIndex={2}
      totalQuestionsInCategory={3}
      icon="/img/apple-and-carrot.webp"
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
            ¿Cuántos kilos de fruta y verduras consumes a la semana?
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
                kg
              </span>
            </div>

            <span className="mt-2 flex items-center gap-1.5 text-xs text-gray-500 font-quicksand">
              <HelpCircle className="w-3.5 h-3.5 shrink-0" />
              Si no consumes ni frutas ni verduras escribe 0
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
            <span className="font-medium text-[#2E9E5B]">Referencia:</span> Una
            fruta mediana pesa aprox.{' '}
            <span className="font-medium">0,15 kg</span>. Cuenta tus porciones
            de la semana.
          </p>
        </div>
      </form>
    </CarbonQuestionLayout>
  );
}