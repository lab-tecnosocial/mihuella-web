import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  CATEGORIAS_HIDRICA,
  PASOS_HIDRICA,
  pasoAnterior,
  progresoDePaso,
  siguientePaso,
} from './pasos_hidrica.js';

const indiceDe = (id) => PASOS_HIDRICA.findIndex((paso) => paso.id === id);

describe('lista de pasos', () => {
  it('tiene las 29 preguntas del cuestionario', () => {
    assert.equal(PASOS_HIDRICA.length, 29);
  });

  it('termina en la pregunta de correos', () => {
    assert.equal(PASOS_HIDRICA.at(-1).id, 'correos');
  });

  it('no repite ids y cada paso tiene una categoría válida', () => {
    const ids = PASOS_HIDRICA.map((paso) => paso.id);
    assert.equal(new Set(ids).size, ids.length);
    PASOS_HIDRICA.forEach((paso) => {
      assert.ok(CATEGORIAS_HIDRICA.includes(paso.categoria), `${paso.id} sin categoría válida`);
    });
  });

  it('ubica cada pregunta en su categoría (la de platos es Limpieza, no Higiene)', () => {
    assert.equal(PASOS_HIDRICA[indiceDe('frecuenciaPlatos')].categoria, 'limpieza');
    assert.equal(PASOS_HIDRICA[indiceDe('metodoPlatos')].categoria, 'limpieza');
    assert.equal(PASOS_HIDRICA[indiceDe('calzado')].categoria, 'bienes');
    assert.equal(PASOS_HIDRICA[indiceDe('lluvia')].categoria, 'habitos');
  });
});

describe('navegación', () => {
  it('avanza al siguiente paso cuando no hay omisiones', () => {
    assert.equal(siguientePaso(0, {}), 1);
  });

  it('salta las cantidades de proteínas si solo se eligió ninguno', () => {
    const proteinas = indiceDe('proteinas');
    assert.equal(siguientePaso(proteinas, { proteins: ['ninguno'] }), indiceDe('cereales'));
    assert.equal(siguientePaso(proteinas, { proteins: ['res'] }), indiceDe('cantidadesProteinas'));
  });

  it('salta las cantidades de bebidas si no hay bebidas y continúa con bienes', () => {
    assert.equal(siguientePaso(indiceDe('bebidas'), { drinks: [] }), indiceDe('calzado'));
    assert.equal(siguientePaso(indiceDe('bebidas'), { drinks: ['ninguno'] }), indiceDe('calzado'));
  });

  it('devuelve null después de la última pregunta', () => {
    assert.equal(siguientePaso(PASOS_HIDRICA.length - 1, {}), null);
  });

  it('vuelve atrás saltando las preguntas omitidas', () => {
    const cereales = indiceDe('cereales');
    assert.equal(pasoAnterior(cereales, { proteins: ['ninguno'] }), indiceDe('proteinas'));
    assert.equal(pasoAnterior(cereales, { proteins: ['pollo'] }), indiceDe('cantidadesProteinas'));
  });

  it('devuelve -1 al retroceder desde la primera pregunta (pantalla de inicio)', () => {
    assert.equal(pasoAnterior(0, {}), -1);
  });
});

describe('progreso', () => {
  it('no retrocede en ningún paso', () => {
    let anterior = -Infinity;
    PASOS_HIDRICA.forEach((_paso, indice) => {
      const { porcentaje } = progresoDePaso(indice);
      assert.ok(porcentaje >= anterior, `retrocede en el paso ${indice}`);
      anterior = porcentaje;
    });
  });

  it('mantiene el porcentaje entre 0 y 100', () => {
    PASOS_HIDRICA.forEach((_paso, indice) => {
      const { porcentaje } = progresoDePaso(indice);
      assert.ok(porcentaje >= 0 && porcentaje <= 100, `fuera de rango en el paso ${indice}`);
    });
  });

  it('la categoría del stepper no retrocede', () => {
    let anterior = -1;
    PASOS_HIDRICA.forEach((_paso, indice) => {
      const { currentCategoryIndex } = progresoDePaso(indice);
      assert.ok(currentCategoryIndex >= anterior);
      anterior = currentCategoryIndex;
    });
  });

  it('la posición dentro de la categoría coincide con el orden de la lista', () => {
    const categoria = 'alimentos';
    const enCategoria = PASOS_HIDRICA.map((paso, indice) => ({ paso, indice })).filter(
      ({ paso }) => paso.categoria === categoria,
    );
    enCategoria.forEach(({ indice }, posicion) => {
      const progreso = progresoDePaso(indice);
      assert.equal(progreso.currentQuestionIndex, posicion);
      assert.equal(progreso.totalQuestionsInCategory, enCategoria.length);
    });
  });

  it('en la pantalla de inicio el progreso es cero', () => {
    const progreso = progresoDePaso(-1);
    assert.equal(progreso.currentCategoryIndex, -1);
    assert.equal(progreso.porcentaje, 0);
  });
});
