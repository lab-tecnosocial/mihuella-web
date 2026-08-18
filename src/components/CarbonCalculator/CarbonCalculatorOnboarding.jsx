import React from "react";
import { Apple, Zap, CarTaxiFront, Lightbulb, Flame } from "lucide-react";
import { CarbonQuestionLayout } from "./CarbonQuestionLayout";

export function CarbonCalculatorOnboarding({
  onBackToHome,
  onStartCalculation,
}) {
  // Clase base reutilizable para todas las pastillas
  const badgeClass =
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#737373] text-[#737373] bg-white font-quicksand font-medium text-xs sm:text-sm";

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={-1}
      icon="/src/assets/images/semilla.webp"
      onBack={onBackToHome}
      onExit={onBackToHome}
      onNext={onStartCalculation}
      nextText="Comenzar"
    >
      <div className="flex flex-col items-center text-center text-black w-full max-w-md mx-auto">
        {/* Contenedor descriptivo superior */}
        <div className="w-full bg-[#FAFAFA] border border-[#A3A3A3] rounded-2xl px-5 py-4 mb-5 text-center shadow-sm">
          <p className="font-quicksand font-medium text-xs sm:text-sm leading-relaxed text-[#262626]">
            La huella de carbono representa el volumen total de Gases de Efecto
            Invernadero que producen las actividades económicas y cotidianas del
            ser humano.
          </p>
        </div>

        {/* Sección: Tomaremos en cuenta... */}
        <div className="w-full text-left mb-5">
          <h2 className="font-quicksand font-bold text-sm sm:text-base text-[#171717] mb-2.5">
            Tomaremos en cuenta...
          </h2>

          <div className="flex flex-wrap gap-2">
            <span className={badgeClass}>
              <Apple className="w-4 h-4" />
              <span>Tu dieta</span>
            </span>

            <span className={badgeClass}>
              <Zap className="w-4 h-4" />
              <span>Consumo de energía</span>
            </span>

            <span className={badgeClass}>
              <CarTaxiFront className="w-4 h-4" />
              <span>Modo de transporte</span>
            </span>
          </div>
        </div>

        {/* Sección: Antes de comenzar... */}
        <div className="w-full text-left">
          <h2 className="font-quicksand font-bold text-sm sm:text-base text-[#171717] leading-snug mb-2.5">
            Antes de comenzar...
            <br />
            <span className="font-medium text-[#171717]">
              ten en mano lo siguiente:
            </span>
          </h2>

          <div className="flex flex-wrap gap-2">
            <span className={badgeClass}>
              <Lightbulb className="w-4 h-4" />
              <span>Factura de luz</span>
            </span>

            <span className={badgeClass}>
              <Flame className="w-4 h-4" />
              <span>Factura de gas</span>
            </span>
          </div>
        </div>
      </div>
    </CarbonQuestionLayout>
  );
}
