const CLAVE_RESPUESTAS = 'huellaHidricaRespuestas';

// sessionStorage puede no estar disponible (modo privado, bloqueo de datos del sitio).
export const guardarRespuestas = (respuestas) => {
  try {
    sessionStorage.setItem(CLAVE_RESPUESTAS, JSON.stringify(respuestas));
  } catch {
    // Sin almacenamiento, la página de resultados muestra el aviso de cuestionario vacío.
  }
};

export const leerRespuestas = () => {
  try {
    const guardadas = sessionStorage.getItem(CLAVE_RESPUESTAS);
    return guardadas ? JSON.parse(guardadas) : null;
  } catch {
    return null;
  }
};
