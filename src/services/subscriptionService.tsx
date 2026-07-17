import axios from "axios";

const BASE_URL = "https://managanuga-backend-production.up.railway.app";

export const getSubscriptionPlans = async () => {
  const response = await axios.get(
    `${BASE_URL}/api/subscriptions/plans`
  );

  return response.data.plans;
};