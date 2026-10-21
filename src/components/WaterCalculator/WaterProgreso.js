import { createContext } from 'react';

// Progreso del paso actual. WaterCalculator lo calcula desde pasos_hidrica.js.
export const ProgresoHidricaContext = createContext({
  currentCategoryIndex: -1,
  currentQuestionIndex: 0,
  totalQuestionsInCategory: 1,
  porcentaje: 0,
});
