import React from "react";
import { Droplets, ShowerHead, Utensils, ShoppingBag, Leaf } from "lucide-react";
import { WaterQuestionLayout } from "./WaterQuestionLayout";

export function WaterCalculatorOnboarding({
  onBackToHome,
  onStartCalculation,
}) {
  // Clase base reutilizable para todas las pastillas
  const badgeClass =
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#737373] text-[#737373] bg-white font-quicksand font-medium text-xs sm:text-sm";

  return (
    <WaterQuestionLayout
      currentCategoryIndex={-1}
      icon="/img/huella-hidrica-icon.webp"
      onBack={onBackToHome}
      onExit={onBackToHome}
      onNext={onStartCalculation}
      nextText="Comenzar"
    >
      <div className="flex flex-col items-center text-center text-black w-full max-w-md mx-auto">
        {/* Contenedor descriptivo superior */}
        <div className="w-full bg-[#FAFAFA] border border-[#A3A3A3] rounded-2xl px-5 py-4 mb-5 text-center shadow-sm">
          <p className="font-quicksand font-medium text-xs sm:text-sm leading-relaxed text-[#262626]">
            La huella hídrica mide la cantidad de agua dulce que utilizas de
            forma directa e indirecta en tus actividades diarias, desde la
            alimentación hasta el consumo de bienes.
          </p>
        </div>

        {/* Sección: Tomaremos en cuenta... */}
        <div className="w-full text-left mb-5">
          <h2 className="font-quicksand font-bold text-sm sm:text-base text-[#171717] mb-2.5">
            Tomaremos en cuenta...
          </h2>

          <div className="flex flex-wrap gap-2">
            <span className={badgeClass}>
              <ShowerHead className="w-4 h-4" />
              <span>Tu higiene diaria</span>
            </span>

            <span className={badgeClass}>
              <Droplets className="w-4 h-4" />
              <span>Limpieza del hogar</span>
            </span>

            <span className={badgeClass}>
              <Utensils className="w-4 h-4" />
              <span>Alimentos y bebidas</span>
            </span>

            <span className={badgeClass}>
              <ShoppingBag className="w-4 h-4" />
              <span>Bienes y servicios</span>
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
              <Droplets className="w-4 h-4" />
              <span>Factura de agua</span>
            </span>

            <span className={badgeClass}>
              <Leaf className="w-4 h-4" />
              <span>Hábitos de consumo</span>
            </span>
          </div>
        </div>
      </div>
    </WaterQuestionLayout>
  );
}