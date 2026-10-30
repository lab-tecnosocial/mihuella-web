import { useState } from 'react';
import { Minus, Plus, Lightbulb } from 'lucide-react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

const STEP = 0.5;

const WASTE_TYPES = [
  { value: 'common', label: 'Residuos comunes', image: '/img/trash.png' },
  { value: 'organic', label: 'Residuos orgánicos', image: '/img/residuos_organicos.png' },
  { value: 'paper', label: 'Papel y cartón', image: '/img/papel_carton.png' },
  { value: 'plastic', label: 'Plásticos', image: '/img/plastico.png' },
];

// Texto -> número >= 0 (acepta coma o punto)
const toNumber = (s) => {
  const n = parseFloat(String(s).replace(',', '.'));
  return Number.isNaN(n) ? 0 : Math.max(0, n);
};
const fmt = (n) => toNumber(n).toFixed(1);

export function Question23WasteQuantify({
  onNext,
  onBack,
  onExit,
  data = {},
  progress,
}) {
  // Si separa: solo los tipos elegidos en la P22. Si no separa: una sola fila (todo junto).
  const separates = data.separatesWaste === true && data.wasteTypes?.length > 0;
  const rows = separates
    ? WASTE_TYPES.filter((t) => data.wasteTypes.includes(t.value))
    : [WASTE_TYPES[0]];

  // Valores como texto para poder escribir decimales ("1.5")
  const [values, setValues] = useState(() =>
    Object.fromEntries(rows.map((r) => [r.value, fmt(data.wasteKgByType?.[r.value] ?? 0)]))
  );

  const setValue = (key, val) => setValues((prev) => ({ ...prev, [key]: val }));
  const increment = (key) => setValue(key, fmt(toNumber(values[key]) + STEP));
  const decrement = (key) => setValue(key, fmt(Math.max(0, toNumber(values[key]) - STEP)));

  const handleChange = (key, e) => {
    const raw = e.target.value.replace(',', '.');
    if (/^\d*\.?\d{0,1}$/.test(raw)) setValue(key, raw);
  };

  const submit = () => {
    const wasteKgByType = Object.fromEntries(
      rows.map((r) => [r.value, toNumber(values[r.value])])
    );
    const wasteKg = Object.values(wasteKgByType).reduce((a, b) => a + b, 0);
    onNext({ wasteKgByType, wasteKg });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const roundBtn =
    'w-7 h-7 rounded-full bg-[#A9E4BE] text-[#1E6B3E] flex items-center justify-center shrink-0 hover:brightness-95 active:scale-95 transition';

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={4}
      currentQuestionIndex={2}
      totalQuestionsInCategory={3}
      {...progress}
      icon="/img/residuos.png"
      onBack={onBack}
      onExit={onExit}
      onNext={submit}
      isNextDisabled={false}
      nextText="Calcular mi huella"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-[470px] mx-auto"
      >
        {/* Título */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 leading-tight font-quicksand">
            {separates
              ? 'Indica los residuos que separas'
              : '¿Cuántos residuos generas a la semana?'}
          </h2>
          <p className="mt-2 text-lg text-gray-500 font-quicksand">
            {separates ? 'Selecciona las opciones' : 'Ingresa una cantidad'}
          </p>
        </div>

        {/* Filas por tipo de residuo */}
        <div className="flex flex-col gap-4">
          {rows.map((row) => (
            <div key={row.value} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={row.image}
                  alt=""
                  width="40"
                  height="40"
                  className="w-10 h-10 object-contain shrink-0"
                />
                <span className="text-base font-medium text-[#404040] font-quicksand">
                  {row.label}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => decrement(row.value)}
                  aria-label={`Disminuir ${row.label}`}
                  className={roundBtn}
                >
                  <Minus className="w-4 h-4" strokeWidth={2.5} />
                </button>

                <label className="w-[74px] h-[48px] flex items-baseline justify-center gap-0.5 rounded-lg border border-gray-400 bg-white px-1 pt-2 cursor-text">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={values[row.value]}
                    onChange={(e) => handleChange(row.value, e)}
                    onFocus={(e) => e.target.select()}
                    onBlur={() => setValue(row.value, fmt(values[row.value]))}
                    aria-label={`Kilos de ${row.label}`}
                    className="w-[2.6ch] text-2xl font-bold text-gray-400 text-right bg-transparent focus:outline-none font-quicksand"
                  />
                  <span className="text-xs font-medium text-gray-400 font-quicksand">Kg</span>
                </label>

                <button
                  type="button"
                  onClick={() => increment(row.value)}
                  aria-label={`Aumentar ${row.label}`}
                  className={roundBtn}
                >
                  <Plus className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Referencia */}
        <div className="mt-8 w-full min-h-[66px] flex items-center gap-3 rounded-lg bg-[#D0F0DC] p-4 text-left">
          <div className="bg-[#3ABA67] text-white p-1.5 rounded-full shrink-0">
            <Lightbulb className="w-4 h-4" />
          </div>
          <p className="text-sm text-gray-600 font-['Poppins',sans-serif] leading-snug">
            <span className="font-medium text-[#2E9E5B]">Referencia:</span>{' '}
            Separar residuos es guardarlos por tipo (orgánicos, papel, plástico,
            etc.) antes de desecharlos. ¿Sueles hacerlo de esta forma?
          </p>
        </div>
      </form>
    </CarbonQuestionLayout>
  );
}