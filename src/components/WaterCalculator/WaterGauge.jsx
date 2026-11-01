import React from "react";

/**
 * Componente de Gauge en semicírculo
 */
export function WaterGauge({ totalValue, level, unitText = "Litros / año" }) {
  // Escala máxima referencial para el gauge en L/año (ej. 2,500,000) o L/mes
  const maxScale = unitText.includes("año") ? 2500000 : 200000;
  const ratio = Math.min(1, Math.max(0, totalValue / maxScale));

  // Cálculo del arco SVG (semicírculo)
  const radius = 80;
  const cx = 100;
  const cy = 95;
  const strokeWidth = 14;

  // Ángulos: de -180 deg (izquierda) a 0 deg (derecha)
  const angle = -180 + ratio * 180;
  const rad = (angle * Math.PI) / 180;
  
  // Punto final del arco relleno
  const endX = cx + radius * Math.cos(rad);
  const endY = cy + radius * Math.sin(rad);

  // Bandera arc SVG path
  const largeArcFlag = ratio > 0.5 ? 1 : 0;
  const filledPath = `M ${cx - radius} ${cy} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;

  // Colores por nivel
  const levelColors = {
    BAJO: "#3BB273",
    MEDIA: "#EAB308",
    ALTA: "#F97316",
    "MUY ALTA": "#EF4444",
  };

  const currentColor = levelColors[level?.nivel] || "#3BB273";

  // Formato para números grandes compactos
  const formattedNumber = new Intl.NumberFormat("es-BO").format(Math.round(totalValue));

  return (
    <div className="flex flex-col items-center justify-center relative w-full max-w-[280px] mx-auto font-quicksand">
      <div className="relative w-full aspect-[2/1] overflow-hidden flex items-end justify-center">
        <svg viewBox="0 0 200 110" className="w-full h-full overflow-visible">
          {/* Fondo del Arco (Gris claro) */}
          <path
            d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Relleno del Arco según consumo */}
          {ratio > 0.02 && (
            <path
              d={filledPath}
              fill="none"
              stroke={currentColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          )}
        </svg>

        {/* Contenido en el centro del Arco */}
        <div className="absolute bottom-1 flex flex-col items-center justify-center text-center">
          <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-none">
            {formattedNumber}
          </span>
          <span className="text-xs sm:text-sm font-medium text-gray-500 mt-1">
            {unitText}
          </span>

          {/* Badge Semáforo */}
          <div
            className="mt-2 px-3 py-0.5 rounded-full text-white text-xs font-bold flex items-center gap-1 shadow-xs"
            style={{ backgroundColor: currentColor }}
          >
            <span>🍃</span>
            <span>{level?.etiqueta || "Bajo"}</span>
          </div>
        </div>
      </div>

      {/* Leyendas Inferiores */}
      <div className="w-full flex justify-between items-center text-[10px] sm:text-xs text-gray-400 font-medium mt-3 px-2">
        <div className="flex flex-col items-start">
          <span className="font-bold text-gray-600">0</span>
          <span>Bajo impacto</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-bold text-gray-600">+1.8M</span>
          <span>Alto impacto</span>
        </div>
      </div>
    </div>
  );
}
