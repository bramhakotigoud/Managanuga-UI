import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] =
  useState<any>(null);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
  const token = await AsyncStorage.getItem("token");
  const userData = await AsyncStorage.getItem("user");

  if (token && userData) {
    setIsLoggedIn(true);
    setUser(JSON.parse(userData));
  }
};

  const login = async (
  token: string,
  userData: any,
) => {
  await AsyncStorage.setItem("token", token);

  await AsyncStorage.setItem(
    "user",
    JSON.stringify(userData),
  );

  setUser(userData);

  setIsLoggedIn(true);
};

  const logout = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");

  setUser(null);
  setIsLoggedIn(false);
};

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);