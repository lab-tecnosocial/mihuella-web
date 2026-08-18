import React, { useState } from 'react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

// Lista de departamentos de Bolivia con rutas de imágenes de banderas
const DEPARTMENTS = [
  { id: 'beni', name: 'Beni', flag: '/src/assets/flags/beni.webp' },
  { id: 'chuquisaca', name: 'Chuquisaca', flag: '/src/assets/flags/chuquisaca.webp' },
  { id: 'cochabamba', name: 'Cochabamba', flag: '/src/assets/flags/cochabamba.webp' },
  { id: 'la_paz', name: 'La Paz', flag: '/src/assets/flags/laPaz.webp' },
  { id: 'oruro', name: 'Oruro', flag: '/src/assets/flags/oruro.webp' },
  { id: 'tarija', name: 'Tarija', flag: '/src/assets/flags/tarija.webp' },
  { id: 'potosi', name: 'Potosí', flag: '/src/assets/flags/potosi.webp' },
  { id: 'santa_cruz', name: 'Santa Cruz', flag: '/src/assets/flags/santaCruz.webp' },
  { id: 'pando', name: 'Pando', flag: '/src/assets/flags/pando.webp' },
];

export function Question2Department({ onNext, onBack, onExit }) {
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const handleSelect = (id) => {
    setSelectedDepartment(id);
  };

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={0}
      icon="/src/assets/images/boliviaDepartments.webp"
      onBack={onBack}
      onExit={onExit}
      onNext={() => onNext(selectedDepartment)}
      isNextDisabled={!selectedDepartment}
    >
      {/* Título de la pregunta */}
      <h2 className="text-xl sm:text-2xl font-black text-gray-800 leading-tight mb-1">
        ¿En qué departamento vives?
      </h2>
      <p className="text-xs sm:text-sm text-gray-400 font-medium mb-6">
        Selecciona una opción
      </p>

      {/* Grilla de Chips / Opciones */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-2 max-w-md mx-auto">
        {DEPARTMENTS.map((dept) => {
          const isSelected = selectedDepartment === dept.id;

          return (
            <button
              key={dept.id}
              type="button"
              onClick={() => handleSelect(dept.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm ${
                isSelected
                  ? 'bg-[#3ABA67] text-white border-[#3ABA67] scale-105 shadow-md'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#3ABA67] hover:bg-emerald-50/50'
              }`}
            >
              {/* Contenedor circular recortado para la bandera */}
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden shrink-0 border border-black/10 flex items-center justify-center bg-gray-100">
                <img
                  src={dept.flag}
                  alt={`Bandera de ${dept.name}`}
                  className="w-full h-full object-cover scale-125"
                />
              </div>
              
              <span>{dept.name}</span>
            </button>
          );
        })}
      </div>
    </CarbonQuestionLayout>
  );
}