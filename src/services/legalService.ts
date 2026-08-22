import Config from 'react-native-config';

const BASE_URL = Config.API_BASE_URL;

export interface LegalContent {
  id: number;
  terms_conditions: string;
  privacy_policy: string;
  customer_care: string;
  refund_cancellation_policy: string;
  shipping_delivery: string;
  created_at?: string;
  updated_at?: string;
}

export const getLegalContent = async (): Promise<LegalContent> => {
  const response = await fetch(`${BASE_URL}/legal`);

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message || 'Failed to load legal content'
    );
  }

  return data.data;
};