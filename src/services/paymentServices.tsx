import Config from "react-native-config";

const BASE_URL = Config.API_BASE_URL;

export const createOrder = async (
  orderId: string,
  amount: number,
  paymentType: string,
  entityId: number,
  membershipPlanId?: number,
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/payments/create-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: orderId,
          amount,
          entity_id: entityId,
          paymentType,
          membershipPlanId,
        }),
      }
    );

    const data = await response.json();

    return data;
  } catch (err: any) {
    throw err;
  }
};
export const getCheckoutSummary = async (
  entityId: number,
) => {

  try {

    const response = await fetch(
      `${BASE_URL}/payments/checkout-summary`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          entity_id: entityId,
        }),
      }
    );

    const data = await response.json();

    return data;

  } catch (err: any) {

    throw err;

  }

};