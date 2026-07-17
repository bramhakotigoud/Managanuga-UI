import Config from "react-native-config";

const BASE_URL = Config.API_BASE_URL;

export const createOrder = async (
  entity_type: string,
  entity_id: number,
  buyNow = false,
  productId?: number,
  quantity = 1,
) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      entity_type,
      entity_id,
      buyNow,
      productId,
      quantity,
    }),
  });

  return await response.json();
};
export const getOrders = async (
  entity_type: string,
  entity_id: number,
) => {
  const response = await fetch(
    `${BASE_URL}/orders?entity_type=${entity_type}&entity_id=${entity_id}`
  );

  return await response.json();
};
