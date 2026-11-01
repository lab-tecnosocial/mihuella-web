# Variables de la calculadora de huella hídrica

Fuente: hoja `Calculo 2026` de `Calculo_Huella_Hidrica_2026.xlsx`. Celdas de entrada en columna **E** (`E18`, `E19`, …). Las unidades del Excel mandan sobre los textos de la UI cuando ambos difieren.

Estado en la web:
- **UI**: existe pregunta en `WaterCalculator`.
- **Falta UI**: el Excel la usa, pero no hay pregunta todavía. Por ahora vale 0.

## Preguntas y variables de entrada

| # | Variable (`answers`) | Celda | Unidad | Usada en cálculo | Estado en UI |
|---|---|---|---|---|---|
| 0 | Origen del agua (`origin`) | E14 | opción | No | UI (Q1) |
| 1 | Gasto mensual en agua (`waterExpenseBs`) | E15 | Bs/mes | No (solo texto) | UI (Q2) |
| 2 | Duchas por semana (`showerFrequencyPerWeek`) | E18 | veces/semana | Sí | UI (Q4) |
| 3 | Minutos por ducha (`showerMinutes`) | E19 | minutos/ducha | Sí | UI (Q3) |
| 4 | Cepillados de dientes (`teethBrushingFrequencyPerDay`) | E20 | veces/día | Sí | UI (Q5) |
| 5 | Lavados de manos (`handWashingFrequencyPerDay`) | E21 | veces/día | Sí | UI (Q6) |
| 6 | Tipo de inodoro (`toiletType`) | E22 | `ahorrador` / `tradicional` | Sí | UI (Q7) |
| 7 | Forma de lavar ropa (`clothesWashingMethod`) | E25 | `mano` / `lavadoraComun` / `lavadoraModerna` | Sí | **Falta UI** |
| 8 | Cargas de ropa por semana (`clothesWashingFrequencyPerWeek`) | E29 | cargas/semana | Sí | UI (Q8) |
| 9 | Forma de lavar platos (`dishwashingMethod`) | E30 | `mano` / `lavavajillas` | Sí | UI (Q9) |
| 10 | Lavados de platos (`dishwashingTimesPerDay`) | E33 | veces/día | Sí | UI (Q10) |
| 11 | Limpieza del patio (`patioCleaningMethod`) | — | opción | No (sin fórmula) | UI (Q11) |
| 12 | Carne de res (`proteinAmounts.res`) | E37 | kg/semana | Sí | UI (Q13) |
| 13 | Carne de pollo (`proteinAmounts.pollo`) | E38 | kg/semana | Sí | UI (Q13) |
| 14 | Carne de cerdo (`proteinAmounts.cerdo`) | E39 | kg/semana | Sí | UI (Q13) |
| 15 | Carne de cordero (`proteinAmounts.cordero`) | E40 | kg/semana | Sí | UI (Q13) |
| 16 | Pescado (`proteinAmounts.pescado`) | E41 | kg/semana | Sí | UI (Q13) |
| 17 | Huevos (`proteinAmounts.huevos`) | E42 | **unidades**/semana | Sí | UI (Q12/Q13) en unidades |
| 18 | Arroz (`cerealAmounts.arroz`) | E44 | kg/semana | Sí | UI (Q15) |
| 19 | Fideo (`cerealAmounts.fideo`) | E45 | kg/semana | Sí | UI (Q15) |
| 20 | Plátano (`fruitAmounts.platano`) | E47 | **unidades**/semana | Sí | UI (Q16/Q17) en unidades |
| 21 | Naranja (`fruitAmounts.naranja`) | E48 | **unidades**/semana | Sí | UI (Q16/Q17) en unidades |
| 22 | Té (`drinkAmounts.te`) | E50 | tazas/semana | Sí | UI (Q18/Q19) en tazas |
| 23 | Café (`drinkAmounts.cafe`) | E51 | tazas/semana | Sí | UI (Q18/Q19) en tazas |
| 24 | Leche (`drinkAmounts.leche`) | E52 | vasos/semana | Sí | UI (Q18/Q19) en vasos |
| 25 | Jugos (`drinkAmounts.jugos`) | E53 | vasos/semana | Sí | UI (Q18/Q19) en vasos |
| 26 | Gaseosas (`drinkAmounts.gaseosa`) | E54 | vasos/semana | Sí | UI (Q18/Q19) en vasos |
| 27 | Pan (E55) | E55 | piezas/día | No (el Excel no lo suma en K7) | UI (Q15) como kg/semana |
| 28 | Pares de calzado (`shoePairsPerYear`) | E57 | pares/año | Sí | **Falta UI** |
| 29 | Jeans (`jeansPerYear`) | E58 | unidades/año | Sí | **Falta UI** |
| 30 | Camisetas (`shirtsPerYear`) | E59 | unidades/año | Sí | **Falta UI** |
| 31 | Celulares en 5 años (`phonesLast5Years`) | E60 | unidades/5 años | Sí | **Falta UI** |
| 32 | Sistema de lluvia (`hasRainwaterSystem`) | E62 / D63 | Sí/No | Sí | **Falta UI** |
| 33 | Reutiliza agua de lavadora (`reusesWashingWater`) | E65 / D66 | Sí/No | Sí | **Falta UI** |
| 34 | Papel reciclado (`paperRecycledKgPerYear`) | E68 | kg/año | Sí | **Falta UI** |
| 35 | Consultas de IA (`aiUsesPerWeek`) | E70 | veces/semana | Sí | **Falta UI** |
| 36 | Correos eliminados (`emailsDeletedPerMonth`) | E71 | veces/mes | Sí | **Falta UI** |

## Constantes del Excel

| Constante | Valor | Celda / origen |
|---|---|---|
| Semanas por mes | 4 | C4 |
| Días por mes | 30 | C5 |
| Meses por año | 12 | C7 |
| Meses de lluvia | 4 | C8 |
| L/min en ducha | 20 | F19 |
| L/min con llave abierta (cepillado) | 5 | F20 |
| Minutos por cepillado | 2 | fórmula H20 |
| L por lavado de manos | 1,5 | F21 |
| Descargas de inodoro por día | 7 | fórmula H23/H24 |
| L por descarga: ahorrador / tradicional | 5 / 10 | F23 / F24 |
| L por carga de ropa: a mano / lavadora común / lavadora moderna | 105 / 120 / 50 | F26:F28 |
| L por lavado de platos: a mano / lavavajillas | 40 / 12 | F31 / F32 |
| L por kg: res, pollo, cerdo, cordero, pescado | 15415, 4300, 6000, 8700, 122 | F37:F41 |
| L por unidad: huevos, plátano, naranja | 196, 160, 80 | F42, F47, F48 |
| L por kg: arroz, fideo | 2497, 1849 | F44, F45 |
| L por taza/vaso: té, café, leche, jugos, gaseosa | 56, 132, 255, 170, 74 | F50:F54 |
| L por prenda: calzado, jeans, camisetas, celular | 6500, 8000, 2700, 12760 | F57:F60 |
| L por tanque de lluvia | 159 | F63 |
| L por carga reutilizada | 75 | F66 |
| L por kg de papel | 26,5 | F68 |
| ml por consulta de IA | 10 | F70 |
| L por correo eliminado | 0,775 | F71 |
| Factor de correos | 300 / 4 | H71 (constante del Excel, por confirmar su significado) |
| Litros por camión cisterna | 15000 | M82 |
| Promedio anual en Bolivia | 3 468 000 L | Texto de la pantalla de resultados |

## Clasificación (Excel L15)

| Consumo anual (L) | Nivel |
|---|---|
| ≤ 1 000 000 | BAJO |
| ≤ 1 400 000 | MEDIA |
| ≤ 1 800 000 | ALTA |
| > 1 800 000 | MUY ALTA |

## Pendientes y discrepancias

1. **Unidades de la UI**: resuelto. Huevos, plátano y naranja se piden en unidades; té, café, leche, jugos y gaseosas en tazas o vasos. Manzana, uvas, frutilla y papaya siguen en kg porque no tienen factor en el Excel.
2. **Pan**: el Excel calcula piezas/día × 0,075 kg × 1608 L/kg, pero no lo suma en K7. No se suma en el total.
3. **Alimentos sin factor en el Excel**: avena, quinua, maíz, manzana, uvas, frutilla, papaya y "otro" no tienen factor, así que no suman.
4. **Fórmula de jeans y camisetas**: el Excel usa `$E$57` (calzado) en H58 y H59. Se usa la cantidad propia de cada prenda; con los datos actuales el resultado es el mismo.
