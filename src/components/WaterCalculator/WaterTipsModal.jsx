import { useEffect, useRef, useState } from 'react';
import { X, ChevronDown, ShowerHead, SprayCan, ShoppingBag, CloudRain, CheckCircle2 } from 'lucide-react';

const WATER_TIPS = [
  {
    categoria: 'Higiene Personal',
    icon: ShowerHead,
    consejos: [
      'Reduce el tiempo de ducha a 5-7 minutos',
      'Cierra el grifo mientras te cepillas los dientes',
      'Usa un vaso para enjuagarte en lugar del grifo abierto',
      'Instala un inodoro de bajo flujo o de doble descarga',
      'Cierra el grifo mientras te enjabonas las manos',
    ],
  },
  {
    categoria: 'Limpieza del Hogar',
    icon: SprayCan,
    consejos: [
      'Usa la lavadora solo con cargas completas',
      'Elige programas de lavado eficientes',
      'Reutiliza el agua del último enjuague para trapear',
      'Lava los platos con la llave cerrada, solo enciéndela para enjuagar',
      'Considera usar un lavavajillas eficiente si tienes familia numerosa',
    ],
  },
  {
    categoria: 'Consumo Consciente',
    icon: ShoppingBag,
    consejos: [
      'No compres botellas desechables; usa una reutilizable',
      'Reduce el consumo de carne, especialmente carne roja',
      'Compra productos locales para reducir la huella hídrica del transporte',
      'Evita el desperdicio de alimentos',
      'Opta por ropa de fibras naturales y compra menos ropa nueva',
      'Repara dispositivos electrónicos en lugar de comprar nuevos',
    ],
  },
  {
    categoria: 'Captación y Reutilización',
    icon: CloudRain,
    consejos: [
      'Usa agua de lluvia para regar las plantas',
      'Usa un balde en lugar de manguera para limpiar o lavar el carro',
      'Instala un sistema de recolección de agua de lluvia',
      'Reutiliza el agua de enjuague de verduras para regar plantas',
      'Usa agua grises tratada para el riego del jardín',
      'Recicla papel, cartón y otros materiales',
      'Instala grifos y duchas de bajo flujo',
    ],
  },
];

export function WaterTipsModal({ open, onClose }) {
  const [abierta, setAbierta] = useState(0);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/30 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="water-tips-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[650px] max-h-[85vh] overflow-y-auto rounded-2xl bg-[#F5F5F5] px-6 py-8 sm:px-8 text-left"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar consejos"
          className="absolute right-4 top-4 w-9 h-9 rounded-full flex items-center justify-center text-[#404040] hover:bg-black/5 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2
          id="water-tips-title"
          className="text-3xl font-semibold leading-tight text-center text-[#262626] font-quicksand"
        >
          Consejos
        </h2>
        <p className="mt-2 text-center text-base text-[#737373] font-quicksand">
          Acciones para reducir tu huella hídrica
        </p>

        <div className="mt-6 flex flex-col gap-3">
          {WATER_TIPS.map((cat, i) => {
            const Icon = cat.icon;
            const estaAbierta = abierta === i;
            return (
              <div
                key={cat.categoria}
                className="rounded-xl border border-[#BADAF3] bg-white overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setAbierta(estaAbierta ? -1 : i)}
                  aria-expanded={estaAbierta}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#F5FAFE] transition"
                >
                  <span className="w-9 h-9 rounded-full bg-[#2178BD] text-white flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="flex-1 text-base font-bold text-[#124168] font-quicksand">
                    {cat.categoria}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#124168] transition-transform ${estaAbierta ? 'rotate-180' : ''}`}
                  />
                </button>

                {estaAbierta && (
                  <ul className="px-4 pb-4 flex flex-col gap-2">
                    {cat.consejos.map((consejo) => (
                      <li key={consejo} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#2178BD]" />
                        <span className="text-sm leading-snug text-[#404040] font-quicksand">
                          {consejo}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}