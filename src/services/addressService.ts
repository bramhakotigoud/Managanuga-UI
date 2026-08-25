import Config from "react-native-config";

const BASE_URL = Config.API_BASE_URL;

export interface Address {
  id?: number;
  entity_type: string;
  entity_id: number;
  address_type?: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  country?: string;
  postal_code: string;
  is_default?: boolean;
}

export const getPincodeDetails = async (
  pincode: string
) => {
  const response = await fetch(
    `${BASE_URL}/address/pincode/${pincode}`
  );

  return await response.json();
};

export const addAddress = async (
  address: Address
) => {
  const response = await fetch(
    `${BASE_URL}/address`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || "Failed to add address"
    );
  }

  return data;
};

export const getAddresses = async (
  userId: number
) => {
  const response = await fetch(
    `${BASE_URL}/address?entity_type=USER&entity_id=${userId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || "Failed to fetch addresses"
    );
  }

  return data;
};

export const updateAddress = async (
  addressId: number,
  address: Partial<Address>
) => {
  const response = await fetch(
    `${BASE_URL}/address/${addressId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || "Failed to update address"
    );
  }

  return data;
};

export const deleteAddress = async (
  addressId: number
) => {
  const response = await fetch(
    `${BASE_URL}/address/${addressId}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || "Failed to delete address"
    );
  }

  return data;
};