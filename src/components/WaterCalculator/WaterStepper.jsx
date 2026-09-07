import React from "react";
import { WATER_CATEGORIES } from "../../constants/waterCategories";

export function WaterStepper({
  currentCategoryIndex = -1,
  currentQuestionIndex = 0,
  totalQuestionsInCategory = 1,
}) {
  const getProgressPercentage = () => {
    if (currentCategoryIndex < 0 || WATER_CATEGORIES.length <= 1) return 0;
    const baseProgress = currentCategoryIndex / (WATER_CATEGORIES.length - 1);
    const stepFraction =
      totalQuestionsInCategory > 1
        ? currentQuestionIndex / totalQuestionsInCategory / (WATER_CATEGORIES.length - 1)
        : 0;
    const total = (baseProgress + stepFraction) * 100;
    return Math.min(total, 100);
  };

  const progressPercentage = getProgressPercentage();

  return (
    <div className="w-full pt-2 pb-2 overflow-x-auto no-scrollbar">
      <div className="flex items-center justify-between w-full mx-auto relative px-2 sm:px-4">
        {/* Línea discontinua */}
        <div className="absolute top-4 sm:top-5 left-[calc(0.5rem+18px)] right-[calc(0.5rem+18px)] sm:left-[calc(1rem+20px)] sm:right-[calc(1rem+20px)] h-[2px] z-0 pointer-events-none">
          {/* Fondo inactivo */}
          <div className="w-full h-full border-b-2 border-dashed border-[#BADAF3]" />
          {/* Progreso activo */}
          <div
            className="absolute top-0 left-0 h-full overflow-hidden transition-all duration-500 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="w-[100%] min-w-[calc(100vw-2rem)] h-full border-b-2 border-dashed border-[#124168]" />
          </div>
        </div>

        {/* Círculos e íconos */}
        {WATER_CATEGORIES.map((cat, idx) => {
          const isActive = currentCategoryIndex >= 0 && idx === currentCategoryIndex;
          const isCompleted = currentCategoryIndex >= 0 && idx < currentCategoryIndex;

          return (
            <div key={cat.id || idx} className="relative z-10 flex flex-col items-center gap-1.5">
              <div className="relative flex items-center justify-center">
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive || isCompleted
                      ? "bg-[#124168] text-[#FAFAFA]"
                      : "bg-[#BADAF3] text-[#124168]"
                  }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    {cat.icon}
                  </div>
                </div>
              </div>

              {/* Muestra únicamente la etiqueta si la categoría está activa */}
              <span
                className={`mt-1 text-center font-['Poppins',sans-serif] text-[14px] sm:text-[16px] font-normal leading-[140%] text-[#FAFAFA] transition-opacity duration-200 ${
                  isActive ? "opacity-100" : "opacity-0 invisible"
                }`}
              >
                {cat.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}