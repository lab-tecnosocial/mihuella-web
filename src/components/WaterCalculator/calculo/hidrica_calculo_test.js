import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  calcularAguaVirtual,
  calcularAlimentos,
  calcularBienesAnual,
  calcularHabitosAnual,
  calcularHigiene,
  calcularHuellaHidrica,
  calcularLimpieza,
  clasificarConsumo,
} from './hidrica_calculo.js';

// Respuestas del ejemplo cargado en el Excel "Calculo 2026" (columna E).
const RESPUESTAS_EXCEL = {
  showerFrequencyPerWeek: 3,
  showerMinutes: 15,
  teethBrushingFrequencyPerDay: 2,
  handWashingFrequencyPerDay: 3,
  toiletType: 'tradicional',
  clothesWashingMethod: 'mano',
  clothesWashingFrequencyPerWeek: 2,
  dishwashingMethod: 'mano',
  dishwashingTimesPerDay: 2,
  proteins: ['res', 'pollo', 'cerdo', 'cordero', 'pescado', 'huevos'],
  proteinAmounts: { res: 0.5, pollo: 2, cerdo: 0.5, cordero: 0.5, pescado: 0.5, huevos: 3 },
  cereals: ['arroz', 'fideo'],
  cerealAmounts: { arroz: 0.5, fideo: 0.5 },
  fruits: ['platano', 'naranja'],
  fruitAmounts: { platano: 2, naranja: 2 },
  drinks: ['te', 'cafe', 'leche', 'jugos', 'gaseosa'],
  drinkAmounts: { te: 7, cafe: 2, leche: 1, jugos: 1, gaseosa: 5 },
  shoePairsPerYear: 2,
  jeansPerYear: 2,
  shirtsPerYear: 2,
  phonesLast5Years: 1,
  hasRainwaterSystem: true,
  reusesWashingWater: true,
  paperRecycledKgPerYear: 25,
  aiUsesPerWeek: 100,
  emailsDeletedPerMonth: 2,
};

const assertCercano = (real, esperado, tolerancia = 1e-6) => {
  assert.ok(
    Math.abs(real - esperado) <= tolerancia,
    `esperado ${esperado}, pero se obtuvo ${real}`,
  );
};

describe('higiene (Excel H19:H24, K5)', () => {
  it('suma duchas, cepillado, lavado de manos e inodoro', () => {
    assertCercano(calcularHigiene(RESPUESTAS_EXCEL), 6435);
  });

  it('usa 5 litros por descarga con inodoro ahorrador', () => {
    const respuestas = { ...RESPUESTAS_EXCEL, toiletType: 'ahorrador' };
    assertCercano(calcularHigiene(respuestas), 6435 - 2100 + 30 * 7 * 5);
  });

  it('no suma inodoro si no hay tipo seleccionado', () => {
    const respuestas = { ...RESPUESTAS_EXCEL, toiletType: undefined };
    assertCercano(calcularHigiene(respuestas), 6435 - 2100);
  });
});

describe('limpieza (Excel H26:H32, K6)', () => {
  it('suma lavado de ropa a mano y lavado de platos a mano', () => {
    assertCercano(calcularLimpieza(RESPUESTAS_EXCEL), 3240);
  });

  it('usa 12 litros por lavado con lavavajillas', () => {
    const respuestas = { ...RESPUESTAS_EXCEL, dishwashingMethod: 'lavavajillas' };
    assertCercano(calcularLimpieza(respuestas), 840 + 30 * 2 * 12);
  });

  it('usa 120 litros por carga en lavadora común', () => {
    const respuestas = { ...RESPUESTAS_EXCEL, clothesWashingMethod: 'lavadoraComun' };
    assertCercano(calcularLimpieza(respuestas), 4 * 2 * 120 + 2400);
  });
});

describe('alimentos (Excel H37:H54, K7)', () => {
  it('suma proteínas, cereales, frutas y bebidas semanales por 4 semanas', () => {
    assertCercano(calcularAlimentos(RESPUESTAS_EXCEL), 113642);
  });

  it('no suma el pan, igual que el Excel en K7', () => {
    const respuestas = { ...RESPUESTAS_EXCEL, cereals: ['arroz', 'fideo', 'pan'], cerealAmounts: { ...RESPUESTAS_EXCEL.cerealAmounts, pan: 10 } };
    assertCercano(calcularAlimentos(respuestas), 113642);
  });

  it('ignora alimentos sin factor en el Excel (avena, quinua, maíz, otro)', () => {
    const respuestas = { ...RESPUESTAS_EXCEL, cereals: ['avena'], cerealAmounts: { avena: 5 } };
    assertCercano(calcularAlimentos(respuestas), 113642 - (4994 + 3698));
  });

  it('ignora cantidades de alimentos que no están seleccionados', () => {
    const respuestas = { ...RESPUESTAS_EXCEL, proteins: ['res'] };
    assertCercano(calcularAlimentos(respuestas), 113642 - (34400 + 12000 + 17400 + 244 + 2352));
  });
});

describe('bienes y servicios (Excel H57:H60, L8)', () => {
  it('calcula el consumo anual de prendas y celulares', () => {
    assertCercano(calcularBienesAnual(RESPUESTAS_EXCEL), 36952);
  });

  it('usa la cantidad propia de jeans, no la de calzado', () => {
    const respuestas = { ...RESPUESTAS_EXCEL, shoePairsPerYear: 0, jeansPerYear: 1 };
    assertCercano(calcularBienesAnual(respuestas), 8000 + 5400 + 2552);
  });
});

describe('hábitos sostenibles (Excel H63:H68, L9)', () => {
  it('suma lluvia por 4 meses, reutilización y papel reciclado', () => {
    assertCercano(calcularHabitosAnual(RESPUESTAS_EXCEL), 1373.5);
  });

  it('no suma lluvia ni reutilización cuando no aplican', () => {
    const respuestas = { ...RESPUESTAS_EXCEL, hasRainwaterSystem: false, reusesWashingWater: false };
    assertCercano(calcularHabitosAnual(respuestas), 662.5);
  });
});

describe('agua virtual (Excel H70:H71, K10)', () => {
  it('suma consultas de IA y correos eliminados', () => {
    assertCercano(calcularAguaVirtual(RESPUESTAS_EXCEL), 120.25);
  });
});

describe('total de la huella hídrica (Excel K11 y L11)', () => {
  const resultado = calcularHuellaHidrica(RESPUESTAS_EXCEL);

  it('calcula el total mensual igual que K11', () => {
    assertCercano(resultado.mensual.total, 126402.125);
  });

  it('calcula el total anual igual que L11', () => {
    assertCercano(resultado.anual, 1516825.5);
  });

  it('resta los hábitos sostenibles del total', () => {
    const { higiene, limpieza, alimentos, bienes, aguaVirtual, habitos } = resultado.mensual;
    assertCercano(higiene + limpieza + alimentos + bienes + aguaVirtual - habitos, resultado.mensual.total);
  });

  it('reparte el consumo bruto en porcentajes que suman 100 sin hábitos', () => {
    const { porcentajes } = resultado;
    const suma = porcentajes.higiene + porcentajes.limpieza + porcentajes.alimentos + porcentajes.bienes + porcentajes.aguaVirtual;
    assertCercano(suma, 100, 1e-6);
  });

  it('calcula los camiones cisterna completos', () => {
    assert.equal(resultado.camionesCisterna, 101);
  });

  it('marca que está por debajo del promedio de Bolivia (3.468.000 litros/año)', () => {
    assert.equal(resultado.porDebajoDelPromedio, true);
  });

  it('devuelve cero sin errores cuando no hay respuestas', () => {
    const vacio = calcularHuellaHidrica({});
    assert.equal(vacio.anual, 0);
    assert.equal(vacio.porcentajes.alimentos, 0);
    assert.equal(vacio.clasificacion, 'BAJO');
  });
});

describe('clasificación por rangos (Excel L15)', () => {
  it('clasifica según los límites anuales del Excel', () => {
    assert.equal(clasificarConsumo(1000000), 'BAJO');
    assert.equal(clasificarConsumo(1000001), 'MEDIA');
    assert.equal(clasificarConsumo(1400000), 'MEDIA');
    assert.equal(clasificarConsumo(1800000), 'ALTA');
    assert.equal(clasificarConsumo(1800001), 'MUY ALTA');
  });
});
