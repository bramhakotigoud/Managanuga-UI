import Config from "react-native-config";

const BASE_URL = Config.API_BASE_URL;

export const getProductVariants = async (productId: number) => {
  const response = await fetch(
    `${BASE_URL}/products/${productId}/variants`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product variants");
  }

  const result = await response.json();

  return result.data || [];
};