export interface PetInterface {
  $id: string;
  name: string;
  type: string;
  attack: number;
  defense: number;
  currentHealth: number;
  health: number;
  stamina: number;
  agility: number;
  active: boolean;
  imageId: string;
  imageURL: string | undefined;
}
