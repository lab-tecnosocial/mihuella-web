import { ChevronUp, ChevronDown, Lightbulb } from 'lucide-react';
import { CarbonQuestionLayout } from '../CarbonQuestionLayout';

// Importación desde assets según la nueva estructura
import cheeseImg from '../../../assets/images/queso.webp';

export function Question9CheeseConsumption({
  onNext,
  onBack,
  onExit,
  initialValue = 0,
}) {
  const [amount, setAmount] = useState(initialValue);

  const handleIncrement = () => {
    setAmount((prev) => parseFloat((prev + 0.1).toFixed(1)));
  };

  const handleDecrement = () => {
    setAmount((prev) => Math.max(0, parseFloat((prev - 0.1).toFixed(1))));
  };

  const handleChange = (e) => {
    const val = parseFloat(e.target.value);
    setAmount(isNaN(val) ? 0 : Math.max(0, val));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ cheeseConsumptionKg: amount });
  };

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={1}
      icon={cheeseImg}
      onBack={onBack}
      onExit={onExit}
    >
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
          ¿Cuántos kilos de queso consumes a la semana?
        </h2>
        <p className="text-sm text-gray-500 mb-6">Ingresa una cantidad</p>

        {/* Control Numérico */}
        <div className="relative w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between mb-4 shadow-sm">
          <div className="flex-1 flex flex-col items-center pl-8">
            <div className="flex items-baseline">
              <input
                type="number"
                step="0.1"
                min="0"
                value={amount}
                onChange={handleChange}
                className="text-4xl font-extrabold text-gray-700 w-24 text-center focus:outline-none bg-transparent"
              />
              <span className="text-xl font-medium text-gray-400 ml-1">kg</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Si no consumes queso escribe 0</p>
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
        <div className="w-full bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-start gap-3 mb-6">
          <Lightbulb className="text-emerald-500 shrink-0 mt-0.5" size={18} />
          <p className="text-xs text-emerald-800">
            <span className="font-semibold">Referencia:</span> Una porción de queso curado suele ser <span className="font-semibold">0,05 kg</span>. ¿Cuántas comiste esta semana?
          </p>
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