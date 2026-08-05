import Config from "react-native-config";

const BASE_URL = Config.API_BASE_URL;
console.log("BASE_URL:", Config.API_BASE_URL);


export const sendOtp = async (mobile: string) => {
  const response = await fetch(`${BASE_URL}/auth/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mobile }),
  });

  return await response.json();
};

export const verifyOtp = async (
  mobile: string,
  otp: string,
   vendorId?: string | null,
) => {
  const response = await fetch(`${BASE_URL}/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mobile,
      otp,
      vendorId,
    }),
  });
  return await response.json();
};
export const loginWithPassword = async (
  mobile: string,
  password: string
) => {
  const response = await fetch(`${BASE_URL}/auth/login-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mobile,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return data;
  }

  return data;
};