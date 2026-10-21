import { useState } from 'react';
import { Plus, Minus, Lightbulb } from 'lucide-react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

const DEFAULT_QUANTITIES = {
    comunes: 0,
    organicos: 0,
    papel: 0,
    plasticos: 0,
};
type WasteQuantityKey = keyof typeof DEFAULT_QUANTITIES;

export function Question22WasteQuantities({
    onNext,
    onBack,
    onExit,
    initialValue = DEFAULT_QUANTITIES,
    selectedWasteTypes = [], // <-- Nueva propiedad agregada
}: {
    onNext: (value: { wasteQuantities: typeof DEFAULT_QUANTITIES }) => void;
    onBack: () => void;
    onExit: () => void;
    initialValue?: typeof DEFAULT_QUANTITIES;
    selectedWasteTypes?: string[]; // <-- Tipado para la nueva propiedad
}) {
    const [quantities, setQuantities] = useState({
        ...DEFAULT_QUANTITIES,
        ...initialValue,
    });

    const handleIncrement = (key: WasteQuantityKey) => {
        setQuantities((prev) => ({
            ...prev,
            [key]: parseFloat((prev[key] + 0.5).toFixed(1)),
        }));
    };

    const handleDecrement = (key: WasteQuantityKey) => {
        setQuantities((prev) => ({
            ...prev,
            [key]: Math.max(0, parseFloat((prev[key] - 0.5).toFixed(1))),
        }));
    };

    const handleChange = (key: WasteQuantityKey, val: string) => {
        const num = parseFloat(val);
        setQuantities((prev) => ({
            ...prev,
            [key]: isNaN(num) ? 0 : Math.max(0, num),
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onNext({ wasteQuantities: quantities });
    };

    const items: { id: WasteQuantityKey; label: string; icon: string }[] = [
        { id: 'comunes', label: 'Residuos comunes', icon: '/img/garbage-black-bag.webp' },
        { id: 'organicos', label: 'Residuos orgánicos', icon: '/img/garbage-fruits.webp' },
        { id: 'papel', label: 'Papel y cartón', icon: '/img/carton.webp' },
        { id: 'plasticos', label: 'Plásticos', icon: '/img/bottles.webp' },
    ];

    // Filtramos los items basándonos en lo seleccionado previamente (Si está vacío, muestra todos como respaldo)
    const displayedItems = selectedWasteTypes.length > 0 
        ? items.filter((item) => selectedWasteTypes.includes(item.id))
        : items;

    return (
        <CarbonQuestionLayout
            currentCategoryIndex={4}
            icon={'/img/basurero.webp'}
            onBack={onBack}
            onExit={onExit}
            onNext={() => onNext({ wasteQuantities: quantities })}
            isNextDisabled={false}
            nextText="Calcular Mi Huella"
        >
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
                    Indica los residuos que separas
                </h2>
                <p className="text-sm text-gray-500 mb-5">Selecciona las opciones</p>

                {/* Lista de Controles de Cantidad */}
                <div className="w-full space-y-3 mb-5">
                    {/* Iteramos sobre el arreglo filtrado */}
                    {displayedItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-3 shadow-sm"
                        >
                            <div className="flex min-w-0 items-center gap-2">
                                <img
                                    src={item.icon}
                                    alt=""
                                    className="h-8 w-8 shrink-0 object-contain"
                                />
                                <span className="text-sm font-medium text-gray-700">
                                    {item.label}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleDecrement(item.id)}
                                    className="w-8 h-8 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 flex items-center justify-center font-bold text-lg transition-colors"
                                >
                                    <Minus size={16} />
                                </button>

                                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 w-20 justify-center">
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        value={quantities[item.id]}
                                        onChange={(e) => handleChange(item.id, e.target.value)}
                                        className="w-12 text-center text-sm font-bold text-gray-700 bg-transparent focus:outline-none"
                                    />
                                    <span className="text-xs text-gray-400 font-medium ml-0.5">kg</span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleIncrement(item.id)}
                                    className="w-8 h-8 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 flex items-center justify-center font-bold text-lg transition-colors"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Cuadro de Referencia */}
                <div className="w-full bg-[#D8F3E5] border border-[#A0E6BA] rounded-xl p-3 sm:p-3.5 flex items-start gap-2.5 text-left">
                    <div className="bg-[#3ABA67] text-white p-1 rounded-full shrink-0 mt-0.5">
                        <Lightbulb className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-[11px] sm:text-xs text-[#1E7B5C] font-semibold leading-relaxed font-quicksand">
                        <span className="font-semibold">Referencia:</span> Separar residuos es guardarlos por tipo (orgánicos, papel, plástico, etc.) antes de desecharlos. ¿Sueles hacerlo de esta forma?
                    </p>
                </div>

            </form>
        </CarbonQuestionLayout>
    );
}