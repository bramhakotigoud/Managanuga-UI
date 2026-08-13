// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
// } from "react";

// import AsyncStorage from "@react-native-async-storage/async-storage";

// const AuthContext = createContext<any>(null);

// export const AuthProvider = ({ children }: any) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] =
//   useState<any>(null);

//   useEffect(() => {
//     checkLogin();
//   }, []);

//   const checkLogin = async () => {
//   const token = await AsyncStorage.getItem("token");
//   const userData = await AsyncStorage.getItem("user");

//   if (token && userData) {
//     setIsLoggedIn(true);
//     setUser(JSON.parse(userData));
//   }
// };

//   const login = async (
//   token: string,
//   userData: any,
// ) => {
//   await AsyncStorage.setItem("token", token);

//   await AsyncStorage.setItem(
//     "user",
//     JSON.stringify(userData),
//   );

//   setUser(userData);

//   setIsLoggedIn(true);
// };

//   const logout = async () => {
//   await AsyncStorage.removeItem("token");
//   await AsyncStorage.removeItem("user");

//   setUser(null);
//   setIsLoggedIn(false);
// };

//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn,
//         user,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Config from "../config";

import {
  getMessaging,
  getToken,
} from "@react-native-firebase/messaging";

const AuthContext = createContext<any>(null);



export const AuthProvider = ({ children }: any) => {


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const isVendor = user?.role === "VENDOR";
const isReseller = user?.role === "RESELLER";

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

    // 🔥 Register FCM token with Railway backend
    try {
      console.log("🔥 Starting FCM registration...");
      console.log("👤 Logged-in user ID:", userData?.id);

      console.log(
        "🌐 FCM API URL:",
        `${Config.API_BASE_URL}/auth/fcm-token`,
      );

      const messaging = getMessaging();

const authStatus = await messaging.requestPermission();

console.log(
  "🔔 Notification permission status:",
  authStatus,
);

const fcmToken = await messaging.getToken();

console.log("🔥 FCM TOKEN:", fcmToken);
      console.log("🔥 FCM TOKEN:", fcmToken);

      if (!fcmToken || !userData?.id) {
        console.log(
          "⚠️ Missing FCM token or user ID",
        );
        return;
      }

      const response = await fetch(
        `${Config.API_BASE_URL}/auth/fcm-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userData.id,
            fcmToken,
          }),
        },
      );

      const responseText = await response.text();

      console.log(
        "🔥 FCM BACKEND STATUS:",
        response.status,
      );

      console.log(
        "🔥 FCM BACKEND RESPONSE:",
        responseText,
      );

      if (!response.ok) {
        throw new Error(
          `FCM backend failed: ${response.status} ${responseText}`,
        );
      }

      let result;

      try {
        result = JSON.parse(responseText);
      } catch {
        throw new Error(
          `Backend returned non-JSON response: ${responseText}`,
        );
      }

      console.log(
        "✅ FCM TOKEN SAVED:",
        result,
      );

    } catch (error) {
      console.error(
        "❌ FCM registration failed:",
        error,
      );
    }
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


        // new values

        isVendor,

        isReseller,

      }}

    >

      {children}

    </AuthContext.Provider>

  );

};
export const useAuth = () =>
useContext(AuthContext);