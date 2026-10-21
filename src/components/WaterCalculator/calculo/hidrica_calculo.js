// Lógica de la huella hídrica, traducida paso a paso de la hoja "Calculo 2026" del Excel.
// Cada función replica un bloque del Excel; las celdas de origen se indican en los comentarios.

export const SEMANAS_POR_MES = 4; // Excel C4
export const DIAS_POR_MES = 30; // Excel C5
export const MESES_POR_ANIO = 12; // Excel C7
export const MESES_DE_LLUVIA = 4; // Excel C8

export const PROMEDIO_BOLIVIA_ANUAL_LITROS = 3468000;
export const LITROS_POR_CAMION_CISTERNA = 15000; // Excel M82

const LITROS_POR_MINUTO_DUCHA = 20; // Excel F19
const LITROS_POR_MINUTO_LLAVE = 5; // Excel F20
const MINUTOS_POR_CEPILLADO = 2; // Excel H20 (fórmula)
const LITROS_POR_LAVADO_DE_MANOS = 1.5; // Excel F21
const DESCARGAS_DE_INODORO_POR_DIA = 7; // Excel H23/H24 (fórmula)
const LITROS_POR_DESCARGA = { ahorrador: 5, tradicional: 10 }; // Excel F23/F24

const LITROS_POR_CARGA_DE_ROPA = { mano: 105, lavadoraComun: 120, lavadoraModerna: 50 }; // Excel F26:F28
const LITROS_POR_LAVADO_DE_PLATOS = { mano: 40, lavavajillas: 12 }; // Excel F31:F32

// Alimentos y bebidas. La unidad depende del alimento (kg, unidades o tazas/vasos),
// tal como indica la columna "Factor de consumo" del Excel (G37:G54).
const LITROS_POR_ALIMENTO = {
  res: 15415, // kg
  pollo: 4300, // kg
  cerdo: 6000, // kg
  cordero: 8700, // kg
  pescado: 122, // kg
  huevos: 196, // unidad
  arroz: 2497, // kg
  fideo: 1849, // kg
  platano: 160, // unidad
  naranja: 80, // unidad
  te: 56, // taza
  cafe: 132, // taza
  leche: 255, // vaso
  jugos: 170, // vaso
  gaseosa: 74, // vaso
};

const LITROS_POR_PRENDA_O_PRODUCTO = {
  calzado: 6500, // Excel F57
  jeans: 8000, // Excel F58
  camisetas: 2700, // Excel F59
  celular: 12760, // Excel F60 (se divide entre 5 años)
};
const ANIOS_DE_VIDA_DEL_CELULAR = 5;

const LITROS_POR_TANQUE_DE_LLUVIA = 159; // Excel F63
const LITROS_POR_CARGA_REUTILIZADA = 75; // Excel F66
const LITROS_POR_KG_DE_PAPEL = 26.5; // Excel F68

const ML_POR_CONSULTA_DE_IA = 10; // Excel F70
const LITROS_POR_CORREO_ELIMINADO = 0.775; // Excel F71
const FACTOR_DE_CORREOS = 300 / 4; // Excel H71 (constante tomada tal cual del Excel)

export const LIMITES_CLASIFICACION = [
  { hasta: 1000000, nivel: 'BAJO' },
  { hasta: 1400000, nivel: 'MEDIA' },
  { hasta: 1800000, nivel: 'ALTA' },
];

const numero = (valor) => Number(valor) || 0;

const consumoSemanalDeSeleccion = (seleccion = [], cantidades = {}, litrosPorUnidad) =>
  Object.entries(litrosPorUnidad).reduce(
    (total, [id, litros]) =>
      seleccion.includes(id) ? total + numero(cantidades[id]) * litros : total,
    0,
  );

// Excel H19:H24 y K5 (litros/mes)
export const calcularHigiene = (respuestas) => {
  const duchas =
    SEMANAS_POR_MES *
    numero(respuestas.showerFrequencyPerWeek) *
    numero(respuestas.showerMinutes) *
    LITROS_POR_MINUTO_DUCHA;
  const cepillado =
    DIAS_POR_MES *
    numero(respuestas.teethBrushingFrequencyPerDay) *
    MINUTOS_POR_CEPILLADO *
    LITROS_POR_MINUTO_LLAVE;
  const lavadoDeManos =
    DIAS_POR_MES * numero(respuestas.handWashingFrequencyPerDay) * LITROS_POR_LAVADO_DE_MANOS;
  const inodoro =
    DIAS_POR_MES *
    DESCARGAS_DE_INODORO_POR_DIA *
    (LITROS_POR_DESCARGA[respuestas.toiletType] ?? 0);

  return duchas + cepillado + lavadoDeManos + inodoro;
};

// Excel H26:H32 y K6 (litros/mes)
export const calcularLimpieza = (respuestas) => {
  const ropa =
    SEMANAS_POR_MES *
    numero(respuestas.clothesWashingFrequencyPerWeek) *
    (LITROS_POR_CARGA_DE_ROPA[respuestas.clothesWashingMethod] ?? 0);
  const platos =
    DIAS_POR_MES *
    numero(respuestas.dishwashingTimesPerDay) *
    (LITROS_POR_LAVADO_DE_PLATOS[respuestas.dishwashingMethod] ?? 0);

  return ropa + platos;
};

// Excel H37:H54 y K7 (litros/mes). El pan (H55) no entra en K7 en el Excel, por eso no se suma aquí.
export const calcularAlimentos = (respuestas) => {
  const seleccion = [
    ...(respuestas.proteins ?? []),
    ...(respuestas.cereals ?? []),
    ...(respuestas.fruits ?? []),
    ...(respuestas.drinks ?? []),
  ];
  const cantidades = {
    ...respuestas.proteinAmounts,
    ...respuestas.cerealAmounts,
    ...respuestas.fruitAmounts,
    ...respuestas.drinkAmounts,
  };

  return (
    SEMANAS_POR_MES *
    consumoSemanalDeSeleccion(seleccion, cantidades, LITROS_POR_ALIMENTO)
  );
};

// Excel H57:H60 y L8 (litros/año). Nota: el Excel usa E57 (calzado) como cantidad en jeans y camisetas; aquí se usa cada cantidad propia.
export const calcularBienesAnual = (respuestas) =>
  numero(respuestas.shoePairsPerYear) * LITROS_POR_PRENDA_O_PRODUCTO.calzado +
  numero(respuestas.jeansPerYear) * LITROS_POR_PRENDA_O_PRODUCTO.jeans +
  numero(respuestas.shirtsPerYear) * LITROS_POR_PRENDA_O_PRODUCTO.camisetas +
  (numero(respuestas.phonesLast5Years) * LITROS_POR_PRENDA_O_PRODUCTO.celular) /
    ANIOS_DE_VIDA_DEL_CELULAR;

// Excel H63:H68 y L9 (litros/año)
export const calcularHabitosAnual = (respuestas) => {
  const lluvia = respuestas.hasRainwaterSystem
    ? LITROS_POR_TANQUE_DE_LLUVIA * MESES_DE_LLUVIA
    : 0;
  const reutilizacion = respuestas.reusesWashingWater ? LITROS_POR_CARGA_REUTILIZADA : 0;
  const papel = numero(respuestas.paperRecycledKgPerYear) * LITROS_POR_KG_DE_PAPEL;

  return lluvia + reutilizacion + papel;
};

// Excel H70:H71 y K10 (litros/mes)
export const calcularAguaVirtual = (respuestas) => {
  const inteligenciaArtificial =
    (numero(respuestas.aiUsesPerWeek) * ML_POR_CONSULTA_DE_IA * SEMANAS_POR_MES) / 1000;
  const correos =
    numero(respuestas.emailsDeletedPerMonth) * FACTOR_DE_CORREOS * LITROS_POR_CORREO_ELIMINADO;

  return inteligenciaArtificial + correos;
};

export const clasificarConsumo = (litrosAnuales) => {
  const limite = LIMITES_CLASIFICACION.find(({ hasta }) => litrosAnuales <= hasta);
  return limite ? limite.nivel : 'MUY ALTA';
};

const porcentaje = (parte, total) => (total > 0 ? (parte / total) * 100 : 0);

// Excel K11 y L11: total = (higiene + limpieza + alimentos + bienes + agua virtual) − hábitos
export const calcularHuellaHidrica = (respuestas = {}) => {
  const higiene = calcularHigiene(respuestas);
  const limpieza = calcularLimpieza(respuestas);
  const alimentos = calcularAlimentos(respuestas);
  const bienes = calcularBienesAnual(respuestas) / MESES_POR_ANIO;
  const aguaVirtual = calcularAguaVirtual(respuestas);
  const habitos = calcularHabitosAnual(respuestas) / MESES_POR_ANIO;

  const brutoMensual = higiene + limpieza + alimentos + bienes + aguaVirtual;
  const totalMensual = brutoMensual - habitos;
  const totalAnual = totalMensual * MESES_POR_ANIO;

  return {
    mensual: { higiene, limpieza, alimentos, bienes, aguaVirtual, habitos, total: totalMensual },
    anual: totalAnual,
    porcentajes: {
      higiene: porcentaje(higiene, brutoMensual),
      limpieza: porcentaje(limpieza, brutoMensual),
      alimentos: porcentaje(alimentos, brutoMensual),
      bienes: porcentaje(bienes, brutoMensual),
      aguaVirtual: porcentaje(aguaVirtual, brutoMensual),
      habitos: porcentaje(habitos, brutoMensual),
    },
    clasificacion: clasificarConsumo(totalAnual),
    camionesCisterna: Math.floor(totalAnual / LITROS_POR_CAMION_CISTERNA),
    porDebajoDelPromedio: totalAnual < PROMEDIO_BOLIVIA_ANUAL_LITROS,
  };
};
