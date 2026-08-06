import Config from "react-native-config";

const BASE_URL = Config.API_BASE_URL;

export const getPincodeDetails = async (
  pincode: string
) => {

  const response = await fetch(
    `${BASE_URL}/address/pincode/${pincode}`
  );

  return await response.json();

};