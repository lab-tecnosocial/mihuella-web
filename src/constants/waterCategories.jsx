import { Home, SoapDispenserDroplet, BrushCleaning, UtensilsCrossed, Shirt, PersonStanding } from 'lucide-react';

export const WATER_CATEGORIES = [
  { id: 'general', label: 'General', icon: <Home className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" /> },
  { id: 'higiene', label: 'Higiene', icon: <SoapDispenserDroplet className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" /> },
  { id: 'limpieza', label: 'Limpieza', icon: <BrushCleaning className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" /> },
  { id: 'alimentos', label: 'Alimentos', icon: <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" /> },
  { id: 'bienes', label: 'Bienes', icon: <Shirt className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" /> },
  { id: 'habitos', label: 'Hábitos', icon: <PersonStanding className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" /> },
];