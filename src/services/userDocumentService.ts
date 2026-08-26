import Config from 'react-native-config';

const BASE_URL = Config.API_BASE_URL;

export const uploadProfileImage = async (
  userId: string,
  imageUri: string,
  mimeType: string = 'image/jpeg',
) => {
  const formData = new FormData();

  formData.append('userId', userId);

  formData.append('profile_image', {
    uri: imageUri,
    type: mimeType,
    name: `profile_${userId}.jpg`,
  } as any);

  const response = await fetch(
    `${BASE_URL}/user-documents/profile`,
    {
      method: 'POST',
      body: formData,
    },
  );

  const data = await response.json();

  if (!response.ok || data?.success === false) {
    throw new Error(
      data?.message || `Request failed (${response.status})`,
    );
  }

  return data;
};

export const getProfileImageUrl = (userId: string) => {
  return `${BASE_URL}/user-documents/profile/${userId}`;
};

export const deleteProfileImage = async (
  userId: string,
) => {
  const response = await fetch(
    `${BASE_URL}/user-documents/profile-image`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok || data?.success === false) {
    throw new Error(
      data?.message ||
        `Request failed (${response.status})`,
    );
  }

  return data;
};