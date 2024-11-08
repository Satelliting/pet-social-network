import { useState, useEffect } from "react";
import { Query } from "appwrite";

import { databases } from "../appwrite";
import {
  ActivePet,
  ActivePetContext,
  ActivePetContextType,
} from "../contexts/ActivePetContext";
import { useAuth } from "../hooks/useAuth";

export const ActivePetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activePet, setActivePet] = useState<ActivePet | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (user) fetchActivePet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchActivePet = async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_MAIN_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_USER_PETS_COLLECTION_ID,
        [Query.equal("userId", user!.$id), Query.equal("active", true)]
      );
      if (response.documents.length > 0) {
        setActivePet(response.documents[0] as unknown as ActivePet);
      }
    } catch (error) {
      console.error("Failed to fetch active pet:", error);
      setActivePet(null);
    }
  };

  const value: ActivePetContextType = {
    pet: activePet,
    fetchActivePet,
  };

  return (
    <ActivePetContext.Provider value={value}>
      {activePet && (
        <div>
          <h2>Active Pet Details</h2>
          <p>Name: {activePet.name}</p>
          <p>
            Health: {activePet.currentHealth}/{activePet.health}
          </p>
        </div>
      )}
      {children}
    </ActivePetContext.Provider>
  );
};
