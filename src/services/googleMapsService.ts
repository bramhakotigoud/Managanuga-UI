import Config from 'react-native-config';

const GOOGLE_API_KEY = Config.GOOGLE_PLACES_API_KEY;

export const reverseGeocode = async (
  latitude: number,
  longitude: number,
) => {
  const url =
    `https://maps.googleapis.com/maps/api/geocode/json` +
    `?latlng=${latitude},${longitude}` +
    `&key=${GOOGLE_API_KEY}`;

  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok || data.status !== 'OK') {
    throw new Error(
      data.error_message || 'Unable to find current address',
    );
  }

  return data;
};