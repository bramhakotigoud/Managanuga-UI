import Config from "react-native-config";

const BASE_URL = Config.API_BASE_URL;

export const getProductReviews = async (productId: number) => {
  const response = await fetch(
    `${BASE_URL}/products/${productId}/reviews`
  );

  return await response.json();
};

export const submitProductReview = async (
  productId: number,
  userId: string,
  rating: number,
  review: string
) => {
  const response = await fetch(
    `${BASE_URL}/products/${productId}/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        rating,
        review,
      }),
    }
  );

  return await response.json();
};