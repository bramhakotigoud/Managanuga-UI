import Config from "../config";

const BASE_URL = Config.API_BASE_URL;

const readResponse = async (response: Response) => {
  const body = await response.text();

  if (!body) {
    return null;
  }

  try {
    return JSON.parse(body);
  } catch {
    return {message: body};
  }
};

export interface Address {
  id?: number;
  entity_type: string;
  entity_id: string;
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

  const data = await readResponse(response);

  if (!response.ok) {
    throw new Error(
      data?.message || `Request failed (${response.status})`
    );
  }

  return data;
};

export const getAddresses = async (
  userId: string
) => {
  const response = await fetch(
    `${BASE_URL}/address?entity_type=USER&entity_id=${userId}`
  );

  const data = await readResponse(response);

  if (!response.ok) {
    throw new Error(
      data?.message || `Request failed (${response.status})`
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

  const data = await readResponse(response);

  if (!response.ok) {
    throw new Error(
      data?.message || `Request failed (${response.status})`
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

  const data = await readResponse(response);

  if (!response.ok || data?.success === false) {
    throw new Error(
      data?.message || `Request failed (${response.status})`
    );
  }

  return data;
};