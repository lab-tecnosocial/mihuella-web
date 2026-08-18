import { useState } from 'react';

// Pasos/Categorías del Stepper superior
const STEPS = [
  { id: 'general', label: 'General', icon: '🏠' },
  { id: 'alimentos', label: 'Alimentos', icon: '🍽️' },
  { id: 'energia', label: 'Energía', icon: '☀️' },
  { id: 'transporte', label: 'Transporte', icon: '🚗' },
  { id: 'residuos', label: 'Residuos', icon: '🗑️' },
];

export function CarbonCalculator() {
  // Estado para controlar la vista: 'onboarding' o los pasos normales (0 a 4)
  const [currentStep, setCurrentStep] = useState('onboarding');
  const [peopleCount, setPeopleCount] = useState(0);

  // Manejadores para el contador de personas
  const incrementPeople = () => setPeopleCount((prev) => prev + 1);
  const decrementPeople = () => setPeopleCount((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="relative min-h-screen w-full bg-[#3BB168] flex flex-col justify-between overflow-hidden font-sans">
      
      {/* 1. IMAGEN DE FONDO ILUSTRATIVA */}
      {/* Reemplaza '/src/assets/images/bg-huella-carbono.png' por la ruta de la imagen que descargues */}
      <div 
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat pointer-events-none z-0 opacity-90 sm:opacity-100"
        style={{ backgroundImage: `url('/src/assets/images/bg-huella-carbono.png')` }}
      />

      {/* 2. BARRA SUPERIOR (HEADER) */}
      <header className="relative z-10 w-full px-4 pt-4 sm:pt-6 max-w-5xl mx-auto flex flex-col gap-4 text-white">
        {/* Fila superior: Atrás y Título */}
        <div className="flex items-center justify-between w-full">
          {currentStep !== 'onboarding' ? (
            <button 
              onClick={() => setCurrentStep('onboarding')}
              className="flex items-center gap-1 text-sm font-semibold hover:opacity-80 transition"
            >
              <span>←</span> Atrás
            </button>
          ) : (
            <div className="w-12" /> /* Espaciador para centrar el título */
          )}

          <h1 className="text-lg sm:text-xl font-bold tracking-wide">
            Huella de carbono
          </h1>

          <div className="w-12" /> {/* Sin botón salir en onboarding */}
        </div>

        {/* STEPPER DE CATEGORÍAS (Barra de progreso) */}
        <div className="w-full pt-2 pb-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-between min-w-[320px] max-w-2xl mx-auto relative px-2">
            
            {/* Línea punteada de fondo */}
            <div className="absolute top-4 left-6 right-6 h-[2px] border-b-2 border-dashed border-white/60 -z-0" />

            {STEPS.map((step, idx) => {
              const isActive = currentStep === idx || currentStep === step.id;
              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center gap-1">
                  <div 
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-sm ${
                      isActive 
                        ? 'bg-white text-[#2D8B51] scale-110 ring-4 ring-white/30' 
                        : 'bg-white/80 text-gray-600'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium text-white tracking-tight">
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* 3. CARD CENTRAL FLOTANTE (RESPONSIVE) */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-6">
        <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 text-center">
          
          {/* Ícono Circular Sobresaliente */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-emerald-50 rounded-full border-4 border-white shadow-md flex items-center justify-center text-3xl">
            🏠
          </div>

          <div className="pt-8">
            {/* VISTA DE ONBOARDING / PASO 1 */}
            {currentStep === 'onboarding' && (
              <>
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 leading-snug">
                  ¿Cuántas personas viven en tu casa? (Incluyéndote)
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 mb-6">
                  Ingresa una cantidad
                </p>

                {/* CAMPO INCREMENTABLE */}
                <div className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center justify-between mb-6 shadow-inner">
                  <div className="flex-1 flex items-baseline justify-center gap-2 border-b border-dashed border-gray-300 pb-1 mx-4">
                    <span className="text-3xl font-black text-gray-800">{peopleCount}</span>
                    <span className="text-sm font-medium text-gray-400">personas</span>
                  </div>

                  {/* Flechas Arriba / Abajo */}
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={incrementPeople}
                      className="w-8 h-8 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 flex items-center justify-center transition active:scale-95"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      onClick={decrementPeople}
                      className="w-8 h-8 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 flex items-center justify-center transition active:scale-95"
                    >
                      ▼
                    </button>
                  </div>
                </div>

                {/* BOTÓN CONTINUAR */}
                <button
                  onClick={() => setCurrentStep(0)} // Avanza a la primera categoría real
                  disabled={peopleCount === 0}
                  className="w-full py-3.5 bg-[#31A85E] hover:bg-[#288D4E] text-white font-bold rounded-2xl shadow-lg transition-all transform active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continuar →
                </button>
              </>
            )}

            {/* VISTA PARA LOS SIGUIENTES PASOS */}
            {currentStep !== 'onboarding' && (
              <div className="py-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  ¡Siguiente sección!
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Aquí irá el contenido de la categoría seleccionada.
                </p>
                <button
                  onClick={() => setCurrentStep('onboarding')}
                  className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl"
                >
                  Volver al Onboarding
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Espaciador inferior opcional para balance visual */}
      <footer className="relative z-10 py-2 text-center text-xs text-white/70">
        Mi Huella ©
      </footer>
    </div>
  );
}