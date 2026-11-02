import { useMemo, useState } from 'react';
import {
  LogOut,
  ChevronDown,
  Leaf,
  UtensilsCrossed,
  Zap,
  Flame,
  Car,
  Trash2,
} from 'lucide-react';
import { calculateFootprint, getLevel, GAUGE_MAX } from './carbonCalculations.js';

const BACKGROUND_IMAGE = '/img/bg-huella-carbono-01.webp';
const MASCOT_IMAGE = '/img/semilla.webp';

const CATEGORY_ICONS = {
  diet: UtensilsCrossed,
  energy: Zap,
  gas: Flame,
  transport: Car,
  waste: Trash2,
};

const UNITS = [
  { id: 'year', label: 'Kg CO2/Anual', divisor: 1 },
  { id: 'month', label: 'Kg CO2/Mensual', divisor: 12 },
];

const fmtKg = (n) =>
  n.toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function Gauge({ value, level }) {
  const pct = Math.min(Math.max(value / GAUGE_MAX, 0), 1) * 100;
  const arc = 'M 24 165 A 140.5 140.5 0 0 1 305 165';

  return (
    <div className="w-full max-w-[329px] mx-auto">
      <div className="relative">
        <svg viewBox="0 0 329 180" className="w-full" aria-hidden="true">
          <path d={arc} fill="none" stroke="#D0F0DC" strokeWidth="18" strokeLinecap="round" />
          <path
            d={arc}
            fill="none"
            stroke={level.color}
            strokeWidth="18"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray={`${pct} 100`}
            className="transition-[stroke-dasharray] duration-700"
          />
        </svg>

        <div className="absolute inset-x-0 top-[34%] flex flex-col items-center">
          <span className="text-6xl font-bold leading-none text-[#262626] font-quicksand">
            {Math.round(value).toLocaleString('es-BO')}
          </span>
          <span className="mt-2 text-base text-gray-700 font-quicksand">kg de CO2 / año</span>
          <span
            className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium font-quicksand"
            style={{ backgroundColor: level.chipBg, color: level.chipText }}
          >
            <Leaf className="w-3.5 h-3.5" />
            {level.label}
          </span>
        </div>
      </div>

      <div className="mt-1 flex justify-between text-center text-xs text-gray-500 font-['Poppins',sans-serif]">
        <div>
          <p className="text-sm text-gray-600">0</p>
          <p>Bajo impacto</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">{GAUGE_MAX}+</p>
          <p>Alto impacto</p>
        </div>
      </div>
    </div>
  );
}

export function CarbonResults({ data, onExit }) {
  const { categories, total } = useMemo(() => calculateFootprint(data), [data]);
  const level = getLevel(total);
  const [unitId, setUnitId] = useState('year');
  const unit = UNITS.find((u) => u.id === unitId);

  return (
    <div
      className="min-h-screen w-full bg-[#3BB866] bg-cover bg-bottom bg-no-repeat"
      style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}
    >
      <header className="relative flex items-center justify-center px-6 pt-6">
        <h1 className="text-2xl font-semibold text-white font-quicksand">Huella de Carbono</h1>
        <button
          type="button"
          onClick={onExit}
          className="absolute right-6 top-6 flex items-center gap-2 text-lg font-medium text-white font-quicksand hover:opacity-80 transition"
        >
          Salir
          <LogOut className="w-6 h-6" />
        </button>
      </header>

      <main className="px-4 pb-16">
        <div className="relative mx-auto mt-[90px] w-full max-w-[970px]">
          <div className="absolute left-1/2 -top-[70px] z-10 -translate-x-1/2 w-[100px] h-[100px] rounded-full border-[6px] border-[#3ABA67] bg-white overflow-hidden flex items-center justify-center">
            <img
              src={MASCOT_IMAGE}
              alt=""
              width="100"
              height="100"
              className="w-full h-full object-contain"
            />
          </div>

          <section className="md:min-h-[560px] rounded-3xl bg-[#F5F5F5] px-6 md:px-10 pt-16 pb-10 grid gap-10 md:grid-cols-[329px_1fr] md:items-start">
            <div className="flex flex-col items-center gap-6">
              <h2 className="text-3xl font-semibold leading-tight text-center text-[#262626] font-quicksand">
                {level.title}
              </h2>
              <Gauge value={total} level={level} />
            </div>

            <div className="flex flex-col gap-4 min-w-0">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-base font-semibold text-[#262626] font-quicksand">
                  Por categorías
                </h3>
                <label className="relative">
                  <span className="sr-only">Unidad</span>
                  <select
                    value={unitId}
                    onChange={(e) => setUnitId(e.target.value)}
                    className="appearance-none rounded-full border border-gray-400 bg-transparent py-1 pl-3 pr-8 text-xs text-gray-600 font-['Poppins',sans-serif] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABA67]/50"
                  >
                    {UNITS.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 w-4 h-4 -translate-y-1/2 text-gray-600" />
                </label>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
                <ul className="flex flex-col">
                  {categories.map((c) => {
                    const Icon = CATEGORY_ICONS[c.id];
                    return (
                      <li key={c.id} className="flex items-center gap-3 sm:gap-4 py-2.5">
                        <span className="w-7 h-7 rounded-full bg-[#226D3C] text-white flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="w-24 shrink-0 text-sm text-[#404040] font-['Poppins',sans-serif]">
                          {c.label}
                        </span>
                        <span className="hidden sm:block flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                          <span
                            className="block h-full rounded-full bg-[#3ABA67] transition-[width] duration-700"
                            style={{ width: `${c.pct}%` }}
                          />
                        </span>
                        <span className="w-[52px] shrink-0 rounded bg-[#D0F0DC] py-1 text-center text-sm font-medium text-[#2E9452] font-['Poppins',sans-serif] ml-auto sm:ml-0">
                          {Math.round(c.pct)}%
                        </span>
                        <span className="w-[110px] shrink-0 text-right text-sm text-[#404040] font-['Poppins',sans-serif]">
                          {fmtKg(c.kg / unit.divisor)} Kg
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-1 flex items-center justify-between border-t-2 border-gray-700 pt-3 text-sm font-semibold text-[#262626] font-['Poppins',sans-serif]">
                  <span>Total</span>
                  <span>{fmtKg(total / unit.divisor)} Kg</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}