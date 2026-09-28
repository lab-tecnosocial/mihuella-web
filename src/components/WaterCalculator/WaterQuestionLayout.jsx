import React from "react";
import { ArrowLeft, LogOut, ArrowRight } from "lucide-react";
import { Button3DWater } from "./Button3DWater";
import { WaterStepper } from "./WaterStepper";

export function WaterQuestionLayout({
  currentCategoryIndex = -1,
  currentQuestionIndex = 0,
  totalQuestionsInCategory = 1,
  icon,
  onBack,
  onExit,
  onNext,
  isNextDisabled = false,
  nextText = "Continuar",
  children,
}) {
  return (
    <>
      <style>{`
        header:not(.water-header), footer:not(.water-footer) {
          display: none !important;
        }
        body, html {
          margin: 0 !important;
          padding: 0 !important;
          height: 100% !important;
          overflow: hidden !important;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Contenedor principal: ocupa toda la pantalla, sin scroll en sí mismo */}
      <div className="fixed inset-0 z-[9999] w-full h-full bg-[#2178BD] flex flex-col font-sans text-white select-none">
        {/* Fondo fijo (no se mueve) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: `url('/img/bg-hidrica.webp')`,
          }}
        />

        {/* Header: fijo en la parte superior, sin padding extra */}
        <header className="water-header relative z-20 w-full max-w-5xl mx-auto px-3 sm:px-8 pt-3 sm:pt-4 flex flex-col gap-1 sm:gap-2 flex-shrink-0">
          <div className="grid grid-cols-[auto_1fr_auto] items-center w-full gap-2">
            <div className="flex justify-start min-w-[60px] sm:min-w-[80px]">
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="flex items-center gap-1 font-medium hover:opacity-80 transition cursor-pointer text-[15px] sm:text-[18px] md:text-[20px] text-[#FAFAFA]"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span>Atrás</span>
                </button>
              )}
            </div>

            <h1 className="text-[16px] xs:text-[18px] sm:text-[22px] md:text-[24px] text-[#FAFAFA] font-bold tracking-wide text-center truncate px-1">
              Huella hídrica
            </h1>

            <div className="flex justify-end min-w-[60px] sm:min-w-[80px]">
              {onExit && (
                <button
                  type="button"
                  onClick={onExit}
                  className="flex items-center gap-1 font-medium hover:opacity-80 transition cursor-pointer text-[15px] sm:text-[18px] md:text-[20px] text-[#FAFAFA]"
                >
                  <span>Salir</span>
                  <LogOut className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                </button>
              )}
            </div>
          </div>

          {/* Stepper */}
          <WaterStepper
            currentCategoryIndex={currentCategoryIndex}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestionsInCategory={totalQuestionsInCategory}
          />
        </header>

        {/* Contenido: ocupa el espacio restante, scroll si es necesario */}
        <main className="relative z-10 flex-1 flex items-start justify-center px-3 sm:px-4 pt-8 sm:pt-12 pb-3 sm:pb-4 overflow-y-auto no-scrollbar">
          <div className="relative w-full max-w-md sm:max-w-lg bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/40 text-gray-800 text-center transition-all flex flex-col items-center my-auto">
            {/* Avatar circular */}
            <div className="absolute -top-8 sm:-top-12 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-24 sm:h-24 bg-[#F2F2F2] rounded-full border-2 sm:border-4 border-white shadow-md flex items-center justify-center p-1 sm:p-1.5 z-20">
              {typeof icon === "string" ? (
                <img
                  src={icon}
                  alt="Icono Pregunta"
                  className="max-w-full max-h-full object-contain pointer-events-none"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-700">
                  {icon}
                </div>
              )}
            </div>

            {/* Contenido dinámico (sin scroll interno) */}
            <div className="w-full px-4 sm:px-8 pt-8 sm:pt-12 pb-2 sm:pb-4 flex flex-col items-center">
              {children}
            </div>

            {/* Botón Continuar (si existe) */}
            {onNext && (
              <div className="w-full px-4 sm:px-8 pb-4 sm:pb-6 pt-1 sm:pt-2">
                <Button3DWater
                  onClick={onNext}
                  disabled={isNextDisabled}
                  width="100%"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>{nextText}</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  </div>
                </Button3DWater>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}