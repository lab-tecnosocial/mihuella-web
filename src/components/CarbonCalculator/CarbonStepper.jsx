import React from "react";
import { CARBON_CATEGORIES } from "../../constants/carbonCategories";

export function CarbonStepper({
  currentCategoryIndex = -1,
  currentQuestionIndex = 0,
  totalQuestionsInCategory = 1,
}) {
  // Cálculo de porcentaje exacto incluyendo el avance entre sub-preguntas de la categoría actual
  const getProgressPercentage = () => {
    if (currentCategoryIndex < 0 || CARBON_CATEGORIES.length <= 1) return 0;

    const baseProgress = currentCategoryIndex / (CARBON_CATEGORIES.length - 1);

    const stepFraction =
      totalQuestionsInCategory > 1
        ? currentQuestionIndex /
          totalQuestionsInCategory /
          (CARBON_CATEGORIES.length - 1)
        : 0;

    const total = (baseProgress + stepFraction) * 100;
    return Math.min(total, 100);
  };

  const progressPercentage = getProgressPercentage();

  return (
    <div className="w-full pt-2 pb-2 overflow-x-auto no-scrollbar">
      <div className="flex items-center justify-between w-full mx-auto relative px-2 sm:px-4">
        {/* CONTENEDOR BASE DE LÍNEAS DISCONTINUAS */}
        <div className="absolute top-4 sm:top-5 left-[calc(0.5rem+18px)] right-[calc(0.5rem+18px)] sm:left-[calc(1rem+20px)] sm:right-[calc(1rem+20px)] h-[2px] z-0 pointer-events-none">
          {/* 1. LÍNEA DE FONDO DISCONTINUA INACTIVA (#D0F0DC) */}
          <div className="w-full h-full border-b-2 border-dashed border-[#D0F0DC]" />

          {/* 2. LÍNEA DE PROGRESO DISCONTINUA ACTIVA (#226D3C) */}
          <div
            className="absolute top-0 left-0 h-full overflow-hidden transition-all duration-500 ease-in-out"
            style={{
              width: `${progressPercentage}%`,
            }}
          >
            {/* 
              Al usar 'w-[100cwb]' o forzar el ancho al 100% relativo del contenedor padre original,
              los guiones verdes coinciden píxel a píxel sobre la línea clara de fondo.
            */}
            <div className="w-[100%] min-w-[calc(100vw-2rem)] h-full border-b-2 border-dashed border-[#226D3C]" />
          </div>
        </div>

        {/* CÍRCULOS E ÍCONOS */}
        {CARBON_CATEGORIES.map((cat, idx) => {
          const isActive =
            currentCategoryIndex >= 0 && idx === currentCategoryIndex;
          const isCompleted =
            currentCategoryIndex >= 0 && idx < currentCategoryIndex;

          return (
            <div
              key={cat.id || idx}
              className="relative z-10 flex flex-col items-center gap-1.5"
            >
              <div className="relative flex items-center justify-center">
                {/* Círculo Contenedor */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive || isCompleted
                      ? "bg-[#226D3C] text-[#FAFAFA]"
                      : "bg-[#D0F0DC] text-[#226D3C]"
                  }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    {cat.icon}
                  </div>
                </div>
              </div>

              {/* Etiqueta de texto debajo de cada categoría */}
              <span className="mt-1 text-center font-['Poppins',sans-serif] text-[12px] sm:text-[14px] md:text-[16px] font-normal leading-[140%] text-[#FAFAFA]">
                {cat.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}