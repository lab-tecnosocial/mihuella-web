import React from "react";
import { ArrowLeft, LogOut, ArrowRight } from "lucide-react";
import { Button3D } from "./Button3D";
import { CarbonStepper } from "./CarbonStepper";

export function CarbonQuestionLayout({
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
        header:not(.carbon-header), footer:not(.carbon-footer) {
          display: none !important;
        }
        body, html {
          overflow: hidden !important;
          margin: 0 !important;
          padding: 0 !important;
          height: 100% !important;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="fixed inset-0 z-[9999] w-full h-full bg-[#3BB168] flex flex-col justify-between overflow-hidden font-sans text-white select-none">
        {/* FONDO ILUSTRADO */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0"
          style={{
            backgroundImage: `url('/img/bg-huella-carbono-01.webp')`,
          }}
        />

        {/* HEADER SUPERIOR RESPONSIVO */}
        <header className="carbon-header relative z-10 w-full max-w-5xl mx-auto px-3 sm:px-8 pt-3 sm:pt-6 flex flex-col gap-1 sm:gap-3">
          <div className="grid grid-cols-[auto_1fr_auto] items-center w-full gap-2">
            {/* Botón Atrás */}
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

            {/* Título Central Responsivo */}
            <h1 className="text-[16px] xs:text-[18px] sm:text-[22px] md:text-[24px] text-[#FAFAFA] font-bold tracking-wide text-center truncate px-1">
              Huella de carbono
            </h1>

            {/* Botón Salir */}
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

          {/* Stepper de Progreso */}
          <CarbonStepper
            currentCategoryIndex={currentCategoryIndex}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestionsInCategory={totalQuestionsInCategory}
          />
        </header>

        {/* CONTENEDOR CENTRAL AJUSTADO A MÓVILES */}
        <main className="relative z-10 flex-1 flex items-center justify-center px-3 sm:px-4 pb-3 sm:pb-4 pt-10 sm:pt-14">
          <div className="relative w-full max-w-md sm:max-w-lg bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/40 text-gray-800 text-center transition-all flex flex-col items-center">
            {/* AVATAR CIRCULAR RESPONSIVO */}
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

            {/* Contenido con scroll interno */}
            <div className="w-full p-4 sm:p-8 pt-10 sm:pt-16 flex flex-col items-center justify-between min-h-[300px] sm:min-h-[360px] max-h-[calc(100vh-160px)] overflow-y-auto no-scrollbar">
              <div className="w-full flex-1 flex flex-col justify-center">
                {children}
              </div>

              {/* BOTÓN CONTINUAR */}
              {onNext && (
                <div className="pt-3 sm:pt-4 w-full flex justify-center">
                  <Button3D
                    onClick={onNext}
                    disabled={isNextDisabled}
                    width="100%"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span>{nextText}</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    </div>
                  </Button3D>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
