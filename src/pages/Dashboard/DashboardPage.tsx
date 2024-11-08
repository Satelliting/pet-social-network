import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Query, Storage } from "appwrite";

import { client, databases } from "../../appwrite";
import { useAuth } from "../../hooks/useAuth";
import { useActivePet } from "../../hooks/useActivePet";
import { PetInterface } from "../../interfaces/Pets";

const storage = new Storage(client);

const DashboardPage: React.FC = () => {
  const [userPets, setUserPets] = useState<PetInterface[]>([]);
  const { user, logout } = useAuth();
  const { activePet, setActivePetById } = useActivePet();
  const navigate = useNavigate();

  if (!user) {
    navigate("/auth/login");
  }

  useEffect(() => {
    const fetchPetsWithImages = async () => {
      try {
        // Fetch user-specific pets from `Users_Pets` collection
        const userPetsResponse = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_MAIN_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_USERS_PETS_COLLECTION_ID,
          [Query.equal("userId", user!.$id)]
        );

        // Fetch all available pets to get their `imageId` and other details
        const allPetsResponse = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_MAIN_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_PETS_COLLECTION_ID
        );

        // Map all pets with their image URLs
        const allPetsWithImages = allPetsResponse.documents.map((pet) => ({
          ...pet,
          imageURL: storage.getFilePreview(
            import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID,
            pet.imageId
          ),
        }));

        // Associate `userPets` with their image URLs based on `petId`
        const userPetsWithImages = userPetsResponse.documents.map((userPet) => {
          const fullPet = allPetsWithImages.find(
            (pet) => pet.$id === userPet.petId
          );
          return {
            ...userPet,
            imageURL: fullPet?.imageURL,
          };
        });

        setUserPets(userPetsWithImages as unknown as PetInterface[]);
      } catch (error) {
        console.error("Failed to fetch pets with images:", error);
      }
    };

    fetchPetsWithImages();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleCreatePet = () => {
    navigate("/create-pet");
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-500 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to your Dashboard,{" "}
        {user && (
          <>
            <span className="text-yellow-300">{user.name}</span>!
          </>
        )}
      </h1>

      {/* User Information */}
      {user && (
        <div className="bg-white text-gray-800 p-6 rounded-md mb-6 shadow-md">
          <h2 className="text-xl font-semibold mb-2">User Information</h2>
          <p className="text-lg">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="text-lg">
            <span className="font-semibold">User ID:</span> {user.$id}
          </p>
        </div>
      )}

      {/* Active Pet */}
      {activePet && (
        <div className="bg-white text-gray-800 p-6 rounded-md mb-6 shadow-md">
          <h2 className="text-xl font-semibold mb-2">Active Pet</h2>
          <p className="text-lg">
            <span className="font-semibold">Name:</span> {activePet.name}
          </p>
        </div>
      )}

      {/* Display All User Pets with Images */}
      <div className="bg-white text-gray-800 p-6 rounded-md mb-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Pets</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {userPets.map((pet) => (
            <div
              key={pet.$id}
              className={`p-4 rounded-md shadow-md ${
                pet.$id === activePet?.$id
                  ? "bg-indigo-100 border-2 border-indigo-400"
                  : "bg-gray-100"
              }`}
            >
              {pet.imageURL && (
                <img
                  src={pet.imageURL}
                  alt={`${pet.name} image`}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
              )}
              <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                {pet.name}
              </h3>
              <p className="text-lg">
                <span className="font-semibold">Name:</span> {pet.name}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Attack:</span> {pet.attack}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Defense:</span> {pet.defense}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Health:</span>{" "}
                {pet.currentHealth}/{pet.health}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Stamina:</span> {pet.stamina}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Agility:</span> {pet.agility}
              </p>
              {pet.$id !== activePet?.$id && (
                <button
                  onClick={() => setActivePetById(pet.$id)}
                  className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-colors shadow-md"
                >
                  Set as Active
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <button
        onClick={handleLogout}
        className="w-full mb-2.5 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-md transition-colors shadow-md transform hover:scale-105"
      >
        Logout
      </button>
      <button
        onClick={handleCreatePet}
        className="w-full mb-2.5 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md transition-colors shadow-md transform hover:scale-105"
      >
        Create Pet
      </button>
    </div>
  );
};

export default DashboardPage;
