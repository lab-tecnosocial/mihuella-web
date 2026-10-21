import { useState } from 'react';
import { WaterCalculatorOnboarding } from './WaterCalculatorOnboarding';
import { Question1Origin } from './questions/Question1Origin';
import { NumberQuestion } from './questions/NumberQuestion';
import { QuestionOpciones } from './questions/QuestionOpciones';
import { Question7ToiletType } from './questions/Question7ToiletType';
import { Question9Dishwashing } from './questions/Question9Dishwashing';
import { Question11PatioCleaning } from './questions/Question11PatioCleaning';
import { Question12Proteins } from './questions/Question12Proteins';
import { Question13ProteinAmounts } from './questions/Question13ProteinAmounts';
import { Question14Cereals } from './questions/Question14Cereals';
import { Question15CerealAmounts } from './questions/Question15CerealAmounts';
import { Question16Fruits } from './questions/Question16Fruits';
import { Question17FruitAmounts } from './questions/Question17FruitAmounts';
import { Question18Drinks } from './questions/Question18Drinks';
import { Question19DrinkAmounts } from './questions/Question19DrinkAmounts';
import { ProgresoHidricaContext } from './WaterProgreso';
import { guardarRespuestas } from './calculo/almacenamiento';
import { PASOS_HIDRICA, siguientePaso, pasoAnterior, progresoDePaso } from './pasos_hidrica';

const NUMBER_QUESTIONS = {
  gastoAgua: {
    answerKey: 'waterExpenseBs',
    title: '¿Cuál es tu gasto mensual aproximado en agua? En Bs',
    icon: '/img/form_hidrica_gotita.webp',
    unit: 'Bs',
    step: 10,
    ariaLabel: 'gasto en Bs',
    reference:
      'Revisa tu factura de servicio de agua potable del último mes para colocar un dato preciso.',
  },
  duracionDucha: {
    answerKey: 'showerMinutes',
    title: '¿Aproximadamente cuántos minutos duran tus duchas?',
    icon: '/img/shower.webp',
    unit: 'minutos',
    step: 1,
    ariaLabel: 'minutos',
    reference: 'Una ducha promedio dura entre 5 a 10 minutos.',
  },
  frecuenciaDucha: {
    answerKey: 'showerFrequencyPerWeek',
    title: '¿Cuántas veces te duchas a la semana?',
    icon: '/img/shower.webp',
    unit: 'veces',
    step: 1,
    ariaLabel: 'veces por semana',
    reference:
      'Lo común para una persona es ducharse entre 7 y 14 veces a la semana (1 a 2 veces al día).',
  },
  cepillado: {
    answerKey: 'teethBrushingFrequencyPerDay',
    title: '¿Cuántas veces al día te cepillas los dientes?',
    icon: '/img/toothbrush.webp',
    unit: 'veces',
    step: 1,
    ariaLabel: 'veces al día',
    reference: 'Lo común para una persona es cepillarse entre 2 y 3 veces al día.',
  },
  lavadoManos: {
    answerKey: 'handWashingFrequencyPerDay',
    title: '¿Cuántas veces al día te lavas las manos?',
    icon: '/img/handwashing.webp',
    unit: 'veces',
    step: 1,
    ariaLabel: 'veces al día',
    reference: 'Una persona suele lavarse las manos entre 5 y 10 veces al día.',
  },
  frecuenciaRopa: {
    answerKey: 'clothesWashingFrequencyPerWeek',
    title: '¿Cuántas veces lavas ropa en una semana?',
    icon: '/img/lavar-ropa.webp',
    unit: 'Veces',
    step: 1,
    ariaLabel: 'veces',
    reference: 'Lo común es lavar la ropa entre 1 y 3 veces por semana.',
  },
  frecuenciaPlatos: {
    answerKey: 'dishwashingTimesPerDay',
    title: '¿Cuántas veces al día lavas los platos?',
    icon: '/img/traste-calendario.webp',
    unit: 'Veces',
    step: 1,
    ariaLabel: 'veces al día',
    reference:
      'Lavar platos a mano puede usar hasta 20 litros por lavado; con lavavajillas, el consumo baja considerablemente.',
  },
  calzado: {
    answerKey: 'shoePairsPerYear',
    title: '¿Cuántos pares de calzado compras al año?',
    icon: '/img/tenis-HH.webp',
    unit: 'pares',
    step: 1,
    ariaLabel: 'pares de calzado al año',
    reference: 'Un par de zapatos o tenis puede tener una huella hídrica de miles de litros.',
  },
  jeans: {
    answerKey: 'jeansPerYear',
    title: '¿Cuántos jeans compras al año?',
    icon: '/img/jeans-HH.webp',
    unit: 'unidades',
    step: 1,
    ariaLabel: 'jeans al año',
    reference: 'Un jean de algodón puede requerir miles de litros de agua en su producción.',
  },
  camisetas: {
    answerKey: 'shirtsPerYear',
    title: '¿Cuántas camisetas compras al año?',
    icon: '/img/camiseta-HH.webp',
    unit: 'unidades',
    step: 1,
    ariaLabel: 'camisetas al año',
    reference: 'Una camiseta de algodón puede requerir alrededor de 2.700 litros de agua.',
  },
  celulares: {
    answerKey: 'phonesLast5Years',
    title: '¿Cuántos celulares has tenido en los últimos 5 años?',
    icon: '/img/huella-hidrica-icon.webp',
    unit: 'celulares',
    step: 1,
    ariaLabel: 'celulares en 5 años',
    reference: 'Fabricar un celular consume miles de litros de agua en su cadena de producción.',
  },
  papel: {
    answerKey: 'paperRecycledKgPerYear',
    title: '¿Cuántos kilos de papel reciclas al año? Aproximadamente',
    icon: '/img/carton.webp',
    unit: 'kg',
    step: 1,
    ariaLabel: 'kilos de papel al año',
    reference: 'Reciclar papel reduce la cantidad de agua que se usa para producir papel nuevo.',
  },
  inteligenciaArtificial: {
    answerKey: 'aiUsesPerWeek',
    title: '¿Cuántas veces a la semana usas herramientas de inteligencia artificial?',
    icon: '/img/huella-hidrica-icon.webp',
    unit: 'veces',
    step: 1,
    ariaLabel: 'veces por semana con IA',
    reference: 'Cada consulta a una herramienta de inteligencia artificial consume agua en los centros de datos.',
  },
  correos: {
    answerKey: 'emailsDeletedPerMonth',
    title: '¿Cuántas veces al mes eliminas correos electrónicos que ya no usas?',
    icon: '/img/huella-hidrica-icon.webp',
    unit: 'veces',
    step: 1,
    ariaLabel: 'correos eliminados al mes',
    reference: 'Eliminar correos reduce el almacenamiento en centros de datos, que consumen agua para enfriarse.',
  },
};

const OPCIONES_METODO_ROPA = [
  { id: 'mano', label: 'A mano', icon: '/img/a-mano.webp' },
  { id: 'lavadoraComun', label: 'En lavadora común\n(carga superior)', icon: '/img/lavar-ropa.webp' },
  { id: 'lavadoraModerna', label: 'En lavadora moderna\n(carga frontal)', icon: '/img/ropa.webp' },
];

const OPCIONES_SI_NO = [
  { id: true, label: 'Sí' },
  { id: false, label: 'No' },
];

export function WaterCalculator() {
  // -1 = pantalla de inicio; 0..N-1 = índice en PASOS_HIDRICA.
  const [currentStep, setCurrentStep] = useState(-1);
  const [answers, setAnswers] = useState({});

  const handleStart = () => setCurrentStep(0);
  const handleBackToHome = () => window.location.href = '/';

  const finishCalculation = (respuestas) => {
    guardarRespuestas(respuestas);
    window.location.href = '/feature/resultado-huella-hidrica';
  };

  const handleBack = () => setCurrentStep(pasoAnterior(currentStep, answers));

  const handleNext = (newAnswer) => {
    const updatedAnswers = { ...answers, ...newAnswer };
    setAnswers(updatedAnswers);

    const siguiente = siguientePaso(currentStep, updatedAnswers);
    if (siguiente === null) finishCalculation(updatedAnswers);
    else setCurrentStep(siguiente);
  };

  const renderPregunta = (id) => {
    const comunes = { onNext: handleNext, onBack: handleBack, onExit: handleBackToHome };

    if (NUMBER_QUESTIONS[id]) {
      const config = NUMBER_QUESTIONS[id];
      return (
        <NumberQuestion
          {...config}
          {...comunes}
          initialValue={answers[config.answerKey] || 0}
        />
      );
    }

    switch (id) {
      case 'origen':
        return <Question1Origin {...comunes} initialValue={answers.origin || ''} />;
      case 'tipoInodoro':
        return <Question7ToiletType {...comunes} initialValue={answers.toiletType || ''} />;
      case 'metodoRopa':
        return (
          <QuestionOpciones
            {...comunes}
            answerKey="clothesWashingMethod"
            title="¿De qué manera lavas tu ropa?"
            icon="/img/lavar-ropa.webp"
            options={OPCIONES_METODO_ROPA}
            initialValue={answers.clothesWashingMethod || ''}
          />
        );
      case 'metodoPlatos':
        return <Question9Dishwashing {...comunes} initialValue={answers.dishwashingMethod || ''} />;
      case 'patio':
        return <Question11PatioCleaning {...comunes} initialValue={answers.patioCleaningMethod || ''} />;
      case 'proteinas':
        return <Question12Proteins {...comunes} initialValue={answers.proteins || []} />;
      case 'cantidadesProteinas':
        return (
          <Question13ProteinAmounts
            {...comunes}
            selectedProteins={answers.proteins || []}
            initialValue={answers.proteinAmounts || {}}
          />
        );
      case 'cereales':
        return <Question14Cereals {...comunes} initialValue={answers.cereals || []} />;
      case 'cantidadesCereales':
        return (
          <Question15CerealAmounts
            {...comunes}
            selectedCereals={answers.cereals || []}
            initialValue={answers.cerealAmounts || {}}
          />
        );
      case 'frutas':
        return <Question16Fruits {...comunes} initialValue={answers.fruits || []} />;
      case 'cantidadesFrutas':
        return (
          <Question17FruitAmounts
            {...comunes}
            selectedFruits={answers.fruits || []}
            initialValue={answers.fruitAmounts || {}}
          />
        );
      case 'bebidas':
        return <Question18Drinks {...comunes} initialValue={answers.drinks || []} />;
      case 'cantidadesBebidas':
        return (
          <Question19DrinkAmounts
            {...comunes}
            selectedDrinks={answers.drinks || []}
            initialValue={answers.drinkAmounts || {}}
          />
        );
      case 'lluvia':
        return (
          <QuestionOpciones
            {...comunes}
            answerKey="hasRainwaterSystem"
            title="¿Tienes sistema de recolección de agua de lluvia?"
            icon="/img/form_hidrica_gotita.webp"
            options={OPCIONES_SI_NO}
            initialValue={answers.hasRainwaterSystem}
          />
        );
      case 'reutilizaAgua':
        return (
          <QuestionOpciones
            {...comunes}
            answerKey="reusesWashingWater"
            title="¿Reutilizas el agua de la lavadora para otras actividades?"
            icon="/img/lavar-ropa.webp"
            options={OPCIONES_SI_NO}
            initialValue={answers.reusesWashingWater}
          />
        );
      default:
        return null;
    }
  };

  const pasoActual = currentStep >= 0 ? PASOS_HIDRICA[currentStep] : null;

  return (
    <div className="relative min-h-screen w-full bg-[#2178BD] flex flex-col justify-between overflow-hidden font-sans">
      <div
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat pointer-events-none z-0 opacity-90 sm:opacity-100"
        style={{ backgroundImage: "url('/img/bg-hidrica.webp')" }}
      />

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-6">
        {currentStep === -1 && (
          <WaterCalculatorOnboarding
            onBackToHome={handleBackToHome}
            onStartCalculation={handleStart}
          />
        )}

        {pasoActual && (
          <ProgresoHidricaContext.Provider value={progresoDePaso(currentStep)}>
            {renderPregunta(pasoActual.id)}
          </ProgresoHidricaContext.Provider>
        )}
      </main>

      <footer className="relative z-10 py-2 text-center text-xs text-white/70">
        Mi Huella ©
      </footer>
    </div>
  );
}
