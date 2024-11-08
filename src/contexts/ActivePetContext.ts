import { createContext } from "react";

export interface ActivePet {
  $id: string;
  name: string;
  attack: number;
  defense: number;
  currentHealth: number;
  health: number;
  stamina: number;
  agility: number;
}

export interface ActivePetContextType {
  activePet: ActivePet | null;
  fetchActivePet: () => Promise<void>;
  setActivePetById: (petId: string) => Promise<void>;
}

export const ActivePetContext = createContext<ActivePetContextType | null>(
  null
);
