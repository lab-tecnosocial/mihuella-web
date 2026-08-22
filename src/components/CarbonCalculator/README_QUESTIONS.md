# Guía de Desarrollo: Módulo de Preguntas y Encuestas

Este módulo está diseñado para construir un flujo de preguntas/encuestas tipo *wizard* o *stepper*, con un diseño responsivo y consistente basado en Tailwind CSS y React.

---

## Estructura

```text
src/
 ├── components/
 │    ├── CarbonQuestionLayout.jsx   # Layout principal del modal/pantalla
 │    ├── CarbonStepper.jsx          # Barra/puntos de progreso
 │    ├── Button3D.jsx               # Botón estilizado con efecto 3D        
 │    ├── Question1People.jsx       # Preguntas individuales
 │    ├── Question2Department.jsx
 │    └── ...
 └── assets/
      ├── flags/                     # Imágenes de banderas / iconos
      └── images/                    # Ilustraciones y fondos

```

---

## Arquitectura de una Pregunta

Todas las preguntas utilizan la plantilla base **`CarbonQuestionLayout`**, la cual se encarga de manejar:

* Header con botones de **Atrás** y **Salir**.
* Stepper de progreso por categorías.
* Fondo con ilustración e icono/avatar superior.
* Botón inferior de **Continuar** (con deshabilitación automática si no se ha respondido).
* Scroll interno responsivo.

---

## Cómo agregar una nueva pregunta

Sigue este patrón estandarizado para crear una nueva pregunta:

### 1. Crear el componente de la pregunta

Crea un archivo por cada pregunta en la carpeta de preguntas (ej. `Question3Vehicle.jsx`):

```jsx
import React, { useState } from 'react';
import { CarbonQuestionLayout } from './CarbonQuestionLayout';

// 1. Opciones o datos necesarios para la pregunta
const OPTIONS = [
  { id: 'auto', label: 'Automóvil', icon: '/src/assets/icons/car.png' },
  { id: 'moto', label: 'Motocicleta', icon: '/src/assets/icons/moto.png' },
  { id: 'bus', label: 'Transporte público', icon: '/src/assets/icons/bus.png' },
];

export function Question3Vehicle({ onNext, onBack, onExit }) {
  const [selectedOption, setSelectedOption] = useState('');

  return (
    <CarbonQuestionLayout
      currentCategoryIndex={0} // Índice de la categoría actual
      icon="/src/assets/images/icono-pregunta.png" // Ruta o componente React
      onBack={onBack}
      onExit={onExit}
      onNext={() => onNext(selectedOption)}
      isNextDisabled={!selectedOption} // Bloquea el botón hasta responder
    >
      {/* Título */}
      <h2 className="text-xl sm:text-2xl font-black text-gray-800 leading-tight mb-1">
        ¿Qué medio de transporte usas con más frecuencia?
      </h2>
      
      {/* Subtítulo o instrucción */}
      <p className="text-xs sm:text-sm text-gray-400 font-medium mb-6">
        Selecciona una opción
      </p>

      {/* Opciones / Chips / Inputs */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-2 max-w-md mx-auto">
        {OPTIONS.map((opt) => {
          const isSelected = selectedOption === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelectedOption(opt.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm ${
                isSelected
                  ? 'bg-[#3ABA67] text-white border-[#3ABA67] scale-105 shadow-md'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-[#3ABA67] hover:bg-emerald-50/50'
              }`}
            >
              {/* Imagen/Icono con recorte circular tipo badge */}
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden shrink-0 border border-black/10 flex items-center justify-center bg-gray-100">
                <img
                  src={opt.icon}
                  alt={opt.label}
                  className="w-full h-full object-cover scale-125"
                />
              </div>

              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </CarbonQuestionLayout>
  );
}

```

---

## Guía de Estilos y Componentes Recurrentes

### 1. Avatar / Icono Central del Card

El contenedor circular superior de `CarbonQuestionLayout` ya viene formateado. Para controlar qué tan ajustado se ve el icono dentro del círculo, usa las clases de **padding**:

```jsx
// Ejemplo en CarbonQuestionLayout.jsx
// p-1 sm:p-1.5 -> Imagen ultra ajustada / grande adentro
// p-2.5 sm:p-4 -> Imagen más pequeña / con más espacio alrededor
<div className="... p-1 sm:p-1.5 z-20">

```

### 2. Chips / Botones con Imagen Circular

Para renderizar opciones con minilogos o banderas dentro de un círculo cerrado (efecto Figma):

```jsx
<div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden shrink-0 border border-black/10 flex items-center justify-center bg-gray-100">
  <img
    src={item.imagePath}
    alt={item.name}
    className="w-full h-full object-cover scale-125"
  />
</div>

```

---

## Props de `CarbonQuestionLayout`

| Prop | Tipo | Requerido | Descripción |
| --- | --- | --- | --- |
| `currentCategoryIndex` | `number` | Sí | Índice de la categoría actual para el Stepper. |
| `currentQuestionIndex` | `number` | Opcional | Índice de la pregunta dentro de la categoría. |
| `totalQuestionsInCategory` | `number` | Opcional | Total de preguntas en la categoría. |
| `icon` | `string` | `JSX` | Sí | Ruta de la imagen o icono SVG del avatar superior. |
| `onBack` | `function` | Opcional | Callback al presionar "Atrás". |
| `onExit` | `function` | Opcional | Callback al presionar "Salir". |
| `onNext` | `function` | Sí | Callback al presionar el botón "Continuar". |
| `isNextDisabled` | `boolean` | Opcional | Inhabilita el botón de continuar hasta que se seleccione respuesta. |
| `nextText` | `string` | Opcional | Texto del botón principal (Por defecto: `"Continuar"`). |
| `children` | `ReactNode` | Sí | Contenido interno de la pregunta. |