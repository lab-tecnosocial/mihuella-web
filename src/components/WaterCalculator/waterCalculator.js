/**
 * Cálculo de Huella Hídrica Personal – Versión 2026
 * Basado en la especificación de Calculo_Huella_Hidrica_2026.md
 */

const SEMANAS_MES = 4;
const DIAS_MES = 30;
const MESES_ANIO = 12;
const MESES_LLUVIA = 4;

export function calculateWaterFootprint(answers = {}) {
  // --- 1. HIGIENE ---
  const showerFrequencyPerWeek = Number(answers.showerFrequencyPerWeek) || 0;
  const showerMinutes = Number(answers.showerMinutes) || 0;
  const teethBrushingFrequencyPerDay = Number(answers.teethBrushingFrequencyPerDay) || 0;
  const handWashingFrequencyPerDay = Number(answers.handWashingFrequencyPerDay) || 0;
  
  // inodoro: 'ahorrador' = 5L, 'tradicional' = 10L (default: 10L)
  const isAhorrador = answers.toiletType === "ahorrador" || answers.toiletType === "ahorrador (doble botón)";
  const factorInodoro = isAhorrador ? 5 : 10;

  const duchaMes = SEMANAS_MES * showerFrequencyPerWeek * showerMinutes * 20;
  const dientesMes = DIAS_MES * teethBrushingFrequencyPerDay * 2 * 5; // 2 min * 5 L/min
  const manosMes = DIAS_MES * handWashingFrequencyPerDay * 1.5;
  const inodoroMes = DIAS_MES * 7 * factorInodoro; // 7 descargas/día

  const higieneMes = duchaMes + dientesMes + manosMes + inodoroMes;
  const higieneAnio = higieneMes * MESES_ANIO;

  // --- 2. LIMPIEZA ---
  const clothesWashingFrequencyPerWeek = Number(answers.clothesWashingFrequencyPerWeek) || 0;
  // metodo_ropa: 'mano' = 105L, 'comun' = 120L, 'moderna' = 50L (default 105L)
  let factorRopa = 105;
  if (answers.washingMethod === "comun" || answers.washingMethod === "lavadoraEstandar") factorRopa = 120;
  else if (answers.washingMethod === "moderna" || answers.washingMethod === "lavadoraEficiente") factorRopa = 50;

  const dishwashingTimesPerDay = Number(answers.dishwashingTimesPerDay) || 0;
  const factorPlatos = answers.dishwashingMethod === "lavavajillas" ? 12 : 40;

  const ropaMes = SEMANAS_MES * clothesWashingFrequencyPerWeek * factorRopa;
  const platosMes = DIAS_MES * dishwashingTimesPerDay * factorPlatos;

  const limpiezaMes = ropaMes + platosMes;
  const limpiezaAnio = limpiezaMes * MESES_ANIO;

  // --- 3. ALIMENTOS Y BEBIDAS (DIETA) ---
  const proteinAmounts = answers.proteinAmounts || {};
  const cerealAmounts = answers.cerealAmounts || {};
  const fruitAmounts = answers.fruitAmounts || {};
  const drinkAmounts = answers.drinkAmounts || {};

  // Proteínas (kg o unidades por semana)
  const resKg = Number(proteinAmounts.res) || 0;
  const polloKg = Number(proteinAmounts.pollo) || 0;
  const cerdoKg = Number(proteinAmounts.cerdo) || 0;
  const corderoKg = Number(proteinAmounts.cordero) || 0;
  const pescadoKg = Number(proteinAmounts.pescado) || 0;
  const huevosU = Number(proteinAmounts.huevos) || 0;

  const proteinasMes = SEMANAS_MES * (
    resKg * 15415 +
    polloKg * 4300 +
    cerdoKg * 6000 +
    corderoKg * 8700 +
    pescadoKg * 122 +
    huevosU * 196
  );

  // Cereales (kg/semana, y pan en piezas/día o kg/semana)
  const arrozKg = Number(cerealAmounts.arroz) || 0;
  const fideoKg = Number(cerealAmounts.fideo) || 0;
  const avenaKg = Number(cerealAmounts.avena) || 0;
  const quinuaKg = Number(cerealAmounts.quinua) || 0;
  const maizKg = Number(cerealAmounts.maiz) || 0;
  const panPiezasDia = Number(cerealAmounts.pan) || 0;

  const cerealesBaseMes = SEMANAS_MES * (
    arrozKg * 2497 +
    fideoKg * 1849 +
    avenaKg * 2497 +
    quinuaKg * 2497 +
    maizKg * 1222
  );
  // Pan: DIAS_MES * piezas * 0.075 kg/pieza * 1608 L/kg
  const panMes = DIAS_MES * panPiezasDia * 0.075 * 1608;

  const cerealesMes = cerealesBaseMes + panMes;

  // Frutas (kg o unidades por semana)
  const platanoU = Number(fruitAmounts.platano) || 0;
  const naranjaU = Number(fruitAmounts.naranja) || 0;
  const manzanaKg = Number(fruitAmounts.manzana) || 0;
  const uvasKg = Number(fruitAmounts.uvas) || 0;
  const frutillaKg = Number(fruitAmounts.frutilla) || 0;
  const papayaKg = Number(fruitAmounts.papaya) || 0;

  const frutasMes = SEMANAS_MES * (
    platanoU * 160 +
    naranjaU * 80 +
    manzanaKg * 820 +
    uvasKg * 2400 +
    frutillaKg * 300 +
    papayaKg * 460
  );

  // Bebidas (L/semana o tazas/vasos/semana)
  const teU = Number(drinkAmounts.te) || 0;
  const cafeU = Number(drinkAmounts.cafe) || 0;
  const lecheU = Number(drinkAmounts.leche) || 0;
  const jugosU = Number(drinkAmounts.jugos) || 0;
  const gaseosaU = Number(drinkAmounts.gaseosa) || 0;

  const bebidasMes = SEMANAS_MES * (
    teU * 56 +
    cafeU * 132 +
    lecheU * 255 +
    jugosU * 170 +
    gaseosaU * 74
  );

  const alimentosMes = proteinasMes + cerealesMes + frutasMes + bebidasMes;
  const alimentosAnio = alimentosMes * MESES_ANIO;

  // --- 4. BIENES Y SERVICIOS ---
  const calzadoAnio = Number(answers.shoesPerYear) || 0;
  const jeansAnio = Number(answers.jeansPerYear) || 0;
  const camisetasAnio = Number(answers.tshirtsPerYear) || 0;
  const celulares5Anios = Number(answers.smartphonesLast5Years) || 0;

  const bienesAnio = (
    calzadoAnio * 6500 +
    jeansAnio * 8000 +
    camisetasAnio * 2700 +
    (celulares5Anios * 12760) / 5
  );
  const bienesMes = bienesAnio / MESES_ANIO;

  // --- 5. HÁBITOS SOSTENIBLES (AHORRO - SE RESTA) ---
  const recolectaLluvia = answers.rainwaterSystem === true || answers.rainwaterSystem === "Si";
  const reusaLavadora = answers.washingMachineWaterReuse === true || answers.washingMachineWaterReuse === "Si";
  const papelRecicladoKg = Number(answers.paperRecycledPerYear) || 0;

  const lluviaAnio = (recolectaLluvia ? 159 : 0) * MESES_LLUVIA;
  const lavadoraAnio = reusaLavadora ? 75 : 0;
  const papelAnio = papelRecicladoKg * 26.5;

  const habitosAnio = lluviaAnio + lavadoraAnio + papelAnio;
  const habitosMes = habitosAnio / MESES_ANIO;

  // --- 6. AGUA VIRTUAL / TECNOLOGÍA ---
  const usoIaSemana = Number(answers.aiUsePerWeek) || 0;
  const limpiezaCorreosMes = Number(answers.emailCleanupPerMonth) || 0;

  const iaMes = (usoIaSemana * 10 * SEMANAS_MES) / 1000; // 10 ml/consulta -> Litros
  const correosMes = limpiezaCorreosMes * 75 * 0.775;

  const aguaVirtualMes = iaMes + correosMes;
  const aguaVirtualAnio = aguaVirtualMes * MESES_ANIO;

  // --- TOTALES Y SEMÁFORO ---
  const totalAnioBruto = higieneAnio + limpiezaAnio + alimentosAnio + bienesAnio + aguaVirtualAnio;
  const totalAnio = Math.max(0, totalAnioBruto - habitosAnio);
  const totalMes = totalAnio / MESES_ANIO;

  // Clasificación del semáforo según la especificación
  // ≤ 1 000 000 : BAJO
  // > 1 000 000 y ≤ 1 400 000 : MEDIA
  // > 1 400 000 y ≤ 1 800 000 : ALTA
  // > 1 800 000 : MUY ALTA
  let semaforo;
  if (totalAnio <= 1000000) {
    semaforo = {
      nivel: "BAJO",
      etiqueta: "Bajo",
      titulo: "Tus emisiones son bajas ¡Sigue así!",
      color: "#22c55e", // Verde
      bgBadge: "bg-green-500",
      textBadge: "text-white"
    };
  } else if (totalAnio <= 1400000) {
    semaforo = {
      nivel: "MEDIA",
      etiqueta: "Media",
      titulo: "Tu huella es moderada. ¡Hay margen de mejora!",
      color: "#eab308", // Amarillo
      bgBadge: "bg-yellow-500",
      textBadge: "text-white"
    };
  } else if (totalAnio <= 1800000) {
    semaforo = {
      nivel: "ALTA",
      etiqueta: "Alta",
      titulo: "Tu consumo de agua es elevado. ¡Revisa tus hábitos!",
      color: "#f97316", // Naranja
      bgBadge: "bg-orange-500",
      textBadge: "text-white"
    };
  } else {
    semaforo = {
      nivel: "MUY ALTA",
      etiqueta: "Muy alta",
      titulo: "Tu huella hídrica es muy alta. ¡Es hora de actuar!",
      color: "#ef4444", // Rojo
      bgBadge: "bg-red-500",
      textBadge: "text-white"
    };
  }

  const camionesCisterna = Math.round((totalAnio / 15000) * 10) / 10;

  // Suma total para porcentajes visuales
  const sumaAbsoluta = higieneAnio + limpiezaAnio + alimentosAnio + bienesAnio + habitosAnio + aguaVirtualAnio;

  const sectores = [
    {
      id: "higiene",
      nombre: "Higiene",
      icon: "/img/shower.webp",
      valorAnual: higieneAnio,
      valorMensual: higieneMes,
      porcentaje: sumaAbsoluta > 0 ? Math.round((higieneAnio / sumaAbsoluta) * 100) : 0,
    },
    {
      id: "limpieza",
      nombre: "Limpieza",
      icon: "/img/lavar-ropa.webp",
      valorAnual: limpiezaAnio,
      valorMensual: limpiezaMes,
      porcentaje: sumaAbsoluta > 0 ? Math.round((limpiezaAnio / sumaAbsoluta) * 100) : 0,
    },
    {
      id: "alimentos",
      nombre: "Dieta",
      icon: "/img/dieta-icon.webp",
      valorAnual: alimentosAnio,
      valorMensual: alimentosMes,
      porcentaje: sumaAbsoluta > 0 ? Math.round((alimentosAnio / sumaAbsoluta) * 100) : 0,
    },
    {
      id: "bienes",
      nombre: "Bienes",
      icon: "/img/bienes-y-servicios.webp",
      valorAnual: bienesAnio,
      valorMensual: bienesMes,
      porcentaje: sumaAbsoluta > 0 ? Math.round((bienesAnio / sumaAbsoluta) * 100) : 0,
    },
    {
      id: "habitos",
      nombre: "Hábitos",
      icon: "/img/habitos_sost.webp",
      valorAnual: habitosAnio,
      valorMensual: habitosMes,
      porcentaje: sumaAbsoluta > 0 ? Math.round((habitosAnio / sumaAbsoluta) * 100) : 0,
    },
    {
      id: "virtual",
      nombre: "Agua Virtual",
      icon: "/img/form_hidrica_gotita.webp",
      valorAnual: aguaVirtualAnio,
      valorMensual: aguaVirtualMes,
      porcentaje: sumaAbsoluta > 0 ? Math.round((aguaVirtualAnio / sumaAbsoluta) * 100) : 0,
    },
  ];

  const consejos = [
    { sector: "Higiene", texto: "Cierra el grifo al cepillarte los dientes. Dúchate el menor tiempo posible y apaga el agua al enjabonarte." },
    { sector: "Limpieza", texto: "Repara grifos o fugas en casa. Usa lavadora o lavavajillas solo con carga completa." },
    { sector: "Alimentos y bebidas", texto: "Reduce el consumo de carne y leche. Consume alimentos locales y de temporada." },
    { sector: "Bienes y servicios", texto: "Compra ropa de segunda mano o sostenible. Prioriza productos duraderos." },
    { sector: "Hábitos sostenibles", texto: "Reutiliza el agua. Recicla papel y cartón. Usa botellas reutilizables." },
  ];

  return {
    totalAnio,
    totalMes,
    semaforo,
    camionesCisterna,
    sectores,
    consejos,
  };
}
