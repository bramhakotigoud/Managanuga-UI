import Config from "react-native-config";

const BASE_URL = Config.API_BASE_URL;

export const addCartItem = async (product: any) => {
  const response = await fetch(`${BASE_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      entity_type: "USER",
      entity_id: 1,
      item_type: "PRODUCT",
      item_id: product.id,
      quantity: 1,
    }),
  });

  return await response.json();
};