import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Query, ID, Storage } from "appwrite";

import { client, databases } from "../../appwrite";
import { useAuth } from "../../hooks/useAuth";
import { useActivePet } from "../../hooks/useActivePet";
import { PetInterface } from "../../interfaces/Pets";

const storage = new Storage(client);

const CreatePetPage: React.FC = () => {
  const [availablePets, setAvailablePets] = useState<PetInterface[]>([]);
  const [userPets, setUserPets] = useState<number>(0);
  const [petName, setPetName] = useState("");
  const [selectedPetId, setSelectedPetId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useAuth();
  const { setActivePetById } = useActivePet();
  const navigate = useNavigate();

  if (!user) {
    navigate("/auth/login");
  }

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_MAIN_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_PETS_COLLECTION_ID
        );
        setAvailablePets(response.documents as unknown as PetInterface[]);
      } catch (error) {
        console.error("Failed to fetch pet options:", error);
      }
    };

    fetchPets();
  }, []);

  useEffect(() => {
    const fetchUserPets = async () => {
      try {
        const response = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_MAIN_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_USERS_PETS_COLLECTION_ID,
          [Query.equal("userId", user!.$id)]
        );
        setUserPets(response.documents.length);
      } catch (error) {
        console.error("Failed to fetch user pets:", error);
      }
    };

    fetchUserPets();
  }, [user]);

  const handleCreatePet = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const namePattern = /^[a-zA-Z0-9]+$/;
    if (!namePattern.test(petName)) {
      setError("Pet name can only contain alphanumeric characters.");
      setLoading(false);
      return;
    }

    if (userPets >= 3) {
      setError("You can only have up to 3 pets.");
      setLoading(false);
      return;
    }

    const selectedPet = availablePets.find((pet) => pet.$id === selectedPetId);
    if (!selectedPet) {
      setError("Please select a pet.");
      setLoading(false);
      return;
    }

    try {
      const petUID = ID.unique();
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_MAIN_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_USERS_PETS_COLLECTION_ID,
        petUID,
        {
          userId: user!.$id,
          petId: selectedPetId,
          name: petName,
          attack: selectedPet.attack,
          defense: selectedPet.defense,
          health: selectedPet.health,
          stamina: selectedPet.stamina,
          agility: selectedPet.agility,
          currentHealth: selectedPet.health,
          active: false,
        }
      );

      setActivePetById(petUID);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to create pet:", error);
      setError("There was an error creating your pet. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Create a New Pet
      </h2>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <form onSubmit={handleCreatePet} className="space-y-4">
        <div>
          <label htmlFor="petName" className="block font-medium text-gray-700">
            Pet Name
          </label>
          <input
            type="text"
            id="petName"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            placeholder="Enter pet name"
            required
            disabled={loading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Choose Your Pet
          </label>
          <div className="grid grid-cols-3 gap-4">
            {availablePets.map((pet) => {
              const petImageUrl = storage
                .getFilePreview(
                  import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID,
                  pet.imageId
                )
                .toString();

              return (
                <div
                  key={pet.$id}
                  className={`p-2 border rounded-md cursor-pointer ${
                    selectedPetId === pet.$id
                      ? "border-blue-500"
                      : "border-gray-300"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => !loading && setSelectedPetId(pet.$id)}
                >
                  <img
                    src={petImageUrl}
                    alt={pet.type}
                    className="w-full h-auto rounded-md"
                  />
                  <p className="text-center text-sm mt-1">{pet.type}</p>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? (
            <div className="animate-spin border-t-2 border-white w-5 h-5 rounded-full mx-auto" />
          ) : (
            "Create Pet"
          )}
        </button>
      </form>
      <div className="mt-4 text-center">
        <Link
          to="/dashboard"
          className="text-blue-500 hover:underline text-sm font-medium"
        >
          Have second thoughts or too many pets?
        </Link>
      </div>
    </div>
  );
};

export default CreatePetPage;
