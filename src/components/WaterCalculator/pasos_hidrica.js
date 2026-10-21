// Lista única de las 29 preguntas de la huella hídrica, en el orden en que se muestran.
// El orden de CATEGORIAS_HIDRICA debe coincidir con WATER_CATEGORIES (src/constants/waterCategories.jsx).

export const CATEGORIAS_HIDRICA = ['general', 'higiene', 'limpieza', 'alimentos', 'bienes', 'habitos'];

const sinSeleccionReal = (seleccion = []) => !seleccion.some((id) => id !== 'ninguno');

export const PASOS_HIDRICA = [
  { id: 'origen', categoria: 'general' },
  { id: 'gastoAgua', categoria: 'general' },

  { id: 'duracionDucha', categoria: 'higiene' },
  { id: 'frecuenciaDucha', categoria: 'higiene' },
  { id: 'cepillado', categoria: 'higiene' },
  { id: 'lavadoManos', categoria: 'higiene' },
  { id: 'tipoInodoro', categoria: 'higiene' },

  { id: 'metodoRopa', categoria: 'limpieza' },
  { id: 'frecuenciaRopa', categoria: 'limpieza' },
  { id: 'metodoPlatos', categoria: 'limpieza' },
  { id: 'frecuenciaPlatos', categoria: 'limpieza' },
  { id: 'patio', categoria: 'limpieza' },

  { id: 'proteinas', categoria: 'alimentos' },
  { id: 'cantidadesProteinas', categoria: 'alimentos', omitir: (r) => sinSeleccionReal(r.proteins) },
  { id: 'cereales', categoria: 'alimentos' },
  { id: 'cantidadesCereales', categoria: 'alimentos', omitir: (r) => sinSeleccionReal(r.cereals) },
  { id: 'frutas', categoria: 'alimentos' },
  { id: 'cantidadesFrutas', categoria: 'alimentos', omitir: (r) => sinSeleccionReal(r.fruits) },
  { id: 'bebidas', categoria: 'alimentos' },
  { id: 'cantidadesBebidas', categoria: 'alimentos', omitir: (r) => sinSeleccionReal(r.drinks) },

  { id: 'calzado', categoria: 'bienes' },
  { id: 'jeans', categoria: 'bienes' },
  { id: 'camisetas', categoria: 'bienes' },
  { id: 'celulares', categoria: 'bienes' },

  { id: 'lluvia', categoria: 'habitos' },
  { id: 'reutilizaAgua', categoria: 'habitos' },
  { id: 'papel', categoria: 'habitos' },
  { id: 'inteligenciaArtificial', categoria: 'habitos' },
  { id: 'correos', categoria: 'habitos' },
];

const PASO_INICIAL = {
  currentCategoryIndex: -1,
  currentQuestionIndex: 0,
  totalQuestionsInCategory: 1,
  porcentaje: 0,
};

// Índice del siguiente paso que no se omite, o null si era el último.
export const siguientePaso = (indice, respuestas) => {
  for (let i = indice + 1; i < PASOS_HIDRICA.length; i++) {
    if (!PASOS_HIDRICA[i].omitir?.(respuestas)) return i;
  }
  return null;
};

// Índice del paso anterior que no se omite, o -1 para volver a la pantalla de inicio.
export const pasoAnterior = (indice, respuestas) => {
  for (let i = indice - 1; i >= 0; i--) {
    if (!PASOS_HIDRICA[i].omitir?.(respuestas)) return i;
  }
  return -1;
};

// Posición del paso dentro de su categoría, con el total fijo de la categoría.
// Así el progreso solo puede avanzar.
export const progresoDePaso = (indice) => {
  const paso = PASOS_HIDRICA[indice];
  if (!paso) return PASO_INICIAL;

  const delMismaCategoria = PASOS_HIDRICA.filter((p) => p.categoria === paso.categoria);
  const currentQuestionIndex = delMismaCategoria.findIndex((p) => p.id === paso.id);
  const currentCategoryIndex = CATEGORIAS_HIDRICA.indexOf(paso.categoria);
  const totalQuestionsInCategory = delMismaCategoria.length;

  const avance = currentCategoryIndex + currentQuestionIndex / totalQuestionsInCategory;
  const porcentaje = Math.min(100, (avance / (CATEGORIAS_HIDRICA.length - 1)) * 100);

  return { currentCategoryIndex, currentQuestionIndex, totalQuestionsInCategory, porcentaje };
};
