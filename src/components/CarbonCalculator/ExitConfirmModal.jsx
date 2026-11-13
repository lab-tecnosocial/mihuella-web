import { useEffect, useRef } from 'react';

const MASCOT_IMAGE = '/img/semilla.webp';
const TREES_IMAGE = '/img/arbolitos.png';

function Arbolito({ className = '', reflejado = false }) {
  return (
    <img
      src={TREES_IMAGE}
      alt=""
      width="52"
      height="62"
      className={`w-[52px] h-[62px] object-contain ${className}`}
      style={reflejado ? { transform: 'scaleX(-1)' } : undefined}
    />
  );
}

function MascotaConArboles() {
  return (
    <div className="relative mt-4 h-[162px] w-[200px]">
      <Arbolito className="absolute bottom-0 left-[8px] z-0" reflejado />
      <Arbolito className="absolute bottom-0 right-[8px] z-0" />
      <img
        src={MASCOT_IMAGE}
        alt=""
        width="143"
        height="162"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[143px] h-[162px] object-contain"
      />
    </div>
  );
}

export function ExitConfirmModal({ open, onExit, onContinue }) {
  const continueRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    continueRef.current?.focus();

    const handleKey = (e) => {
      if (e.key === 'Escape') onContinue();
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [open, onContinue]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/30 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-confirm-title"
        className="w-full max-w-[650px] rounded-2xl bg-[#F5F5F5] px-6 py-8 sm:px-8 flex flex-col items-center text-center"
      >
        <h2
          id="exit-confirm-title"
          className="text-3xl font-semibold leading-tight text-[#262626] font-quicksand"
        >
          ¿Seguro que quieres salir?
        </h2>

        <MascotaConArboles />

        <p className="mt-4 text-xl font-bold leading-7 tracking-[-0.02em] text-[#262626] font-quicksand">
          ¡Tu progreso actual no se guardará!
          <br />
          Estás a pocos pasos de conocer tu huella de carbono,
          <br className="hidden sm:block" /> puedes continuar y terminarlo ahora.
        </p>

        <div className="mt-6 w-full flex flex-col-reverse sm:flex-row gap-4">
          <button
            type="button"
            onClick={onExit}
            className="flex-1 h-[52px] rounded-lg border-2 border-[#404040] bg-white text-lg font-medium text-[#262626] font-quicksand shadow-[0_4px_0_#404040] hover:bg-gray-50 active:translate-y-[2px] active:shadow-[0_2px_0_#404040] transition"
          >
            Salir
          </button>
          <button
            ref={continueRef}
            type="button"
            onClick={onContinue}
            className="flex-1 h-[52px] rounded-lg bg-[#3ABA67] text-lg font-medium text-white font-quicksand shadow-[0_4px_0_#226D3C] hover:brightness-95 active:translate-y-[2px] active:shadow-[0_2px_0_#226D3C] transition"
          >
            Seguir
          </button>
        </div>
      </div>
    </div>
  );
}