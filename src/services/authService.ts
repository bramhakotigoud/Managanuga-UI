import Config from "react-native-config";

const BASE_URL = Config.API_BASE_URL;
console.log("BASE_URL:", Config.API_BASE_URL);

const parseResponse = async (response: any) => {
  const contentType = response.headers?.get?.("content-type") || "";
  if (contentType.includes("application/json")) {
    return await response.json();
  }

  // Fallback: try to parse text as JSON, otherwise return raw text with status
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    return { raw: text, status: response.status, ok: response.ok };
  }
};


export const sendOtp = async (mobile: string) => {
  const response = await fetch(`${BASE_URL}/auth/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mobile }),
  });

  return await parseResponse(response);
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
  return await parseResponse(response);
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
      password: password.trim(),

    }),
  });

  const data = await parseResponse(response);
  if (!response.ok) {
    return data;
  }

  return data;
};
export const sendForgotPasswordOtp = async (
  mobile: string
) => {
  const response = await fetch(
    `${BASE_URL}/auth/forgot-password/send-otp`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mobile }),
    }
  );

  return await parseResponse(response);
};
export const resetPasswordWithOtp = async (
  mobile: string,
  otp: string,
  newPassword: string,
  confirmPassword: string
) => {
  const response = await fetch(
    `${BASE_URL}/auth/forgot-password/reset`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile,
        otp,
        newPassword,
        confirmPassword,
      }),
    }
  );

  return await parseResponse(response);
};
export const updateUsername = async (
  userId: number,
  username: string
) => {
  const response = await fetch(
    `${BASE_URL}/auth/update-name`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        username,
      }),
    }
  );

  // Try to parse JSON; fall back to text. Return a normalized shape
  const contentType = response.headers?.get?.("content-type") || "";
  let parsed: any = null;
  if (contentType.includes("application/json")) {
    try {
      parsed = await response.json();
    } catch (e) {
      parsed = null;
    }
  } else {
    const text = await response.text();
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      parsed = { raw: text };
    }
  }

  const success = response.ok && (parsed?.success ?? true);
  const message = parsed?.message || parsed?.error || (parsed?.raw ? parsed.raw : undefined);

  return { success, message, data: parsed, status: response.status };
};
export const verifyForgotPasswordOtp = async (
  mobile: string,
  otp: string
) => {
  const response = await fetch(
    `${BASE_URL}/auth/forgot-password/verify-otp`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile,
        otp,
      }),
    }
  );

  return await parseResponse(response);
};
export const changePassword = async (
  userId: number,
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
) => {
  const response = await fetch(
    `${BASE_URL}/auth/change-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        currentPassword,
        newPassword,
        confirmPassword,
      }),
    }
  );

  return await parseResponse(response);
};    