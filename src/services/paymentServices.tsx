
import Config from "react-native-config";

const BASE_URL = Config.API_BASE_URL;

export const createOrder = async (
  orderId: string,
  amount: number,
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
        }),
      }
    );

    

    const data = await response.json();

    

    return data;
  } catch (err: any) {
    
    throw err;
  }
};
