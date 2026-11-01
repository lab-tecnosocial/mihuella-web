import { useState } from 'react';
import { ChevronUp, ChevronDown, HelpCircle, Lightbulb } from 'lucide-react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

/** Contenido de la pantalla según lo elegido en la P13 (data.gasType). */
const VARIANTS = {
  domicilio: {
    field: 'gasPaymentBs',
    icon: '/img/casa_domicilio.png',
    title: '¿Cuánto pagas por el servicio de gas domiciliario al mes?',
    subtitle: 'Ingresa un valor',
    unit: 'Bs',
    step: 1,
    integer: false,
    help: 'Si no consumes gas domiciliario escribe 0',
    reference: (
      <>
        Una factura mensual suele rondar los{' '}
        <b className="font-semibold">Bs 10.</b> Revisa tu factura ¿Cuánto pagaste
        el último mes?
      </>
    ),
  },
  garrafa: {
    field: 'gasCylindersPerMonth',
    icon: '/img/gas_naranja.png',
    title: (
      <>
        ¿Cuántas garrafas
        <br />
        de gas utilizas al mes?
      </>
    ),
    subtitle: 'Ingresa una cantidad',
    unit: 'unid',
    step: 1,
    integer: true,
    help: 'Si no usaste garrafas este mes escribe 0',
    reference: (
      <>
        Una garrafa suele durar 2 semanas en un hogar de 4 a 5 personas.
        ¿Cuántas usaron este mes?
      </>
    ),
  },
};

export function Question14GasPayment({
  onNext,
  onBack,
  onExit,
  data = {},
  progress,
}) {
  const isGarrafa = data.gasType === 'garrafa';
  const v = isGarrafa ? VARIANTS.garrafa : VARIANTS.domicilio;

  // Valor previo de la variante que corresponde (para cuando vuelve atrás)
  const [amount, setAmount] = useState(data[v.field] ?? 0);

  const handleIncrement = () => setAmount((prev) => prev + v.step);
  const handleDecrement = () => setAmount((prev) => Math.max(0, prev - v.step));

  const handleChange = (e) => {
    const val = v.integer ? parseInt(e.target.value, 10) : parseFloat(e.target.value);
    setAmount(isNaN(val) ? 0 : Math.max(0, val));
  };

  // Guarda el valor de la variante elegida y deja en 0 la otra
  const submit = () =>
    onNext({
      gasPaymentBs: isGarrafa ? 0 : amount,
      gasCylindersPerMonth: isGarrafa ? amount : 0,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const arrowBtn =
    'w-10 h-10 rounded-full bg-[#A9E4BE] text-[#1E6B3E] flex items-center justify-center hover:brightness-95 active:scale-95 transition';

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={2}
      currentQuestionIndex={2}
      totalQuestionsInCategory={3}
      {...progress}
      icon={v.icon}
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
            {v.title}
          </h2>
          <p className="mt-2 text-lg text-gray-500 font-quicksand">{v.subtitle}</p>
        </div>

        {/* Grupo input + referencia (espacio 16px) */}
        <div className="flex flex-col gap-4">
          {/* Input numérico con botones */}
          <div className="w-full flex items-center justify-between gap-4 rounded-2xl border border-gray-400 bg-white px-6 py-4">
            <div className="flex-1 flex flex-col items-center">
              <div className="flex items-baseline justify-center gap-1 border-b-2 border-dashed border-gray-400 pb-1 px-2">
                <input
                  type="number"
                  inputMode={v.integer ? 'numeric' : 'decimal'}
                  step={v.step}
                  min="0"
                  value={amount}
                  onChange={handleChange}
                  style={{ width: `${Math.max(String(amount).length, 1) + 0.5}ch` }}
                  className="text-6xl font-bold text-gray-400 text-center bg-transparent focus:outline-none font-quicksand [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <span className="text-xl font-medium text-gray-400 font-quicksand">
                  {v.unit}
                </span>
              </div>

              <span className="mt-2 flex items-center gap-1.5 text-xs text-gray-500 font-['Poppins',sans-serif]">
                <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                {v.help}
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
              {v.reference}
            </p>
          </div>
        </div>
      </form>
    </CarbonQuestionLayout>
  );
}