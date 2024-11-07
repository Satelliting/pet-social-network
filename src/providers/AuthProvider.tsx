import { useState, useEffect } from "react";
import { ID } from "appwrite";

import { account, databases } from "../appwrite";
import { AuthContext, AuthContextType } from "../contexts/AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      console.error("No active session", error);
    }
  };

  const login = async (email: string, password: string) => {
    await account.createEmailPasswordSession(email, password);
    await checkUser();
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const user = await account.create(ID.unique(), email, password, name);
      await login(email, password);

      await databases.createDocument(
        import.meta.env.APPWRITE_MAIN_DATABASE_ID,
        import.meta.env.APPWRITE_USER_COLLECTION_ID,
        ID.unique(),
        {
          userId: user.$id,
          name,
          email,
        }
      );
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
