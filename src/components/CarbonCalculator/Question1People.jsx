import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

const STEP = 1;

export function Question1People({
  onNext,
  onBack,
  onExit,
  initialValue = 0,
  progress,
}) {
  const [peopleCount, setPeopleCount] = useState(initialValue);

  const handleIncrement = () => setPeopleCount((prev) => prev + STEP);
  const handleDecrement = () => setPeopleCount((prev) => Math.max(0, prev - STEP));

  // Solo números enteros
  const handleChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setPeopleCount(isNaN(val) ? 0 : Math.max(0, val));
  };

  const submit = () => {
    if (peopleCount > 0) onNext({ peopleCount });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const arrowBtn =
    'w-10 h-10 rounded-full bg-[#A9E4BE] text-[#1E6B3E] flex items-center justify-center hover:brightness-95 active:scale-95 transition';

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={0}
      currentQuestionIndex={0}
      totalQuestionsInCategory={2}
      {...progress}
      icon="/img/house.webp"
      onBack={onBack}
      onExit={onExit}
      onNext={submit}
      isNextDisabled={peopleCount === 0}
      nextText="Continuar"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-[470px] mx-auto"
      >
        {/* Título */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 leading-tight font-quicksand">
            ¿Cuántas personas viven
            <br />
            en tu casa? (Incluyéndote)
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
                inputMode="numeric"
                step={STEP}
                min="0"
                value={peopleCount}
                onChange={handleChange}
                aria-label="Cantidad de personas"
                style={{ width: `${Math.max(String(peopleCount).length, 1) + 0.5}ch` }}
                className="text-6xl font-bold text-gray-400 text-center bg-transparent focus:outline-none font-quicksand [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="text-xl font-medium text-gray-400 font-quicksand">
                {peopleCount === 1 ? 'persona' : 'personas'}
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