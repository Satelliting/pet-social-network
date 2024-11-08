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
        import.meta.env.VITE_APPWRITE_USERS_PETS_COLLECTION_ID,
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

  const setActivePetById = async (petId: string) => {
    try {
      const userPets = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_MAIN_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_USERS_PETS_COLLECTION_ID,
        [Query.equal("userId", user!.$id)]
      );

      const updatePromises = userPets.documents.map((pet) =>
        databases.updateDocument(
          import.meta.env.VITE_APPWRITE_MAIN_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_USERS_PETS_COLLECTION_ID,
          pet.$id,
          { active: pet.$id === petId }
        )
      );

      // Await all updates to complete
      await Promise.all(updatePromises);

      // Refresh the active pet in context
      fetchActivePet();
    } catch (error) {
      console.error("Failed to set active pet:", error);
    }
  };

  const value: ActivePetContextType = {
    activePet: activePet,
    fetchActivePet,
    setActivePetById,
  };

  return (
    <ActivePetContext.Provider value={value}>
      {children}
    </ActivePetContext.Provider>
  );
};
