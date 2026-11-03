export const FACTORS = {
  food: {
    meatKg: 27.0,
    chickenKg: 6.0,
    porkKg: 12.1,
    fishKg: 6.1,
    lambKg: 39.2,
    milkLt: 1.9,
    cheeseConsumptionKg: 13.5,
    yogurtConsumptionLt: 2.2,
    fruitsAndVegetablesKg: 0.9,
  },
  electricity: {
    kgCo2PerKwh: 0.4,
    bsPerKwh: 0.9,
  },
  gasDomicilio: {
    kgCo2PerM3: 2.04,
    bsPerM3: 1.5,
  },
  garrafaKgCo2PerUnit: 1.56,
  transport: {
    foot: 0,
    car: 0.21,
    taxi: 0.21,
    taxi_trufi: 0.1158,
    trufi_grande: 0.0818,
    coaster: 0.0686,
    micro: 0.029,
    moto: 0.11,
    electric_car: 0,
    cable_car: 0,
  },
  divideCarByOccupancy: false,
  flightKmPerMinute: 11.6,
  flightKgCo2PerKm: 0.324,
  wasteKgCo2PerKg: 1.92,
};

export const GAUGE_MAX = 2500;

export const LEVELS = [
  {
    id: 'low',
    max: 2300,
    label: 'Bajo',
    title: 'Tus emisiones son bajas ¡Sigue así!',
    color: '#3ABA67',
    chipBg: '#D0F0DC',
    chipText: '#226D3C',
  },
  {
    id: 'medium',
    max: 4400,
    label: 'Media',
    title: 'Estás en el promedio nacional ¡Reduzcamos tu impacto!',
    color: '#EAB308',
    chipBg: '#FEF3C7',
    chipText: '#854D0E',
  },
  {
    id: 'high',
    max: 8750,
    label: 'Alta',
    title: 'Tu consumo es elevado ¡Evalúa tu impacto!',
    color: '#F97316',
    chipBg: '#FFEDD5',
    chipText: '#9A3412',
  },
  {
    id: 'very_high',
    max: Infinity,
    label: 'Muy alta',
    title: 'Es urgente que reduzcas tus emisiones',
    color: '#DC2626',
    chipBg: '#FEE2E2',
    chipText: '#991B1B',
  },
];

const WEEKS_PER_MONTH = 4;
const MONTHS = 12;
const num = (v) => Number(v) || 0;

export function calculateFootprint(d) {
  const people = Math.max(1, num(d.peopleCount));

  const dietMonthly = Object.entries(FACTORS.food).reduce(
    (sum, [key, f]) => sum + num(d[key]) * f * WEEKS_PER_MONTH,
    0
  );

  const kwh = num(d.electricityCostBs) / FACTORS.electricity.bsPerKwh;
  const energyMonthly = (kwh * FACTORS.electricity.kgCo2PerKwh) / people;

  const gasMonthly =
    d.gasType === 'garrafa'
      ? (num(d.gasCylindersPerMonth) * FACTORS.garrafaKgCo2PerUnit) / people
      : ((num(d.gasPaymentBs) / FACTORS.gasDomicilio.bsPerM3) *
          FACTORS.gasDomicilio.kgCo2PerM3) /
        people;

  let perKm = FACTORS.transport[d.transportType] ?? 0;
  if (FACTORS.divideCarByOccupancy && ['car', 'electric_car'].includes(d.transportType)) {
    perKm /= Math.max(1, num(d.carOccupancy));
  }
  const transportMonthly =
    num(d.dailyDistanceKm) * num(d.transportDaysPerWeek) * WEEKS_PER_MONTH * perKm;

  const wasteKgWeek =
    d.wasteKgByType && Object.keys(d.wasteKgByType).length > 0
      ? Object.values(d.wasteKgByType).reduce((a, b) => a + num(b), 0)
      : num(d.wasteKg);
  const wasteMonthly = (wasteKgWeek * FACTORS.wasteKgCo2PerKg * WEEKS_PER_MONTH) / people;

  const flightsYearly =
    num(d.flightsPerYear) *
    num(d.flightMinutes) *
    FACTORS.flightKmPerMinute *
    FACTORS.flightKgCo2PerKm;

  const categories = [
    { id: 'diet', label: 'Dieta', kg: dietMonthly * MONTHS },
    { id: 'energy', label: 'Energía', kg: energyMonthly * MONTHS },
    { id: 'gas', label: 'Gas', kg: gasMonthly * MONTHS },
    { id: 'transport', label: 'Transporte', kg: transportMonthly * MONTHS + flightsYearly },
    { id: 'waste', label: 'Residuos', kg: wasteMonthly * MONTHS },
  ];

  const total = categories.reduce((sum, c) => sum + c.kg, 0);

  return {
    categories: categories.map((c) => ({
      ...c,
      pct: total > 0 ? (c.kg / total) * 100 : 0,
    })),
    total,
  };
}

export const getLevel = (total) => LEVELS.find((l) => total < l.max);