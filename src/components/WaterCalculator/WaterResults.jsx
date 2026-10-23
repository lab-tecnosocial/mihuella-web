import { useState } from "react";
import { LogOut, ArrowRight, ChevronDown } from "lucide-react";
import { calculateWaterFootprint } from "./waterCalculator";
import { WaterGauge } from "./WaterGauge";

export function WaterResults({ answers, onRestart, onExit }) {
  // Periodo seleccionado: 'anual' (default) o 'mensual'
  const [period, setPeriod] = useState("anual");

  // Módulo de cálculo 2026
  const results = calculateWaterFootprint(answers);

  const isAnual = period === "anual";
  const totalDisplayValue = isAnual ? results.totalAnio : results.totalMes;
  const unitText = isAnual ? "Litros / año" : "Litros / mes";

  const formattedValue = (val) =>
    new Intl.NumberFormat("es-BO").format(Math.round(val));

  return (
    <div className="w-full max-w-4xl mx-auto font-quicksand px-2 sm:px-4 py-4 text-gray-800">
      {/* 1. BARRA SUPERIOR HEADER */}
      <div className="flex items-center justify-between w-full mb-6 px-2 text-white">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-wide">
          Huella hídrica
        </h1>
        <button
          type="button"
          onClick={onExit}
          className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-sm px-4 py-1.5 rounded-full transition cursor-pointer"
        >
          <span>Salir</span>
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* 2. TARJETA PRINCIPAL DE RESULTADOS */}
      <div className="relative bg-white/95 backdrop-blur-lg rounded-3xl p-5 sm:p-8 shadow-2xl border border-white/40">
        {/* Mascotita de la gotita flotante en la parte superior central */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full p-2 shadow-lg flex items-center justify-center border-4 border-blue-100">
          <img
            src="/img/huella-hidrica-icon.webp"
            alt="Mascota Huella Hídrica"
            className="w-full h-full object-contain"
          />
        </div>

        {/* CONTENIDO PRINCIPAL: GRID 2 COLUMNAS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 items-center">
          {/* PANEL IZQUIERDO: DIAGNÓSTICO Y MEDIDOR SEMÁFORO */}
          <div className="md:col-span-5 flex flex-col items-center text-center justify-center border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-6">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug mb-6 max-w-xs">
              {results.semaforo.titulo}
            </h2>

            {/* Medidor Semicircular */}
            <WaterGauge
              totalValue={totalDisplayValue}
              level={results.semaforo}
              unitText={unitText}
            />
          </div>

          {/* PANEL DERECHO: DESGLOSE POR CATEGORÍAS */}
          <div className="md:col-span-7 flex flex-col justify-between">
            {/* Header de Categorías y Selector de Período */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-extrabold text-gray-900">
                Por categorías
              </h3>

              {/* Dropdown de período */}
              <div className="relative inline-block">
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="appearance-none bg-blue-50/80 border border-blue-200 text-blue-900 font-bold text-xs sm:text-sm px-3.5 py-1.5 pr-8 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2178BD]"
                >
                  <option value="anual">Lt H2O/Anual</option>
                  <option value="mensual">Lt H2O/Mensual</option>
                </select>
                <ChevronDown className="w-4 h-4 text-blue-800 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Lista de las 6 categorías */}
            <div className="space-y-3.5 my-2">
              {results.sectores.map((sec) => {
                const valorDisplay = isAnual ? sec.valorAnual : sec.valorMensual;

                return (
                  <div
                    key={sec.id}
                    className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-gray-700"
                  >
                    {/* Icono redondeado */}
                    <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                      <img
                        src={sec.icon}
                        alt={sec.nombre}
                        className="w-5 h-5 object-contain"
                      />
                    </div>

                    {/* Nombre */}
                    <span className="w-20 sm:w-24 font-bold text-gray-800 truncate">
                      {sec.nombre}
                    </span>

                    {/* Barra de progreso con Pill de porcentaje */}
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#2178BD] rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, Math.max(5, sec.porcentaje))}%` }}
                        />
                      </div>
                      <span className="bg-blue-100 text-[#124168] font-extrabold text-[11px] px-2 py-0.5 rounded-md min-w-[36px] text-center">
                        {sec.porcentaje}%
                      </span>
                    </div>

                    {/* Valor numérico en Lt */}
                    <span className="w-20 sm:w-24 text-right font-bold text-gray-900">
                      {formattedValue(valorDisplay)} Lt
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. BANNER INFERIOR PROMOCIONAL DE LA APP Y ACCIONES */}
        <div className="mt-8 bg-gradient-to-r from-[#D3E9F8] to-[#C1E2F7] border border-[#B1D8F4] rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-left">
            <img
              src="/img/cellphone.webp"
              alt="App Mi Huella"
              className="w-12 h-20 object-contain hidden sm:block shrink-0"
            />
            <div>
              <h4 className="text-base sm:text-lg font-black text-gray-900">
                Sigue tu progreso en la app
              </h4>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mt-0.5">
                Guarda tu historial y ve la evolución de tu huella hídrica con el tiempo.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href="https://labtecnosocial.org/category/tecnologias/app-movil/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2178BD] hover:bg-[#1a629b] text-white font-extrabold text-sm px-5 py-3 rounded-xl shadow-md transition cursor-pointer"
            >
              <span>Descargar la app</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={onRestart || onExit}
              className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 font-bold text-xs sm:text-sm px-3 py-2 cursor-pointer transition"
            >
              <span>Volver al inicio</span>
              <LogOut className="w-4 h-4 transform rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
