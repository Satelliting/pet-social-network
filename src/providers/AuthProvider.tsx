import { useState, useEffect, ReactNode } from "react";
import { ID } from "appwrite";

import { account, databases } from "../appwrite";
import { AuthContext, AuthContextType } from "../contexts";

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const createUserInDatabase = async (
    userId: string,
    name: string,
    email: string
  ) => {
    return databases.createDocument(
      import.meta.env.VITE_APPWRITE_MAIN_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
      ID.unique(),
      {
        userId,
        name,
        email,
      }
    );
  };

  const checkUser = async () => {
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      console.error("No active session", error);
      setUser(null);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      await checkUser();
      return true;
    } catch {
      return false;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const newUser = await account.create(ID.unique(), email, password, name);
      await login(email, password);
      await createUserInDatabase(newUser.$id, name, email);
      return true;
    } catch (error) {
      console.error("Registration error", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      return true;
    } catch (error) {
      console.error("Logout error", error);
      return false;
    }
  };

  const resetPasswordRequest = async (email: string) => {
    try {
      const baseUrl = window.location.origin;
      await account.createRecovery(email, `${baseUrl}/reset-password`);
      return true;
    } catch (error) {
      console.error("Error sending recovery email:", error);
      return false;
    }
  };

  const resetPassword = async (
    userId: string,
    secret: string,
    password: string
  ) => {
    try {
      await account.updateRecovery(userId!, secret!, password);
      return true;
    } catch (error) {
      console.error("Error updating password:", error);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    resetPasswordRequest,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
