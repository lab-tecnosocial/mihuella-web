import { useState } from 'react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

export function Question13GasType({
  onNext,
  onBack,
  onExit,
  initialValue = 'garrafa',
}) {
  const [selectedGasType, setSelectedGasType] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedGasType) {
      onNext({ gasType: selectedGasType });
    }
  };

  const options = [
    {
      id: 'domicilio',
      label: 'Gas a domicilio',
      icon: '/img/house-gas.webp',
    },
    {
      id: 'garrafa',
      label: 'Garrafa de GLP',
      icon: '/img/gas-cylinder.webp',
    },
  ];

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={2}
      currentQuestionIndex={2}
      totalQuestionsInCategory={3}
      icon="/img/gas-meter.webp"
      onBack={onBack}
      onExit={onExit}
      onNext={() => onNext({ gasType: selectedGasType })}
      isNextDisabled={!selectedGasType}
      nextText="Continuar"
    >
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-1">
          Indica el tipo de suministro de gas que utilizas en casa
        </h2>
        <p className="text-sm text-gray-500 mb-6">Selecciona una opción</p>

        {/* Tarjetas de Selección */}
        <div className="grid grid-cols-2 gap-4 w-full mb-6">
          {options.map((option) => {
            const isSelected = selectedGasType === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedGasType(option.id)}
                className={`relative flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all ${
                  isSelected
                    ? 'border-[#3ABA67] bg-white shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                {/* Radio Button Indicator */}
                <div className="absolute top-3 right-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'border-[#3ABA67] bg-[#3ABA67]'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>

                {/* Ilustración / Icono */}
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  <img
                    src={option.icon}
                    alt={option.label}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Etiqueta */}
                <span className="text-xs sm:text-sm font-medium text-gray-700 text-center">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </form>
    </CarbonQuestionLayout>
  );
}