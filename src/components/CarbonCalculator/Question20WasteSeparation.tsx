import React, { useState } from 'react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

const SEPARATION_OPTIONS = [
    {
        id: 'si',
        label: 'Sí, los separo por tipo',
        value: true,
        icon: '/img/residuos-check.webp',
    },
    {
        id: 'no',
        label: 'No, los desecho juntos',
        value: false,
        icon: '/img/residuos-x.webp',
    },
];

export function Question20WasteSeparation({
    onNext,
    onBack,
    onExit,
    initialValue = true,
}: {
    onNext: (value: { separatesWaste: boolean }) => void;
    onBack: () => void;
    onExit: () => void;
    initialValue?: boolean;
}) {
    const [separatesWaste, setSeparatesWaste] = useState(initialValue);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        onNext({ separatesWaste });
    };

    return (
        <CarbonQuestionLayout
            currentCategoryIndex={4}
            icon={'/img/residuos-icon.webp'}
            onBack={onBack}
            onExit={onExit}
            onNext={() => onNext({ separatesWaste })}
            isNextDisabled={false}
            nextText="Continuar"
        >
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">
                    ¿Separas los residuos en tu hogar?
                </h2>
                <p className="text-sm text-gray-500 mb-6">Selecciona una opción</p>

                <div className="grid grid-cols-2 gap-4 w-full mb-6">
                    {SEPARATION_OPTIONS.map((option) => {
                        const isSelected = separatesWaste === option.value;
                        return (
                            <div
                                key={option.id}
                                onClick={() => setSeparatesWaste(option.value)}
                                className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex flex-col items-center justify-center text-center relative bg-white min-h-[140px] ${isSelected
                                        ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="absolute top-3 right-3">
                                    <div
                                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected
                                                ? 'border-emerald-500 bg-emerald-500'
                                                : 'border-gray-300 bg-white'
                                            }`}
                                    >
                                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                    </div>
                                </div>

                                <img src={option.icon} alt="" className="h-12 w-12 object-contain" />
                                <span className="text-sm font-semibold text-gray-700 mt-2">
                                    {option.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </form>
        </CarbonQuestionLayout>
    );
}