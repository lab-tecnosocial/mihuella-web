import { useEffect, useMemo, useState } from "react";
import { Truck, CheckCircle2, ArrowLeft } from "lucide-react";
import { WaterQuestionLayout } from "./WaterQuestionLayout";
import { leerRespuestas } from "./calculo/almacenamiento";
import {
  calcularHuellaHidrica,
  PROMEDIO_BOLIVIA_ANUAL_LITROS,
} from "./calculo/hidrica_calculo";

const CALCULADORA_URL = "/feature/calculadora-huella-hidrica-v2";

const SECCIONES = [
  { id: "higiene", label: "Higiene" },
  { id: "limpieza", label: "Limpieza" },
  { id: "alimentos", label: "Alimentos" },
  { id: "bienes", label: "Bienes y servicios" },
  { id: "aguaVirtual", label: "Agua virtual" },
  { id: "habitos", label: "Hábitos sostenibles" },
];

const formatearLitros = (litros) => {
  if (litros >= 1000000) return `${(litros / 1000000).toFixed(1)}M`;
  if (litros >= 1000) return `${(litros / 1000).toFixed(1)}K`;
  return Math.round(litros).toLocaleString("es-BO");
};

const botonClass =
  "px-6 py-2.5 rounded-lg bg-[#6CC0EE] hover:bg-[#55AEE0] text-white font-quicksand font-semibold text-sm sm:text-base transition active:scale-95 cursor-pointer";

function ResumenHuella({ resultado, onVerEstadisticas }) {
  const mensaje = resultado.porDebajoDelPromedio
    ? "Tu huella hídrica anual está por debajo del promedio estimado en Bolivia. Esto indica que ya estás tomando decisiones más conscientes. Continúa así y considera seguir reduciendo con pequeñas acciones que suman cada día."
    : "Tu huella hídrica anual está por encima del promedio estimado en Bolivia. Revisa en Estadísticas qué secciones pesan más y empieza por ahí.";

  return (
    <div className="flex flex-col items-center w-full gap-6 font-quicksand">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
        <div className="flex flex-col items-center text-center">
          <p className="text-sm text-gray-600">Tu huella hídrica es:</p>
          <p className="text-4xl sm:text-5xl font-bold text-[#1F6FB8] my-2">
            {formatearLitros(resultado.anual)}
          </p>
          <p className="text-sm font-semibold text-gray-600">Litros/año</p>
          <p className="text-sm text-gray-500 mt-3 max-w-[16rem]">
            Una persona consume una media de{" "}
            {PROMEDIO_BOLIVIA_ANUAL_LITROS.toLocaleString("es-BO")} litros por año en Bolivia
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#F8F8F8] rounded-xl px-4 py-3 max-w-[15rem]">
          <Truck className="w-5 h-5 text-[#1F6FB8] shrink-0" />
          <p className="text-sm text-[#1F6FB8] text-left">
            En un año, tu huella hídrica equivale al agua contenida en{" "}
            <span className="text-2xl font-bold text-gray-700">{resultado.camionesCisterna}</span>{" "}
            camiones cisterna
          </p>
        </div>
      </div>

      <div className="flex gap-3 w-full text-left bg-[#F0FDF4] border-l-4 border-[#16A34A] rounded-lg px-4 py-3">
        <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
        <p className="text-sm text-[#166534] leading-relaxed">
          {resultado.porDebajoDelPromedio && <strong>¡Felicidades! </strong>}
          {mensaje}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <button type="button" onClick={onVerEstadisticas} className={botonClass}>
          Estadísticas
        </button>
        <a href="/articuloHH" className={botonClass}>
          ¿Cómo ahorrar?
        </a>
      </div>
    </div>
  );
}

function EstadisticasHuella({ resultado, onVolver }) {
  return (
    <div className="flex flex-col w-full gap-4 font-quicksand">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#1F6FB8] text-center mb-2">
        Estadísticas
      </h2>

      {SECCIONES.map(({ id, label }) => {
        const porcentaje = resultado.porcentajes[id];
        return (
          <div key={id} className="flex flex-col gap-1 text-left">
            <span className="text-sm font-semibold text-gray-700">{label}</span>
            <div className="relative h-7 w-full bg-[#F8F8F8] rounded-md overflow-hidden">
              <div
                className="h-full bg-[#6A7BC8] rounded-md transition-all"
                style={{ width: `${Math.min(porcentaje, 100)}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black">
                {Math.round(porcentaje)}%
              </span>
            </div>
          </div>
        );
      })}

      <div className="flex justify-center mt-2">
        <button type="button" onClick={onVolver} className={botonClass}>
          Volver al resultado
        </button>
      </div>
    </div>
  );
}

export function WaterResult() {
  // undefined = todavía leyendo sessionStorage (solo existe en el navegador); null = no hay respuestas.
  const [respuestas, setRespuestas] = useState(undefined);
  const [vista, setVista] = useState("resumen");

  useEffect(() => {
    setRespuestas(leerRespuestas());
  }, []);

  const resultado = useMemo(
    () => (respuestas ? calcularHuellaHidrica(respuestas) : null),
    [respuestas],
  );

  return (
    <WaterQuestionLayout
      currentCategoryIndex={-1}
      icon="/img/huella-hidrica-icon.webp"
      onBack={() => (window.location.href = CALCULADORA_URL)}
      onExit={() => (window.location.href = "/")}
    >
      {respuestas === undefined && (
        <p className="text-sm text-gray-500 font-quicksand">Calculando tu huella...</p>
      )}

      {respuestas === null && (
        <div className="flex flex-col items-center gap-4 font-quicksand">
          <p className="text-gray-600">
            Aún no tenemos tus respuestas. Completa el cuestionario para ver tu huella hídrica.
          </p>
          <a href={CALCULADORA_URL} className={botonClass}>
            <span className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Ir al cuestionario
            </span>
          </a>
        </div>
      )}

      {resultado && vista === "resumen" && (
        <ResumenHuella resultado={resultado} onVerEstadisticas={() => setVista("estadisticas")} />
      )}

      {resultado && vista === "estadisticas" && (
        <EstadisticasHuella resultado={resultado} onVolver={() => setVista("resumen")} />
      )}
    </WaterQuestionLayout>
  );
}
