import { Home, UtensilsCrossed, Zap, Car, Trash2 } from 'lucide-react';

export const CARBON_CATEGORIES = [
  { id: 'general', label: 'General', icon: <Home className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" /> },
  { id: 'alimentos', label: 'Alimentos', icon: <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" /> },
  { id: 'energia', label: 'Energía', icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" /> },
  { id: 'transporte', label: 'Transporte', icon: <Car className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" /> },
  { id: 'residuos', label: 'Residuos', icon: <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" /> },
];