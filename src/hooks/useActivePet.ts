import { useContext } from "react";
import { ActivePetContext, ActivePetContextType } from "../contexts";

export const useActivePet = (): ActivePetContextType => {
  const context = useContext(ActivePetContext);
  if (!context) {
    throw new Error("useActivePet must be used within a ActivePetProvider");
  }
  return context;
};
