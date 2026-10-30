import { useState } from 'react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

// Departamentos de Bolivia con sus banderas
const DEPARTMENTS = [
  { id: 'beni', name: 'Beni', flag: '/flags/beni.webp' },
  { id: 'chuquisaca', name: 'Chuquisaca', flag: '/flags/chuquisaca.webp' },
  { id: 'cochabamba', name: 'Cochabamba', flag: '/flags/cochabamba.webp' },
  { id: 'la_paz', name: 'La Paz', flag: '/flags/laPaz.webp' },
  { id: 'oruro', name: 'Oruro', flag: '/flags/oruro.webp' },
  { id: 'tarija', name: 'Tarija', flag: '/flags/tarija.webp' },
  { id: 'potosi', name: 'Potosí', flag: '/flags/potosi.webp' },
  { id: 'santa_cruz', name: 'Santa Cruz', flag: '/flags/santaCruz.webp' },
  { id: 'pando', name: 'Pando', flag: '/flags/pando.webp' },
];

// Filas como en el Figma: 3 / 4 / 2
const ROWS = [
  DEPARTMENTS.slice(0, 3),
  DEPARTMENTS.slice(3, 7),
  DEPARTMENTS.slice(7, 9),
];

export function Question2Department({
  onNext,
  onBack,
  onExit,
  initialValue = '',
  progress,
}) {
  const [selected, setSelected] = useState(initialValue);

  const submit = () => {
    if (selected) onNext({ department: selected });
  };

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={0}
      currentQuestionIndex={1}
      totalQuestionsInCategory={2}
      {...progress}
      icon="/img/boliviaDepartments.webp"
      onBack={onBack}
      onExit={onExit}
      onNext={submit}
      isNextDisabled={!selected}
      nextText="Continuar"
    >
      <div className="flex flex-col items-center gap-6 w-full max-w-[560px] mx-auto">
        {/* Título */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 leading-tight font-quicksand">
            ¿En qué departamento vives?
          </h2>
          <p className="mt-2 text-lg text-gray-500 font-quicksand">
            Selecciona una opción
          </p>
        </div>

        {/* Chips de departamentos */}
        <div
          role="radiogroup"
          aria-label="Departamento"
          className="w-full flex flex-col items-center gap-4"
        >
          {ROWS.map((row, r) => (
            <div key={r} className="flex flex-wrap justify-center gap-4">
              {row.map((dept) => {
                const isSelected = selected === dept.id;
                return (
                  <button
                    key={dept.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setSelected(dept.id)}
                    className={`h-11 flex items-center gap-2 pt-2 pb-2 pl-4 pr-4 rounded-full border-2 bg-[#FAFAFA] shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3ABA67]/50 ${
                      isSelected
                        ? 'border-[#3ABA67]'
                        : 'border-[#D4D4D4] hover:border-gray-400'
                    }`}
                  >
                    {/* Bandera circular */}
                    <span className="w-6 h-6 rounded-full overflow-hidden shrink-0">
                      <img
                        src={dept.flag}
                        alt=""
                        width="24"
                        height="24"
                        className="w-full h-full object-cover"
                      />
                    </span>
                    <span className="text-lg font-medium leading-6 text-[#404040] font-quicksand whitespace-nowrap">
                      {dept.name}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </CarbonQuestionLayout>
  );
}